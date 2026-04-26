import { useState } from "react";
import TeacherSidebar from "@/components/layout/teacher-sidebar";
import { useUpdateUser, getGetMeQueryKey } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { BOARDS, BOARD_LABELS, GRADES, DIVISIONS, SUBJECTS } from "@/lib/topics-data";
import { User, Key, Copy, Check } from "lucide-react";

export default function TeacherProfile() {
  const { user, refetchUser } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    school: user?.school || "",
    grade: user?.grade || "",
    division: user?.division || "",
    board: user?.board || "",
    subject: user?.subject || "",
    aiApiKey: "",
  });

  const setField = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const updateMutation = useUpdateUser({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
        refetchUser();
        toast({ title: "Profile updated!" });
      },
    },
  });

  const handleSave = () => {
    const updates: any = { ...form };
    if (!updates.aiApiKey) delete updates.aiApiKey;
    updateMutation.mutate({ id: user!.id, data: updates });
  };

  const copyCode = () => {
    if (user?.teacherCode) {
      navigator.clipboard.writeText(user.teacherCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Manage your account and preferences</p>
          </div>

          {/* Teacher Code */}
          <Card className="mb-5">
            <CardHeader>
              <CardTitle className="text-base">Your Teacher Code</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Share this code with your students so they can link their account to your class</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 text-center py-3 bg-primary/5 rounded-xl font-bold text-2xl tracking-widest text-primary border border-primary/20" data-testid="text-teacher-code">
                  {user?.teacherCode || "—"}
                </div>
                <Button variant="outline" size="sm" className="gap-2" onClick={copyCode} data-testid="button-copy-code">
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Info */}
          <Card className="mb-5">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Full Name</Label>
                <Input value={form.name} onChange={e => setField("name", e.target.value)} data-testid="input-name" />
              </div>
              <div className="space-y-1.5">
                <Label>School</Label>
                <Input placeholder="Your school name" value={form.school} onChange={e => setField("school", e.target.value)} data-testid="input-school" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Board</Label>
                  <Select value={form.board} onValueChange={v => setField("board", v)}>
                    <SelectTrigger><SelectValue placeholder="Select board" /></SelectTrigger>
                    <SelectContent>{BOARDS.map(b => <SelectItem key={b} value={b}>{BOARD_LABELS[b]}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Subject You Teach</Label>
                  <Select value={form.subject} onValueChange={v => setField("subject", v)}>
                    <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                    <SelectContent>{SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Grade</Label>
                  <Select value={form.grade} onValueChange={v => setField("grade", v)}>
                    <SelectTrigger><SelectValue placeholder="Grade" /></SelectTrigger>
                    <SelectContent>{GRADES.map(g => <SelectItem key={g} value={g}>Grade {g}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Division</Label>
                  <Select value={form.division} onValueChange={v => setField("division", v)}>
                    <SelectTrigger><SelectValue placeholder="Division" /></SelectTrigger>
                    <SelectContent>{DIVISIONS.map(d => <SelectItem key={d} value={d}>Division {d}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI API Key */}
          <Card className="mb-5">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Key className="w-4 h-4 text-violet-500" /> AI Content Generator Key
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Add your OpenAI API key to use the AI content generator when creating lessons.
                Your key is stored securely and is only used to generate content on your behalf.
              </p>
              <div className="space-y-1.5">
                <Label htmlFor="aiKey">OpenAI API Key</Label>
                <Input
                  id="aiKey"
                  type="password"
                  placeholder="sk-... (leave blank to keep existing)"
                  value={form.aiApiKey}
                  onChange={e => setField("aiApiKey", e.target.value)}
                  data-testid="input-ai-key"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary underline">platform.openai.com</a>
              </p>
            </CardContent>
          </Card>

          <Button onClick={handleSave} disabled={updateMutation.isPending} data-testid="button-save">
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </main>
    </div>
  );
}
