import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export function WeeklyChart({ data, categoryConfigs }) {
  const { chartData, categoriesRecord } = useMemo(() => {
    const record = {};
    if (categoryConfigs) {
      categoryConfigs.forEach((cat) => {
        const id = cat._id || cat.id;
        record[id] = { label: cat.label, color: cat.color };
      });
    }

    const processedData = data.map((d) => {
      const entry = { day: d.day };
      Object.entries(d.categories).forEach(([catId, minutes]) => {
        entry[catId] = minutes / 60;
      });
      return entry;
    });

    return { chartData: processedData, categoriesRecord: record };
  }, [data, categoryConfigs]);

  const categoryIds = Object.keys(categoriesRecord);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Weekly Activity
      </h3>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barCategoryGap="20%">
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value, name) => [
                `${value.toFixed(1)}h`,
                categoriesRecord[name]?.label || name,
              ]}
            />
            <Legend
              formatter={(value) => categoriesRecord[value]?.label || value}
              wrapperStyle={{ fontSize: "12px" }}
            />
            {categoryIds.map((catId, index) => (
              <Bar
                key={catId}
                dataKey={catId}
                stackId="a"
                fill={categoriesRecord[catId]?.color || "hsl(var(--primary))"}
                radius={
                  index === categoryIds.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]
                }
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
