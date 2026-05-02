import { useParams, useLocation } from "wouter";
import StudentSidebar from "@/components/layout/student-sidebar";
import { useGetLesson, useMarkLessonViewed, getGetLessonQueryKey } from "@/api";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowLeft, BookOpen, CheckCircle } from "lucide-react";

export default function StudentLessonDetail() {
  const { id } = useParams<{ id: string }>();
  const lessonId = parseInt(id || "0");
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const { data: lesson, isLoading } = useGetLesson(lessonId, {
    query: { queryKey: getGetLessonQueryKey(lessonId), enabled: !!lessonId }
  });

  const trackMutation = useMarkLessonViewed();

  useEffect(() => {
    if (lessonId && lesson) {
      trackMutation.mutate({ id: lessonId });
    }
  }, [lessonId, lesson]);

  const getYouTubeEmbed = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <StudentSidebar />
        <main className="flex-1 p-8"><Skeleton className="h-96 w-full" /></main>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex min-h-screen">
        <StudentSidebar />
        <main className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center text-muted-foreground">Lesson not found</div>
        </main>
      </div>
    );
  }

  const l = lesson as any;

  return (
    <div className="flex min-h-screen">
      <StudentSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        <div className="max-w-3xl mx-auto">
          <button
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            onClick={() => setLocation("/student/lessons")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Lessons
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{l.subject}</Badge>
              <span className="text-muted-foreground text-sm">·</span>
              <span className="text-sm text-muted-foreground">Grade {l.grade}</span>
              {l.lessonDate && (
                <>
                  <span className="text-muted-foreground text-sm">·</span>
                  <span className="text-sm text-muted-foreground">{l.lessonDate}</span>
                </>
              )}
            </div>
            <h1 className="text-2xl font-bold" data-testid="text-lesson-title">{l.title}</h1>
            <p className="text-muted-foreground text-sm mt-1">{l.topic}</p>
            <div className="mt-2 flex items-center gap-2 text-emerald-600 text-sm">
              <CheckCircle className="w-4 h-4" /> Marked as viewed
            </div>
          </div>

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
              <CardHeader><CardTitle className="text-base">📽️ Video Lesson</CardTitle></CardHeader>
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
              <CardHeader><CardTitle className="text-base">📚 Lesson Notes</CardTitle></CardHeader>
              <CardContent>
                <div className="text-sm whitespace-pre-wrap leading-relaxed" data-testid="text-lesson-content">{l.content}</div>
              </CardContent>
            </Card>
          )}

          {/* Resources */}
          {l.resourceUrls?.length > 0 && (
            <Card className="mb-4">
              <CardHeader><CardTitle className="text-base">🔗 Additional Resources</CardTitle></CardHeader>
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

          {/* Practice */}
          <Card>
            <CardHeader><CardTitle className="text-base">🎮 Practice with Games</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Reinforce this lesson with educational games for Grade {l.grade} {l.subject}</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => window.open("https://www.mathplayground.com", "_blank")}>
                  <ExternalLink className="w-3.5 h-3.5" /> Math Playground
                </Button>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => window.open("https://www.khanacademy.org", "_blank")}>
                  <ExternalLink className="w-3.5 h-3.5" /> Khan Academy
                </Button>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => window.open("https://www.brainpop.com", "_blank")}>
                  <ExternalLink className="w-3.5 h-3.5" /> BrainPOP
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
