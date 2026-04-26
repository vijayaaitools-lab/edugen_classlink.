import { useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap } from "lucide-react";
import { GRADES, DIVISIONS, BOARDS, BOARD_LABELS, SUBJECTS } from "@/lib/topics-data";

export default function Register() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const defaultRole = (params.get("role") as "teacher" | "student") || "student";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: defaultRole,
    grade: "",
    division: "",
    board: "",
    subject: "",
    school: "",
    teacherCode: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const [, setLocation] = useLocation();

  const setField = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      setLocation(form.role === "teacher" ? "/teacher" : "/student");
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-white/60 text-sm mt-1">Join EduGen ClassLink today</p>
        </div>

        <Card className="border-0 shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Register</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selector */}
              <div className="space-y-1.5">
                <Label>I am a</Label>
                <div className="grid grid-cols-2 gap-3">
                  {["teacher", "student"].map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setField("role", r)}
                      className={`py-2.5 rounded-lg border text-sm font-medium transition-colors capitalize ${
                        form.role === r
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50"
                      }`}
                      data-testid={`button-role-${r}`}
                    >
                      {r === "teacher" ? "Teacher" : "Student"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Your full name" value={form.name} onChange={e => setField("name", e.target.value)} required data-testid="input-name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={e => setField("email", e.target.value)} required data-testid="input-email" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Choose a password" value={form.password} onChange={e => setField("password", e.target.value)} required data-testid="input-password" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="school">School Name</Label>
                <Input id="school" placeholder="Your school name" value={form.school} onChange={e => setField("school", e.target.value)} data-testid="input-school" />
              </div>
              <div className="space-y-1.5">
                <Label>Board</Label>
                <Select value={form.board} onValueChange={v => setField("board", v)}>
                  <SelectTrigger data-testid="select-board"><SelectValue placeholder="Select board" /></SelectTrigger>
                  <SelectContent>
                    {BOARDS.map(b => <SelectItem key={b} value={b}>{BOARD_LABELS[b]}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Grade</Label>
                  <Select value={form.grade} onValueChange={v => setField("grade", v)}>
                    <SelectTrigger data-testid="select-grade"><SelectValue placeholder="Grade" /></SelectTrigger>
                    <SelectContent>
                      {GRADES.map(g => <SelectItem key={g} value={g}>Grade {g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Division</Label>
                  <Select value={form.division} onValueChange={v => setField("division", v)}>
                    <SelectTrigger data-testid="select-division"><SelectValue placeholder="Division" /></SelectTrigger>
                    <SelectContent>
                      {DIVISIONS.map(d => <SelectItem key={d} value={d}>Division {d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {form.role === "teacher" && (
                <div className="space-y-1.5">
                  <Label>Subject You Teach</Label>
                  <Select value={form.subject} onValueChange={v => setField("subject", v)}>
                    <SelectTrigger data-testid="select-subject"><SelectValue placeholder="Select subject" /></SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {form.role === "student" && (
                <div className="space-y-1.5">
                  <Label htmlFor="teacherCode">Teacher Code (optional)</Label>
                  <Input id="teacherCode" placeholder="Enter your teacher's code" value={form.teacherCode} onChange={e => setField("teacherCode", e.target.value)} data-testid="input-teacher-code" />
                  <p className="text-xs text-muted-foreground">Ask your teacher for their code to access their lessons</p>
                </div>
              )}

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md" data-testid="text-error">{error}</div>
              )}

              <Button type="submit" className="w-full" disabled={loading} data-testid="button-submit">
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-5 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
