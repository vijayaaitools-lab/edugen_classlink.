import TeacherSidebar from "@/components/layout/teacher-sidebar";
import { useListUsers, useListProgress, useListBadges } from "@/api";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";
import { Users, Award, TrendingUp } from "lucide-react";

export default function TeacherStudents() {
  const { user } = useAuth();
  const { data: allUsers = [], isLoading } = useListUsers(
    { role: "student" },
    { query: { queryKey: ["users-students"] } }
  );

  const myStudents = (allUsers as any[]).filter(s => s.teacherId === user?.id);

  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Students</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {myStudents.length} students in your class
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <Skeleton key={i} className="h-20 w-full" />)}
          </div>
        ) : !myStudents.length ? (
          <div className="text-center py-16 text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-base font-medium">No students yet</p>
            <p className="text-sm mt-1">Share your teacher code with your students</p>
            {user?.teacherCode && (
              <div className="mt-4 inline-block bg-primary/10 text-primary rounded-xl px-6 py-3 font-bold tracking-widest text-2xl">
                {user.teacherCode}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myStudents.map((s: any) => (
              <Card key={s.id} data-testid={`card-student-${s.id}`}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {s.name?.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.email}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {s.grade && <span className="bg-muted rounded px-2 py-0.5">Grade {s.grade}</span>}
                    {s.division && <span className="bg-muted rounded px-2 py-0.5">Div {s.division}</span>}
                    {s.board && <span className="bg-muted rounded px-2 py-0.5">{s.board}</span>}
                    {s.school && <span className="bg-muted rounded px-2 py-0.5">{s.school}</span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
