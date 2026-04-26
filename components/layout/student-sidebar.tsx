import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, BookOpen, Gamepad2, HelpCircle, BarChart2,
  Award, Library, User, LogOut, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/student", label: "Dashboard", icon: LayoutDashboard },
  { href: "/student/lessons", label: "My Lessons", icon: BookOpen },
  { href: "/student/games", label: "Games & Play", icon: Gamepad2 },
  { href: "/student/quizzes", label: "Quizzes", icon: HelpCircle },
  { href: "/student/progress", label: "My Progress", icon: BarChart2 },
  { href: "/student/badges", label: "My Badges", icon: Award },
  { href: "/student/books", label: "Books Library", icon: Library },
  { href: "/student/profile", label: "Profile", icon: User },
];

export default function StudentSidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)" }} data-testid="student-sidebar">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-400 flex items-center justify-center">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm text-white">EduGen ClassLink</div>
            <div className="text-xs text-white/50">Student Portal</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location === item.href || (item.href !== "/student" && location.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                  isActive
                    ? "bg-amber-400 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
              </a>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-amber-400">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-white truncate">{user?.name}</div>
            <div className="text-xs text-white/50 truncate">Grade {user?.grade} · {user?.board}</div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-white/60 hover:text-white hover:bg-white/10"
          onClick={async () => await logout()}
          data-testid="button-logout"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
