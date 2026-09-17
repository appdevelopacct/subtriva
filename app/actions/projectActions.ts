'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createProjectWithDetails(details: any, subs: any[], requirements: any[]) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // Get user's company (assuming one for now, or fetch first)
  const { data: member } = await supabase
    .from('company_members')
    .select('company_id')
    .eq('user_id', user.id)
    .single()

  if (!member) throw new Error('User has no company assigned')
  
  const company_id = member.company_id

  // 1. Create project
  const { data: project, error: pError } = await supabase
    .from('projects')
    .insert([{
      company_id,
      name: details.name,
      client: details.client,
      status: 'Active'
    }])
    .select()
    .single()

  if (pError) throw pError

  // 2. Process subs
  if (subs.length > 0) {
    for (const sub of subs) {
      let subId = sub.id

      if (sub.isNew) {
        const { data: newSub, error: subErr } = await supabase
          .from('subcontractors')
          .insert([{
            company_id,
            name: sub.companyName,
            contact_name: sub.contactName,
            email: sub.email,
            phone: sub.phone,
            trade: sub.trade
          }])
          .select()
          .single()
        
        if (!subErr && newSub) {
          subId = newSub.id
        }
      }

      if (subId && !sub.id.toString().startsWith('temp_') || sub.isNew) {
        // Link to project
        await supabase.from('project_subcontractors').insert([{
          project_id: project.id,
          subcontractor_id: subId
        }])
      }
    }
  }

  revalidatePath('/dashboard/projects')
  return project
}
