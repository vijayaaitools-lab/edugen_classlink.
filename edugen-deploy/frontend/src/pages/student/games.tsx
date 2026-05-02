import { useState } from "react";
import { useLocation } from "wouter";
import StudentSidebar from "@/components/layout/student-sidebar";
import { useAuth } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PRELOADED_TOPICS, SUBJECTS, GRADES, getTopicsForGrade, searchTopics } from "@/lib/topics-data";
import { Search, ExternalLink, Star, Gamepad2, Globe } from "lucide-react";

const EXTERNAL_GAME_SITES = [
  // Fun/Games
  { name: "ABCya", url: "https://www.abcya.com", emoji: "🎨", desc: "200+ games, Grades K-6", tag: "Games", color: "bg-orange-500" },
  { name: "Toy Theater", url: "https://toytheater.com", emoji: "🎭", desc: "Math, art, music games", tag: "Games", color: "bg-red-500" },
  { name: "Funbrain", url: "https://www.funbrain.com", emoji: "🧠", desc: "Games, books & videos K-8", tag: "Games", color: "bg-teal-500" },
  { name: "Cool Math Games", url: "https://www.coolmathgames.com", emoji: "🎲", desc: "Logic & math games Gr 5-12", tag: "Math", color: "bg-lime-600" },
  { name: "Math Playground", url: "https://www.mathplayground.com", emoji: "🔢", desc: "Math games Grades 1-6", tag: "Math", color: "bg-blue-500" },
  { name: "Prodigy Math", url: "https://www.prodigygame.com", emoji: "🧙", desc: "Math RPG adventure Gr 1-8", tag: "Math", color: "bg-indigo-600" },
  { name: "Splash Learn", url: "https://www.splashlearn.com", emoji: "💧", desc: "AI math & reading Gr K-5", tag: "AI", color: "bg-cyan-500" },
  { name: "Starfall", url: "https://www.starfall.com", emoji: "⭐", desc: "Phonics & reading Gr K-3", tag: "English", color: "bg-yellow-500" },
  // Knowledge
  { name: "Kahoot!", url: "https://kahoot.com", emoji: "🎮", desc: "Play quiz games live", tag: "Quiz", color: "bg-purple-600" },
  { name: "Quizizz", url: "https://quizizz.com", emoji: "🏆", desc: "Self-paced quiz games", tag: "Quiz", color: "bg-violet-600" },
  { name: "Blooket", url: "https://www.blooket.com", emoji: "🌟", desc: "Game-mode quizzes", tag: "Quiz", color: "bg-green-600" },
  { name: "Baamboozle", url: "https://www.baamboozle.com", emoji: "🎯", desc: "Team quiz games, free!", tag: "Quiz", color: "bg-pink-600" },
  // Science / Learning
  { name: "National Geographic Kids", url: "https://kids.nationalgeographic.com", emoji: "🌍", desc: "Science & nature content", tag: "Science", color: "bg-yellow-600" },
  { name: "NASA Kids Club", url: "https://www.nasa.gov/kidsclub", emoji: "🚀", desc: "Space science games", tag: "Science", color: "bg-blue-800" },
  { name: "TED-Ed", url: "https://ed.ted.com", emoji: "🎬", desc: "Educational animated videos", tag: "Videos", color: "bg-red-600" },
  { name: "Khan Academy", url: "https://www.khanacademy.org", emoji: "🎓", desc: "Free learning all subjects", tag: "Learning", color: "bg-green-700" },
  // Coding
  { name: "Scratch (MIT)", url: "https://scratch.mit.edu", emoji: "🐱", desc: "Create games & animations", tag: "Coding", color: "bg-orange-500" },
  { name: "Code.org", url: "https://code.org", emoji: "💻", desc: "Coding courses for all ages", tag: "Coding", color: "bg-teal-600" },
];

const SUBJECT_COLORS: Record<string, string> = {
  Math: "bg-blue-100 text-blue-700 border-blue-200",
  English: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Science: "bg-violet-100 text-violet-700 border-violet-200",
  Hindi: "bg-amber-100 text-amber-700 border-amber-200",
  default: "bg-gray-100 text-gray-700 border-gray-200",
};

const SUBJECT_EMOJIS: Record<string, string> = {
  Math: "🔢",
  English: "📚",
  Science: "🔬",
  Hindi: "🅰",
  "Social Studies": "🌍",
  "Computer Science": "💻",
  default: "🎮",
};

export default function StudentGames() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterGrade, setFilterGrade] = useState(user?.grade || "all");

  let topics = search ? searchTopics(search) : PRELOADED_TOPICS;
  if (filterSubject !== "all") topics = topics.filter(t => t.subject === filterSubject);
  if (filterGrade !== "all") topics = topics.filter(t => t.grade === filterGrade);

  const myGradeTopics = user?.grade ? getTopicsForGrade(user.grade) : [];
  const showMyGrade = !search && filterSubject === "all" && filterGrade !== "all" && filterGrade === user?.grade;

  return (
    <div className="flex min-h-screen">
      <StudentSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Games & Learning Play</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {PRELOADED_TOPICS.length}+ topics and games for all grades — play and learn!
          </p>
        </div>

        {/* In-app Games Banner */}
        <div className="mb-6 rounded-2xl overflow-hidden shadow-md">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-5 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-5xl">🎮</div>
                <div>
                  <div className="font-bold text-xl">Play In-App Games</div>
                  <div className="text-white/80 text-sm mt-0.5">
                    Interactive quizzes for Math, English, Science & Hindi — no internet required!
                  </div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {[
                      { emoji: "🔢", label: "Math", color: "bg-blue-500" },
                      { emoji: "📚", label: "English", color: "bg-green-500" },
                      { emoji: "🔬", label: "Science", color: "bg-purple-500" },
                      { emoji: "🇮🇳", label: "Hindi", color: "bg-orange-500" },
                    ].map(s => (
                      <span key={s.label} className={`${s.color} text-xs px-2 py-0.5 rounded-full font-medium`}>
                        {s.emoji} {s.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <Button
                onClick={() => navigate("/student/games/play")}
                className="bg-white text-indigo-700 hover:bg-white/90 font-bold px-6 shrink-0"
              >
                <Gamepad2 className="w-4 h-4 mr-2" />
                Start Playing
              </Button>
            </div>
          </div>
          <div className="bg-indigo-50 border-t border-indigo-100 px-5 py-2 text-xs text-indigo-600 flex gap-4">
            <span>✨ 4 subjects</span>
            <span>•</span>
            <span>🎯 30+ topics</span>
            <span>•</span>
            <span>📝 150+ questions</span>
            <span>•</span>
            <span>⏱️ Timed quizzes</span>
            <span>•</span>
            <span>💡 Instant explanations</span>
          </div>
        </div>

        {/* External Game Sites */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-indigo-500" />
            <span className="font-semibold text-sm">Free Online Game Sites</span>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{EXTERNAL_GAME_SITES.length} sites</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-2">
            {EXTERNAL_GAME_SITES.map(site => (
              <button
                key={site.name}
                onClick={() => window.open(site.url, "_blank")}
                title={site.desc}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-border bg-card hover:shadow-md hover:-translate-y-0.5 transition-all text-center group"
              >
                <div className={`w-8 h-8 rounded-lg ${site.color} flex items-center justify-center text-base shrink-0`}>
                  {site.emoji}
                </div>
                <div className="text-[10px] font-semibold leading-tight group-hover:text-primary transition-colors">{site.name}</div>
                <div className="text-[9px] text-muted-foreground leading-tight hidden sm:block">{site.tag}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-border mb-5" />

        {/* Quick subject access */}
        {!search && (
          <div className="flex flex-wrap gap-3 mb-6">
            {["Math", "English", "Science", "Hindi"].map(s => (
              <button
                key={s}
                onClick={() => setFilterSubject(filterSubject === s ? "all" : s)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all hover:scale-105 ${
                  filterSubject === s
                    ? SUBJECT_COLORS[s]
                    : "bg-muted border-border hover:border-primary/50 text-muted-foreground"
                }`}
                data-testid={`button-subject-${s.toLowerCase()}`}
              >
                <span>{SUBJECT_EMOJIS[s] || "🎮"}</span>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-48">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search topics..."
              className="pl-9"
              value={search}
              onChange={e => setSearch(e.target.value)}
              data-testid="input-search"
            />
          </div>
          {!["Math","English","Science","Hindi"].includes(filterSubject) && (
            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger className="w-40"><SelectValue placeholder="All Subjects" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
          <Select value={filterGrade} onValueChange={setFilterGrade}>
            <SelectTrigger className="w-36" data-testid="select-grade">
              <SelectValue placeholder="My Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              {user?.grade && <SelectItem value={user.grade}>My Grade ({user.grade})</SelectItem>}
              {GRADES.filter(g => g !== user?.grade).map(g => <SelectItem key={g} value={g}>Grade {g}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {showMyGrade && myGradeTopics.length > 0 && (
          <div className="mb-3 flex items-center gap-2 text-sm text-amber-600">
            <Star className="w-4 h-4" />
            <span>Showing topics for your grade ({user?.grade})</span>
          </div>
        )}

        <div className="text-sm text-muted-foreground mb-4">{topics.length} topics found</div>

        {topics.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <span className="text-5xl block mb-3">🎮</span>
            <p>No topics found for this search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map(topic => {
              const subjectColor = SUBJECT_COLORS[topic.subject] || SUBJECT_COLORS.default;
              return (
                <Card key={topic.id} className="hover:shadow-lg transition-all hover:-translate-y-0.5" data-testid={`card-topic-${topic.id}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className={`text-xs font-medium px-2 py-0.5 rounded-md border ${subjectColor}`}>
                        {SUBJECT_EMOJIS[topic.subject] || "🎮"} {topic.subject}
                      </div>
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-md">
                        Grade {topic.grade}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{topic.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{topic.description}</p>
                    <Button
                      size="sm"
                      className="w-full gap-2 text-xs"
                      onClick={() => window.open(topic.gameUrl, "_blank")}
                      data-testid={`button-play-${topic.id}`}
                    >
                      <ExternalLink className="w-3 h-3" /> Play & Learn
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
