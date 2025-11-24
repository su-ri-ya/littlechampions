import { useSchool } from "@/contexts/SchoolContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function TeacherPerformance() {
  const { teachers, classes } = useSchool();

  const teacherStats = teachers.map(teacher => {
    const teacherClasses = classes.filter(c => c.teacherId === teacher.id);
    const totalStudents = teacherClasses.reduce((sum, c) => sum + c.enrolledStudents.length, 0);
    
    return {
      ...teacher,
      classCount: teacherClasses.length,
      studentCount: totalStudents,
      performance: Math.floor(Math.random() * 30) + 70, // Mock performance score
    };
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Teacher Performance</h1>

      <div className="grid gap-4">
        {teacherStats.map((teacher) => (
          <Card key={teacher.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">
                      {teacher.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{teacher.name}</h3>
                    <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span>{teacher.classCount} Classes</span>
                      <span>{teacher.studentCount} Students</span>
                      <span>{teacher.experience} Years Experience</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{teacher.performance}%</div>
                  <Badge variant={teacher.performance >= 85 ? "default" : "secondary"}>
                    {teacher.performance >= 85 ? "Excellent" : "Good"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
