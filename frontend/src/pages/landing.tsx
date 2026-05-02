import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Star, Users, Shield, Globe, Award } from "lucide-react";

export default function Landing() {
  const { user } = useAuth();

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome back, {user.name}!</h2>
          <Link href={user.role === "teacher" ? "/teacher" : "/student"}>
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-900 text-white">
      {/* Header */}
      <header className="px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-400 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg">EduGen ClassLink</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-amber-400 hover:bg-amber-500 text-white border-0">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-8 py-20 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
          <Star className="w-3.5 h-3.5 text-amber-400" />
          <span>Helping students catch up — from home</span>
        </div>
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Never Miss a Lesson<br />
          <span className="text-amber-400">Ever Again</span>
        </h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
          EduGen ClassLink connects teachers and absent students. Teachers publish lessons, activities, and videos.
          Students access them at home, play educational games, and track their own progress — all organized by board, grade, and subject.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/register">
            <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-white border-0 px-8 py-3 text-base font-semibold">
              Start for Free
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-base">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: BookOpen,
              color: "bg-blue-500",
              title: "Lesson Publishing",
              desc: "Teachers publish lessons with content, videos, and activities for students who were absent. Students access everything from home."
            },
            {
              icon: Gamepad2 as any,
              color: "bg-emerald-500",
              title: "Educational Games",
              desc: "Grade-wise games for Math, English, Science, and Hindi — topics scale appropriately for each grade level. Students learn while playing."
            },
            {
              icon: Award,
              color: "bg-amber-500",
              title: "Badges & Progress",
              desc: "Students earn achievement badges, track progress by subject, and build learning streaks. Gamified motivation that actually works."
            },
            {
              icon: Users,
              color: "bg-violet-500",
              title: "Attendance Tracking",
              desc: "Teachers mark daily attendance, see who was absent, and automatically ensure those students see the day's lesson."
            },
            {
              icon: Shield,
              color: "bg-rose-500",
              title: "5 Boards Supported",
              desc: "IGCSE, CBSE, IB, ICSE, and State Boards. Content and curriculum organized by board for all grades 1 to 12."
            },
            {
              icon: Globe,
              color: "bg-cyan-500",
              title: "External Resources",
              desc: "Curated external learning platforms including Kahoot, ABCya, Khan Academy, Toy Theater, and board-specific resources."
            },
          ].map(({ icon: Icon, color, title, desc }) => (
            <div key={title} className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-16 text-center">
        <div className="max-w-xl mx-auto bg-white/5 rounded-3xl p-10 border border-white/10">
          <h2 className="text-3xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-white/60 mb-8">Join thousands of teachers and students using EduGen ClassLink</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register?role=teacher">
              <Button className="bg-primary text-white border-0 w-full sm:w-auto">I am a Teacher</Button>
            </Link>
            <Link href="/register?role=student">
              <Button className="bg-amber-400 hover:bg-amber-500 text-white border-0 w-full sm:w-auto">I am a Student</Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-8 py-8 text-center text-white/30 text-sm border-t border-white/5">
        EduGen ClassLink — Education for every child, everywhere
      </footer>
    </div>
  );
}

function Gamepad2(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/>
      <line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/>
      <rect x="2" y="6" width="20" height="12" rx="2"/>
    </svg>
  );
}
