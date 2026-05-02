import { Link } from "wouter";
import StudentSidebar from "@/components/layout/student-sidebar";
import { useAuth } from "@/lib/auth";
import { useGetStudentDashboard } from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Award, Gamepad2, BarChart2, Star, Zap, TrendingUp, CheckCircle } from "lucide-react";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { data: dashboard, isLoading } = useGetStudentDashboard();

  return (
    <div className="flex min-h-screen">
      <StudentSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-white text-xl font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">Hi, {user?.name?.split(" ")[0]}! 👋</h1>
              <p className="text-muted-foreground text-sm">Grade {user?.grade} · {user?.board} · Division {user?.division}</p>
            </div>
          </div>
        </div>

        {/* XP / Level Bar */}
        <Card className="mb-6 bg-gradient-to-r from-indigo-950 to-violet-900 text-white border-0">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                <span className="font-semibold">Learning Level</span>
              </div>
              <span className="text-amber-400 font-bold">
                {isLoading ? "..." : `${(dashboard as any)?.totalXp || 0} XP`}
              </span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all"
                style={{ width: `${Math.min(100, ((dashboard as any)?.totalXp || 0) % 100)}%` }}
              />
            </div>
            <p className="text-xs text-white/60 mt-1.5">
              Level {Math.floor(((dashboard as any)?.totalXp || 0) / 100) + 1} · {100 - (((dashboard as any)?.totalXp || 0) % 100)} XP to next level
            </p>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Lessons Done", value: (dashboard as any)?.lessonsViewed ?? 0, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Pending Lessons", value: (dashboard as any)?.pendingLessons ?? 0, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Badges Earned", value: (dashboard as any)?.totalBadges ?? 0, icon: Award, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Quizzes Taken", value: (dashboard as any)?.quizzesTaken ?? 0, icon: Zap, color: "text-violet-600", bg: "bg-violet-50" },
          ].map(s => {
            const Icon = s.icon;
            return (
              <Card key={s.label} data-testid={`card-stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <CardContent className="p-5">
                  <div className={`w-9 h-9 rounded-lg ${s.bg} ${s.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  {isLoading ? <Skeleton className="h-7 w-12 mb-1" /> : <div className="text-2xl font-bold">{s.value}</div>}
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Lessons */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" /> Lessons to Catch Up
              </CardTitle>
              <Link href="/student/lessons">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-14 w-full" />)}</div>
              ) : !(dashboard as any)?.recentLessons?.length ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-emerald-500 opacity-70" />
                  <p className="text-sm font-medium">You're all caught up!</p>
                  <p className="text-xs mt-1">No pending lessons from your teacher</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {(dashboard as any).recentLessons.slice(0, 4).map((l: any) => (
                    <Link key={l.id} href={`/student/lessons/${l.id}`}>
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors" data-testid={`card-lesson-${l.id}`}>
                        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4 text-blue-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium truncate">{l.title}</div>
                          <div className="text-xs text-muted-foreground">{l.subject} · {l.lessonDate || "Recent"}</div>
                        </div>
                        {l.viewed ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <Badge variant="destructive" className="text-xs shrink-0">New</Badge>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" /> Recent Badges
              </CardTitle>
              <Link href="/student/badges">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="grid grid-cols-3 gap-3">{[1,2,3].map(i => <Skeleton key={i} className="h-20 w-full" />)}</div>
              ) : !(dashboard as any)?.recentBadges?.length ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Award className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No badges yet</p>
                  <p className="text-xs mt-1">Complete lessons to earn badges!</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {(dashboard as any).recentBadges.slice(0, 6).map((b: any) => (
                    <div key={b.id} className="text-center p-3 rounded-xl bg-amber-50 border border-amber-100" data-testid={`card-badge-${b.id}`}>
                      <div className="text-3xl mb-1">{b.icon || "🏅"}</div>
                      <div className="text-xs font-medium text-amber-800 leading-tight">{b.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Play Games */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-emerald-500" /> Quick Play
              </CardTitle>
              <Link href="/student/games">
                <Button variant="outline" size="sm">All Games</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Math Games", url: "https://www.mathplayground.com", emoji: "🔢", color: "bg-blue-50 border-blue-100 text-blue-700" },
                  { name: "English Games", url: "https://www.starfall.com", emoji: "📝", color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
                  { name: "Science Games", url: "https://www.brainpop.com", emoji: "🔬", color: "bg-violet-50 border-violet-100 text-violet-700" },
                  { name: "Hindi Games", url: "https://kahoot.com", emoji: "🅰️", color: "bg-amber-50 border-amber-100 text-amber-700" },
                ].map(g => (
                  <button
                    key={g.name}
                    onClick={() => window.open(g.url, "_blank")}
                    className={`p-4 rounded-xl border text-center hover:scale-105 transition-transform cursor-pointer ${g.color}`}
                    data-testid={`button-game-${g.name.toLowerCase().split(" ")[0]}`}
                  >
                    <div className="text-2xl mb-1">{g.emoji}</div>
                    <div className="text-xs font-semibold">{g.name}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-primary" /> Progress by Subject
              </CardTitle>
              <Link href="/student/progress">
                <Button variant="outline" size="sm">Details</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-8 w-full" />)}</div>
              ) : !(dashboard as any)?.subjectProgress?.length ? (
                <p className="text-sm text-muted-foreground text-center py-6">Start learning to see your progress!</p>
              ) : (
                <div className="space-y-3">
                  {(dashboard as any).subjectProgress.map((s: any) => (
                    <div key={s.subject}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{s.subject}</span>
                        <span className="text-muted-foreground">{s.score}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${s.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
