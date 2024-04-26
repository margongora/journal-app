'use client'
import { Button } from "./ui/button"
import { signIn } from 'next-auth/react'

export function SignIn() {
  return (
    <Button onClick={() => {
      signIn('github');
    }}>Sign In With Github</Button>
  )
} 