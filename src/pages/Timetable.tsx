import { useSchool } from "@/contexts/SchoolContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Timetable() {
  const { classes, teachers } = useSchool();

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
  ];

  const getTeacherName = (teacherId: string) => {
    return teachers.find(t => t.id === teacherId)?.name || "Unknown";
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Class Timetable</h1>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-border p-2 bg-muted">Time</th>
                  {days.map(day => (
                    <th key={day} className="border border-border p-2 bg-muted">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, idx) => (
                  <tr key={slot}>
                    <td className="border border-border p-2 font-medium text-sm">{slot}</td>
                    {days.map((day, dayIdx) => {
                      const classItem = classes[((idx + dayIdx) * 3) % classes.length];
                      return (
                        <td key={day} className="border border-border p-2">
                          {classItem && (
                            <div className="space-y-1">
                              <div className="font-medium text-sm">{classItem.name}</div>
                              <Badge variant="outline" className="text-xs">
                                {classItem.subject}
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                {getTeacherName(classItem.teacherId)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Room {classItem.room}
                              </div>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
