function AnalyticsTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
      <p className="mb-3 font-semibold text-slate-900">
        {label}
      </p>

      {payload.map((item) => (
        <div
          key={item.dataKey}
          className="mb-1 flex items-center justify-between gap-6"
        >
          <span
            className="font-medium"
            style={{ color: item.color }}
          >
            {item.dataKey === "income"
              ? "Income"
              : "Expense"}
          </span>

          <span className="font-semibold text-slate-900">
            ₹{item.value.toLocaleString("en-IN")}
          </span>
        </div>
      ))}
    </div>
  );
}

export default AnalyticsTooltip;