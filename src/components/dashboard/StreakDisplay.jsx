import { Flame, Trophy } from "lucide-react";

import { cn } from "../../lib/utils.js";

export function StreakDisplay({ currentStreak, longestStreak }) {
  const isOnFire = currentStreak >= 3;
  const isMilestone =
    currentStreak === 7 || currentStreak === 14 || currentStreak === 30;

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Streak</h3>
        <Trophy className="h-4 w-4 text-yellow-500" />
      </div>

      <div className="flex items-center gap-4">
        <div
          className={cn(
            "relative flex items-center justify-center w-16 h-16 rounded-full",
            isOnFire
              ? "bg-gradient-to-br from-orange-500/20 to-red-500/20"
              : "bg-secondary",
          )}
        >
          <span className="text-2xl font-bold text-foreground">
            {currentStreak}
          </span>
          {isOnFire && (
            <Flame
              className={cn(
                "absolute -top-2 -right-1 h-6 w-6 text-orange-500",
                isMilestone && "animate-streak-pop",
              )}
            />
          )}
        </div>

        <div className="flex-1">
          <p className="text-sm text-foreground">
            {currentStreak === 0 && "Start your streak today!"}
            {currentStreak === 1 && "1 day - keep it going!"}
            {currentStreak >= 2 &&
              currentStreak < 7 &&
              `${currentStreak} days - nice momentum!`}
            {currentStreak >= 7 && currentStreak < 14 && "🔥 One week strong!"}
            {currentStreak >= 14 &&
              currentStreak < 30 &&
              "🔥🔥 Two weeks amazing!"}
            {currentStreak >= 30 && "🔥🔥🔥 Unstoppable!"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Best: {longestStreak} days
          </p>
        </div>
      </div>

      <div className="flex gap-1 mt-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 flex-1 rounded-full transition-colors",
              i < Math.min(currentStreak, 7)
                ? "bg-streak-active"
                : "bg-streak-inactive",
            )}
          />
        ))}
      </div>
    </div>
  );
}
