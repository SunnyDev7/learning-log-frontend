import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover/95 backdrop-blur-sm border border-border rounded-lg px-4 py-3 shadow-xl">
      <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
      <p className="text-lg font-semibold text-foreground">
        {payload[0].value}
        <span className="text-sm font-normal text-muted-foreground ml-0.5">
          hrs
        </span>
      </p>
    </div>
  );
}

function CustomDot({ cx, cy, index, dataLength }) {
  const isEndpoint = index === 0 || index === dataLength - 1;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={isEndpoint ? 4 : 3}
      fill="#06b6d4"
      stroke="hsl(var(--card))"
      strokeWidth={2}
      className="drop-shadow-sm"
    />
  );
}

function CustomActiveDot({ cx, cy }) {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={12}
        fill="#06b6d4"
        opacity={0.15}
      />
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="#06b6d4"
        stroke="hsl(var(--card))"
        strokeWidth={2.5}
        className="drop-shadow-md"
      />
    </g>
  );
}

export function YearlyChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          Yearly Activity
        </h3>
        <div className="h-[280px] flex items-center justify-center text-muted-foreground text-sm">
          No activity data yet
        </div>
      </div>
    );
  }

  const maxHours = Math.max(...data.map((d) => d.totalHours));

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Yearly Activity
        </h3>
        <p className="text-xs text-muted-foreground">
          Peak:{" "}
          <span className="font-semibold text-foreground">{maxHours}h</span>
        </p>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
          >
            <defs>
              <linearGradient id="yearlyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="#06b6d4"
                  stopOpacity={0.25}
                />
                <stop
                  offset="95%"
                  stopColor="#06b6d4"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="hsl(var(--border))"
              strokeOpacity={0.5}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "hsl(var(--muted-foreground))",
                fontSize: 11,
                fontWeight: 500,
              }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "hsl(var(--muted-foreground))",
                fontSize: 11,
                fontWeight: 500,
              }}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#06b6d4",
                strokeWidth: 1,
                strokeDasharray: "4 4",
                strokeOpacity: 0.4,
              }}
            />
            <Area
              type="monotone"
              dataKey="totalHours"
              stroke="#06b6d4"
              strokeWidth={2.5}
              fill="url(#yearlyGradient)"
              dot={(props) => (
                <CustomDot {...props} dataLength={data.length} />
              )}
              activeDot={<CustomActiveDot />}
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
