import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, BookOpen, TrendingUp } from "lucide-react";
import { useSchool } from "@/contexts/SchoolContext";
import { useMemo } from "react";

export default function Dashboard() {
  const { students, teachers, classes, attendance } = useSchool();

  const attendanceRate = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const todayRecords = attendance.filter((a) => a.date === today);
    const present = todayRecords.filter((a) => a.status === "Present").length;
    const total = todayRecords.length;
    return total > 0 ? Math.round((present / total) * 100) : 0;
  }, [attendance]);

  const stats = [
    {
      title: "Total Students",
      value: students.length.toString(),
      icon: Users,
      color: "primary" as const,
    },
    {
      title: "Total Teachers",
      value: teachers.length.toString(),
      icon: GraduationCap,
      color: "secondary" as const,
    },
    {
      title: "Active Classes",
      value: classes.length.toString(),
      icon: BookOpen,
      color: "accent" as const,
    },
    {
      title: "Attendance Rate",
      value: `${attendanceRate}%`,
      icon: TrendingUp,
      color: "primary" as const,
    },
  ];

  const recentActivities = [
    { id: 1, action: "New student enrolled", student: "Sarah Johnson", time: "2 hours ago" },
    { id: 2, action: "Attendance marked", class: "Grade 10-A", time: "3 hours ago" },
    { id: 3, action: "Teacher assigned", teacher: "Dr. Michael Chen", time: "5 hours ago" },
    { id: 4, action: "Class schedule updated", class: "Mathematics", time: "1 day ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activities */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-heading">Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.student || activity.teacher || activity.class}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="gradient-card shadow-md hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">Add Student</h3>
                <p className="text-sm text-muted-foreground">Register new student</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-md hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-secondary text-secondary-foreground">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">Add Teacher</h3>
                <p className="text-sm text-muted-foreground">Register new teacher</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-md hover:shadow-lg transition-all cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-accent text-accent-foreground">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">Add Class</h3>
                <p className="text-sm text-muted-foreground">Create new class</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
