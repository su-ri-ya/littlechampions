import { createContext, useContext, useState, ReactNode } from "react";
import { Student, Teacher, Class, AttendanceRecord } from "@/types";

interface SchoolContextType {
  students: Student[];
  teachers: Teacher[];
  classes: Class[];
  attendance: AttendanceRecord[];
  addStudent: (student: Omit<Student, "id">) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  addTeacher: (teacher: Omit<Teacher, "id">) => void;
  updateTeacher: (id: string, teacher: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  addClass: (classData: Omit<Class, "id">) => void;
  updateClass: (id: string, classData: Partial<Class>) => void;
  deleteClass: (id: string) => void;
  markAttendance: (attendance: Omit<AttendanceRecord, "id">) => void;
  getAttendanceByDate: (date: string) => AttendanceRecord[];
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

// Initial mock data
const initialStudents: Student[] = [
  {
    id: "1",
    name: "Emma Wilson",
    email: "emma.w@student.com",
    phone: "+1 234 567 8901",
    grade: "Grade 10",
    dateOfBirth: "2008-05-15",
    address: "123 Main St, City",
    parentName: "John Wilson",
    parentPhone: "+1 234 567 8900",
    enrollmentDate: "2023-09-01",
    status: "Active",
  },
  {
    id: "2",
    name: "James Smith",
    email: "james.s@student.com",
    phone: "+1 234 567 8902",
    grade: "Grade 9",
    dateOfBirth: "2009-08-22",
    address: "456 Oak Ave, City",
    parentName: "Mary Smith",
    parentPhone: "+1 234 567 8903",
    enrollmentDate: "2023-09-01",
    status: "Active",
  },
];

const initialTeachers: Teacher[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.j@school.com",
    phone: "+1 234 567 9001",
    subject: "Mathematics",
    qualification: "PhD in Mathematics",
    experience: "10 years",
    joinDate: "2014-08-15",
    status: "Active",
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    email: "michael.c@school.com",
    phone: "+1 234 567 9002",
    subject: "Physics",
    qualification: "MSc in Physics",
    experience: "8 years",
    joinDate: "2016-09-01",
    status: "Active",
  },
];

const initialClasses: Class[] = [
  {
    id: "1",
    name: "Mathematics - Grade 10",
    subject: "Mathematics",
    teacherId: "1",
    grade: "Grade 10",
    room: "Room 201",
    schedule: "Mon, Wed, Fri - 9:00 AM",
    capacity: 35,
    enrolledStudents: ["1"],
  },
];

export function SchoolProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [classes, setClasses] = useState<Class[]>(initialClasses);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  const addStudent = (student: Omit<Student, "id">) => {
    const newStudent = { ...student, id: Date.now().toString() };
    setStudents([...students, newStudent]);
  };

  const updateStudent = (id: string, studentData: Partial<Student>) => {
    setStudents(students.map((s) => (s.id === id ? { ...s, ...studentData } : s)));
  };

  const deleteStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const addTeacher = (teacher: Omit<Teacher, "id">) => {
    const newTeacher = { ...teacher, id: Date.now().toString() };
    setTeachers([...teachers, newTeacher]);
  };

  const updateTeacher = (id: string, teacherData: Partial<Teacher>) => {
    setTeachers(teachers.map((t) => (t.id === id ? { ...t, ...teacherData } : t)));
  };

  const deleteTeacher = (id: string) => {
    setTeachers(teachers.filter((t) => t.id !== id));
  };

  const addClass = (classData: Omit<Class, "id">) => {
    const newClass = { ...classData, id: Date.now().toString() };
    setClasses([...classes, newClass]);
  };

  const updateClass = (id: string, classData: Partial<Class>) => {
    setClasses(classes.map((c) => (c.id === id ? { ...c, ...classData } : c)));
  };

  const deleteClass = (id: string) => {
    setClasses(classes.filter((c) => c.id !== id));
  };

  const markAttendance = (attendanceData: Omit<AttendanceRecord, "id">) => {
    const newRecord = { ...attendanceData, id: Date.now().toString() };
    setAttendance([...attendance, newRecord]);
  };

  const getAttendanceByDate = (date: string) => {
    return attendance.filter((a) => a.date === date);
  };

  return (
    <SchoolContext.Provider
      value={{
        students,
        teachers,
        classes,
        attendance,
        addStudent,
        updateStudent,
        deleteStudent,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        addClass,
        updateClass,
        deleteClass,
        markAttendance,
        getAttendanceByDate,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error("useSchool must be used within SchoolProvider");
  }
  return context;
}
