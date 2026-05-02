import { useState } from "react";
import { Link } from "wouter";
import StudentSidebar from "@/components/layout/student-sidebar";
import { useListLessons, getListLessonsQueryKey } from "@/api";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Search, CheckCircle, AlertCircle } from "lucide-react";
import { SUBJECTS } from "@/lib/topics-data";

export default function StudentLessons() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterViewed, setFilterViewed] = useState("all");

  const { data: lessons = [], isLoading } = useListLessons(
    { studentId: user?.id, published: true },
    { query: { queryKey: getListLessonsQueryKey({ studentId: user?.id, published: true }) } }
  );

  const filtered = (lessons as any[]).filter(l => {
    const matchSearch = !search || l.title.toLowerCase().includes(search.toLowerCase()) || l.topic.toLowerCase().includes(search.toLowerCase());
    const matchSubject = filterSubject === "all" || l.subject === filterSubject;
    const matchViewed = filterViewed === "all" || (filterViewed === "unread" && !l.viewed) || (filterViewed === "read" && l.viewed);
    return matchSearch && matchSubject && matchViewed;
  });

  const unreadCount = (lessons as any[]).filter(l => !l.viewed).length;

  return (
    <div className="flex min-h-screen">
      <StudentSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">My Lessons</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Lessons published by your teacher
            {unreadCount > 0 && <span className="ml-2 text-destructive font-medium">{unreadCount} unread</span>}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-48">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search lessons..."
              className="pl-9"
              value={search}
              onChange={e => setSearch(e.target.value)}
              data-testid="input-search"
            />
          </div>
          <Select value={filterSubject} onValueChange={setFilterSubject}>
            <SelectTrigger className="w-40" data-testid="select-subject">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterViewed} onValueChange={setFilterViewed}>
            <SelectTrigger className="w-36" data-testid="select-viewed">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-24 w-full" />)}</div>
        ) : !filtered.length ? (
          <div className="text-center py-16 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-base font-medium">
              {lessons.length === 0 ? "No lessons yet" : "No lessons match your filter"}
            </p>
            <p className="text-sm mt-1">
              {lessons.length === 0
                ? "Your teacher hasn't published any lessons yet"
                : "Try a different search or filter"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((l: any) => (
              <Link key={l.id} href={`/student/lessons/${l.id}`}>
                <Card className={`cursor-pointer hover:shadow-md transition-all ${!l.viewed ? "border-blue-200 bg-blue-50/30" : ""}`} data-testid={`card-lesson-${l.id}`}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${l.viewed ? "bg-emerald-50" : "bg-blue-100"}`}>
                      {l.viewed
                        ? <CheckCircle className="w-5 h-5 text-emerald-500" />
                        : <BookOpen className="w-5 h-5 text-blue-500" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-semibold truncate">{l.title}</h3>
                        {!l.viewed && (
                          <Badge className="text-xs bg-blue-500 text-white shrink-0">New</Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">{l.subject} · {l.topic} {l.lessonDate ? `· ${l.lessonDate}` : ""}</div>
                      {l.description && <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{l.description}</div>}
                    </div>
                    <div className="text-xs text-muted-foreground shrink-0">
                      {l.viewed ? "✓ Read" : "Tap to read →"}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
