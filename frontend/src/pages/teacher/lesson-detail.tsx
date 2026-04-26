import { useParams, useLocation } from "wouter";
import TeacherSidebar from "@/components/layout/teacher-sidebar";
import { useGetLesson, usePublishLesson, useGetLessonAccess, getGetLessonQueryKey } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Globe, ExternalLink, CheckCircle2, Clock, Users, BookOpen, ArrowLeft } from "lucide-react";

export default function TeacherLessonDetail() {
  const { id } = useParams<{ id: string }>();
  const lessonId = parseInt(id || "0");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const { data: lesson, isLoading } = useGetLesson(lessonId, {
    query: { queryKey: getGetLessonQueryKey(lessonId), enabled: !!lessonId }
  });

  const { data: access = [] } = useGetLessonAccess(lessonId, {
    query: { queryKey: ["lesson-access", lessonId], enabled: !!lessonId }
  });

  const publishMutation = usePublishLesson({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetLessonQueryKey(lessonId) });
        toast({ title: "Lesson published!" });
      },
    },
  });

  const getYouTubeEmbed = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <TeacherSidebar />
        <main className="flex-1 p-8"><Skeleton className="h-96 w-full" /></main>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex min-h-screen">
        <TeacherSidebar />
        <main className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center text-muted-foreground">Lesson not found</div>
        </main>
      </div>
    );
  }

  const l = lesson as any;
  const accessList = access as any[];
  const accessedCount = accessList.filter(a => a.viewed).length;

  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        <div className="max-w-3xl mx-auto">
          <button
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            onClick={() => setLocation("/teacher/lessons")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Lessons
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={l.published ? "default" : "secondary"}>{l.published ? "Published" : "Draft"}</Badge>
                  <span className="text-sm text-muted-foreground">{l.subject} · Grade {l.grade}</span>
                </div>
                <h1 className="text-2xl font-bold" data-testid="text-lesson-title">{l.title}</h1>
                <p className="text-muted-foreground text-sm mt-1">{l.topic}{l.lessonDate ? ` · Taught on ${l.lessonDate}` : ""}</p>
              </div>
              {!l.published && (
                <Button
                  className="gap-2 shrink-0"
                  onClick={() => publishMutation.mutate({ id: l.id })}
                  disabled={publishMutation.isPending}
                  data-testid="button-publish"
                >
                  <Globe className="w-4 h-4" /> Publish to Students
                </Button>
              )}
            </div>
          </div>

          {/* Stats */}
          {l.published && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600">{accessedCount}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Students Accessed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{l.totalStudents || 0}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Total Students</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-amber-600">{(l.totalStudents || 0) - accessedCount}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Not Yet Viewed</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Description */}
          {l.description && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{l.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Video */}
          {l.videoUrl && (
            <Card className="mb-4">
              <CardHeader><CardTitle className="text-base">Video</CardTitle></CardHeader>
              <CardContent>
                {getYouTubeEmbed(l.videoUrl) ? (
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={getYouTubeEmbed(l.videoUrl)!}
                      className="w-full h-full"
                      allowFullScreen
                      title="Lesson Video"
                    />
                  </div>
                ) : (
                  <a href={l.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline text-sm">
                    <ExternalLink className="w-4 h-4" /> Watch Video
                  </a>
                )}
              </CardContent>
            </Card>
          )}

          {/* Content */}
          {l.content && (
            <Card className="mb-4">
              <CardHeader><CardTitle className="text-base">Lesson Content</CardTitle></CardHeader>
              <CardContent>
                <div className="text-sm whitespace-pre-wrap leading-relaxed" data-testid="text-lesson-content">{l.content}</div>
              </CardContent>
            </Card>
          )}

          {/* Resources */}
          {l.resourceUrls?.length > 0 && (
            <Card className="mb-4">
              <CardHeader><CardTitle className="text-base">Additional Resources</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(l.resourceUrls as string[]).map((url, i) => (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline text-sm" data-testid={`link-resource-${i}`}>
                      <ExternalLink className="w-3.5 h-3.5" /> {url}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Student Access List */}
          {l.published && accessList.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" /> Student Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {accessList.map((a: any) => (
                    <div key={a.studentId} className="flex items-center gap-3" data-testid={`row-access-${a.studentId}`}>
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
                        {a.studentName?.charAt(0)}
                      </div>
                      <div className="flex-1 text-sm">{a.studentName}</div>
                      {a.viewed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="text-xs text-muted-foreground">{a.viewed ? "Viewed" : "Not yet"}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
