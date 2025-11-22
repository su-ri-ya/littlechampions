import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function Attendance() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const attendanceData = [
    { class: "Mathematics - Grade 10", present: 28, absent: 4, total: 32, rate: 88 },
    { class: "Physics - Grade 11", present: 26, absent: 2, total: 28, rate: 93 },
    { class: "English - Grade 9", present: 32, absent: 3, total: 35, rate: 91 },
    { class: "Chemistry - Grade 10", present: 27, absent: 3, total: 30, rate: 90 },
  ];

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
                    <p className="text-3xl font-heading font-bold text-foreground mt-1">113</p>
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
                    <p className="text-3xl font-heading font-bold text-foreground mt-1">12</p>
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
                    <p className="text-3xl font-heading font-bold text-foreground mt-1">90%</p>
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
                {attendanceData.map((item, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-foreground">{item.class}</h4>
                      <span className="text-sm font-semibold text-secondary">{item.rate}%</span>
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
    </div>
  );
}
