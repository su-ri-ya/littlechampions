import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState, useMemo } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useSchool } from "@/contexts/SchoolContext";
import { AttendanceDialog } from "@/components/AttendanceDialog";

export default function Attendance() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const { classes, attendance, students } = useSchool();

  const selectedDateStr = date?.toISOString().split("T")[0] || "";

  const attendanceStats = useMemo(() => {
    const dateRecords = attendance.filter((a) => a.date === selectedDateStr);
    const present = dateRecords.filter((a) => a.status === "Present").length;
    const absent = dateRecords.filter((a) => a.status === "Absent").length;
    const late = dateRecords.filter((a) => a.status === "Late").length;
    const total = present + absent + late;
    const rate = total > 0 ? Math.round((present / total) * 100) : 0;

    return { present, absent, late, total, rate };
  }, [attendance, selectedDateStr]);

  const classAttendance = useMemo(() => {
    return classes.map((classItem) => {
      const classRecords = attendance.filter(
        (a) => a.classId === classItem.id && a.date === selectedDateStr
      );
      const present = classRecords.filter((a) => a.status === "Present").length;
      const absent = classRecords.filter((a) => a.status === "Absent").length;
      const total = classItem.enrolledStudents.length;
      const rate = total > 0 ? Math.round((present / total) * 100) : 0;

      return {
        id: classItem.id,
        name: classItem.name,
        present,
        absent,
        total,
        rate,
      };
    });
  }, [classes, attendance, selectedDateStr]);

  const handleMarkAttendance = (classId: string) => {
    setSelectedClassId(classId);
    setAttendanceDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-heading font-bold text-foreground">Attendance</h2>
        <p className="text-muted-foreground mt-1">Track and manage daily attendance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="font-heading">Select Date</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="gradient-card shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Present</p>
                    <p className="text-3xl font-heading font-bold text-foreground mt-1">{attendanceStats.present}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary text-secondary-foreground">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Absent</p>
                    <p className="text-3xl font-heading font-bold text-foreground mt-1">{attendanceStats.absent}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-destructive text-destructive-foreground">
                    <XCircle className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Rate</p>
                    <p className="text-3xl font-heading font-bold text-foreground mt-1">{attendanceStats.rate}%</p>
                  </div>
                  <div className="p-3 rounded-xl bg-primary text-primary-foreground">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Class-wise Attendance */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="font-heading">Today's Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classAttendance.map((item) => (
                  <div key={item.id} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-foreground">{item.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-secondary">{item.rate}%</span>
                        <Button size="sm" variant="outline" onClick={() => handleMarkAttendance(item.id)}>
                          Mark
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary" />
                        <span className="text-muted-foreground">
                          Present: <span className="font-medium text-foreground">{item.present}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-destructive" />
                        <span className="text-muted-foreground">
                          Absent: <span className="font-medium text-foreground">{item.absent}</span>
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-secondary rounded-full h-2 transition-all"
                          style={{ width: `${item.rate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AttendanceDialog
        open={attendanceDialogOpen}
        onOpenChange={setAttendanceDialogOpen}
        classId={selectedClassId}
        date={selectedDateStr}
      />
    </div>
  );
}
