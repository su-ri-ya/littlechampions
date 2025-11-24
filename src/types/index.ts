export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  dateOfBirth: string;
  address: string;
  parentName: string;
  parentPhone: string;
  enrollmentDate: string;
  status: "Active" | "Inactive";
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  qualification: string;
  experience: string;
  joinDate: string;
  status: "Active" | "Inactive";
}

export interface Class {
  id: string;
  name: string;
  subject: string;
  teacherId: string;
  grade: string;
  room: string;
  schedule: string;
  capacity: number;
  enrolledStudents: string[];
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: "Present" | "Absent" | "Late";
  remarks?: string;
}

export interface FeeStructure {
  id: string;
  name: string;
  grade: string;
  amount: number;
  frequency: "Monthly" | "Quarterly" | "Annually" | "One-time";
  dueDate: string;
  description?: string;
}

export interface FeePayment {
  id: string;
  studentId: string;
  feeStructureId: string;
  amount: number;
  paidAmount: number;
  remainingAmount: number;
  status: "Paid" | "Partial" | "Pending" | "Overdue";
  paymentDate?: string;
  dueDate: string;
  paymentMethod?: "Cash" | "Card" | "Bank Transfer" | "Online";
  transactionId?: string;
  remarks?: string;
}
