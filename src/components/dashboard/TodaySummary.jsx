import { Clock, ChevronRight } from "lucide-react";
import { useMemo } from "react";

import { formatDuration, formatDate, getTodayDate } from "../../lib/utils.js";

export function TodaySummary({ log, categoryConfigs, onViewMore }) {
  const categoryMap = useMemo(() => {
    const map = {};
    if (categoryConfigs) {
      categoryConfigs.forEach((cat) => {
        map[cat._id || cat.id] = cat;
      });
    }
    return map;
  }, [categoryConfigs]);

  const activities = log?.activities || [];
  const totalMinutes =
    log?.totalMinutes || activities.reduce((sum, a) => sum + a.duration, 0);
  const categories = log?.categories || {};

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Today</h3>
          <span className="text-xs text-muted-foreground">
            {formatDate(getTodayDate())}
          </span>
        </div>

        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">
            No activities logged yet
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Start logging to see your summary
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Today</h3>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            {formatDuration(totalMinutes)}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {activities.slice(0, 4).map((activity) => {
          const catId =
            activity.categoryId?._id || activity.categoryId || activity.type;
          const category = categoryMap[catId] || {
            icon: "📝",
            color: "hsl(215, 14%, 50%)",
            label: "Other",
          };
          return (
            <div
              key={activity._id || activity.id}
              className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50"
            >
              <span className="text-base">{category.icon}</span>
              <span className="flex-1 text-sm text-foreground truncate">
                {activity.description}
              </span>
              <span
                className="text-xs font-medium shrink-0"
                style={{ color: category.color }}
              >
                {formatDuration(activity.duration)}
              </span>
            </div>
          );
        })}

        {activities.length > 4 && (
          <button
            onClick={onViewMore}
            className="flex items-center justify-center gap-1 w-full p-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            +{activities.length - 4} more
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex gap-2 mt-4 pt-4 border-t border-border">
        {Object.entries(categories)
          .filter(([_, minutes]) => minutes > 0)
          .map(([catId, minutes]) => {
            const category = categoryMap[catId] || {
              icon: "📝",
              color: "hsl(215, 14%, 50%)",
            };
            return (
              <div
                key={catId}
                className="flex items-center gap-1 text-xs"
                style={{ color: category.color }}
              >
                <span>{category.icon}</span>
                <span>{formatDuration(minutes)}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
