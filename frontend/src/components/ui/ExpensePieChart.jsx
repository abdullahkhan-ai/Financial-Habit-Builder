import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#EC4899",
  "#84CC16",
];

function ExpensePieChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="flex h-[320px] sm:h-[420px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
          Expense Breakdown
        </h2>

        <p className="mt-3 text-center text-sm text-slate-500 sm:text-base">
          No expense data available.
        </p>
      </div>
    );
  }

  const totalExpense = data.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          Expense Breakdown
        </h2>

        <p className="text-sm text-slate-500">
          Category-wise expense distribution
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
        {/* Chart */}

        <div className="relative mx-auto h-72 w-full sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
                cornerRadius={8}
                stroke="none"
                isAnimationActive
                animationDuration={900}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                cursor={false}
                content={() => null}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
              ₹{totalExpense.toLocaleString("en-IN")}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Total Expense
            </p>
          </div>
        </div>

        {/* Legend */}

        <div className="space-y-3 sm:space-y-4">
          {data.map((item, index) => {
            const percent = (
              (item.amount / totalExpense) *
              100
            ).toFixed(1);

            return (
              <div
                key={item.category}
                className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 p-3 transition hover:shadow-md sm:p-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="h-4 w-4 flex-shrink-0 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[index % COLORS.length],
                    }}
                  />

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-800">
                      {item.category}
                    </p>

                    <p className="truncate text-sm text-slate-500">
                      ₹
                      {item.amount.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>
                </div>

                <span className="flex-shrink-0 font-semibold text-slate-700">
                  {percent}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ExpensePieChart;