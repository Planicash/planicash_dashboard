import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Camera, Mail, Phone, MapPin, Calendar } from "lucide-preact"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)


  return (
    <div className="space-y-6">
      <div>
        <h1 className="title">Profile</h1>
        <p className="text-gray-600">Manage your personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 ">
          <CardHeader>
            <CardTitle >Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage src="/placeholder.svg?height=128&width=128" />
                <AvatarFallback className="text-2xl subtitle">JD</AvatarFallback>
              </Avatar>
              <Button size="sm" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center">
              <h3 className="subtitle">John Doe</h3>
              <p className="text-gray-600">Premium Member</p>
              <Badge className="mt-2 bg-gold-100 text-gold-800 ">Gold</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Personal Information</CardTitle>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input className="flex-1 bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"
                  id="firstName" defaultValue="John" disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input className="flex-1 bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"
                  id="lastName" defaultValue="Doe" disabled={!isEditing} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@example.com"
                  disabled={!isEditing}
                  className="flex-1 bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"

                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <Input className="flex-1 bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700" id="phone" defaultValue="+1 (555) 123-4567" disabled={!isEditing} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-3" />
                <Textarea
                  id="address"
                  defaultValue="123 Main Street, Anytown, ST 12345"
                  disabled={!isEditing}
                  className="flex-1 bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"

                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthdate">Date of Birth</Label>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <Input id="birthdate" type="date" defaultValue="1990-01-15" disabled={!isEditing} className="flex-1 bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                className="flex-1 bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-400 dark:border-slate-700"

                id="bio"
                placeholder="Tell us about yourself..."
                defaultValue="Financial enthusiast with a passion for smart money management and investment strategies."
                disabled={!isEditing}
              />
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-sm text-gray-600">Member Since:</Label>
              <span className="font-semibold  text-slate-900 transition-colors dark:text-slate-50">January 2024</span>
            </div>
            <div className="flex justify-between items-center">
              <Label className="text-sm text-gray-600">Total Transactions:</Label>
              <span className="font-semibold  text-slate-900 transition-colors dark:text-slate-50">247</span>
            </div>
            <div className="flex justify-between items-center">
              <Label className="text-sm text-gray-600 ">Active Goals:</Label>
              <span className="font-semibold  text-slate-900 transition-colors dark:text-slate-50">3</span>
            </div>
            <div className="flex justify-between items-center">
              <Label className="text-sm text-gray-600">Last Login:</Label>
              <span className="font-semibold  text-slate-900 transition-colors dark:text-slate-50">Today, 2:30 PM</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-sm text-gray-600">Theme:</Label>
              <Badge variant="outline" className=" text-slate-900 transition-colors dark:text-slate-50">Light</Badge>
            </div>

            <div className="flex justify-between items-center">
              <Label className="text-sm text-gray-600">Language:</Label>
              <Badge variant="outline" className=" text-slate-900 transition-colors dark:text-slate-50">English</Badge>
            </div>
            <div className="flex justify-between items-center">
              <Label className="text-sm text-gray-600">Notifications:</Label>
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                Enabled
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
