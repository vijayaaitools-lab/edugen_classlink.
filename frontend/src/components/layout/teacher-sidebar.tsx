import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, BookOpen, ClipboardList, Users, Gamepad2,
  HelpCircle, Globe, User, LogOut, GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/teacher", label: "Dashboard", icon: LayoutDashboard },
  { href: "/teacher/lessons", label: "Lessons", icon: BookOpen },
  { href: "/teacher/attendance", label: "Attendance", icon: ClipboardList },
  { href: "/teacher/students", label: "Students", icon: Users },
  { href: "/teacher/games", label: "Games & Topics", icon: Gamepad2 },
  { href: "/teacher/quizzes", label: "Quizzes", icon: HelpCircle },
  { href: "/teacher/resources", label: "Resources", icon: Globe },
  { href: "/teacher/profile", label: "Profile", icon: User },
];

export default function TeacherSidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className="w-64 min-h-screen bg-sidebar text-sidebar-foreground flex flex-col" data-testid="teacher-sidebar">
      <div className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm text-sidebar-foreground">EduGen ClassLink</div>
            <div className="text-xs text-sidebar-foreground/60">Teacher Portal</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location === item.href || (item.href !== "/teacher" && location.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Icon className="w-4.5 h-4.5 shrink-0" />
                {item.label}
              </a>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-sidebar-primary/30 flex items-center justify-center">
            <span className="text-sm font-semibold text-sidebar-primary-foreground">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">{user?.name}</div>
            <div className="text-xs text-sidebar-foreground/60 truncate">{user?.board} · {user?.subject}</div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={handleLogout}
          data-testid="button-logout"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
