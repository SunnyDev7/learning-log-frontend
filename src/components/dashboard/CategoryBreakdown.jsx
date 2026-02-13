import { useMemo } from "react";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatDuration } from "../../lib/utils.js";

export function CategoryBreakdown({ categories, categoryConfigs }) {
  const { data, totalMinutes } = useMemo(() => {
    const configMap = {};
    if (categoryConfigs) {
      categoryConfigs.forEach((cat) => {
        const id = cat._id || cat.id;
        configMap[id] = cat;
      });
    }

    const chartData = Object.entries(categories || {})
      .filter(([_, minutes]) => minutes > 0)
      .map(([catId, minutes]) => ({
        name: configMap[catId]?.label || "Unknown",
        value: minutes,
        color: configMap[catId]?.color || "hsl(215, 14%, 50%)",
        icon: configMap[catId]?.icon || "📝",
      }));

    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    return { data: chartData, totalMinutes: total };
  }, [categories, categoryConfigs]);

  if (totalMinutes === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          Category Breakdown
        </h3>
        <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
          No activities logged this week
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Category Breakdown
      </h3>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value) => [formatDuration(value), "Time"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5 text-xs">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-foreground">
              {item.icon} {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
