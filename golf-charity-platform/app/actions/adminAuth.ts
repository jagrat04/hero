"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignJWT } from 'jose'

export async function loginAdmin(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  if (
    email === process.env.ADMIN_EMAIL && 
    password === process.env.ADMIN_PASSWORD
  ) {
    // Create a secure token
    const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET)
    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('8h')
      .sign(secret)

    // THE FIX: Await the cookies() function before calling .set()
    const cookieStore = await cookies()
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    })

    redirect('/admin')
  }

  return { error: "Invalid admin credentials." }
}