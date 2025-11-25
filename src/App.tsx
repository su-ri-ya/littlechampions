import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SchoolProvider } from "./contexts/SchoolContext";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import ImportStudents from "./pages/ImportStudents";
import StudentReports from "./pages/StudentReports";
import Teachers from "./pages/Teachers";
import AddTeacher from "./pages/AddTeacher";
import ImportTeachers from "./pages/ImportTeachers";
import TeacherPerformance from "./pages/TeacherPerformance";
import Classes from "./pages/Classes";
import CreateClass from "./pages/CreateClass";
import Timetable from "./pages/Timetable";
import Attendance from "./pages/Attendance";
import MarkAttendance from "./pages/MarkAttendance";
import AttendanceReports from "./pages/AttendanceReports";
import LeaveRequests from "./pages/LeaveRequests";
import Fees from "./pages/Fees";
import FeeStructure from "./pages/FeeStructure";
import FeeReports from "./pages/FeeReports";
import PaymentHistory from "./pages/PaymentHistory";
import Settings from "./pages/Settings";
import RolesManagement from "./pages/RolesManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SchoolProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            
            {/* Students Routes */}
            <Route path="/students" element={<Layout><Students /></Layout>} />
            <Route path="/students/add" element={<Layout><AddStudent /></Layout>} />
            <Route path="/students/import" element={<Layout><ImportStudents /></Layout>} />
            <Route path="/students/reports" element={<Layout><StudentReports /></Layout>} />
            
            {/* Teachers Routes */}
            <Route path="/teachers" element={<Layout><Teachers /></Layout>} />
            <Route path="/teachers/add" element={<Layout><AddTeacher /></Layout>} />
            <Route path="/teachers/import" element={<Layout><ImportTeachers /></Layout>} />
            <Route path="/teachers/performance" element={<Layout><TeacherPerformance /></Layout>} />
            
            {/* Classes Routes */}
            <Route path="/classes" element={<Layout><Classes /></Layout>} />
            <Route path="/classes/create" element={<Layout><CreateClass /></Layout>} />
            <Route path="/classes/timetable" element={<Layout><Timetable /></Layout>} />
            
            {/* Attendance Routes */}
            <Route path="/attendance" element={<Layout><Attendance /></Layout>} />
            <Route path="/attendance/mark" element={<Layout><MarkAttendance /></Layout>} />
            <Route path="/attendance/reports" element={<Layout><AttendanceReports /></Layout>} />
            <Route path="/attendance/leave" element={<Layout><LeaveRequests /></Layout>} />
            
            {/* Fees Routes */}
            <Route path="/fees" element={<Layout><Fees /></Layout>} />
            <Route path="/fees/structure" element={<Layout><FeeStructure /></Layout>} />
            <Route path="/fees/reports" element={<Layout><FeeReports /></Layout>} />
            <Route path="/fees/history" element={<Layout><PaymentHistory /></Layout>} />
            
            {/* Settings */}
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="/settings/roles" element={<Layout><RolesManagement /></Layout>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SchoolProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
