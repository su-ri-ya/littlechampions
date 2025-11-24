import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSchool } from "@/contexts/SchoolContext";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function AddStudent() {
  const navigate = useNavigate();
  const { addStudent } = useSchool();
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    email: "",
    phone: "",
    address: "",
    parentName: "",
    parentPhone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStudent({
      ...formData,
      dateOfBirth: new Date().toISOString().split('T')[0],
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: "Active",
    });
    toast.success("Student added successfully");
    navigate("/students");
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate("/students")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Students
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add New Student</CardTitle>
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
                <Label htmlFor="grade">Grade</Label>
                <Input
                  id="grade"
                  required
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
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
              <div className="space-y-2 col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentName">Parent Name</Label>
                <Input
                  id="parentName"
                  required
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentPhone">Parent Phone</Label>
                <Input
                  id="parentPhone"
                  required
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                />
              </div>
            </div>
            <Button type="submit">Add Student</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
