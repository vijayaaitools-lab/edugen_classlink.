import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-900 flex items-center justify-center px-4 text-white">
      <div className="text-center">
        <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-9 h-9 text-white" />
        </div>
        <h1 className="text-7xl font-extrabold text-amber-400 mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-3">Page Not Found</h2>
        <p className="text-white/60 mb-8">The page you're looking for doesn't exist.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button className="bg-amber-400 hover:bg-amber-500 text-white border-0">Go Home</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">Sign In</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
