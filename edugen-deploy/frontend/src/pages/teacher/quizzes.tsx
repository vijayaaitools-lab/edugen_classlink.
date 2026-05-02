import { useState } from "react";
import TeacherSidebar from "@/components/layout/teacher-sidebar";
import { useListQuizzes, useCreateQuiz, getListQuizzesQueryKey } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { SUBJECTS, GRADES } from "@/lib/topics-data";
import { HelpCircle, Plus, Trash2, CheckCircle } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function TeacherQuizzes() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", subject: user?.subject || "", grade: user?.grade || "", topic: "" });
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, question: "", options: ["", "", "", ""], correctIndex: 0, explanation: "" }
  ]);

  const { data: quizzes = [], isLoading } = useListQuizzes({}, { query: { queryKey: getListQuizzesQueryKey({}) } });

  const createMutation = useCreateQuiz({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListQuizzesQueryKey({}) });
        toast({ title: "Quiz created!" });
        setOpen(false);
        setForm({ title: "", subject: user?.subject || "", grade: user?.grade || "", topic: "" });
        setQuestions([{ id: 1, question: "", options: ["", "", "", ""], correctIndex: 0, explanation: "" }]);
      },
    },
  });

  const addQuestion = () => {
    setQuestions(q => [...q, { id: q.length + 1, question: "", options: ["", "", "", ""], correctIndex: 0, explanation: "" }]);
  };

  const updateQuestion = (idx: number, key: keyof Question, value: any) => {
    setQuestions(q => q.map((item, i) => i === idx ? { ...item, [key]: value } : item));
  };

  const updateOption = (qIdx: number, oIdx: number, value: string) => {
    setQuestions(q => q.map((item, i) => i === qIdx ? { ...item, options: item.options.map((o, j) => j === oIdx ? value : o) } : item));
  };

  const handleCreate = () => {
    if (!form.title || !form.subject || !form.grade || !form.topic) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    createMutation.mutate({ data: { ...form, questions } });
  };

  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Quizzes</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Create quizzes linked to your lessons</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" data-testid="button-new-quiz"><Plus className="w-4 h-4" /> Create Quiz</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Quiz</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Title *</Label>
                    <Input placeholder="Quiz title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} data-testid="input-quiz-title" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Topic *</Label>
                    <Input placeholder="e.g., Fractions" value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Subject *</Label>
                    <Select value={form.subject} onValueChange={v => setForm(f => ({ ...f, subject: v }))}>
                      <SelectTrigger><SelectValue placeholder="Subject" /></SelectTrigger>
                      <SelectContent>{SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Grade *</Label>
                    <Select value={form.grade} onValueChange={v => setForm(f => ({ ...f, grade: v }))}>
                      <SelectTrigger><SelectValue placeholder="Grade" /></SelectTrigger>
                      <SelectContent>{GRADES.map(g => <SelectItem key={g} value={g}>Grade {g}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold">Questions</Label>
                    <Button type="button" size="sm" variant="outline" onClick={addQuestion} className="gap-1.5">
                      <Plus className="w-3.5 h-3.5" /> Add Question
                    </Button>
                  </div>

                  {questions.map((q, qi) => (
                    <Card key={q.id}>
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-semibold shrink-0">{qi + 1}</span>
                          <Input
                            placeholder="Question text"
                            value={q.question}
                            onChange={e => updateQuestion(qi, "question", e.target.value)}
                            data-testid={`input-question-${qi}`}
                          />
                          {questions.length > 1 && (
                            <Button size="icon" variant="ghost" className="shrink-0 h-8 w-8" onClick={() => setQuestions(qs => qs.filter((_, i) => i !== qi))}>
                              <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {q.options.map((opt, oi) => (
                            <div key={oi} className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => updateQuestion(qi, "correctIndex", oi)}
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${q.correctIndex === oi ? "border-emerald-500 bg-emerald-500" : "border-muted-foreground"}`}
                              >
                                {q.correctIndex === oi && <CheckCircle className="w-3 h-3 text-white" />}
                              </button>
                              <Input
                                placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                                value={opt}
                                onChange={e => updateOption(qi, oi, e.target.value)}
                                className="text-sm h-8"
                              />
                            </div>
                          ))}
                        </div>
                        <Input
                          placeholder="Explanation (optional)"
                          value={q.explanation}
                          onChange={e => updateQuestion(qi, "explanation", e.target.value)}
                          className="text-sm"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button onClick={handleCreate} disabled={createMutation.isPending} className="w-full" data-testid="button-save-quiz">
                  {createMutation.isPending ? "Creating..." : "Create Quiz"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-20 w-full" />)}</div>
        ) : !(quizzes as any[]).length ? (
          <div className="text-center py-16 text-muted-foreground">
            <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-base font-medium">No quizzes yet</p>
            <p className="text-sm mt-1">Create quizzes for your students to test their knowledge</p>
          </div>
        ) : (
          <div className="space-y-3">
            {(quizzes as any[]).map((q: any) => (
              <Card key={q.id} data-testid={`card-quiz-${q.id}`}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">{q.title}</div>
                    <div className="text-xs text-muted-foreground">{q.subject} · Grade {q.grade} · {q.topic} · {(q.questions as any[]).length} questions</div>
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
