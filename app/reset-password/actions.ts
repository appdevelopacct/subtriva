'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function updatePassword(formData: FormData) {
  let errorMessage = ''
  let isSuccess = false

  try {
    const supabase = await createClient()
    const password = formData.get('password') as string

    const { error } = await supabase.auth.updateUser({
      password: password,
    })

    if (error) {
      errorMessage = error.message
    } else {
      isSuccess = true
    }
  } catch (err: any) {
    console.error('Update password error:', err)
    errorMessage = 'Cannot connect to authentication server. If you are using Supabase, your project might be paused.'
  }

  if (errorMessage) {
    redirect('/reset-password?message=' + encodeURIComponent(errorMessage))
  }

  if (isSuccess) {
    redirect('/login?message=' + encodeURIComponent('Password updated successfully. You can now log in.'))
  }
}
