const goals = [
  {
    title: "Emergency Fund",
    saved: 45000,
    target: 100000,
  },
  {
    title: "Vacation",
    saved: 18000,
    target: 30000,
  },
];

function SavingsGoals() {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">

      <h2 className="text-xl font-bold text-slate-900">
        Savings Goals
      </h2>

      <div className="mt-6 space-y-6">

        {goals.map((goal) => {
          const percentage = Math.round(
            (goal.saved / goal.target) * 100
          );

          return (
            <div key={goal.title}>

              <div className="mb-2 flex items-center justify-between">

                <span className="font-medium text-slate-700">
                  {goal.title}
                </span>

                <span className="text-sm font-semibold text-blue-600">
                  {percentage}%
                </span>

              </div>

              <div className="mb-2 h-3 rounded-full bg-slate-200">

                <div
                  className="h-3 rounded-full bg-green-500"
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

              <p className="text-sm text-slate-500">
                ₹{goal.saved.toLocaleString()} / ₹{goal.target.toLocaleString()}
              </p>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default SavingsGoals;