'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { login } from '@/app/actions/auth'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function handleGoogleSignIn() {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await login(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your student dashboard
          </CardDescription>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-200">
                {error}
              </div>
            )}
            
            <Button variant="outline" type="button" className="w-full flex items-center justify-center space-x-2" onClick={handleGoogleSignIn} disabled={loading}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.8 15.71 17.58V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.58C14.73 18.24 13.48 18.64 12 18.64C9.14 18.64 6.71 16.71 5.84 14.14H2.15V16.99C3.96 20.6 7.69 23 12 23Z" fill="#34A853"/>
                <path d="M5.84 14.14C5.62 13.48 5.5 12.76 5.5 12C5.5 11.24 5.62 10.52 5.84 9.86V7.01H2.15C1.41 8.49 1 10.19 1 12C1 13.81 1.41 15.51 2.15 16.99L5.84 14.14Z" fill="#FBBC05"/>
                <path d="M12 5.36C13.62 5.36 15.07 5.92 16.21 7.01L19.36 3.86C17.45 2.08 14.97 1 12 1C7.69 1 3.96 3.4 2.15 7.01L5.84 9.86C6.71 7.29 9.14 5.36 12 5.36Z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
            <div className="text-center text-sm text-slate-500">
              Don't have an account?{' '}
              <Link href="/register" className="font-semibold text-blue-600 hover:underline">
                Register here
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
