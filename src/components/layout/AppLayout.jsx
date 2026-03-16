import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  LogOut,
  NotebookPen,
  Timer,
  History,
  Settings,
} from "lucide-react";

import { cn } from "../../lib/utils.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { usePomodoro } from "../../context/PomodoroContext.jsx";
import { ThemeToggle } from "../ThemeToggle.jsx";
import { Button } from "../ui/button.jsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog.jsx";

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/log", icon: NotebookPen, label: "Log" },
  { path: "/pomodoro", icon: Timer, label: "Focus" },
  { path: "/history", icon: History, label: "History" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export function AppLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isRunning, timeLeft } = usePomodoro();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const formatTimerBadge = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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
            {navItems.map((item) => {
              const showTimer = item.path === "/pomodoro" && isRunning && location.pathname !== "/pomodoro";
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {showTimer && (
                    <>
                      <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="ml-1 text-xs tabular-nums text-green-500 font-mono">
                        {formatTimerBadge(timeLeft)}
                      </span>
                    </>
                  )}
                </Link>
              );
            })}

            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowLogoutDialog(true)}
              className="h-9 w-9 ml-2"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </nav>

          {/* only visible to mobile screens */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowLogoutDialog(true)}
              className="h-9 w-9"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        {children}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const showTimer = item.path === "/pomodoro" && isRunning && location.pathname !== "/pomodoro";
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                <div className="relative">
                  <item.icon className="h-5 w-5" />
                  {showTimer && (
                    <span className="absolute -top-1 -right-1.5 h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                  )}
                </div>
                <span className="text-xs">
                  {showTimer ? formatTimerBadge(timeLeft) : item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              No
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Yes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
