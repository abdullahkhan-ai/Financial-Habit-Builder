function FinancialHealth({ data }) {
  const savingRate =
    data?.savingRate ?? 0;

  const expenseRate =
    data?.expenseRate ?? 0;

  const goalProgress =
    data?.goalProgress ?? 0;

  const healthScore =
    data?.healthScore ?? 0;

  const healthStatus =
    data?.healthStatus ??
    "Needs Improvement";

  const healthItems = [
    {
      name: "Saving Rate",
      value: savingRate,
      color: "bg-emerald-500",
      text: "text-emerald-600",
      description:
        "Percentage of your income saved",
    },

    {
      name: "Expense Rate",
      value: expenseRate,
      color: "bg-red-500",
      text: "text-red-600",
      description:
        "Percentage of your income spent",
    },

    {
      name: "Goal Progress",
      value: goalProgress,
      color: "bg-blue-500",
      text: "text-blue-600",
      description:
        "Average progress across all goals",
    },
  ];

  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="text-center">

        <h2 className="text-xl font-bold text-slate-900">
          Financial Health
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Based on your financial activity
        </p>

        <div className="mt-6">

          <div className="text-6xl font-extrabold text-slate-900">
            {healthScore}
          </div>

          <div className="text-base font-semibold text-slate-500">
            /100
          </div>

          <span
            className={`mt-4 inline-flex rounded-full px-4 py-1 text-sm font-semibold ${
              healthScore >= 80
                ? "bg-emerald-100 text-emerald-700"
                : healthScore >= 60
                ? "bg-blue-100 text-blue-700"
                : healthScore >= 40
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {healthStatus}
          </span>

        </div>

      </div>

      {/* Metrics */}

      <div className="mt-8 flex-1 space-y-5">
                {healthItems.map((item) => (
          <div key={item.name}>

            <div className="mb-2 flex items-center justify-between">

              <div>

                <h3 className="font-semibold text-slate-800">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-500">
                  {item.description}
                </p>

              </div>

              <span
                className={`font-bold ${item.text}`}
              >
                {Math.round(item.value)}%
              </span>

            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">

              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${item.color}`}
                style={{
                  width: `${Math.min(
                    item.value,
                    100
                  )}%`,
                }}
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default FinancialHealth;