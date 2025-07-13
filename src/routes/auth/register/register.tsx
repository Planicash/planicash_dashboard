import { useState } from 'preact/hooks'
import { Link } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  UserPlus,
  ArrowRight,
} from 'lucide-preact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    console.log('Registration attempt:', formData)
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const passwordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const strength = passwordStrength(formData.password)

  const getPasswordStrengthColor = (level: number) =>
    ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'][level - 1] || 'bg-gray-300'

  const getPasswordStrengthText = (level: number) =>
    ['Weak', 'Fair', 'Good', 'Strong'][level - 1] || ''

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-purple-900">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-300">Join us to manage your finances better</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-black/50 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
              Sign Up
            </CardTitle>
            <div className="flex items-center justify-center space-x-2">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-300 border-purple-200 dark:border-purple-700">
                Free Account
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit as any} className="space-y-4">
              {/* First/Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-200">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onInput={(e) => handleInputChange('firstName', (e.target as HTMLInputElement).value)}
                      className="pl-10 h-12 dark:bg-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-200">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onInput={(e) => handleInputChange('lastName', (e.target as HTMLInputElement).value)}
                    className="h-12 dark:bg-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onInput={(e) => handleInputChange('email', (e.target as HTMLInputElement).value)}
                    className="pl-10 h-12 dark:bg-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-200">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onInput={(e) => handleInputChange('password', (e.target as HTMLInputElement).value)}
                    className="pl-10 pr-10 h-12 dark:bg-gray-900 dark:text-white"
                    required
                  />
                  <Button
                    // type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-8 w-8 p-0"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-gray-400 dark:text-gray-500" /> : <Eye className="h-4 w-4 text-gray-400 dark:text-gray-500" />}
                  </Button>
                </div>
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div key={level} className={`h-2 flex-1 rounded-full ${level <= strength ? getPasswordStrengthColor(strength) : 'bg-gray-200 dark:bg-gray-700'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Password strength: <span className="font-medium">{getPasswordStrengthText(strength)}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-200">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onInput={(e) => handleInputChange('confirmPassword', (e.target as HTMLInputElement).value)}
                    className="pl-10 pr-10 h-12 dark:bg-gray-900 dark:text-white"
                    required
                  />
                  <Button
                    // type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-8 w-8 p-0"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-400 dark:text-gray-500" /> : <Eye className="h-4 w-4 text-gray-400 dark:text-gray-500" />}
                  </Button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-600 dark:text-red-400">Passwords do not match</p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start space-x-2">
                <input
                  id="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => handleInputChange('acceptTerms', (e.target as HTMLInputElement).checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mt-1 dark:bg-gray-800 dark:border-gray-600"
                  required
                />
                <Label htmlFor="acceptTerms" className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  I agree to the{' '}
                  <Link to="/terms" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Submit */}
              <Button
                // type="submit"
                className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Create Account</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Already have an account?{' '}
                <Link to="/auth/login" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
