import { supabase } from './supabase.js'

import { supabaseMainUser } from './format.js'

export const getAuthenticationStatus = async () => {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error(error)
    return { data: null, error }
  }

  return { data, error }
}

export const removeUserSession = async () => { 
  await supabase.auth.signOut() 
}

export const sendPhoneNumberVerification = async ({ phone }) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    phone: phone,
  })

  if (error) {
    console.error(error)
    return error
  }

  return { data, error }
}

export const verifyPhoneNumberWithOTP = async ({ phone, token }) => {
  const { data, error } = await supabase.auth.verifyOtp({ 
    phone: phone,
    token: token,
    type: 'sms'
  })

  if (error) {
    console.error(error)
    return { data: null, error }
  }

  return { data, error }
}

export const getUserInformationFromUUID = async ({ uuid }) => {
  const { data, error } = await supabase
    .from('user')
    .select(supabaseMainUser)
    .eq('uui', uuid)
    .single()

  if (error) {
    console.error(error)
    return { data: null, error }
  }

  return { data, error }
}