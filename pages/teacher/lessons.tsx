import { useState } from "react";
import { Link } from "wouter";
import TeacherSidebar from "@/components/layout/teacher-sidebar";
import { useListLessons, useDeleteLesson, usePublishLesson, getListLessonsQueryKey } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { SUBJECTS, GRADES } from "@/lib/topics-data";
import { BookOpen, Plus, Search, Trash2, Edit, Globe, Eye } from "lucide-react";

export default function TeacherLessons() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterGrade, setFilterGrade] = useState("all");

  const { data: lessons = [], isLoading } = useListLessons(
    { teacherId: user?.id },
    { query: { queryKey: getListLessonsQueryKey({ teacherId: user?.id }) } }
  );

  const deleteMutation = useDeleteLesson({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListLessonsQueryKey({ teacherId: user?.id }) });
        toast({ title: "Lesson deleted" });
      },
    },
  });

  const publishMutation = usePublishLesson({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListLessonsQueryKey({ teacherId: user?.id }) });
        toast({ title: "Lesson published to students!" });
      },
    },
  });

  const filtered = (lessons as any[]).filter(l => {
    const matchSearch = !search || l.title.toLowerCase().includes(search.toLowerCase()) || l.topic.toLowerCase().includes(search.toLowerCase());
    const matchSubject = filterSubject === "all" || l.subject === filterSubject;
    const matchGrade = filterGrade === "all" || l.grade === filterGrade;
    return matchSearch && matchSubject && matchGrade;
  });

  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Lessons</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Create and manage your lesson plans</p>
          </div>
          <Link href="/teacher/lessons/new">
            <Button className="gap-2" data-testid="button-new-lesson">
              <Plus className="w-4 h-4" /> Create Lesson
            </Button>
          </Link>
        </div>

        {/* Filters */}
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
          <Select value={filterGrade} onValueChange={setFilterGrade}>
            <SelectTrigger className="w-32" data-testid="select-grade">
              <SelectValue placeholder="Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              {GRADES.map(g => <SelectItem key={g} value={g}>Grade {g}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-24 w-full" />)}
          </div>
        ) : !filtered.length ? (
          <div className="text-center py-16 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-base font-medium">No lessons found</p>
            <p className="text-sm mt-1">Create your first lesson to get started</p>
            <Link href="/teacher/lessons/new">
              <Button className="mt-4 gap-2"><Plus className="w-4 h-4" /> Create Lesson</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((l: any) => (
              <Card key={l.id} className="hover:shadow-sm transition-shadow" data-testid={`card-lesson-${l.id}`}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-semibold truncate">{l.title}</h3>
                      <Badge variant={l.published ? "default" : "secondary"} className="text-xs shrink-0">
                        {l.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {l.subject} · Grade {l.grade} {l.division ? `· Div ${l.division}` : ""} · {l.topic}
                      {l.lessonDate ? ` · ${l.lessonDate}` : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {!l.published && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                        onClick={() => publishMutation.mutate({ id: l.id })}
                        disabled={publishMutation.isPending}
                        data-testid={`button-publish-${l.id}`}
                      >
                        <Globe className="w-3.5 h-3.5" /> Publish
                      </Button>
                    )}
                    <Link href={`/teacher/lessons/${l.id}`}>
                      <Button size="sm" variant="ghost" data-testid={`button-view-${l.id}`}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => deleteMutation.mutate({ id: l.id })}
                      data-testid={`button-delete-${l.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
