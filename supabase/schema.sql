-- Subtriva Production Supabase Schema
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--------------------------------------------------
-- 1. COMPANIES & USERS (MULTI-TENANT)
--------------------------------------------------
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Company Members (Roles: Owner, Admin, Manager, Member)
CREATE TABLE company_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Owner', 'Admin', 'Manager', 'Member')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(company_id, user_id)
);

--------------------------------------------------
-- 2. PROJECTS & SUBCONTRACTORS
--------------------------------------------------
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  client TEXT,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subcontractors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  trade TEXT,
  status TEXT DEFAULT 'Pending Review',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Many-to-many relationship
CREATE TABLE project_subcontractors (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  subcontractor_id UUID REFERENCES subcontractors(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (project_id, subcontractor_id)
);

--------------------------------------------------
-- 3. DOCUMENTS & COMPLIANCE
--------------------------------------------------
-- Templates or global requirements per company
CREATE TABLE document_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  track_expiration BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Specific requirements for a subcontractor on a project
CREATE TABLE document_requirements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  subcontractor_id UUID REFERENCES subcontractors(id) ON DELETE CASCADE NOT NULL,
  document_type_id UUID REFERENCES document_types(id) ON DELETE CASCADE NOT NULL,
  is_required BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  requirement_id UUID REFERENCES document_requirements(id) ON DELETE CASCADE,
  subcontractor_id UUID REFERENCES subcontractors(id) ON DELETE CASCADE,
  file_url TEXT,
  file_path TEXT,
  status TEXT DEFAULT 'Missing', -- Missing, Pending Review, Active, Expiring Soon, Expired, Rejected
  expiration_date DATE,
  uploaded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE upload_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  subcontractor_id UUID REFERENCES subcontractors(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------
-- 4. ACTIVITY & REMINDERS
--------------------------------------------------
CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  due_date TIMESTAMPTZ,
  is_general BOOLEAN DEFAULT true,
  related_document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity TEXT,
  entity_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------
-- RLS POLICIES
--------------------------------------------------
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcontractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_subcontractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE upload_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Helper to get user's company_ids
CREATE OR REPLACE FUNCTION get_my_company_ids()
RETURNS SETOF UUID
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT company_id FROM company_members WHERE user_id = auth.uid();
$$;

-- Companies
CREATE POLICY "Users can view their companies" ON companies FOR SELECT USING (id IN (SELECT get_my_company_ids()));
CREATE POLICY "Users can update their companies" ON companies FOR UPDATE USING (id IN (SELECT get_my_company_ids()));

-- Profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (id = auth.uid());

-- Company Members
CREATE POLICY "Users can view members of their companies" ON company_members FOR SELECT USING (company_id IN (SELECT get_my_company_ids()));

-- Projects
CREATE POLICY "View projects in my company" ON projects FOR SELECT USING (company_id IN (SELECT get_my_company_ids()));
CREATE POLICY "Insert projects in my company" ON projects FOR INSERT WITH CHECK (company_id IN (SELECT get_my_company_ids()));
CREATE POLICY "Update projects in my company" ON projects FOR UPDATE USING (company_id IN (SELECT get_my_company_ids()));
CREATE POLICY "Delete projects in my company" ON projects FOR DELETE USING (company_id IN (SELECT get_my_company_ids()));

-- Subcontractors
CREATE POLICY "View subs in my company" ON subcontractors FOR SELECT USING (company_id IN (SELECT get_my_company_ids()));
CREATE POLICY "Insert subs in my company" ON subcontractors FOR INSERT WITH CHECK (company_id IN (SELECT get_my_company_ids()));
CREATE POLICY "Update subs in my company" ON subcontractors FOR UPDATE USING (company_id IN (SELECT get_my_company_ids()));
CREATE POLICY "Delete subs in my company" ON subcontractors FOR DELETE USING (company_id IN (SELECT get_my_company_ids()));

-- Project Subcontractors
CREATE POLICY "View project subs" ON project_subcontractors FOR SELECT USING (project_id IN (SELECT id FROM projects WHERE company_id IN (SELECT get_my_company_ids())));
CREATE POLICY "Manage project subs" ON project_subcontractors FOR ALL USING (project_id IN (SELECT id FROM projects WHERE company_id IN (SELECT get_my_company_ids())));

-- Document Types
CREATE POLICY "View doc types" ON document_types FOR SELECT USING (company_id IN (SELECT get_my_company_ids()));
CREATE POLICY "Manage doc types" ON document_types FOR ALL USING (company_id IN (SELECT get_my_company_ids()));

-- Document Requirements
CREATE POLICY "View doc reqs" ON document_requirements FOR SELECT USING (project_id IN (SELECT id FROM projects WHERE company_id IN (SELECT get_my_company_ids())));
CREATE POLICY "Manage doc reqs" ON document_requirements FOR ALL USING (project_id IN (SELECT id FROM projects WHERE company_id IN (SELECT get_my_company_ids())));

-- Documents
CREATE POLICY "View documents" ON documents FOR SELECT USING (company_id IN (SELECT get_my_company_ids()));
CREATE POLICY "Manage documents" ON documents FOR ALL USING (company_id IN (SELECT get_my_company_ids()));

-- Upload Links
CREATE POLICY "View upload links" ON upload_links FOR SELECT USING (company_id IN (SELECT get_my_company_ids()));
CREATE POLICY "Manage upload links" ON upload_links FOR ALL USING (company_id IN (SELECT get_my_company_ids()));

-- Reminders, Notifications, Activity Logs
CREATE POLICY "View reminders" ON reminders FOR SELECT USING (company_id IN (SELECT get_my_company_ids()));
CREATE POLICY "Manage reminders" ON reminders FOR ALL USING (company_id IN (SELECT get_my_company_ids()));

CREATE POLICY "View notifications" ON notifications FOR SELECT USING (company_id IN (SELECT get_my_company_ids()));
CREATE POLICY "Manage notifications" ON notifications FOR ALL USING (company_id IN (SELECT get_my_company_ids()));

CREATE POLICY "View activity" ON activity_logs FOR SELECT USING (company_id IN (SELECT get_my_company_ids()));
CREATE POLICY "Manage activity" ON activity_logs FOR ALL USING (company_id IN (SELECT get_my_company_ids()));


--------------------------------------------------
-- 5. STORAGE
--------------------------------------------------
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false) ON CONFLICT DO NOTHING;

CREATE POLICY "Users can upload documents" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'documents');
CREATE POLICY "Users can view their documents" ON storage.objects FOR SELECT USING (bucket_id = 'documents');
CREATE POLICY "Users can delete their documents" ON storage.objects FOR DELETE USING (bucket_id = 'documents');
