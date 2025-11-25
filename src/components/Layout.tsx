import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  Settings,
  Menu,
  X,
  DollarSign,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  name: string;
  href: string;
  icon: any;
  subItems?: { name: string; href: string }[];
}

const navigation: NavItem[] = [
  { 
    name: "Dashboard", 
    href: "/", 
    icon: LayoutDashboard,
    subItems: [
      { name: "Overview", href: "/" },
      { name: "Analytics", href: "/analytics" },
      { name: "Reports", href: "/reports" },
    ]
  },
  { 
    name: "Students", 
    href: "/students", 
    icon: Users,
    subItems: [
      { name: "All Students", href: "/students" },
      { name: "Add Student", href: "/students/add" },
      { name: "Import Students", href: "/students/import" },
    ]
  },
  { 
    name: "Teachers", 
    href: "/teachers", 
    icon: GraduationCap,
    subItems: [
      { name: "All Teachers", href: "/teachers" },
      { name: "Add Teacher", href: "/teachers/add" },
      { name: "Import Teachers", href: "/teachers/import" },
      { name: "Departments", href: "/teachers/departments" },
    ]
  },
  { 
    name: "Classes", 
    href: "/classes", 
    icon: BookOpen,
    subItems: [
      { name: "All Classes", href: "/classes" },
      { name: "Schedule", href: "/classes/schedule" },
      { name: "Subjects", href: "/classes/subjects" },
    ]
  },
  { 
    name: "Attendance", 
    href: "/attendance", 
    icon: ClipboardCheck,
    subItems: [
      { name: "Mark Attendance", href: "/attendance" },
      { name: "Attendance Reports", href: "/attendance/reports" },
      { name: "History", href: "/attendance/history" },
    ]
  },
  { 
    name: "Fees", 
    href: "/fees", 
    icon: DollarSign,
    subItems: [
      { name: "Fee Collection", href: "/fees" },
      { name: "Fee Structure", href: "/fees/structure" },
      { name: "Fee Reports", href: "/fees/reports" },
      { name: "Payment History", href: "/fees/history" },
    ]
  },
  { 
    name: "Settings", 
    href: "/settings", 
    icon: Settings,
    subItems: [
      { name: "School Info", href: "/settings" },
      { name: "Notifications", href: "/settings/notifications" },
      { name: "Roles & Permissions", href: "/settings/roles" },
      { name: "User Management", href: "/settings/users" },
    ]
  },
];

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(["Dashboard"]);
  const location = useLocation();

  const toggleSection = (name: string) => {
    setOpenSections((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const isPathActive = (item: NavItem) => {
    if (location.pathname === item.href) return true;
    return item.subItems?.some(sub => location.pathname === sub.href) || false;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-sidebar-primary-foreground" />
              </div>
              <span className="text-xl font-heading font-bold text-sidebar-foreground">
                EduManage
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = isPathActive(item);
              const isOpen = openSections.includes(item.name);
              
              return (
                <Collapsible
                  key={item.name}
                  open={isOpen}
                  onOpenChange={() => toggleSection(item.name)}
                >
                  <CollapsibleTrigger asChild>
                    <button
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-1 ml-4 space-y-1">
                    {item.subItems?.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className={cn(
                          "block px-4 py-2 rounded-lg text-sm transition-colors",
                          location.pathname === subItem.href
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                        )}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-sidebar-accent">
              <div className="w-10 h-10 rounded-full bg-sidebar-primary flex items-center justify-center">
                <span className="text-sm font-semibold text-sidebar-primary-foreground">
                  AD
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-accent-foreground truncate">
                  Admin User
                </p>
                <p className="text-xs text-sidebar-foreground/70 truncate">
                  admin@edumanage.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card border-b border-border shadow-sm">
          <div className="flex items-center justify-between px-4 py-4 lg:px-8">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <div className="flex-1 lg:flex lg:items-center lg:justify-between">
              <h1 className="text-2xl font-heading font-bold text-foreground ml-4 lg:ml-0">
                {navigation.find((item) => item.href === location.pathname)?.name || "Dashboard"}
              </h1>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          <div className="animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
}
