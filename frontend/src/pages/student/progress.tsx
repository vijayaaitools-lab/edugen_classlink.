import StudentSidebar from "@/components/layout/student-sidebar";
import { useAuth } from "@/lib/auth";
import { useListProgress, useListLessons, getListLessonsQueryKey } from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart2, TrendingUp, Star, BookOpen } from "lucide-react";

const SUBJECT_COLORS: Record<string, string> = {
  Math: "bg-blue-500",
  English: "bg-emerald-500",
  Science: "bg-violet-500",
  Hindi: "bg-amber-500",
  "Social Studies": "bg-rose-500",
  "Computer Science": "bg-cyan-500",
};

export default function StudentProgress() {
  const { user } = useAuth();

  const { data: progress = [], isLoading: progressLoading } = useListProgress(
    { studentId: user?.id },
    { query: { queryKey: ["progress", user?.id] } }
  );

  const { data: lessons = [], isLoading: lessonsLoading } = useListLessons(
    { studentId: user?.id, published: true },
    { query: { queryKey: getListLessonsQueryKey({ studentId: user?.id, published: true }) } }
  );

  const isLoading = progressLoading || lessonsLoading;

  const allLessons = lessons as any[];
  const viewedLessons = allLessons.filter(l => l.viewed);
  const totalXp = (progress as any[]).reduce((sum, p: any) => sum + (p.xp || 0), 0);

  const subjectStats = allLessons.reduce((acc: Record<string, { total: number; viewed: number }>, l: any) => {
    if (!acc[l.subject]) acc[l.subject] = { total: 0, viewed: 0 };
    acc[l.subject].total++;
    if (l.viewed) acc[l.subject].viewed++;
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen">
      <StudentSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">My Progress</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Track your learning journey</p>
        </div>

        {/* XP Card */}
        <Card className="mb-6 bg-gradient-to-r from-indigo-950 to-violet-900 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-white/60 text-sm">Total Experience Points</div>
                <div className="text-4xl font-bold text-amber-400 mt-1">
                  {isLoading ? "..." : totalXp} XP
                </div>
                <div className="text-white/60 text-sm mt-1">Level {Math.floor(totalXp / 100) + 1}</div>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-amber-400/20 flex items-center justify-center">
                <Star className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all"
                style={{ width: `${Math.min(100, totalXp % 100)}%` }}
              />
            </div>
            <div className="text-xs text-white/50 mt-1.5">
              {100 - (totalXp % 100)} XP to Level {Math.floor(totalXp / 100) + 2}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Lessons Completed", value: viewedLessons.length, icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Total Lessons", value: allLessons.length, icon: BarChart2, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Completion Rate", value: allLessons.length > 0 ? `${Math.round((viewedLessons.length / allLessons.length) * 100)}%` : "0%", icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
          ].map(s => {
            const Icon = s.icon;
            return (
              <Card key={s.label} data-testid={`card-stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <CardContent className="p-5">
                  <div className={`w-9 h-9 rounded-lg ${s.bg} ${s.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  {isLoading ? <Skeleton className="h-7 w-14 mb-1" /> : <div className="text-2xl font-bold">{s.value}</div>}
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Progress by Subject */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-primary" /> Progress by Subject
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-12 w-full" />)}</div>
            ) : Object.keys(subjectStats).length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No lessons available yet</p>
            ) : (
              <div className="space-y-4">
                {Object.entries(subjectStats).map(([subject, stats]) => {
                  const pct = stats.total > 0 ? (stats.viewed / stats.total) * 100 : 0;
                  const barColor = SUBJECT_COLORS[subject] || "bg-primary";
                  return (
                    <div key={subject} data-testid={`row-subject-${subject}`}>
                      <div className="flex justify-between items-center text-sm mb-1.5">
                        <span className="font-medium">{subject}</span>
                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                          <span>{stats.viewed}/{stats.total} lessons</span>
                          <span className="font-semibold text-foreground">{Math.round(pct)}%</span>
                        </div>
                      </div>
                      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${barColor}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        {viewedLessons.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {viewedLessons.slice(-5).reverse().map((l: any) => (
                  <div key={l.id} className="flex items-center gap-3 p-2.5 rounded-lg" data-testid={`row-lesson-${l.id}`}>
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{l.title}</div>
                      <div className="text-xs text-muted-foreground">{l.subject} · {l.topic}</div>
                    </div>
                    <div className="text-xs text-emerald-600 font-medium shrink-0">+10 XP</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
