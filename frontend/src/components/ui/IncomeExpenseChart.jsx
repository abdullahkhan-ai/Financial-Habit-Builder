import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import AnalyticsTooltip from "./AnalyticsTooltip";

function IncomeExpenseChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="flex h-[320px] sm:h-[420px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
          Income vs Expense
        </h2>

        <p className="mt-6 text-center text-sm text-slate-500 sm:mt-8 sm:text-base">
          No analytics data available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 sm:mb-6">
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
          Income vs Expense
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Monthly financial comparison
        </p>
      </div>

      <div className="h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              stroke="#E2E8F0"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#64748B", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#64748B", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={45}
            />

            <Tooltip
              content={<AnalyticsTooltip />}
            />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#22C55E"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default IncomeExpenseChart;