import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Mail, BookOpen } from "lucide-react";

export default function Teachers() {
  const [searchQuery, setSearchQuery] = useState("");

  const teachers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      subject: "Mathematics",
      email: "sarah.j@school.com",
      classes: "4 Classes",
      experience: "10 years",
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      subject: "Physics",
      email: "michael.c@school.com",
      classes: "3 Classes",
      experience: "8 years",
    },
    {
      id: 3,
      name: "Dr. Emily Brown",
      subject: "English Literature",
      email: "emily.b@school.com",
      classes: "5 Classes",
      experience: "12 years",
    },
    {
      id: 4,
      name: "Mr. David Martinez",
      subject: "Chemistry",
      email: "david.m@school.com",
      classes: "3 Classes",
      experience: "6 years",
    },
  ];

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search teachers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Teacher
        </Button>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="gradient-card shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-heading font-semibold text-xl">
                  {teacher.name.split(" ").slice(-1)[0].split(".")[0][0]}
                  {teacher.name.split(" ").slice(-1)[0][0]}
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-foreground">{teacher.name}</h3>
                  <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium text-foreground">{teacher.experience}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Classes</span>
                  <span className="font-medium text-foreground">{teacher.classes}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground pt-2">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{teacher.email}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Schedule
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
