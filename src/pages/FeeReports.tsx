import { useSchool } from "@/contexts/SchoolContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users } from "lucide-react";

export default function FeeReports() {
  const { feePayments, students } = useSchool();

  const totalCollected = feePayments
    .filter(p => p.status === "Paid")
    .reduce((sum, p) => sum + p.paidAmount, 0);

  const totalPending = feePayments
    .filter(p => p.status === "Pending" || p.status === "Partial")
    .reduce((sum, p) => sum + p.remainingAmount, 0);

  const paidStudents = new Set(feePayments.filter(p => p.status === "Paid").map(p => p.studentId)).size;

  const gradeWiseFees = feePayments.reduce((acc, payment) => {
    const student = students.find(s => s.id === payment.studentId);
    if (student) {
      if (!acc[student.grade]) {
        acc[student.grade] = { collected: 0, pending: 0 };
      }
      if (payment.status === "Paid") {
        acc[student.grade].collected += payment.paidAmount;
      } else {
        acc[student.grade].pending += payment.remainingAmount;
      }
    }
    return acc;
  }, {} as Record<string, { collected: number; pending: number }>);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Fee Reports</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCollected.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPending.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Paid</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paidStudents}</div>
            <p className="text-xs text-muted-foreground">of {students.length} students</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grade-wise Fee Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(gradeWiseFees).map(([grade, fees]) => (
              <div key={grade} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{grade}</span>
                  <div className="text-sm text-muted-foreground">
                    Collected: ${fees.collected} | Pending: ${fees.pending}
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ 
                      width: `${(fees.collected / (fees.collected + fees.pending)) * 100}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
