import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Clock, Edit, Trash2, ClipboardCheck } from "lucide-react";
import { useSchool } from "@/contexts/SchoolContext";
import { ClassFormDialog } from "@/components/ClassFormDialog";
import { AttendanceDialog } from "@/components/AttendanceDialog";
import { Class } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

export default function Classes() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editClass, setEditClass] = useState<Class | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<string | null>(null);
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const { classes, teachers, deleteClass } = useSchool();

  const getTeacherName = (teacherId: string) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    return teacher?.name || "Unknown";
  };

  const handleAddClick = () => {
    setEditClass(undefined);
    setDialogOpen(true);
  };

  const handleEditClick = (classData: Class) => {
    setEditClass(classData);
    setDialogOpen(true);
  };

  const handleDeleteClick = (classId: string) => {
    setClassToDelete(classId);
    setDeleteDialogOpen(true);
  };

  const handleAttendanceClick = (classId: string) => {
    setSelectedClassId(classId);
    setAttendanceDialogOpen(true);
  };

  const confirmDelete = () => {
    if (classToDelete) {
      deleteClass(classToDelete);
      toast({
        title: "Success",
        description: "Class deleted successfully",
      });
    }
    setDeleteDialogOpen(false);
    setClassToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-heading font-bold text-foreground">Classes</h2>
          <p className="text-muted-foreground mt-1">Manage all active classes and schedules</p>
        </div>
        <Button onClick={handleAddClick} className="bg-accent text-accent-foreground hover:bg-accent/90">
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
                  <p className="text-sm text-muted-foreground">{getTeacherName(classItem.teacherId)}</p>
                </div>
                <div className="px-3 py-1 rounded-lg text-sm font-medium bg-primary text-primary-foreground">
                  {classItem.room}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{classItem.enrolledStudents.length}/{classItem.capacity} Students</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{classItem.schedule.split(" - ")[1] || classItem.schedule}</span>
                </div>
              </div>
              
              <div className="pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Schedule</p>
                <p className="text-sm font-medium text-foreground">{classItem.schedule}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => handleAttendanceClick(classItem.id)}>
                  <ClipboardCheck className="w-4 h-4 mr-1" />
                  Attendance
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleEditClick(classItem)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteClick(classItem.id)}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ClassFormDialog open={dialogOpen} onOpenChange={setDialogOpen} classData={editClass} />

      <AttendanceDialog
        open={attendanceDialogOpen}
        onOpenChange={setAttendanceDialogOpen}
        classId={selectedClassId}
        date={new Date().toISOString().split("T")[0]}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the class.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
