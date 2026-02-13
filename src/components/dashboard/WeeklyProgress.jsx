import { Calendar, Target } from "lucide-react";

import { cn } from "../../lib/utils.js";

export function WeeklyProgress({
  activeDays,
  targetMin,
  targetMax,
  totalHours,
  targetHoursMin,
  targetHoursMax,
}) {
  const daysProgress = (activeDays / 7) * 100;
  const hoursProgress = Math.min((totalHours / targetHoursMin) * 100, 100);
  const isOnTrack = activeDays >= targetMin || totalHours >= targetHoursMin;

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">This Week</h3>
        <Target className="h-4 w-4 text-primary" />
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">Active Days</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {activeDays} / 7
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                activeDays >= targetMin ? "bg-streak-active" : "bg-primary",
              )}
              style={{ width: `${daysProgress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Target: {targetMin}-{targetMax} days
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-foreground">Total Hours</span>
            <span className="text-sm font-medium text-foreground">
              {totalHours.toFixed(1)}h
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                totalHours >= targetHoursMin
                  ? "bg-streak-active"
                  : "bg-primary",
              )}
              style={{ width: `${hoursProgress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Target: {targetHoursMin}-{targetHoursMax}h
          </p>
        </div>
      </div>

      <div
        className={cn(
          "mt-4 p-3 rounded-lg text-center text-sm",
          isOnTrack
            ? "bg-streak-active/10 text-streak-active"
            : "bg-yellow-500/10 text-yellow-500",
        )}
      >
        {isOnTrack ? "✓ On track this week!" : "⚡ Keep pushing!"}
      </div>
    </div>
  );
}
