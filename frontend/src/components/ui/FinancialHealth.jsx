function FinancialHealth({ data }) {
  const healthItems = [
    {
      name: "Saving Rate",
      value: data?.savingRate ?? 0,
      color: "bg-green-500",
      text: "text-green-600",
    },
    {
      name: "Expense Rate",
      value: data?.expenseRate ?? 0,
      color: "bg-red-500",
      text: "text-red-600",
    },
    {
      name: "Investment Rate",
      value: data?.investmentRate ?? 0,
      color: "bg-blue-500",
      text: "text-blue-600",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">

      <h2 className="text-xl font-bold text-slate-900">
        Financial Health
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Based on your actual financial data
      </p>

      <div className="mt-6 space-y-6">

        {healthItems.map((item) => (
          <div key={item.name}>

            <div className="mb-2 flex items-center justify-between">

              <span className="font-medium text-slate-700">
                {item.name}
              </span>

              <span className={`font-semibold ${item.text}`}>
                {item.value}%
              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-200">

              <div
                className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                style={{
                  width: `${Math.min(item.value, 100)}%`,
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