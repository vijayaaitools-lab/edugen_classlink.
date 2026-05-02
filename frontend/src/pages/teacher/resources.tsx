import { useState } from "react";
import TeacherSidebar from "@/components/layout/teacher-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ExternalLink, Search, Globe, BookOpen, Cpu, Gamepad2, GraduationCap } from "lucide-react";

type Tab = "boards" | "games" | "ai" | "learning";

interface Resource {
  name: string;
  url: string;
  desc: string;
  tags?: string[];
  free?: boolean;
  color: string;
  emoji: string;
}

const BOARD_PORTALS: Record<string, { color: string; emoji: string; accent: string; resources: Resource[] }> = {
  CBSE: {
    color: "from-orange-500 to-red-600",
    accent: "bg-orange-50 border-orange-200",
    emoji: "🇮🇳",
    resources: [
      { name: "CBSE Official Portal", url: "https://cbse.gov.in", desc: "Official CBSE board — circulars, results, syllabus and news", tags: ["Official"], free: true, color: "bg-orange-500", emoji: "🏛️" },
      { name: "NCERT Textbooks", url: "https://ncert.nic.in/textbook/textbook.htm", desc: "Free e-books for all NCERT subjects, Grades 1–12", tags: ["Textbooks", "Free"], free: true, color: "bg-orange-400", emoji: "📚" },
      { name: "DIKSHA Platform", url: "https://diksha.gov.in", desc: "Govt's digital learning platform — video lessons, QR-coded textbooks", tags: ["Videos", "Free"], free: true, color: "bg-green-500", emoji: "📱" },
      { name: "e-Pathshala", url: "https://epathshala.nic.in", desc: "NCERT e-content for students and teachers — books, audio, video", tags: ["E-Content", "Free"], free: true, color: "bg-blue-500", emoji: "🎓" },
      { name: "CBSE Academic", url: "https://cbseacademic.nic.in", desc: "Sample papers, marking schemes, curriculum documents", tags: ["Papers", "Curriculum"], free: true, color: "bg-red-500", emoji: "📝" },
      { name: "National Repository (NR)", url: "https://nroer.gov.in", desc: "Open educational resources for CBSE aligned curriculum", tags: ["Resources", "Free"], free: true, color: "bg-teal-500", emoji: "🗂️" },
      { name: "PM e-VIDYA", url: "https://pmvidya.gov.in", desc: "PM e-VIDYA — one nation, one digital platform for school education", tags: ["Platform", "Free"], free: true, color: "bg-indigo-500", emoji: "📡" },
      { name: "CBSE Results", url: "https://cbseresults.nic.in", desc: "Official CBSE board exam results portal", tags: ["Results"], free: true, color: "bg-yellow-600", emoji: "🏆" },
    ]
  },
  IGCSE: {
    color: "from-blue-600 to-indigo-700",
    accent: "bg-blue-50 border-blue-200",
    emoji: "🇬🇧",
    resources: [
      { name: "Cambridge International", url: "https://www.cambridgeinternational.org", desc: "Official portal for Cambridge IGCSE — syllabuses, past papers, teacher resources", tags: ["Official"], free: true, color: "bg-blue-600", emoji: "🏛️" },
      { name: "Cambridge Past Papers", url: "https://pastpapers.cambridge.org", desc: "Download official Cambridge IGCSE past papers and mark schemes", tags: ["Past Papers", "Free"], free: true, color: "bg-indigo-600", emoji: "📄" },
      { name: "Save My Exams", url: "https://www.savemyexams.com/igcse", desc: "IGCSE revision notes, topic questions and past papers with answers", tags: ["Revision", "Notes"], free: true, color: "bg-purple-500", emoji: "✏️" },
      { name: "GCSEPod", url: "https://www.gcsepod.com", desc: "Short, curriculum-matched revision pods for Cambridge subjects", tags: ["Videos"], color: "bg-teal-500", emoji: "🎬" },
      { name: "Physics & Maths Tutor", url: "https://www.physicsandmathstutor.com", desc: "IGCSE/GCSE past papers, notes and revision resources for sciences and maths", tags: ["STEM", "Free"], free: true, color: "bg-green-600", emoji: "🔬" },
      { name: "British Council", url: "https://www.britishcouncil.in", desc: "English learning resources, exams preparation for Cambridge students", tags: ["English"], free: true, color: "bg-blue-500", emoji: "🌐" },
      { name: "CIE Notes", url: "https://www.cie-notes.com", desc: "Comprehensive notes and summaries for all Cambridge IGCSE subjects", tags: ["Notes", "Free"], free: true, color: "bg-cyan-600", emoji: "📓" },
      { name: "Znotes IGCSE", url: "https://www.znotes.org/igcse", desc: "Condensed revision notes for IGCSE — community contributed, free", tags: ["Revision", "Free"], free: true, color: "bg-violet-500", emoji: "⚡" },
    ]
  },
  IB: {
    color: "from-purple-600 to-violet-700",
    accent: "bg-purple-50 border-purple-200",
    emoji: "🌍",
    resources: [
      { name: "IB Official Portal", url: "https://www.ibo.org", desc: "International Baccalaureate official — curriculum, resources, news", tags: ["Official"], free: true, color: "bg-purple-600", emoji: "🏛️" },
      { name: "IB Documents", url: "https://ibdocuments.com", desc: "Past papers, teacher support material and IB subject guides (community)", tags: ["Past Papers"], free: true, color: "bg-violet-600", emoji: "📄" },
      { name: "Lanterna Education", url: "https://www.lanternaeducation.com", desc: "IB tutoring, revision, and resources across all IB subjects", tags: ["Tutoring"], color: "bg-indigo-500", emoji: "💡" },
      { name: "IB Mastery", url: "https://www.ibmastery.com", desc: "Comprehensive IB exam preparation — notes, videos, practice questions", tags: ["Revision"], color: "bg-fuchsia-600", emoji: "🎯" },
      { name: "Revision Village", url: "https://www.revisionvillage.com", desc: "Top IB Maths resource — practice questions, past papers, predicted papers", tags: ["Maths", "Free"], free: true, color: "bg-purple-500", emoji: "🔢" },
      { name: "Pamoja Education", url: "https://www.pamojaeducation.com", desc: "Online IB Diploma Programme courses for students worldwide", tags: ["Courses"], color: "bg-pink-600", emoji: "🎓" },
      { name: "OSC IB Revision", url: "https://www.oscib.com", desc: "Revision courses, digital resources and past paper banks for IB", tags: ["Revision"], color: "bg-rose-500", emoji: "📖" },
      { name: "Znotes IB", url: "https://www.znotes.org/ib", desc: "Free condensed IB revision notes for all subjects", tags: ["Notes", "Free"], free: true, color: "bg-violet-400", emoji: "⚡" },
    ]
  },
  ICSE: {
    color: "from-green-600 to-teal-700",
    accent: "bg-green-50 border-green-200",
    emoji: "🏫",
    resources: [
      { name: "CISCE Official", url: "https://www.cisce.org", desc: "Council for Indian School Certificate Examinations — official portal", tags: ["Official"], free: true, color: "bg-green-600", emoji: "🏛️" },
      { name: "ICSE Sample Papers", url: "https://www.cisce.org/publication.aspx", desc: "Official specimen papers, project guidelines and syllabi for ICSE/ISC", tags: ["Papers"], free: true, color: "bg-teal-600", emoji: "📝" },
      { name: "Selina Publishers", url: "https://www.selinapublishers.com", desc: "Selina Concise solutions for ICSE Math, Science, English and more", tags: ["Textbooks"], color: "bg-emerald-500", emoji: "📚" },
      { name: "Frank Brothers", url: "https://www.frankbros.com", desc: "Frank ICSE textbooks and reference materials for all subjects", tags: ["Textbooks"], color: "bg-green-500", emoji: "📖" },
      { name: "Vedantu ICSE", url: "https://www.vedantu.com/icse", desc: "Free live classes, revision notes and ICSE sample papers", tags: ["Free Classes"], free: true, color: "bg-blue-500", emoji: "🎥" },
      { name: "TopperLearning ICSE", url: "https://www.topperlearning.com/icse", desc: "ICSE study material, video lessons and sample papers for grades 6–10", tags: ["Videos", "Notes"], color: "bg-orange-500", emoji: "🌟" },
      { name: "BYJU'S ICSE", url: "https://byjus.com/icse", desc: "ICSE solutions, chapter notes and practice tests", tags: ["Practice"], color: "bg-yellow-600", emoji: "💎" },
      { name: "ML Aggarwal Solutions", url: "https://www.aplustopper.com/ml-aggarwal-solutions-icse", desc: "Step-by-step ML Aggarwal ICSE Maths solutions for Grades 6–10", tags: ["Maths", "Free"], free: true, color: "bg-lime-600", emoji: "🔢" },
    ]
  },
  "State Board": {
    color: "from-amber-500 to-orange-600",
    accent: "bg-amber-50 border-amber-200",
    emoji: "🗺️",
    resources: [
      { name: "Maharashtra (MH Board)", url: "https://mahahsscboard.in", desc: "Maharashtra State Board of Secondary & Higher Secondary Education", tags: ["MH"], free: true, color: "bg-amber-600", emoji: "🏛️" },
      { name: "e-Balbharati (MH)", url: "https://ebalbharati.in", desc: "Maharashtra state textbooks online — all subjects, all standards", tags: ["MH", "Free"], free: true, color: "bg-orange-500", emoji: "📚" },
      { name: "UP Board (UPMSP)", url: "https://upmsp.edu.in", desc: "Uttar Pradesh Madhyamik Shiksha Parishad — syllabus, papers, results", tags: ["UP"], free: true, color: "bg-green-600", emoji: "🏛️" },
      { name: "GSEB (Gujarat)", url: "https://gseb.org", desc: "Gujarat Secondary & Higher Secondary Education Board — results & papers", tags: ["GJ"], free: true, color: "bg-blue-600", emoji: "🏛️" },
      { name: "RBSE (Rajasthan)", url: "https://rajeduboard.rajasthan.gov.in", desc: "Rajasthan Board of Secondary Education — syllabus and results", tags: ["RJ"], free: true, color: "bg-pink-600", emoji: "🏛️" },
      { name: "TN Board (TNBSE)", url: "https://www.tnbse.gov.in", desc: "Tamil Nadu Board of Secondary Education — question papers, results", tags: ["TN"], free: true, color: "bg-purple-600", emoji: "🏛️" },
      { name: "Karnataka (KSEEB)", url: "https://kseeb.kar.nic.in", desc: "Karnataka Secondary Education Examination Board — resources & results", tags: ["KA"], free: true, color: "bg-teal-600", emoji: "🏛️" },
      { name: "MP Board (MPBSE)", url: "https://mpbse.nic.in", desc: "Madhya Pradesh Board of Secondary Education — official portal", tags: ["MP"], free: true, color: "bg-indigo-600", emoji: "🏛️" },
    ]
  }
};

const GAME_PLATFORMS: Resource[] = [
  { name: "Kahoot!", url: "https://kahoot.com", desc: "Create and host live quiz games in class. Students join with a PIN on any device — instant engagement!", tags: ["Quiz", "Live", "Free"], free: true, color: "bg-purple-600", emoji: "🎮" },
  { name: "Quizizz", url: "https://quizizz.com", desc: "Self-paced quizzes with memes, music and leaderboards. Works for homework and class review.", tags: ["Quiz", "Free"], free: true, color: "bg-violet-600", emoji: "🏆" },
  { name: "Blooket", url: "https://www.blooket.com", desc: "Game-mode learning — students answer questions while playing tower defense, gold quest and more!", tags: ["Games", "Free"], free: true, color: "bg-green-600", emoji: "🌟" },
  { name: "Gimkit", url: "https://www.gimkit.com", desc: "Students earn in-game money by answering correctly — highly motivating review game platform.", tags: ["Strategy", "Free"], free: true, color: "bg-yellow-600", emoji: "💰" },
  { name: "Baamboozle", url: "https://www.baamboozle.com", desc: "Create team-based classroom games in minutes. 10M+ ready-made games, no login needed for students!", tags: ["Teams", "AI", "Free"], free: true, color: "bg-pink-600", emoji: "🎯" },
  { name: "Wordwall", url: "https://wordwall.net", desc: "Create interactive activities — match-up, quiz, anagram, crossword and 30+ other game types.", tags: ["Activities", "Free"], free: true, color: "bg-blue-600", emoji: "🔤" },
  { name: "ABCya", url: "https://www.abcya.com", desc: "200+ educational games for Grades K-6 covering math, reading, art and typing.", tags: ["Grades K-6", "Free"], free: true, color: "bg-orange-500", emoji: "🎨" },
  { name: "Toy Theater", url: "https://toytheater.com", desc: "Interactive online games for elementary — math manipulatives, art, music and science.", tags: ["Grades K-5", "Free"], free: true, color: "bg-red-500", emoji: "🎭" },
  { name: "Math Playground", url: "https://www.mathplayground.com", desc: "Math games, logic puzzles and word problems for Grades 1–6. 100% free and ad-light.", tags: ["Math", "Grades 1-6", "Free"], free: true, color: "bg-blue-500", emoji: "🔢" },
  { name: "Prodigy Math", url: "https://www.prodigygame.com", desc: "Curriculum-aligned Math RPG for Grades 1–8. Students love the adventure format!", tags: ["Math", "RPG", "Free"], free: true, color: "bg-indigo-600", emoji: "🧙" },
  { name: "Cool Math Games", url: "https://www.coolmathgames.com", desc: "Logic, strategy and genuine math practice games for older students (Grades 5–12).", tags: ["Math", "Grades 5-12", "Free"], free: true, color: "bg-lime-600", emoji: "🎲" },
  { name: "Funbrain", url: "https://www.funbrain.com", desc: "Books, games and videos for Grades K-8. Covers math, reading and typing.", tags: ["All Subjects", "Free"], free: true, color: "bg-teal-600", emoji: "🧠" },
  { name: "BrainPOP", url: "https://www.brainpop.com", desc: "Animated educational videos + quizzes on science, math, English, social studies.", tags: ["Videos", "Quiz"], color: "bg-cyan-600", emoji: "🎬" },
  { name: "Starfall", url: "https://www.starfall.com", desc: "Phonics and reading games for early learners (Grades K-3). Used by millions of teachers.", tags: ["Reading", "Grades K-3", "Free"], free: true, color: "bg-yellow-500", emoji: "⭐" },
  { name: "Nearpod", url: "https://nearpod.com", desc: "Interactive slide-based lessons with live polls, VR, quizzes and student pacing.", tags: ["Interactive Lessons", "Free"], free: true, color: "bg-rose-500", emoji: "📊" },
  { name: "Pear Deck", url: "https://www.peardeck.com", desc: "Add interactive questions to Google Slides or PowerPoint for live student responses.", tags: ["Slides", "Free"], free: true, color: "bg-green-500", emoji: "🍐" },
  { name: "Edpuzzle", url: "https://edpuzzle.com", desc: "Embed questions inside YouTube or uploaded videos to check comprehension.", tags: ["Video", "Free"], free: true, color: "bg-purple-500", emoji: "🎥" },
  { name: "Quizlet", url: "https://quizlet.com", desc: "Flashcards, study sets and games. Students can study individually or compete in class.", tags: ["Flashcards", "Free"], free: true, color: "bg-blue-500", emoji: "🃏" },
  { name: "Gimkit Draw", url: "https://www.gimkit.com/draw", desc: "Collaborative Pictionary-style drawing game for classroom fun and creativity.", tags: ["Art", "Free"], free: true, color: "bg-amber-500", emoji: "🎨" },
  { name: "Classcraft", url: "https://www.classcraft.com", desc: "RPG classroom management and learning game. Students level up with good behaviour!", tags: ["RPG", "Management"], color: "bg-purple-700", emoji: "⚔️" },
  { name: "IXL Learning", url: "https://www.ixl.com", desc: "Practice skills for Math, English, Science and Social Studies with adaptive questions.", tags: ["Adaptive", "All Subjects"], color: "bg-green-700", emoji: "📈" },
  { name: "Spelling City", url: "https://www.spellingcity.com", desc: "Vocabulary and spelling games with customizable word lists. Great for English teachers.", tags: ["English", "Free"], free: true, color: "bg-pink-500", emoji: "🔡" },
];

const AI_TOOLS: Resource[] = [
  { name: "Baamboozle AI", url: "https://www.baamboozle.com/ai", desc: "AI generates quiz games for any topic instantly. Free and no login needed for students!", tags: ["AI Quiz", "Free"], free: true, color: "bg-pink-600", emoji: "🤖" },
  { name: "Splash Math", url: "https://www.splashlearn.com", desc: "Adaptive AI-powered Math & Reading program for Grades K-5. Loved by 40M+ students!", tags: ["AI", "Math", "Free"], free: true, color: "bg-blue-500", emoji: "💧" },
  { name: "Magic School AI", url: "https://www.magicschool.ai", desc: "AI tools for teachers — lesson plans, rubrics, quizzes, emails, IEPs and 60+ tools. Free!", tags: ["Teacher AI", "Free"], free: true, color: "bg-purple-600", emoji: "🪄" },
  { name: "Khanmigo (Khan Academy)", url: "https://www.khanacademy.org/khan-labs", desc: "AI tutor by Khan Academy. Helps students learn without giving away answers!", tags: ["AI Tutor", "Free"], free: true, color: "bg-green-600", emoji: "🎓" },
  { name: "Diffit", url: "https://diffit.me", desc: "Generate differentiated reading passages at any level on any topic in seconds.", tags: ["Differentiation", "Free"], free: true, color: "bg-teal-600", emoji: "📄" },
  { name: "Curipod", url: "https://curipod.com", desc: "AI creates interactive lessons with polls, word clouds, Q&A and slides in 30 seconds.", tags: ["Lessons", "Free"], free: true, color: "bg-orange-500", emoji: "⚡" },
  { name: "SchoolAI", url: "https://schoolai.com", desc: "Safe AI chatbot for students with teacher-controlled guardrails. Free for educators!", tags: ["Safe AI", "Free"], free: true, color: "bg-indigo-600", emoji: "🛡️" },
  { name: "Canva for Education", url: "https://www.canva.com/education", desc: "Free Canva Pro for teachers and students — design presentations, posters, infographics.", tags: ["Design", "Free"], free: true, color: "bg-cyan-500", emoji: "🎨" },
  { name: "Teacherbot.io", url: "https://teacherbot.io", desc: "AI creates worksheets, lesson plans, rubrics and assessments for any grade and topic.", tags: ["Worksheets", "Free"], free: true, color: "bg-violet-600", emoji: "🤖" },
  { name: "Twee", url: "https://twee.com", desc: "AI generates English lessons — questions, dialogues, stories, songs and exercises.", tags: ["English", "Free"], free: true, color: "bg-rose-500", emoji: "🐦" },
  { name: "ChatGPT (OpenAI)", url: "https://chat.openai.com", desc: "General-purpose AI assistant for lesson planning, content creation and student support.", tags: ["General AI"], free: true, color: "bg-gray-700", emoji: "💬" },
  { name: "Google Gemini", url: "https://gemini.google.com", desc: "Google's AI for lesson ideas, summarising content and answering complex questions.", tags: ["Google AI", "Free"], free: true, color: "bg-blue-600", emoji: "✨" },
  { name: "Brisk Teaching", url: "https://www.briskteaching.com", desc: "Chrome extension — AI feedback, content creation and differentiation tools right in Google Docs.", tags: ["Chrome", "Free"], free: true, color: "bg-green-500", emoji: "💨" },
  { name: "Eduaide.ai", url: "https://www.eduaide.ai", desc: "100+ AI-powered tools for teachers — lesson plans, projects, rubrics and more.", tags: ["Teacher Tools", "Free"], free: true, color: "bg-amber-600", emoji: "🛠️" },
  { name: "Quizgecko", url: "https://quizgecko.com", desc: "AI generates quizzes from any text, document, URL or topic in seconds.", tags: ["AI Quiz", "Free"], free: true, color: "bg-lime-600", emoji: "🦎" },
  { name: "SlidesAI", url: "https://www.slidesai.io", desc: "AI creates Google Slides presentations from any text — great for lesson content.", tags: ["Slides", "Free"], free: true, color: "bg-sky-600", emoji: "📊" },
];

const LEARNING_PLATFORMS: Resource[] = [
  { name: "Khan Academy", url: "https://www.khanacademy.org", desc: "Free world-class education — Math, Science, Computing, Economics for all grades.", tags: ["All Subjects", "Free"], free: true, color: "bg-green-600", emoji: "🎓" },
  { name: "Coursera for Schools", url: "https://www.coursera.org", desc: "University-grade online courses — good for advanced Grade 11–12 students.", tags: ["Advanced"], color: "bg-blue-600", emoji: "🏛️" },
  { name: "National Geographic Kids", url: "https://kids.nationalgeographic.com", desc: "Science, geography and nature content for curious young learners.", tags: ["Science", "Free"], free: true, color: "bg-yellow-600", emoji: "🌍" },
  { name: "NASA Kids Club", url: "https://www.nasa.gov/kidsclub", desc: "Space science games, articles and activities for K-8 students.", tags: ["Science", "Space", "Free"], free: true, color: "bg-blue-800", emoji: "🚀" },
  { name: "Typing.com", url: "https://www.typing.com", desc: "Free typing lessons, games and tests for all ages. Great for computer class.", tags: ["Computer", "Free"], free: true, color: "bg-slate-600", emoji: "⌨️" },
  { name: "Scratch (MIT)", url: "https://scratch.mit.edu", desc: "Visual programming for kids — create games, animations and stories. Free and browser-based.", tags: ["Coding", "Free"], free: true, color: "bg-orange-500", emoji: "🐱" },
  { name: "Code.org", url: "https://code.org", desc: "Coding courses for all ages and experience levels. Hour of Code and full curricula.", tags: ["Coding", "Free"], free: true, color: "bg-teal-600", emoji: "💻" },
  { name: "Storyline Online", url: "https://storylineonline.net", desc: "SAG-AFTRA Foundation — celebrities read children's books aloud. Free for all.", tags: ["Reading", "Free"], free: true, color: "bg-pink-500", emoji: "📖" },
  { name: "TED-Ed", url: "https://ed.ted.com", desc: "Thousands of educational animated videos with built-in lessons and quizzes.", tags: ["Videos", "Free"], free: true, color: "bg-red-600", emoji: "🎬" },
  { name: "Wolfram Alpha", url: "https://www.wolframalpha.com", desc: "Computational knowledge engine — step-by-step math, science and reference tool.", tags: ["Math", "Science", "Free"], free: true, color: "bg-orange-600", emoji: "🧮" },
  { name: "Newsela", url: "https://newsela.com", desc: "Real-world news articles leveled for different reading abilities. Grades 2–12.", tags: ["Reading", "Free"], free: true, color: "bg-blue-500", emoji: "📰" },
  { name: "ReadWorks", url: "https://www.readworks.org", desc: "Free reading passages and comprehension questions for Grades K-12.", tags: ["Reading", "Free"], free: true, color: "bg-green-500", emoji: "📚" },
];

function ResourceCard({ r, btnLabel = "Open" }: { r: Resource; btnLabel?: string }) {
  return (
    <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 h-full">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex items-start gap-3 mb-2">
          <div className={`w-10 h-10 rounded-xl ${r.color} flex items-center justify-center shrink-0 text-lg`}>
            {r.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-semibold text-sm leading-tight">{r.name}</h3>
              {r.free && <Badge className="bg-green-100 text-green-700 text-[10px] px-1 py-0 border-0 h-4">FREE</Badge>}
            </div>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {r.tags?.map(t => (
                <span key={t} className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0 rounded">{t}</span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed flex-1">{r.desc}</p>
        <Button
          size="sm"
          variant="outline"
          className="w-full gap-2 text-xs mt-auto"
          onClick={() => window.open(r.url, "_blank")}
        >
          <ExternalLink className="w-3 h-3" /> {btnLabel}
        </Button>
      </CardContent>
    </Card>
  );
}

const TABS: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
  { id: "boards", label: "Board Portals", icon: <GraduationCap className="w-4 h-4" />, count: 5 },
  { id: "games", label: "Game Platforms", icon: <Gamepad2 className="w-4 h-4" />, count: GAME_PLATFORMS.length },
  { id: "ai", label: "AI Tools", icon: <Cpu className="w-4 h-4" />, count: AI_TOOLS.length },
  { id: "learning", label: "Learning Sites", icon: <BookOpen className="w-4 h-4" />, count: LEARNING_PLATFORMS.length },
];

export default function TeacherResources() {
  const [tab, setTab] = useState<Tab>("boards");
  const [search, setSearch] = useState("");
  const [boardFilter, setBoardFilter] = useState<string>("all");

  const filterList = (list: Resource[]) =>
    search ? list.filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase()) ||
      r.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()))
    ) : list;

  const filteredGames = filterList(GAME_PLATFORMS);
  const filteredAI = filterList(AI_TOOLS);
  const filteredLearning = filterList(LEARNING_PLATFORMS);

  const boardEntries = Object.entries(BOARD_PORTALS);
  const filteredBoardEntries = boardFilter === "all"
    ? boardEntries
    : boardEntries.filter(([key]) => key === boardFilter);

  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />
      <main className="flex-1 p-6 bg-background overflow-auto">
        <div className="mb-5">
          <h1 className="text-2xl font-bold">External Resources Hub</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Board portals, game platforms, AI tools and learning sites — all in one place
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 bg-muted p-1 rounded-xl mb-5 overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setSearch(""); setBoardFilter("all"); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                tab === t.id
                  ? "bg-white shadow text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.icon}
              {t.label}
              <span className="bg-muted text-muted-foreground text-xs px-1.5 rounded-full ml-0.5">
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search bar (for non-boards tabs) */}
        {tab !== "boards" && (
          <div className="relative mb-5 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={`Search ${tab === "games" ? "game platforms" : tab === "ai" ? "AI tools" : "learning sites"}...`}
              className="pl-9"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        )}

        {/* Board Portals Tab */}
        {tab === "boards" && (
          <div className="space-y-6">
            {/* Board filter pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setBoardFilter("all")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${boardFilter === "all" ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-foreground/50"}`}
              >
                All Boards
              </button>
              {boardEntries.map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setBoardFilter(boardFilter === key ? "all" : key)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${boardFilter === key ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-foreground/50"}`}
                >
                  <span>{val.emoji}</span> {key}
                </button>
              ))}
            </div>

            {filteredBoardEntries.map(([boardName, boardData]) => (
              <div key={boardName}>
                <div className={`bg-gradient-to-r ${boardData.color} rounded-xl p-4 mb-3 text-white flex items-center gap-3`}>
                  <span className="text-3xl">{boardData.emoji}</span>
                  <div>
                    <div className="font-bold text-lg">{boardName === "State Board" ? "State Boards (India)" : `${boardName} Board`}</div>
                    <div className="text-white/80 text-sm">{boardData.resources.length} official portals & resources</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {boardData.resources.map(r => (
                    <ResourceCard key={r.name} r={r} btnLabel="Visit Portal" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Game Platforms Tab */}
        {tab === "games" && (
          <div>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 mb-5 text-white flex items-center gap-4">
              <span className="text-4xl">🎮</span>
              <div>
                <div className="font-bold text-lg">Educational Game Platforms</div>
                <div className="text-white/80 text-sm">Engage students with Kahoot, Quizizz, Blooket, Baamboozle and more — most are completely free!</div>
              </div>
            </div>
            {filteredGames.length === 0 ? (
              <p className="text-center text-muted-foreground py-10">No platforms found for "{search}"</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredGames.map(r => <ResourceCard key={r.name} r={r} btnLabel="Open Platform" />)}
              </div>
            )}
          </div>
        )}

        {/* AI Tools Tab */}
        {tab === "ai" && (
          <div>
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl p-4 mb-5 text-white flex items-center gap-4">
              <span className="text-4xl">🤖</span>
              <div>
                <div className="font-bold text-lg">AI Tools for Teachers & Students</div>
                <div className="text-white/80 text-sm">Magic School AI, Baamboozle AI, Splash Math, Diffit and more — supercharge your teaching with AI!</div>
              </div>
            </div>
            {filteredAI.length === 0 ? (
              <p className="text-center text-muted-foreground py-10">No tools found for "{search}"</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredAI.map(r => <ResourceCard key={r.name} r={r} btnLabel="Open Tool" />)}
              </div>
            )}
          </div>
        )}

        {/* Learning Sites Tab */}
        {tab === "learning" && (
          <div>
            <div className="bg-gradient-to-r from-teal-600 to-green-600 rounded-xl p-4 mb-5 text-white flex items-center gap-4">
              <span className="text-4xl">🌐</span>
              <div>
                <div className="font-bold text-lg">Learning Websites</div>
                <div className="text-white/80 text-sm">Khan Academy, TED-Ed, Scratch, Code.org and more — curated educational sites for all ages</div>
              </div>
            </div>
            {filteredLearning.length === 0 ? (
              <p className="text-center text-muted-foreground py-10">No sites found for "{search}"</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredLearning.map(r => <ResourceCard key={r.name} r={r} btnLabel="Visit Site" />)}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
