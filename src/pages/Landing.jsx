import { Link, Navigate } from "react-router-dom";
import {
  BookOpen,
  Flame,
  BarChart3,
  Timer,
  Target,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Button } from "../components/ui/button.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { ThemeToggle } from "../components/ThemeToggle.jsx";

const features = [
  {
    icon: Flame,
    title: "Track Streaks",
    description: "Build consistency with daily learning streaks and stay motivated.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: BarChart3,
    title: "Visualize Progress",
    description: "See weekly and yearly charts of your learning activity at a glance.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Timer,
    title: "Pomodoro Timer",
    description: "Stay focused with a built-in timer that auto-logs your sessions.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Target,
    title: "Set Goals",
    description: "Define weekly targets and track your progress toward them.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

export default function LandingPage() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            <span className="text-lg font-bold">Learning Log</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">
                Get Started
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Gradient background accents */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground mb-6">
              <Flame className="h-4 w-4 text-orange-500" />
              Track. Learn. Grow.
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Your Learning Journey,{" "}
              <span className="text-primary">Simplified</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Log what you learn every day, build streaks, track your progress
              with beautiful charts, and stay focused with a built-in Pomodoro
              timer.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="text-base px-8 h-12">
                  Start for Free
                  <ArrowRight className="h-5 w-5 ml-1" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-base px-8 h-12">
                  I have an account
                </Button>
              </Link>
            </div>
          </div>

          {/* Preview mockup */}
          <div className="mt-16 sm:mt-20 max-w-4xl mx-auto">
            <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-2xl shadow-primary/5">
              {/* Fake dashboard header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <div className="flex-1 h-6 bg-muted rounded-md max-w-xs" />
              </div>

              {/* Fake streak row */}
              <div className="flex items-center gap-3 mb-5">
                <Flame className="h-5 w-5 text-orange-500" />
                <div className="flex gap-1.5">
                  {[true, true, true, true, true, false, false].map((active, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${
                        active
                          ? "bg-streak-active/80"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-orange-500 ml-1">
                  5 day streak!
                </span>
              </div>

              {/* Fake chart bars */}
              <div className="flex items-end gap-2 sm:gap-3 h-32 sm:h-40 px-2">
                {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md bg-primary/70 transition-all"
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-[10px] sm:text-xs text-muted-foreground">
                      {["M", "T", "W", "T", "F", "S", "S"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border/40 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Everything you need to learn better
            </h2>
            <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
              Simple tools that help you build a daily learning habit.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, description, color, bg }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-6 hover:shadow-lg hover:shadow-primary/5 transition-shadow"
              >
                <div className={`inline-flex p-2.5 rounded-lg ${bg} mb-4`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24 text-center">
          <BookOpen className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to start learning?
          </h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-lg mx-auto">
            Join and take control of your learning journey today.
          </p>
          <div className="mt-8">
            <Link to="/register">
              <Button size="lg" className="text-base px-8 h-12">
                Create Free Account
                <ArrowRight className="h-5 w-5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Learning Log</span>
          </div>
          <span>Built for learners, by learners.</span>
        </div>
      </footer>
    </div>
  );
}
