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
      <div className="flex h-[420px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Expense Breakdown
        </h2>

        <p className="mt-3 text-slate-500">
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
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Expense Breakdown
        </h2>

        <p className="text-sm text-slate-500">
          Category-wise expense distribution
        </p>
      </div>

      <div className="grid items-center gap-6 lg:grid-cols-2">

        {/* Chart */}

        <div className="relative h-80">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                innerRadius={75}
                outerRadius={105}
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

              <Tooltip cursor={false} content={() => null} />

            </PieChart>

          </ResponsiveContainer>

          {/* Center Text */}

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

            <p className="text-3xl font-bold text-slate-900">
              ₹{totalExpense.toLocaleString("en-IN")}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Total Expense
            </p>

          </div>

        </div>

        {/* Custom Legend */}

        <div className="space-y-4">

          {data.map((item, index) => {

            const percent = (
              (item.amount / totalExpense) *
              100
            ).toFixed(1);

            return (

              <div
                key={item.category}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:shadow-md"
              >

                <div className="flex items-center gap-3">

                  <div
                    className="h-4 w-4 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[index % COLORS.length],
                    }}
                  />

                  <div>

                    <p className="font-semibold text-slate-800">
                      {item.category}
                    </p>

                    <p className="text-sm text-slate-500">
                      ₹
                      {item.amount.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                  </div>

                </div>

                <span className="font-semibold text-slate-700">
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