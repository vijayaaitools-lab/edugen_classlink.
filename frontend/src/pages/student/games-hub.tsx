import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StudentSidebar from "@/components/layout/student-sidebar";
import MathGame from "@/components/games/MathGame";
import EnglishGame from "@/components/games/EnglishGame";
import ScienceGame from "@/components/games/ScienceGame";
import HindiGame from "@/components/games/HindiGame";

type Subject = "math" | "english" | "science" | "hindi" | null;

const subjects = [
  {
    id: "math" as Subject,
    name: "Mathematics",
    emoji: "🔢",
    description: "Numbers, Algebra, Geometry & more",
    topics: 8,
    questions: 40,
    gradient: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
  },
  {
    id: "english" as Subject,
    name: "English",
    emoji: "📚",
    description: "Grammar, Vocabulary, Literature & more",
    topics: 8,
    questions: 40,
    gradient: "from-green-500 to-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
  },
  {
    id: "science" as Subject,
    name: "Science",
    emoji: "🔬",
    description: "Physics, Biology, Chemistry & more",
    topics: 8,
    questions: 40,
    gradient: "from-purple-500 to-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
  },
  {
    id: "hindi" as Subject,
    name: "Hindi / हिंदी",
    emoji: "🇮🇳",
    description: "व्याकरण, साहित्य, मुहावरे & more",
    topics: 7,
    questions: 35,
    gradient: "from-orange-500 to-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
  },
];

export default function GamesHub() {
  const [active, setActive] = useState<Subject>(null);

  const activeSubject = subjects.find(s => s.id === active);

  return (
    <div className="flex min-h-screen">
      <StudentSidebar />
      <main className="flex-1 p-6 bg-background overflow-auto">
    <div className="max-w-4xl mx-auto space-y-6">
      {!active ? (
        <>
          <div className="text-center py-4">
            <div className="text-5xl mb-3">🎮</div>
            <h1 className="text-3xl font-bold text-gray-800">Learning Games</h1>
            <p className="text-gray-500 mt-2">
              Practice with interactive quizzes — pick a subject and start earning stars!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subjects.map(sub => (
              <button
                key={sub.id}
                onClick={() => setActive(sub.id)}
                className="text-left group"
              >
                <Card className={`border-2 ${sub.border} hover:shadow-lg transition-all group-hover:scale-[1.02] overflow-hidden`}>
                  <div className={`bg-gradient-to-r ${sub.gradient} p-5 text-white`}>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{sub.emoji}</span>
                      <div>
                        <div className="font-bold text-xl">{sub.name}</div>
                        <div className="text-white/80 text-sm">{sub.description}</div>
                      </div>
                    </div>
                  </div>
                  <CardContent className={`${sub.bg} pt-4 pb-4`}>
                    <div className="flex gap-4 text-sm">
                      <div className={sub.text}>
                        <span className="font-bold">{sub.topics}</span> Topics
                      </div>
                      <div className="text-gray-400">•</div>
                      <div className={sub.text}>
                        <span className="font-bold">{sub.questions}+</span> Questions
                      </div>
                      <div className="ml-auto">
                        <span className="bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-600 shadow-sm border">
                          Play Now →
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 flex items-center gap-4">
            <span className="text-3xl">🏅</span>
            <div>
              <div className="font-semibold text-amber-800">Earn Badges as You Play!</div>
              <div className="text-sm text-amber-700">Score 80%+ on any topic to earn a subject badge and level up.</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActive(null)}
              className="gap-1 text-gray-600"
            >
              <ArrowLeft className="w-4 h-4" />
              All Subjects
            </Button>
            {activeSubject && (
              <div className={`flex items-center gap-2 ${activeSubject.text} font-semibold`}>
                <span>{activeSubject.emoji}</span>
                {activeSubject.name}
              </div>
            )}
          </div>

          <Card className="p-6">
            {active === "math" && <MathGame />}
            {active === "english" && <EnglishGame />}
            {active === "science" && <ScienceGame />}
            {active === "hindi" && <HindiGame />}
          </Card>
        </>
      )}
    </div>
      </main>
    </div>
  );
}
