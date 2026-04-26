// 🔥 UPGRADED TEACHER GAMES + RESOURCE HUB (WITH WEB SEARCH)

import { useState } from "react";
import TeacherSidebar from "@/components/layout/teacher-sidebar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PRELOADED_TOPICS,
  SUBJECTS,
  GRADES,
  searchTopics,
} from "@/lib/topics-data";
import {
  Search,
  ExternalLink,
  Gamepad2,
  BookOpen,
  Lightbulb,
  Globe,
} from "lucide-react";

const ALL_GAME_SITES = [
  { name: "ABCya", url: "https://www.abcya.com", emoji: "🎨" },
  { name: "Toy Theater", url: "https://toytheater.com", emoji: "🎭" },
  { name: "Funbrain", url: "https://www.funbrain.com", emoji: "🧠" },
  {
    name: "Cool Math Games",
    url: "https://www.coolmathgames.com",
    emoji: "🎲",
  },
  {
    name: "Math Playground",
    url: "https://www.mathplayground.com",
    emoji: "🔢",
  },
  { name: "Prodigy", url: "https://www.prodigygame.com", emoji: "🧙" },
  { name: "SplashLearn", url: "https://www.splashlearn.com", emoji: "💧" },
  { name: "Starfall", url: "https://www.starfall.com", emoji: "⭐" },

  { name: "Kahoot!", url: "https://kahoot.com", emoji: "🎮" },
  { name: "Quizizz", url: "https://quizizz.com", emoji: "🏆" },
  { name: "Blooket", url: "https://www.blooket.com", emoji: "🌟" },
  { name: "Baamboozle", url: "https://www.baamboozle.com", emoji: "🎯" },
  { name: "Gimkit", url: "https://www.gimkit.com", emoji: "💰" },
  { name: "Wordwall", url: "https://wordwall.net", emoji: "🔤" },
  { name: "Nearpod", url: "https://nearpod.com", emoji: "📊" },
  { name: "Edpuzzle", url: "https://edpuzzle.com", emoji: "🎥" },
];

// 🔥 FUNCTION FOR WEB SEARCH
const handleWebSearch = (query: string) => {
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  window.open(searchUrl, "_blank");
};

export default function TeacherGames() {
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterGrade, setFilterGrade] = useState("all");

  let topics = search ? searchTopics(search) : PRELOADED_TOPICS;

  if (filterSubject !== "all")
    topics = topics.filter((t) => t.subject === filterSubject);
  if (filterGrade !== "all")
    topics = topics.filter((t) => t.grade === filterGrade);

  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        <h1 className="text-2xl font-bold mb-2">
          Teacher Games + Resource Hub
        </h1>
        <p className="text-muted-foreground text-sm mb-6">
          Games, AI tools, and classroom resources — all in one place
        </p>

        {/* 🌍 ALL GAME PLATFORMS */}
        <div className="mb-6">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-purple-500" /> All Game Platforms
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-2">
            {ALL_GAME_SITES.map((site) => (
              <button
                key={site.name}
                onClick={() => window.open(site.url, "_blank")}
                className="p-2 rounded-xl border hover:shadow-md text-center"
              >
                <div className="text-lg">{site.emoji}</div>
                <div className="text-xs font-semibold">{site.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 🧠 TEACHER AI TOOLS */}
        <div className="mb-6">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-500" /> AI Teaching Tools
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "Lesson Plan Generator",
              "Worksheet Creator",
              "Quiz Generator",
              "Activity Ideas",
              "Differentiation Strategy",
              "Story Generator",
              "Classroom Management Tips",
              "Engagement Ideas",
            ].map((tool) => (
              <Card key={tool} className="p-3 hover:shadow-md">
                <div className="text-sm font-medium mb-3 text-center">
                  {tool}
                </div>

                <div className="flex flex-col gap-2">
                  {/* AI Button */}
                  <Button size="sm" className="text-xs">
                    🤖 Generate
                  </Button>

                  {/* 🔥 Web Search Button */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => handleWebSearch(tool)}
                  >
                    <Globe className="w-3 h-3 mr-1" />
                    Web Search
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 📚 CLASSROOM RESOURCES */}
        <div className="mb-6">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-500" /> Classroom Resources
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "Math Activities",
              "Science Experiments",
              "English Games",
              "Circle Time Ideas",
              "Team Building Activities",
              "Attention Grabbers",
              "Gifted Student Strategies",
              "Weak Student Support",
            ].map((item) => (
              <Card key={item} className="p-3 hover:shadow-md">
                <div className="text-sm font-medium mb-2 text-center">
                  {item}
                </div>

                {/* 🔥 Web Search here also */}
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full text-xs"
                  onClick={() => handleWebSearch(item)}
                >
                  <Globe className="w-3 h-3 mr-1" />
                  Find Ideas
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* 🔍 SEARCH + FILTER */}
        <div className="flex gap-3 mb-6">
          <Input
            placeholder="Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select value={filterSubject} onValueChange={setFilterSubject}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {SUBJECTS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterGrade} onValueChange={setFilterGrade}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              {GRADES.map((g) => (
                <SelectItem key={g} value={g}>
                  Grade {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 📊 TOPICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <Card key={topic.id}>
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm">{topic.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {topic.description}
                </p>
                <Button size="sm" onClick={() => window.open(topic.gameUrl)}>
                  <ExternalLink className="w-3 h-3 mr-1" /> Open
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
