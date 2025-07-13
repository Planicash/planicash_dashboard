import type { FunctionalComponent } from "preact";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useTheme } from "@/hooks/use-theme";
import type { OverviewChartProps } from "./utils/chart";

const OverviewChart: FunctionalComponent<OverviewChartProps> = ({
  data,
  dataKey,
  labelKey,
  height = 300,
}) => {
  const { theme } = useTheme();

  return (
    <div className="card-body p-0">
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="#2563eb"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="#2563eb"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Tooltip
            cursor={false}
            formatter={(value: number | string) => `$${value}`}
          />
          <XAxis
            dataKey={labelKey}
            strokeWidth={0}
            stroke={theme === "light" ? "#475569" : "#94a3b8"}
            tickMargin={6}
          />
          <YAxis
            dataKey={dataKey}
            strokeWidth={0}
            stroke={theme === "light" ? "#475569" : "#94a3b8"}
            tickFormatter={(value: number) => `$${value}`}
            tickMargin={6}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#2563eb"
            fillOpacity={1}
            fill="url(#colorGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewChart;
