'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function resetPassword(formData: FormData) {
  let errorMessage = ''
  let isSuccess = false
  
  try {
    const supabase = await createClient()
    const email = formData.get('email') as string

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password`,
    })

    if (error) {
      errorMessage = error.message
    } else {
      isSuccess = true
    }
  } catch (err: any) {
    console.error('Reset password error:', err)
    errorMessage = 'Cannot connect to authentication server. If you are using Supabase, your project might be paused.'
  }

  if (errorMessage) {
    redirect('/forgot-password?message=' + encodeURIComponent(errorMessage))
  }

  if (isSuccess) {
    redirect('/forgot-password?success=' + encodeURIComponent('Check your email for the password reset link'))
  }
}
