import { Link } from "wouter";
import TeacherSidebar from "@/components/layout/teacher-sidebar";
import { useAuth } from "@/lib/auth";
import { useGetTeacherDashboard } from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users, BookOpen, CheckCircle, AlertCircle, TrendingUp, Plus,
  Calendar, BarChart2, ClipboardList
} from "lucide-react";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const { data: dashboard, isLoading } = useGetTeacherDashboard();

  const stats = [
    {
      label: "Total Students",
      value: isLoading ? "—" : String(dashboard?.totalStudents ?? 0),
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Lessons",
      value: isLoading ? "—" : String(dashboard?.totalLessons ?? 0),
      icon: BookOpen,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Published Lessons",
      value: isLoading ? "—" : String(dashboard?.publishedLessons ?? 0),
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Absent Today",
      value: isLoading ? "—" : String(dashboard?.todayAbsent ?? 0),
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Lesson Access Rate",
      value: isLoading ? "—" : `${dashboard?.lessonAccessRate ?? 0}%`,
      icon: TrendingUp,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Welcome back, {user?.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            {user?.school} · Grade {user?.grade} · Division {user?.division} · {user?.board}
          </p>
          {user?.teacherCode && (
            <div className="mt-2 inline-flex items-center gap-2 bg-primary/10 text-primary rounded-lg px-3 py-1.5 text-sm font-medium">
              Your Teacher Code: <span className="font-bold tracking-widest">{user.teacherCode}</span>
              <span className="text-xs font-normal">(share with students)</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {stats.map(s => {
            const Icon = s.icon;
            return (
              <Card key={s.label} data-testid={`card-stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <CardContent className="p-5">
                  <div className={`w-9 h-9 rounded-lg ${s.bg} ${s.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  {isLoading ? (
                    <Skeleton className="h-7 w-14 mb-1" />
                  ) : (
                    <div className="text-2xl font-bold">{s.value}</div>
                  )}
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Lessons */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" /> Recent Lessons
              </CardTitle>
              <Link href="/teacher/lessons/new">
                <Button size="sm" className="gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> New Lesson
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1,2,3].map(i => <Skeleton key={i} className="h-14 w-full" />)}
                </div>
              ) : !dashboard?.recentLessons?.length ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No lessons yet.</p>
                  <Link href="/teacher/lessons/new">
                    <Button variant="outline" size="sm" className="mt-3">Create First Lesson</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {dashboard.recentLessons.map((l: any) => (
                    <Link key={l.id} href={`/teacher/lessons/${l.id}`}>
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors" data-testid={`card-lesson-${l.id}`}>
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium truncate">{l.title}</div>
                          <div className="text-xs text-muted-foreground">{l.subject} · Grade {l.grade}</div>
                        </div>
                        <Badge variant={l.published ? "default" : "secondary"} className="text-xs shrink-0">
                          {l.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Today's Attendance */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-primary" /> Today's Attendance
              </CardTitle>
              <Link href="/teacher/attendance">
                <Button variant="outline" size="sm">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" /> Take Attendance
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1,2,3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : !dashboard?.attendanceToday?.length ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ClipboardList className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No attendance recorded today.</p>
                  <Link href="/teacher/attendance">
                    <Button variant="outline" size="sm" className="mt-3">Mark Attendance</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {dashboard.attendanceToday.slice(0, 6).map((a: any) => (
                    <div key={a.id} className="flex items-center gap-3 p-2.5 rounded-lg" data-testid={`row-attendance-${a.id}`}>
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                        {a.student?.name?.charAt(0) || "?"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{a.student?.name || "Unknown"}</div>
                        <div className="text-xs text-muted-foreground">Grade {a.student?.grade} {a.student?.division}</div>
                      </div>
                      <Badge
                        className="text-xs capitalize"
                        variant={a.status === "present" ? "default" : a.status === "late" ? "secondary" : "destructive"}
                      >
                        {a.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Subject Breakdown */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-primary" /> Lessons by Subject
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1,2,3].map(i => <Skeleton key={i} className="h-8 w-full" />)}
                </div>
              ) : !dashboard?.subjectBreakdown?.length ? (
                <p className="text-sm text-muted-foreground text-center py-6">No lessons created yet</p>
              ) : (
                <div className="space-y-2">
                  {dashboard.subjectBreakdown.map((s: any) => {
                    const max = Math.max(...dashboard.subjectBreakdown.map((x: any) => x.count));
                    const pct = max > 0 ? (s.count / max) * 100 : 0;
                    return (
                      <div key={s.subject} className="space-y-1" data-testid={`row-subject-${s.subject}`}>
                        <div className="flex justify-between text-sm">
                          <span>{s.subject}</span>
                          <span className="text-muted-foreground">{s.count}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {[
                { label: "New Lesson", href: "/teacher/lessons/new", icon: Plus },
                { label: "Attendance", href: "/teacher/attendance", icon: ClipboardList },
                { label: "Students", href: "/teacher/students", icon: Users },
                { label: "Resources", href: "/teacher/resources", icon: BarChart2 },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button variant="outline" className="w-full gap-2 h-12" data-testid={`button-quick-${item.label.toLowerCase()}`}>
                      <Icon className="w-4 h-4" /> {item.label}
                    </Button>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
