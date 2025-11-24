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
  name: z.string().min(1, "Fee name is required"),
  grade: z.string().min(1, "Grade is required"),
  amount: z.string().min(1, "Amount is required"),
  frequency: z.enum(["Monthly", "Quarterly", "Annually", "One-time"]),
  dueDate: z.string().min(1, "Due date is required"),
  description: z.string().optional(),
});

interface FeeStructureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  structureId?: string;
}

export function FeeStructureDialog({
  open,
  onOpenChange,
  structureId,
}: FeeStructureDialogProps) {
  const { feeStructures, addFeeStructure, updateFeeStructure } = useSchool();
  const structure = feeStructures.find((s) => s.id === structureId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      grade: "",
      amount: "",
      frequency: "Monthly",
      dueDate: "",
      description: "",
    },
  });

  useEffect(() => {
    if (structure) {
      form.reset({
        name: structure.name,
        grade: structure.grade,
        amount: structure.amount.toString(),
        frequency: structure.frequency,
        dueDate: structure.dueDate,
        description: structure.description || "",
      });
    } else {
      form.reset({
        name: "",
        grade: "",
        amount: "",
        frequency: "Monthly",
        dueDate: "",
        description: "",
      });
    }
  }, [structure, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const structureData = {
      name: data.name,
      grade: data.grade,
      amount: parseFloat(data.amount),
      frequency: data.frequency,
      dueDate: data.dueDate,
      description: data.description,
    } as const;

    if (structureId) {
      updateFeeStructure(structureId, structureData);
      toast.success("Fee structure updated successfully");
    } else {
      addFeeStructure(structureData);
      toast.success("Fee structure added successfully");
    }

    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{structureId ? "Edit Fee Structure" : "Add Fee Structure"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fee Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Tuition Fee" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Grade 10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                      <SelectItem value="Annually">Annually</SelectItem>
                      <SelectItem value="One-time">One-time</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add fee description" {...field} />
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
                {structureId ? "Update" : "Add"} Fee Structure
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
