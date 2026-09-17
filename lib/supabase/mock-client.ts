export function createMockClient() {
  const mockUser = {
    id: 'mock-user-1',
    email: 'demo@subtriva.com',
    user_metadata: { first_name: 'Demo', last_name: 'User' }
  };

  const mockData: any = {
    companies: [{ id: 'mock-company-1', name: 'Demo Construction LLC' }],
    company_members: [
      { user_id: mockUser.id, company_id: 'mock-company-1', companies: { name: 'Demo Construction LLC' } }
    ],
    profiles: [
      { id: mockUser.id, full_name: 'Demo User' }
    ],
    projects: [
      { id: '1', company_id: 'mock-company-1', name: 'Downtown Highrise', status: 'Active', created_at: new Date().toISOString() },
      { id: '2', company_id: 'mock-company-1', name: 'Westside Mall Renovation', status: 'Planning', created_at: new Date().toISOString() }
    ],
    subcontractors: [
      { id: '1', company_id: 'mock-company-1', name: 'Apex Electrical', trade: 'Electrical' },
      { id: '2', company_id: 'mock-company-1', name: 'BuildRite Plumbing', trade: 'Plumbing' }
    ],
    documents: [
      { id: '1', company_id: 'mock-company-1', name: 'General Liability Insurance', status: 'Active', expiration_date: new Date(Date.now() + 60*24*60*60*1000).toISOString(), subcontractors: { name: 'Apex Electrical' }, subcontractor_id: '1', created_at: new Date().toISOString() },
      { id: '2', company_id: 'mock-company-1', name: 'Workers Comp', status: 'Expiring Soon', expiration_date: new Date(Date.now() + 5*24*60*60*1000).toISOString(), subcontractors: { name: 'BuildRite Plumbing' }, subcontractor_id: '2', created_at: new Date().toISOString() },
      { id: '3', company_id: 'mock-company-1', name: 'Trade License', status: 'Missing', expiration_date: null, subcontractors: { name: 'BuildRite Plumbing' }, subcontractor_id: '2', created_at: new Date().toISOString() }
    ],
    reminders: [
      { id: '1', company_id: 'mock-company-1', type: 'Email', status: 'Scheduled', scheduled_for: new Date(Date.now() + 2*24*60*60*1000).toISOString(), is_completed: false, documents: { name: 'Workers Comp', subcontractors: { name: 'BuildRite Plumbing' } } }
    ],
    activity_logs: [
      { id: '1', company_id: 'mock-company-1', action: 'Uploaded new document', entity_type: 'Document', created_at: new Date().toISOString(), profiles: { full_name: 'Demo User' } }
    ]
  };

  const createQueryBuilder = (tableName: string, initialData: any[]) => {
    let currentData = [...initialData];
    
    const builder: any = {
      select: (fields: string) => {
        // basic mock for nested fields, very naive
        return builder;
      },
      eq: (field: string, value: any) => {
        currentData = currentData.filter(item => item[field] === value);
        return builder;
      },
      order: () => builder,
      limit: (n: number) => {
        currentData = currentData.slice(0, n);
        return builder;
      },
      single: () => {
        return Promise.resolve({ data: currentData[0] || null, error: null });
      },
      insert: (items: any[]) => {
        const newItems = items.map(item => ({ ...item, id: Math.random().toString(36).substring(7), created_at: new Date().toISOString() }));
        mockData[tableName].push(...newItems);
        return Promise.resolve({ data: newItems, error: null });
      },
      update: (updates: any) => {
        currentData.forEach(item => {
          Object.assign(item, updates);
        });
        return builder; // returning builder to allow chaining .eq() after update if they did it wrong, wait, actually update().eq() is how Supabase works.
      },
      delete: () => {
        const idsToDelete = currentData.map(i => i.id);
        mockData[tableName] = mockData[tableName].filter((i: any) => !idsToDelete.includes(i.id));
        return Promise.resolve({ error: null });
      },
      then: (resolve: any) => {
        resolve({ data: currentData, error: null });
      }
    };
    return builder;
  };

  return {
    auth: {
      getUser: async () => ({ data: { user: mockUser }, error: null }),
      getSession: async () => ({ data: { session: { user: mockUser } }, error: null }),
      signInWithPassword: async () => ({ data: { user: mockUser }, error: null }),
      signUp: async () => ({ data: { user: mockUser }, error: null }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: (table: string) => {
      // If updating, we need to handle `.update(val).eq(...)`
      // For simplicity, we just return a proxy that intercepts then/single
      let currentData = mockData[table] ? [...mockData[table]] : [];
      let pendingUpdate: any = null;
      let pendingDelete = false;

      const execute = () => {
        if (pendingUpdate) {
          const idsToUpdate = currentData.map(i => i.id);
          mockData[table].forEach((item: any) => {
            if (idsToUpdate.includes(item.id)) {
              Object.assign(item, pendingUpdate);
            }
          });
          return { error: null };
        }
        if (pendingDelete) {
           const idsToDelete = currentData.map(i => i.id);
           mockData[table] = mockData[table].filter((i: any) => !idsToDelete.includes(i.id));
           return { error: null };
        }
        return { data: currentData, error: null };
      };

      const builder: any = {
        select: () => builder,
        eq: (col: string, val: any) => {
          currentData = currentData.filter(item => item[col] === val);
          return builder;
        },
        not: (col: string, op: string, val: any) => {
          currentData = currentData.filter(item => {
            if (op === 'is' || op === 'eq') return item[col] !== val;
            return true;
          });
          return builder;
        },
        order: () => builder,
        limit: (n: number) => {
          currentData = currentData.slice(0, n);
          return builder;
        },
        single: async () => {
          if (pendingUpdate || pendingDelete) {
            execute();
            return { data: currentData[0] || null, error: null };
          }
          return { data: currentData[0] || null, error: null };
        },
        insert: async (items: any[]) => {
          const newItems = items.map(item => ({ ...item, id: Math.random().toString(36).substring(7), created_at: new Date().toISOString() }));
          if (!mockData[table]) mockData[table] = [];
          mockData[table].push(...newItems);
          return { data: newItems, error: null };
        },
        update: (updates: any) => {
          pendingUpdate = updates;
          return builder;
        },
        delete: () => {
          pendingDelete = true;
          return builder;
        },
        then: (resolve: any) => {
          resolve(execute());
        }
      };

      return builder;
    },
    storage: {
      from: (bucket: string) => ({
        upload: async () => ({ data: { path: 'mock-path.pdf' }, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: 'https://example.com/mock-path.pdf' } }),
        createSignedUrl: async () => ({ data: { signedUrl: 'https://example.com/mock-path.pdf' }, error: null })
      })
    }
  };
}
