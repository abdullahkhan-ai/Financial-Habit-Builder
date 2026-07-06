import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function WealthChart({ data = [] }) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">

      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-900">
          Wealth Growth
        </h2>

        <p className="text-sm text-slate-500">
          Your wealth growth based on actual transactions
        </p>

      </div>

      <div className="h-80">

        {data.length === 0 ? (

          <div className="flex h-full items-center justify-center text-slate-400">
            No chart data available.
          </div>

        ) : (

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart data={data}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="month"
              />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  `₹${Number(value).toLocaleString("en-IN")}`
                }
              />

              <Line
                type="monotone"
                dataKey="wealth"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{
                  r: 5,
                }}
                activeDot={{
                  r: 7,
                }}
              />

            </LineChart>

          </ResponsiveContainer>

        )}

      </div>

    </div>
  );
}

export default WealthChart;