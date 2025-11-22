import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Mail, Edit, Trash2 } from "lucide-react";
import { useSchool } from "@/contexts/SchoolContext";
import { TeacherFormDialog } from "@/components/TeacherFormDialog";
import { Teacher } from "@/types";
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

export default function Teachers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTeacher, setEditTeacher] = useState<Teacher | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState<string | null>(null);
  const { teachers, deleteTeacher, classes } = useSchool();

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTeacherClasses = (teacherId: string) => {
    return classes.filter((c) => c.teacherId === teacherId).length;
  };

  const handleAddClick = () => {
    setEditTeacher(undefined);
    setDialogOpen(true);
  };

  const handleEditClick = (teacher: Teacher) => {
    setEditTeacher(teacher);
    setDialogOpen(true);
  };

  const handleDeleteClick = (teacherId: string) => {
    setTeacherToDelete(teacherId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (teacherToDelete) {
      deleteTeacher(teacherToDelete);
      toast({
        title: "Success",
        description: "Teacher deleted successfully",
      });
    }
    setDeleteDialogOpen(false);
    setTeacherToDelete(null);
  };

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
        <Button onClick={handleAddClick} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
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
                  <span className="font-medium text-foreground">{getTeacherClasses(teacher.id)} Classes</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground pt-2">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{teacher.email}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEditClick(teacher)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteClick(teacher.id)}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <TeacherFormDialog open={dialogOpen} onOpenChange={setDialogOpen} teacher={editTeacher} />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the teacher record.
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
