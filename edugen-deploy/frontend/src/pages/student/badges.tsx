import StudentSidebar from "@/components/layout/student-sidebar";
import { useAuth } from "@/lib/auth";
import { useListBadges } from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Award } from "lucide-react";

const ALL_BADGES = [
  { key: "first_lesson", name: "First Step", desc: "Completed your first lesson", icon: "🚀", color: "bg-blue-50 border-blue-100" },
  { key: "5_lessons", name: "Learning Streak", desc: "Completed 5 lessons", icon: "📚", color: "bg-emerald-50 border-emerald-100" },
  { key: "10_lessons", name: "Knowledge Seeker", desc: "Completed 10 lessons", icon: "🔍", color: "bg-violet-50 border-violet-100" },
  { key: "25_lessons", name: "Study Master", desc: "Completed 25 lessons", icon: "🎓", color: "bg-amber-50 border-amber-100" },
  { key: "perfect_quiz", name: "Perfect Score", desc: "Got 100% in a quiz", icon: "💯", color: "bg-yellow-50 border-yellow-100" },
  { key: "5_quizzes", name: "Quiz Champ", desc: "Completed 5 quizzes", icon: "🏆", color: "bg-orange-50 border-orange-100" },
  { key: "math_star", name: "Math Star", desc: "Completed 3 Math lessons", icon: "⭐", color: "bg-blue-50 border-blue-100" },
  { key: "english_star", name: "English Star", desc: "Completed 3 English lessons", icon: "📖", color: "bg-emerald-50 border-emerald-100" },
  { key: "science_explorer", name: "Science Explorer", desc: "Completed 3 Science lessons", icon: "🔬", color: "bg-purple-50 border-purple-100" },
  { key: "hindi_hero", name: "Hindi Hero", desc: "Completed 3 Hindi lessons", icon: "🌟", color: "bg-rose-50 border-rose-100" },
  { key: "early_bird", name: "Early Bird", desc: "First to view a lesson", icon: "🐦", color: "bg-cyan-50 border-cyan-100" },
  { key: "consistent", name: "Consistent Learner", desc: "Learned for 7 days", icon: "🔥", color: "bg-red-50 border-red-100" },
];

export default function StudentBadges() {
  const { user } = useAuth();
  const { data: earnedBadges = [], isLoading } = useListBadges(
    { studentId: user?.id },
    { query: { queryKey: ["badges", user?.id] } }
  );

  const earnedKeys = new Set((earnedBadges as any[]).map((b: any) => b.badgeKey));

  return (
    <div className="flex min-h-screen">
      <StudentSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">My Badges</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {isLoading ? "Loading..." : `${(earnedBadges as any[]).length} of ${ALL_BADGES.length} badges earned`}
          </p>
        </div>

        {/* Earned count */}
        <Card className="mb-6 bg-gradient-to-r from-amber-400 to-orange-400 text-white border-0">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-white/80 text-sm">Badges Collected</div>
              <div className="text-4xl font-bold mt-0.5">
                {isLoading ? "..." : (earnedBadges as any[]).length}
              </div>
              <div className="text-white/70 text-sm">out of {ALL_BADGES.length} total</div>
            </div>
            <Award className="w-16 h-16 text-white/30" />
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-36 w-full" />)}
          </div>
        ) : (
          <>
            {/* Earned badges */}
            {(earnedBadges as any[]).length > 0 && (
              <section className="mb-8">
                <h2 className="text-base font-semibold mb-4">🏅 Earned Badges</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {ALL_BADGES.filter(b => earnedKeys.has(b.key)).map(b => (
                    <Card key={b.key} className={`border ${b.color}`} data-testid={`card-badge-${b.key}`}>
                      <CardContent className="p-5 text-center">
                        <div className="text-4xl mb-2">{b.icon}</div>
                        <div className="font-semibold text-sm mb-0.5">{b.name}</div>
                        <div className="text-xs text-muted-foreground leading-tight">{b.desc}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Locked badges */}
            <section>
              <h2 className="text-base font-semibold mb-4 text-muted-foreground">🔒 Badges to Unlock</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {ALL_BADGES.filter(b => !earnedKeys.has(b.key)).map(b => (
                  <Card key={b.key} className="border opacity-50 grayscale" data-testid={`card-badge-locked-${b.key}`}>
                    <CardContent className="p-5 text-center">
                      <div className="text-4xl mb-2">{b.icon}</div>
                      <div className="font-semibold text-sm mb-0.5">{b.name}</div>
                      <div className="text-xs text-muted-foreground leading-tight">{b.desc}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
