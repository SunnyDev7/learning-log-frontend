import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, LogOut, Clock, Timer } from "lucide-react";

import { cn } from "../../lib/utils.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { ThemeToggle } from "../ThemeToggle.jsx";
import { Button } from "../ui/button.jsx";

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/log", icon: Clock, label: "Log" },
  { path: "/pomodoro", icon: Timer, label: "Focus" },
];

export function AppLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-semibold text-foreground">Learning Log</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}

            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-9 w-9 ml-2"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        {children}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
