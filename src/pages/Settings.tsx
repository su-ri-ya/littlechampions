import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-3xl font-heading font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your school management system preferences</p>
      </div>

      {/* School Information */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-heading">School Information</CardTitle>
          <CardDescription>Update your school's basic information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="school-name">School Name</Label>
            <Input id="school-name" defaultValue="EduManage Academy" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="admin@edumanage.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" defaultValue="+1 234 567 8900" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" defaultValue="123 Education Street, Academic City" />
          </div>
          <Button className="bg-primary text-primary-foreground">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-heading">Notifications</CardTitle>
          <CardDescription>Configure notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive email updates about activities</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Attendance Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified about low attendance</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New Enrollment</Label>
              <p className="text-sm text-muted-foreground">Alerts for new student enrollments</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Academic Settings */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-heading">Academic Settings</CardTitle>
          <CardDescription>Configure academic year and grading system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="academic-year">Academic Year</Label>
              <Input id="academic-year" defaultValue="2024-2025" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grading-system">Grading System</Label>
              <Input id="grading-system" defaultValue="Letter Grade (A-F)" />
            </div>
          </div>
          <Button className="bg-primary text-primary-foreground">Update Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
