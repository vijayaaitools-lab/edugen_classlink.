import { useState } from "react";
import StudentSidebar from "@/components/layout/student-sidebar";
import { useListQuizzes, useSubmitQuiz, getListQuizzesQueryKey } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { HelpCircle, CheckCircle2, XCircle, Trophy, Star } from "lucide-react";

export default function StudentQuizzes() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);

  const { data: quizzes = [], isLoading } = useListQuizzes(
    { studentId: user?.id },
    { query: { queryKey: getListQuizzesQueryKey({ studentId: user?.id }) } }
  );

  const submitMutation = useSubmitQuiz({
    mutation: {
      onSuccess: (data: any) => {
        setResult(data);
        setSubmitted(true);
        toast({ title: `Quiz completed! Score: ${data.score}%` });
      },
    },
  });

  const startQuiz = (quiz: any) => {
    setActiveQuiz(quiz);
    setAnswers({});
    setResult(null);
    setSubmitted(false);
  };

  const handleSelect = (qIdx: number, oIdx: number) => {
    if (!submitted) setAnswers(a => ({ ...a, [qIdx]: oIdx }));
  };

  const handleSubmit = () => {
    if (!activeQuiz) return;
    const answerArr = activeQuiz.questions.map((_: any, i: number) => answers[i] ?? -1);
    submitMutation.mutate({
      id: activeQuiz.id,
      data: { answers: answerArr }
    });
  };

  if (activeQuiz) {
    return (
      <div className="flex min-h-screen">
        <StudentSidebar />
        <main className="flex-1 p-8 bg-background overflow-auto">
          <div className="max-w-2xl mx-auto">
            {result && (
              <Card className="mb-6 bg-gradient-to-r from-indigo-950 to-violet-900 text-white border-0">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-10 h-10 text-amber-400 mx-auto mb-2" />
                  <div className="text-4xl font-bold text-amber-400 mb-1">{result.score}%</div>
                  <div className="text-white/70">{result.correctAnswers} / {result.totalQuestions} correct</div>
                  <div className="mt-2 text-sm">
                    {result.score >= 80 ? "🎉 Excellent work!" : result.score >= 60 ? "👍 Good job!" : "Keep practicing!"}
                  </div>
                  <div className="flex gap-2 mt-4 justify-center">
                    <Button variant="outline" className="text-white border-white/30 hover:bg-white/10" onClick={() => setActiveQuiz(null)}>
                      Back to Quizzes
                    </Button>
                    <Button className="bg-amber-400 text-white border-0 hover:bg-amber-500" onClick={() => startQuiz(activeQuiz)}>
                      Retake Quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="mb-5">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">{activeQuiz.title}</h1>
                <Badge variant="secondary">{activeQuiz.subject} · Grade {activeQuiz.grade}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{activeQuiz.questions.length} questions · {activeQuiz.topic}</p>
            </div>

            <div className="space-y-5">
              {activeQuiz.questions.map((q: any, qi: number) => {
                const selected = answers[qi];
                const isCorrect = submitted && q.correctIndex === selected;
                const isWrong = submitted && selected !== undefined && q.correctIndex !== selected;
                return (
                  <Card key={qi} data-testid={`card-question-${qi}`}>
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3 mb-4">
                        <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">{qi + 1}</span>
                        <p className="text-sm font-medium">{q.question}</p>
                      </div>
                      <div className="space-y-2">
                        {q.options.map((opt: string, oi: number) => {
                          const isSelected = selected === oi;
                          const isCorrectOpt = submitted && q.correctIndex === oi;
                          const isWrongOpt = submitted && isSelected && !isCorrectOpt;
                          return (
                            <button
                              key={oi}
                              onClick={() => handleSelect(qi, oi)}
                              disabled={submitted}
                              className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors flex items-center gap-2 ${
                                isCorrectOpt
                                  ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                                  : isWrongOpt
                                  ? "bg-rose-50 border-rose-400 text-rose-700"
                                  : isSelected
                                  ? "bg-primary/10 border-primary text-primary"
                                  : "border-border hover:bg-muted/50 hover:border-primary/50"
                              }`}
                              data-testid={`option-${qi}-${oi}`}
                            >
                              <span className="font-semibold text-xs w-5 shrink-0">{String.fromCharCode(65 + oi)}.</span>
                              {opt}
                              {isCorrectOpt && <CheckCircle2 className="w-4 h-4 ml-auto shrink-0" />}
                              {isWrongOpt && <XCircle className="w-4 h-4 ml-auto shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                      {submitted && q.explanation && (
                        <p className="mt-3 text-xs text-muted-foreground bg-muted rounded-lg px-3 py-2">
                          💡 {q.explanation}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {!submitted && (
              <div className="mt-5 flex gap-3">
                <Button
                  onClick={handleSubmit}
                  disabled={Object.keys(answers).length < activeQuiz.questions.length || submitMutation.isPending}
                  className="gap-2"
                  data-testid="button-submit-quiz"
                >
                  <Star className="w-4 h-4" />
                  {submitMutation.isPending ? "Submitting..." : `Submit Quiz (${Object.keys(answers).length}/${activeQuiz.questions.length})`}
                </Button>
                <Button variant="outline" onClick={() => setActiveQuiz(null)}>Cancel</Button>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <StudentSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Quizzes</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Test your knowledge with quizzes from your teacher</p>
        </div>

        {isLoading ? (
          <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-24 w-full" />)}</div>
        ) : !(quizzes as any[]).length ? (
          <div className="text-center py-16 text-muted-foreground">
            <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-base font-medium">No quizzes yet</p>
            <p className="text-sm mt-1">Your teacher hasn't published any quizzes yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(quizzes as any[]).map((q: any) => (
              <Card key={q.id} className="hover:shadow-md transition-shadow" data-testid={`card-quiz-${q.id}`}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <HelpCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{q.title}</h3>
                      <div className="text-xs text-muted-foreground">{q.subject} · Grade {q.grade} · {q.topic}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{(q.questions as any[]).length} questions</span>
                    <Button size="sm" onClick={() => startQuiz(q)} data-testid={`button-start-${q.id}`}>
                      Start Quiz
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
