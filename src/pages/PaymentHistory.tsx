import { useSchool } from "@/contexts/SchoolContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PaymentHistory() {
  const { feePayments, students, feeStructures } = useSchool();

  const getStudentName = (studentId: string) => {
    return students.find(s => s.id === studentId)?.name || "Unknown";
  };

  const getFeeType = (feeStructureId: string) => {
    return feeStructures.find(f => f.id === feeStructureId)?.name || "Unknown";
  };

  const sortedPayments = [...feePayments].sort((a, b) => {
    const dateA = a.paymentDate ? new Date(a.paymentDate).getTime() : 0;
    const dateB = b.paymentDate ? new Date(b.paymentDate).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Payment History</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Fee Type</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Transaction ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground">
                    No payment history found
                  </TableCell>
                </TableRow>
              ) : (
                sortedPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.paymentDate || payment.dueDate}</TableCell>
                    <TableCell className="font-medium">
                      {getStudentName(payment.studentId)}
                    </TableCell>
                    <TableCell>{getFeeType(payment.feeStructureId)}</TableCell>
                    <TableCell>${payment.paidAmount}</TableCell>
                    <TableCell>${payment.remainingAmount}</TableCell>
                    <TableCell className="capitalize">{payment.paymentMethod || "-"}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={payment.status === "Paid" ? "default" : payment.status === "Partial" ? "secondary" : "destructive"}
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {payment.transactionId && (
                        <span className="text-sm text-muted-foreground">
                          {payment.transactionId}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
