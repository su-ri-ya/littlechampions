import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSchool } from "@/contexts/SchoolContext";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function AddTeacher() {
  const navigate = useNavigate();
  const { addTeacher } = useSchool();
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    experience: "",
    qualification: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTeacher({
      ...formData,
      joinDate: new Date().toISOString().split('T')[0],
      status: "Active",
    });
    toast.success("Teacher added successfully");
    navigate("/teachers");
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate("/teachers")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Teachers
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add New Teacher</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience (years)</Label>
                <Input
                  id="experience"
                  type="number"
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  required
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                />
              </div>
            </div>
            <Button type="submit">Add Teacher</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
