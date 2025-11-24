import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSchool } from "@/contexts/SchoolContext";
import { toast } from "sonner";

const formSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  feeStructureId: z.string().min(1, "Fee type is required"),
  paidAmount: z.string().min(1, "Amount is required"),
  paymentMethod: z.enum(["Cash", "Card", "Bank Transfer", "Online"]),
  transactionId: z.string().optional(),
  remarks: z.string().optional(),
});

interface FeePaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentId?: string;
}

export function FeePaymentDialog({
  open,
  onOpenChange,
  paymentId,
}: FeePaymentDialogProps) {
  const { students, feeStructures, feePayments, addFeePayment, updateFeePayment } = useSchool();
  const payment = feePayments.find((p) => p.id === paymentId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      feeStructureId: "",
      paidAmount: "",
      paymentMethod: "Cash",
      transactionId: "",
      remarks: "",
    },
  });

  useEffect(() => {
    if (payment) {
      form.reset({
        studentId: payment.studentId,
        feeStructureId: payment.feeStructureId,
        paidAmount: payment.paidAmount.toString(),
        paymentMethod: payment.paymentMethod || "Cash",
        transactionId: payment.transactionId || "",
        remarks: payment.remarks || "",
      });
    } else {
      form.reset({
        studentId: "",
        feeStructureId: "",
        paidAmount: "",
        paymentMethod: "Cash",
        transactionId: "",
        remarks: "",
      });
    }
  }, [payment, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const feeStructure = feeStructures.find((f) => f.id === data.feeStructureId);
    if (!feeStructure) return;

    const paidAmount = parseFloat(data.paidAmount);
    const totalAmount = feeStructure.amount;
    const remainingAmount = Math.max(0, totalAmount - paidAmount);
    
    let status: "Paid" | "Partial" | "Pending" | "Overdue" = "Pending";
    if (paidAmount >= totalAmount) {
      status = "Paid";
    } else if (paidAmount > 0) {
      status = "Partial";
    }

    const paymentData = {
      studentId: data.studentId,
      feeStructureId: data.feeStructureId,
      amount: totalAmount,
      paidAmount,
      remainingAmount,
      status,
      paymentDate: new Date().toISOString().split("T")[0],
      dueDate: feeStructure.dueDate,
      paymentMethod: data.paymentMethod,
      transactionId: data.transactionId,
      remarks: data.remarks,
    } as const;

    if (paymentId) {
      updateFeePayment(paymentId, paymentData);
      toast.success("Payment updated successfully");
    } else {
      addFeePayment(paymentData);
      toast.success("Payment recorded successfully");
    }

    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{paymentId ? "Update Payment" : "Collect Fee"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} - {student.grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feeStructureId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fee Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fee type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {feeStructures.map((structure) => (
                        <SelectItem key={structure.id} value={structure.id}>
                          {structure.name} - ${structure.amount} ({structure.frequency})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paidAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount Paid</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Card">Card</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="Online">Online</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transactionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction ID (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter transaction ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add any additional notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {paymentId ? "Update Payment" : "Record Payment"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
