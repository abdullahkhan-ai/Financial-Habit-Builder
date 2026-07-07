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
      <div className="flex h-[420px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Income vs Expense
        </h2>

        <p className="mt-8 text-slate-500">
          No analytics data available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Income vs Expense
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Monthly financial comparison
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              stroke="#E2E8F0"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#64748B" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#64748B" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={<AnalyticsTooltip />}
            />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#22C55E"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default IncomeExpenseChart;