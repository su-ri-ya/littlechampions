import { useState } from "react";
import { useSchool } from "@/contexts/SchoolContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, DollarSign, CreditCard } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FeePaymentDialog } from "@/components/FeePaymentDialog";

export default function Fees() {
  const { students, feePayments, feeStructures } = useSchool();
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | undefined>();

  const filteredPayments = feePayments.filter((payment) => {
    const student = students.find((s) => s.id === payment.studentId);
    const searchLower = searchQuery.toLowerCase();
    return (
      student?.name.toLowerCase().includes(searchLower) ||
      student?.grade.toLowerCase().includes(searchLower)
    );
  });

  const getStudentName = (studentId: string) => {
    return students.find((s) => s.id === studentId)?.name || "Unknown";
  };

  const getFeeName = (feeStructureId: string) => {
    return feeStructures.find((f) => f.id === feeStructureId)?.name || "Unknown";
  };

  const totalPending = feePayments.reduce(
    (sum, p) => (p.status === "Pending" || p.status === "Overdue" ? sum + p.remainingAmount : sum),
    0
  );

  const totalCollected = feePayments.reduce((sum, p) => sum + p.paidAmount, 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCollected.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Outstanding fees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feePayments.length}</div>
            <p className="text-xs text-muted-foreground">Fee records</p>
          </CardContent>
        </Card>
      </div>

      {/* Fee Collection Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Fee Collection</CardTitle>
            <Button onClick={() => { setSelectedPayment(undefined); setDialogOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" />
              Collect Fee
            </Button>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by student name or grade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Fee Type</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground">
                    No fee records found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{getStudentName(payment.studentId)}</TableCell>
                    <TableCell>{getFeeName(payment.feeStructureId)}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>${payment.paidAmount}</TableCell>
                    <TableCell>${payment.remainingAmount}</TableCell>
                    <TableCell>{payment.dueDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          payment.status === "Paid"
                            ? "default"
                            : payment.status === "Partial"
                            ? "secondary"
                            : payment.status === "Overdue"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedPayment(payment.id);
                          setDialogOpen(true);
                        }}
                      >
                        Pay
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <FeePaymentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        paymentId={selectedPayment}
      />
    </div>
  );
}
