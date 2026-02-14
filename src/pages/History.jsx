import { Calendar, Clock } from "lucide-react";
import { useMemo } from "react";

import { useActivities } from "../hooks/useActivities.js";
import { useCategories } from "../hooks/useCategories.js";
import { formatDate, formatDuration } from "../lib/utils.js";

export default function HistoryPage() {
  const { activities, isLoading } = useActivities();
  const { categories } = useCategories();

  // Create category lookup map
  const categoryMap = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      map[cat._id] = cat;
    });
    return map;
  }, [categories]);

  // Group activities by date
  const groupedActivities = useMemo(() => {
    if (!activities || !Array.isArray(activities)) return [];

    const groups = {};
    activities.forEach((activity) => {
      const date = activity.date;
      if (!groups[date]) {
        groups[date] = {
          date,
          activities: [],
          totalMinutes: 0,
        };
      }
      groups[date].activities.push(activity);
      groups[date].totalMinutes += activity.duration;
    });

    return Object.values(groups).sort((a, b) => b.date.localeCompare(a.date));
  }, [activities]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">History</h1>
        <p className="text-sm text-muted-foreground">
          Browse your past learning activities
        </p>
      </div>

      {groupedActivities.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No activities logged yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {groupedActivities.map((log) => (
            <div
              key={log.date}
              className="bg-card rounded-xl border border-border p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-foreground">
                  {formatDate(log.date)}
                </h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {formatDuration(log.totalMinutes)}
                </div>
              </div>
              <div className="space-y-2">
                {log.activities.map((activity) => {
                  const cat = categoryMap[activity.categoryId?._id] ||
                    activity.categoryId || {
                      icon: "📝",
                      color: "hsl(215, 14%, 50%)",
                      label: "Other",
                    };
                  return (
                    <div
                      key={activity._id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span>{cat.icon}</span>
                      <span className="flex-1 text-foreground">
                        {activity.description}
                      </span>
                      <span style={{ color: cat.color }}>
                        {formatDuration(activity.duration)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
