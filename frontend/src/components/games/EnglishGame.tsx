import { useState, useEffect, useCallback } from "react";
import { englishGames, type GameTopic } from "@/lib/game-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type GamePhase = "select" | "playing" | "result";

export default function EnglishGame() {
  const [phase, setPhase] = useState<GamePhase>("select");
  const [selectedTopic, setSelectedTopic] = useState<GameTopic | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleTimeout = useCallback(() => {
    if (selected !== null) return;
    const topic = selectedTopic!;
    setAnswers(a => [...a, null]);
    setShowExplanation(true);
    setTimeout(() => {
      if (currentQ + 1 >= topic.questions.length) {
        setPhase("result");
      } else {
        setCurrentQ(q => q + 1);
        setSelected(null);
        setShowExplanation(false);
        setTimeLeft(30);
      }
    }, 1800);
  }, [selected, selectedTopic, currentQ]);

  useEffect(() => {
    if (phase !== "playing" || showExplanation) return;
    if (timeLeft <= 0) { handleTimeout(); return; }
    const t = setTimeout(() => setTimeLeft(tl => tl - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft, showExplanation, handleTimeout]);

  function startGame(topic: GameTopic) {
    setSelectedTopic(topic);
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setAnswers([]);
    setTimeLeft(30);
    setShowExplanation(false);
    setPhase("playing");
  }

  function handleAnswer(idx: number) {
    if (selected !== null || showExplanation) return;
    setSelected(idx);
    const topic = selectedTopic!;
    const q = topic.questions[currentQ];
    if (idx === q.correct) setScore(s => s + 1);
    setAnswers(a => [...a, idx]);
    setShowExplanation(true);
    setTimeout(() => {
      if (currentQ + 1 >= topic.questions.length) {
        setPhase("result");
      } else {
        setCurrentQ(q => q + 1);
        setSelected(null);
        setShowExplanation(false);
        setTimeLeft(30);
      }
    }, 1800);
  }

  const topicColors = [
    "from-green-500 to-green-700",
    "from-emerald-500 to-emerald-700",
    "from-teal-500 to-teal-700",
    "from-lime-500 to-lime-700",
    "from-green-600 to-teal-700",
    "from-emerald-600 to-green-700",
    "from-teal-600 to-emerald-700",
    "from-lime-600 to-green-700",
  ];

  if (phase === "select") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-5xl mb-3">📚</div>
          <h2 className="text-2xl font-bold text-green-700">English</h2>
          <p className="text-gray-500 mt-1">Choose a topic to practice</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {englishGames.topics.map((topic, i) => (
            <button
              key={topic.id}
              onClick={() => startGame(topic)}
              className={cn(
                "bg-gradient-to-br text-white rounded-xl p-4 text-center hover:scale-105 transition-all shadow-md cursor-pointer",
                topicColors[i % topicColors.length]
              )}
            >
              <div className="text-3xl mb-2">{topic.icon}</div>
              <div className="font-semibold text-sm">{topic.name}</div>
              <div className="text-xs opacity-80 mt-1">{topic.questions.length} questions</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === "playing" && selectedTopic) {
    const q = selectedTopic.questions[currentQ];
    const total = selectedTopic.questions.length;
    const progress = (currentQ / total) * 100;

    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-green-700">{selectedTopic.icon} {selectedTopic.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-green-700 border-green-300">
              ⭐ {score}/{total}
            </Badge>
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm",
              timeLeft <= 10 ? "bg-red-500 animate-pulse" : "bg-green-500"
            )}>
              {timeLeft}
            </div>
          </div>
        </div>

        <Progress value={progress} className="h-2 [&>div]:bg-green-500" />

        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="text-xs text-green-500 font-medium mb-2">Question {currentQ + 1} of {total}</div>
          <p className="text-gray-800 font-semibold text-lg">{q.question}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {q.options.map((opt, idx) => {
            let cls = "border-2 border-gray-200 bg-white hover:border-green-400 hover:bg-green-50";
            if (showExplanation) {
              if (idx === q.correct) cls = "border-2 border-green-500 bg-green-50";
              else if (idx === selected) cls = "border-2 border-red-400 bg-red-50";
              else cls = "border-2 border-gray-200 bg-gray-50 opacity-60";
            }
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showExplanation}
                className={cn(
                  "rounded-xl p-3 text-left transition-all font-medium text-sm",
                  cls,
                  !showExplanation && "cursor-pointer"
                )}
              >
                <span className="mr-2 text-green-500 font-bold">{["A", "B", "C", "D"][idx]}.</span>
                {opt}
              </button>
            );
          })}
        </div>

        {showExplanation && q.explanation && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
            💡 {q.explanation}
          </div>
        )}
      </div>
    );
  }

  if (phase === "result" && selectedTopic) {
    const total = selectedTopic.questions.length;
    const pct = Math.round((score / total) * 100);
    return (
      <div className="text-center space-y-6 py-4">
        <div className="text-6xl">{pct >= 80 ? "🏆" : pct >= 50 ? "⭐" : "📚"}</div>
        <div>
          <h3 className="text-2xl font-bold text-green-700">
            {pct >= 80 ? "Excellent!" : pct >= 50 ? "Good Job!" : "Keep Practicing!"}
          </h3>
          <p className="text-gray-500 mt-1">{selectedTopic.name} Complete</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-6 inline-block">
          <div className="text-5xl font-bold text-green-600">{score}/{total}</div>
          <div className="text-gray-500 mt-1">Score • {pct}%</div>
        </div>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => startGame(selectedTopic)} className="bg-green-600 hover:bg-green-700">
            Try Again
          </Button>
          <Button variant="outline" onClick={() => setPhase("select")}>
            Change Topic
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
