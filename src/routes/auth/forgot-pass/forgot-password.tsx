import { useState } from 'preact/hooks'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, Send } from 'lucide-preact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setIsEmailSent(true)
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-green-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-black/50 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mx-auto">
                <Send className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                Check Your Email
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <div className="space-y-3 pt-4">
                <Button onClick={() => setIsEmailSent(false)} className="w-full bg-green-600 hover:bg-green-700">
                  Try Different Email
                </Button>
                <Link to="/auth/login">
                  <Button variant="outline" className=" my-4 w-full bg-transparent text-gray-700 dark:text-white border-green-600 hover:border-green-700 hover:bg-green-700">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-950 dark:to-red-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full mb-4">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password?</h1>
          <p className="text-gray-600 dark:text-gray-300">
            No worries, we'll send you reset instructions
          </p>
        </div>

        {/* Card */}
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-black/50 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
              Reset Password
            </CardTitle>
            <div className="flex items-center justify-center space-x-2">
              <Badge variant="outline" className="bg-orange-50 text-orange-700 dark:bg-orange-900 dark:text-orange-300 border-orange-200 dark:border-orange-700">
                Secure Reset
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit as any} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                    className="pl-10 h-12 dark:bg-gray-900 dark:text-white"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Enter the email address associated with your account
                </p>
              </div>

              <Button
                // type="submit"
                className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white dark:bg-orange-500 dark:hover:bg-orange-600"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Send Reset Link</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center pt-4">
              <Link
                to="/auth/login"
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
