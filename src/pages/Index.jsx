import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useCategories } from "../hooks/useCategories.js";
import { useActivities } from "../hooks/useActivities.js";
import { useStats } from "../hooks/useStats.js";
import { getTodayDate } from "../lib/utils.js";
import { StreakDisplay } from "../components/dashboard/StreakDisplay.jsx";
import { WeeklyProgress } from "../components/dashboard/WeeklyProgress.jsx";
import { TodaySummary } from "../components/dashboard/TodaySummary.jsx";
import { WeeklyChart } from "../components/dashboard/WeeklyChart.jsx";
import { CategoryBreakdown } from "../components/dashboard/CategoryBreakdown.jsx";

const Index = () => {
  const {
    stats,
    targets,
    weeklyData,
    weeklyActiveDays,
    weeklyTotalsByCategory,
    totalWeeklyHours,
    categories,
  } = useStats();
  const { categories: categoryConfigs } = useCategories();
  const { activities: todayData } = useActivities(getTodayDate());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Track your learning progress
          </p>
        </div>
        <Button asChild>
          <Link to="/log">
            <Plus className="h-4 w-4 mr-2" />
            Log Activity
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StreakDisplay
          currentStreak={stats?.currentStreak || 0}
          longestStreak={stats?.longestStreak || 0}
        />

        <WeeklyProgress
          activeDays={weeklyActiveDays}
          targetMin={targets?.activeDaysPerWeek?.min || 5}
          targetMax={targets?.activeDaysPerWeek?.max || 6}
          totalHours={totalWeeklyHours}
          targetHoursMin={targets?.weeklyHours?.min || 30}
          targetHoursMax={targets?.weeklyHours?.max || 48}
        />

        <TodaySummary log={todayData} categoryConfigs={categoryConfigs} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <WeeklyChart data={weeklyData} categoryConfigs={categoryConfigs} />
        <CategoryBreakdown
          categories={weeklyTotalsByCategory}
          categoryConfigs={categoryConfigs}
        />
      </div>
    </div>
  );
};

export default Index;
