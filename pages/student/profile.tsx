import { useState } from "react";
import StudentSidebar from "@/components/layout/student-sidebar";
import { useUpdateUser, getGetMeQueryKey } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { BOARDS, BOARD_LABELS, GRADES, DIVISIONS } from "@/lib/topics-data";
import { User, Star, Award } from "lucide-react";

export default function StudentProfile() {
  const { user, refetchUser } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: user?.name || "",
    school: user?.school || "",
    grade: user?.grade || "",
    division: user?.division || "",
    board: user?.board || "",
    teacherCode: "",
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
    if (!updates.teacherCode) delete updates.teacherCode;
    updateMutation.mutate({ id: user!.id, data: updates });
  };

  return (
    <div className="flex min-h-screen">
      <StudentSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        <div className="max-w-xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Manage your account settings</p>
          </div>

          {/* Avatar Card */}
          <Card className="mb-5 bg-gradient-to-br from-indigo-950 to-violet-900 text-white border-0">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-400 flex items-center justify-center text-3xl font-bold text-white">
                {user?.name?.charAt(0)}
              </div>
              <div>
                <div className="text-lg font-bold">{user?.name}</div>
                <div className="text-white/60 text-sm">{user?.email}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs text-white/70">Grade {user?.grade} · {user?.board} · Division {user?.division}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <Card className="mb-5">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> Personal Information
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
              <div className="space-y-1.5">
                <Label>Board</Label>
                <Select value={form.board} onValueChange={v => setField("board", v)}>
                  <SelectTrigger><SelectValue placeholder="Select board" /></SelectTrigger>
                  <SelectContent>{BOARDS.map(b => <SelectItem key={b} value={b}>{BOARD_LABELS[b]}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
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

          {/* Teacher Code */}
          <Card className="mb-5">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" /> Link to Teacher
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Enter your teacher's code to access their lessons and get attendance tracked.
              </p>
              {user?.teacherId ? (
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-lg px-4 py-3 text-sm">
                  ✓ You are linked to a teacher
                </div>
              ) : (
                <div className="space-y-1.5">
                  <Label>Teacher Code</Label>
                  <Input
                    placeholder="Enter teacher code (e.g., TCH123456)"
                    value={form.teacherCode}
                    onChange={e => setField("teacherCode", e.target.value.toUpperCase())}
                    data-testid="input-teacher-code"
                  />
                </div>
              )}
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
