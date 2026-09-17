'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addSubcontractorToCompany(data: { name: string, email: string }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: member } = await supabase
    .from('company_members')
    .select('company_id')
    .eq('user_id', user.id)
    .single()

  if (!member) throw new Error('User has no company assigned')
  
  const { error } = await supabase
    .from('subcontractors')
    .insert([{
      company_id: member.company_id,
      name: data.name,
      email: data.email,
      status: 'Pending Review'
    }])

  if (error) throw error
  revalidatePath('/dashboard/subcontractors')
}
