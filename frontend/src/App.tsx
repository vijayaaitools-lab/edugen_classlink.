import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Register from "@/pages/register";
import TeacherDashboard from "@/pages/teacher/dashboard";
import TeacherLessons from "@/pages/teacher/lessons";
import TeacherLessonNew from "@/pages/teacher/lesson-new";
import TeacherLessonDetail from "@/pages/teacher/lesson-detail";
import TeacherAttendance from "@/pages/teacher/attendance";
import TeacherStudents from "@/pages/teacher/students";
import TeacherGames from "@/pages/teacher/games";
import TeacherQuizzes from "@/pages/teacher/quizzes";
import TeacherResources from "@/pages/teacher/resources";
import TeacherProfile from "@/pages/teacher/profile";
import StudentDashboard from "@/pages/student/dashboard";
import StudentLessons from "@/pages/student/lessons";
import StudentLessonDetail from "@/pages/student/lesson-detail";
import StudentGames from "@/pages/student/games";
import StudentQuizzes from "@/pages/student/quizzes";
import StudentProgress from "@/pages/student/progress";
import StudentBadges from "@/pages/student/badges";
import StudentBooks from "@/pages/student/books";
import StudentProfile from "@/pages/student/profile";
import GamesHub from "@/pages/student/games-hub";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

function ProtectedTeacher({ component: Component }: { component: React.ComponentType }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><div className="text-muted-foreground">Loading...</div></div>;
  if (!user) return <Redirect to="/login" />;
  if (user.role !== "teacher") return <Redirect to="/student" />;
  return <Component />;
}

function ProtectedStudent({ component: Component }: { component: React.ComponentType }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><div className="text-muted-foreground">Loading...</div></div>;
  if (!user) return <Redirect to="/login" />;
  if (user.role !== "student") return <Redirect to="/teacher" />;
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      <Route path="/teacher">{() => <ProtectedTeacher component={TeacherDashboard} />}</Route>
      <Route path="/teacher/lessons">{() => <ProtectedTeacher component={TeacherLessons} />}</Route>
      <Route path="/teacher/lessons/new">{() => <ProtectedTeacher component={TeacherLessonNew} />}</Route>
      <Route path="/teacher/lessons/:id">{() => <ProtectedTeacher component={TeacherLessonDetail} />}</Route>
      <Route path="/teacher/attendance">{() => <ProtectedTeacher component={TeacherAttendance} />}</Route>
      <Route path="/teacher/students">{() => <ProtectedTeacher component={TeacherStudents} />}</Route>
      <Route path="/teacher/games">{() => <ProtectedTeacher component={TeacherGames} />}</Route>
      <Route path="/teacher/quizzes">{() => <ProtectedTeacher component={TeacherQuizzes} />}</Route>
      <Route path="/teacher/resources">{() => <ProtectedTeacher component={TeacherResources} />}</Route>
      <Route path="/teacher/profile">{() => <ProtectedTeacher component={TeacherProfile} />}</Route>

      <Route path="/student">{() => <ProtectedStudent component={StudentDashboard} />}</Route>
      <Route path="/student/lessons">{() => <ProtectedStudent component={StudentLessons} />}</Route>
      <Route path="/student/lessons/:id">{() => <ProtectedStudent component={StudentLessonDetail} />}</Route>
      <Route path="/student/games">{() => <ProtectedStudent component={StudentGames} />}</Route>
      <Route path="/student/games/play">{() => <ProtectedStudent component={GamesHub} />}</Route>
      <Route path="/student/quizzes">{() => <ProtectedStudent component={StudentQuizzes} />}</Route>
      <Route path="/student/progress">{() => <ProtectedStudent component={StudentProgress} />}</Route>
      <Route path="/student/badges">{() => <ProtectedStudent component={StudentBadges} />}</Route>
      <Route path="/student/books">{() => <ProtectedStudent component={StudentBooks} />}</Route>
      <Route path="/student/profile">{() => <ProtectedStudent component={StudentProfile} />}</Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
