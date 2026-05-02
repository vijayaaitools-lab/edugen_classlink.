import { useState } from "react";
import { useLocation } from "wouter";
import TeacherSidebar from "@/components/layout/teacher-sidebar";
import { useCreateLesson, getListLessonsQueryKey } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { SUBJECTS, GRADES, DIVISIONS, BOARDS, BOARD_LABELS } from "@/lib/topics-data";
import { Plus, Trash2, Youtube, Search, Bot, ChevronDown, ChevronUp, X, ExternalLink } from "lucide-react";

export default function TeacherLessonNew() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const [form, setForm] = useState({
    title: "",
    subject: user?.subject || "",
    grade: user?.grade || "",
    division: user?.division || "",
    board: user?.board || "",
    topic: "",
    description: "",
    content: "",
    videoUrl: "",
    lessonDate: new Date().toISOString().split("T")[0],
    resourceUrls: [] as string[],
  });
  const [newResource, setNewResource] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const [aiKey, setAiKey] = useState(user?.aiApiKey || "");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const setField = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const createMutation = useCreateLesson({
    mutation: {
      onSuccess: (lesson: any) => {
        queryClient.invalidateQueries({ queryKey: getListLessonsQueryKey({ teacherId: user?.id }) });
        toast({ title: "Lesson created!" });
        setLocation(`/teacher/lessons/${lesson.id}`);
      },
      onError: () => toast({ title: "Failed to create lesson", variant: "destructive" }),
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ data: { ...form, resourceUrls: form.resourceUrls } });
  };

  const addResource = () => {
    if (newResource.trim()) {
      setForm(f => ({ ...f, resourceUrls: [...f.resourceUrls, newResource.trim()] }));
      setNewResource("");
    }
  };

  const removeResource = (i: number) => {
    setForm(f => ({ ...f, resourceUrls: f.resourceUrls.filter((_, idx) => idx !== i) }));
  };

  const generateWithAI = async () => {
    if (!aiKey) {
      toast({ title: "Please enter your OpenAI API key", variant: "destructive" });
      return;
    }
    if (!aiPrompt) {
      toast({ title: "Please describe what content to generate", variant: "destructive" });
      return;
    }
    setAiLoading(true);
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${aiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are a helpful teacher assistant. Create educational lesson content for ${form.subject || "the subject"}, Grade ${form.grade || "unknown"}, Topic: ${form.topic || "general"}. Write clear, age-appropriate content.`
            },
            { role: "user", content: aiPrompt }
          ],
          max_tokens: 800,
        }),
      });
      const data = await response.json();
      if (data.choices?.[0]?.message?.content) {
        const generated = data.choices[0].message.content;
        setField("content", form.content ? form.content + "\n\n" + generated : generated);
        toast({ title: "Content generated!" });
      } else {
        toast({ title: "No content returned. Check your API key.", variant: "destructive" });
      }
    } catch {
      toast({ title: "AI generation failed. Check your API key.", variant: "destructive" });
    } finally {
      setAiLoading(false);
    }
  };

  const searchYouTube = () => {
    const query = `${form.subject} ${form.topic} Grade ${form.grade} lesson`;
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, "_blank");
  };

  const searchWeb = () => {
    const query = `${form.subject} ${form.topic} Grade ${form.grade} lesson plan`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
  };

  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Create New Lesson</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Fill in the lesson details for your students</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Card>
              <CardHeader><CardTitle className="text-base">Lesson Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="title">Lesson Title *</Label>
                  <Input id="title" placeholder="e.g., Introduction to Fractions" value={form.title} onChange={e => setField("title", e.target.value)} required data-testid="input-title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Subject *</Label>
                    <Select value={form.subject} onValueChange={v => setField("subject", v)}>
                      <SelectTrigger data-testid="select-subject"><SelectValue placeholder="Select subject" /></SelectTrigger>
                      <SelectContent>{SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Topic *</Label>
                    <Input placeholder="e.g., Fractions - Half and Quarter" value={form.topic} onChange={e => setField("topic", e.target.value)} required data-testid="input-topic" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label>Grade *</Label>
                    <Select value={form.grade} onValueChange={v => setField("grade", v)}>
                      <SelectTrigger data-testid="select-grade"><SelectValue placeholder="Grade" /></SelectTrigger>
                      <SelectContent>{GRADES.map(g => <SelectItem key={g} value={g}>Grade {g}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Division</Label>
                    <Select value={form.division} onValueChange={v => setField("division", v)}>
                      <SelectTrigger data-testid="select-division"><SelectValue placeholder="Division" /></SelectTrigger>
                      <SelectContent>{DIVISIONS.map(d => <SelectItem key={d} value={d}>Div {d}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Board</Label>
                    <Select value={form.board} onValueChange={v => setField("board", v)}>
                      <SelectTrigger data-testid="select-board"><SelectValue placeholder="Board" /></SelectTrigger>
                      <SelectContent>{BOARDS.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="lessonDate">Date Taught in Class</Label>
                    <Input id="lessonDate" type="date" value={form.lessonDate} onChange={e => setField("lessonDate", e.target.value)} data-testid="input-lesson-date" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea id="description" placeholder="Brief description of what was covered" value={form.description} onChange={e => setField("description", e.target.value)} rows={2} data-testid="input-description" />
                </div>
              </CardContent>
            </Card>

            {/* AI Assistant */}
            <Card>
              <CardHeader>
                <button
                  type="button"
                  className="flex items-center justify-between w-full"
                  onClick={() => setAiOpen(!aiOpen)}
                  data-testid="button-toggle-ai"
                >
                  <CardTitle className="text-base flex items-center gap-2">
                    <Bot className="w-4 h-4 text-violet-500" /> AI Content Assistant
                    <span className="text-xs font-normal text-muted-foreground">— bring your own API key</span>
                  </CardTitle>
                  {aiOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </button>
              </CardHeader>
              {aiOpen && (
                <CardContent className="space-y-4 pt-0">
                  <div className="space-y-1.5">
                    <Label htmlFor="aiKey">Your OpenAI API Key</Label>
                    <Input id="aiKey" type="password" placeholder="sk-..." value={aiKey} onChange={e => setAiKey(e.target.value)} data-testid="input-ai-key" />
                    <p className="text-xs text-muted-foreground">Your key is never stored on our servers</p>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="aiPrompt">What content should the AI generate?</Label>
                    <Textarea id="aiPrompt" placeholder="e.g., Create a lesson explanation about fractions for Grade 3 students" value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} rows={2} data-testid="input-ai-prompt" />
                  </div>
                  <Button type="button" onClick={generateWithAI} disabled={aiLoading} className="gap-2" data-testid="button-generate-ai">
                    <Bot className="w-4 h-4" /> {aiLoading ? "Generating..." : "Generate Content"}
                  </Button>
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-3">No API key? Search for content instead:</p>
                    <div className="flex gap-3">
                      <Button type="button" variant="outline" size="sm" className="gap-2 text-red-600 border-red-200 hover:bg-red-50" onClick={searchYouTube} data-testid="button-search-youtube">
                        <Youtube className="w-4 h-4" /> Search YouTube
                      </Button>
                      <Button type="button" variant="outline" size="sm" className="gap-2" onClick={searchWeb} data-testid="button-search-web">
                        <Search className="w-4 h-4" /> Search Web
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Content */}
            <Card>
              <CardHeader><CardTitle className="text-base">Lesson Content</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="content">Lesson Notes / Explanation</Label>
                  <Textarea
                    id="content"
                    placeholder="Write the lesson content, notes, or paste AI-generated content here..."
                    value={form.content}
                    onChange={e => setField("content", e.target.value)}
                    rows={8}
                    data-testid="input-content"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="videoUrl">YouTube / Video URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="videoUrl"
                      placeholder="https://youtube.com/watch?v=..."
                      value={form.videoUrl}
                      onChange={e => setField("videoUrl", e.target.value)}
                      data-testid="input-video-url"
                    />
                    {form.videoUrl && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => window.open(form.videoUrl, "_blank")}>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Resource Links</Label>
                  {form.resourceUrls.map((url, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="flex-1 bg-muted rounded px-2 py-1.5 truncate text-muted-foreground" data-testid={`resource-url-${i}`}>{url}</div>
                      <Button type="button" variant="ghost" size="icon" className="shrink-0 h-7 w-7" onClick={() => removeResource(i)}>
                        <X className="w-3.5 h-3.5 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a resource URL..."
                      value={newResource}
                      onChange={e => setNewResource(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addResource())}
                      data-testid="input-new-resource"
                    />
                    <Button type="button" variant="outline" onClick={addResource} data-testid="button-add-resource">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button type="submit" disabled={createMutation.isPending} data-testid="button-save">
                {createMutation.isPending ? "Saving..." : "Save Lesson"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setLocation("/teacher/lessons")}>Cancel</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
