import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Clock } from "lucide-react";

export default function Classes() {
  const classes = [
    {
      id: 1,
      name: "Mathematics - Grade 10",
      teacher: "Dr. Sarah Johnson",
      students: 32,
      schedule: "Mon, Wed, Fri - 9:00 AM",
      room: "Room 201",
      color: "primary",
    },
    {
      id: 2,
      name: "Physics - Grade 11",
      teacher: "Prof. Michael Chen",
      students: 28,
      schedule: "Tue, Thu - 10:30 AM",
      room: "Lab 102",
      color: "secondary",
    },
    {
      id: 3,
      name: "English Literature - Grade 9",
      teacher: "Dr. Emily Brown",
      students: 35,
      schedule: "Mon, Wed - 2:00 PM",
      room: "Room 105",
      color: "accent",
    },
    {
      id: 4,
      name: "Chemistry - Grade 10",
      teacher: "Mr. David Martinez",
      students: 30,
      schedule: "Tue, Thu, Fri - 11:00 AM",
      room: "Lab 201",
      color: "primary",
    },
  ];

  const colorClasses = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-heading font-bold text-foreground">Classes</h2>
          <p className="text-muted-foreground mt-1">Manage all active classes and schedules</p>
        </div>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="w-4 h-4 mr-2" />
          New Class
        </Button>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="gradient-card shadow-md hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="font-heading text-xl mb-2">{classItem.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{classItem.teacher}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    colorClasses[classItem.color as keyof typeof colorClasses]
                  }`}
                >
                  {classItem.room}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{classItem.students} Students</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{classItem.schedule.split(" - ")[1]}</span>
                </div>
              </div>
              
              <div className="pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Schedule</p>
                <p className="text-sm font-medium text-foreground">{classItem.schedule}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Attendance
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
