import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="title">Settings</h1>
                <p className="text-gray-600">Manage your application preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                <Card>
                    <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currency">Default Currency</Label>
                            <Select defaultValue="usd">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="usd">USD ($)</SelectItem>
                                    <SelectItem value="eur">EUR (€)</SelectItem>
                                    <SelectItem value="gbp">GBP (£)</SelectItem>
                                    <SelectItem value="jpy">JPY (¥)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Select defaultValue="en">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="es">Español</SelectItem>
                                    <SelectItem value="fr">Français</SelectItem>
                                    <SelectItem value="de">Deutsch</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="timezone">Timezone</Label>
                            <Select defaultValue="utc">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select timezone" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="utc">UTC</SelectItem>
                                    <SelectItem value="est">EST</SelectItem>
                                    <SelectItem value="pst">PST</SelectItem>
                                    <SelectItem value="cet">CET</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Email Notifications</Label>
                                <p className="text-sm text-gray-600">Receive email updates</p>
                            </div>
                            <Switch  />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Transaction Alerts</Label>
                                <p className="text-sm text-gray-600">Get notified of new transactions</p>
                            </div>
                            <Switch  />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Monthly Reports</Label>
                                <p className="text-sm text-gray-600">Receive monthly financial reports</p>
                            </div>
                            <Switch  />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Goal Reminders</Label>
                                <p className="text-sm text-gray-600">Reminders for savings goals</p>
                            </div>
                            <Switch  />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Two-Factor Authentication</Label>
                                <p className="text-sm text-gray-600">Add an extra layer of security</p>
                            </div>
                            <Switch  />
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <Label>Session Timeout</Label>
                            <Select defaultValue="30">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select timeout" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="15">15 minutes</SelectItem>
                                    <SelectItem value="30">30 minutes</SelectItem>
                                    <SelectItem value="60">1 hour</SelectItem>
                                    <SelectItem value="120">2 hours</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button variant="outline" className="w-full bg-transparent">
                            Change Password
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Data & Privacy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Data Analytics</Label>
                                <p className="text-sm text-gray-600">Help improve our service</p>
                            </div>
                            <Switch  />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Marketing Communications</Label>
                                <p className="text-sm text-gray-600">Receive product updates</p>
                            </div>
                            <Switch  />
                        </div>

                        <Separator />

                        <div className="space-y-2">

                            <Button variant="outline" className="w-full bg-transparent">
                                Export Data
                            </Button>
                            <Button variant="destructive" className="w-full">
                                Delete Account
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end space-x-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
            </div>
        </div>
    )
}
