import { useSchool } from "@/contexts/SchoolContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingDown, TrendingUp } from "lucide-react";

export default function AttendanceReports() {
  const { attendance, students } = useSchool();

  const studentAttendance = students.map(student => {
    const studentRecords = attendance.filter(a => a.studentId === student.id);
    const present = studentRecords.filter(a => a.status === "Present").length;
    const total = studentRecords.length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return {
      ...student,
      present,
      total,
      percentage,
    };
  }).sort((a, b) => b.percentage - a.percentage);

  const averageAttendance = studentAttendance.length > 0
    ? Math.round(studentAttendance.reduce((sum, s) => sum + s.percentage, 0) / studentAttendance.length)
    : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Attendance Reports</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageAttendance}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {studentAttendance.filter(s => s.percentage >= 90).length}
            </div>
            <p className="text-xs text-muted-foreground">Students ≥90%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Attendance</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {studentAttendance.filter(s => s.percentage < 75).length}
            </div>
            <p className="text-xs text-muted-foreground">Students &lt;75%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student-wise Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentAttendance.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{student.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {student.grade} • {student.present}/{student.total} days
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold">{student.percentage}%</div>
                  </div>
                  <Badge 
                    variant={student.percentage >= 90 ? "default" : student.percentage >= 75 ? "secondary" : "destructive"}
                  >
                    {student.percentage >= 90 ? "Excellent" : student.percentage >= 75 ? "Good" : "Poor"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
