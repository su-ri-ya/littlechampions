import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSchool } from "@/contexts/SchoolContext";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AttendanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: string;
  date: string;
}

export function AttendanceDialog({ open, onOpenChange, classId, date }: AttendanceDialogProps) {
  const { classes, students, markAttendance } = useSchool();
  const classData = classes.find((c) => c.id === classId);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, "Present" | "Absent" | "Late">>(
    {}
  );

  if (!classData) return null;

  const enrolledStudents = students.filter((s) => classData.enrolledStudents.includes(s.id));

  const handleMark = (studentId: string, status: "Present" | "Absent" | "Late") => {
    setAttendanceMap((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = () => {
    Object.entries(attendanceMap).forEach(([studentId, status]) => {
      markAttendance({
        studentId,
        classId,
        date,
        status,
      });
    });

    toast({
      title: "Success",
      description: "Attendance marked successfully",
    });

    onOpenChange(false);
    setAttendanceMap({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Mark Attendance - {classData.name}</DialogTitle>
          <DialogDescription>Date: {date}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {enrolledStudents.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No students enrolled in this class</p>
          ) : (
            enrolledStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-card"
              >
                <div>
                  <p className="font-medium text-foreground">{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.grade}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={attendanceMap[student.id] === "Present" ? "default" : "outline"}
                    onClick={() => handleMark(student.id, "Present")}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Present
                  </Button>
                  <Button
                    size="sm"
                    variant={attendanceMap[student.id] === "Late" ? "default" : "outline"}
                    onClick={() => handleMark(student.id, "Late")}
                  >
                    <Clock className="w-4 h-4 mr-1" />
                    Late
                  </Button>
                  <Button
                    size="sm"
                    variant={attendanceMap[student.id] === "Absent" ? "destructive" : "outline"}
                    onClick={() => handleMark(student.id, "Absent")}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Absent
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={Object.keys(attendanceMap).length === 0 || enrolledStudents.length === 0}
          >
            Submit Attendance
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
