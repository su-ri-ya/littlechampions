import { useState } from "react";
import { useSchool } from "@/contexts/SchoolContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function MarkAttendance() {
  const { students, classes, markAttendance } = useSchool();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});

  const classStudents = selectedClass 
    ? students.filter(s => s.grade === classes.find(c => c.id === selectedClass)?.grade)
    : [];

  const handleSubmit = () => {
    Object.entries(attendance).forEach(([studentId, isPresent]) => {
      markAttendance({
        studentId,
        classId: selectedClass,
        date: selectedDate,
        status: isPresent ? "Present" : "Absent",
      });
    });
    toast.success("Attendance marked successfully");
    setAttendance({});
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mark Attendance</h1>

      <Card>
        <CardHeader>
          <CardTitle>Select Class and Date</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name} - {cls.grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedClass && (
        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">{student.grade}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={attendance[student.id] || false}
                      onCheckedChange={(checked) => 
                        setAttendance({ ...attendance, [student.id]: checked as boolean })
                      }
                    />
                    <span className="text-sm">Present</span>
                  </div>
                </div>
              ))}
              {classStudents.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No students found for this class
                </p>
              )}
            </div>
            {classStudents.length > 0 && (
              <Button onClick={handleSubmit} className="mt-4 w-full">
                Submit Attendance
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
