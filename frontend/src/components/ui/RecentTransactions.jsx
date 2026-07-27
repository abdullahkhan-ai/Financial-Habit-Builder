function RecentTransactions({
  transactions = [],
}) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6">
      {/* Header */}

      <div className="mb-5 flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          Recent Transactions
        </h2>

        <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {transactions.length} Records
        </span>
      </div>

      {transactions.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-16 text-center text-slate-400">
          No transactions found.
        </div>
      ) : (
        <div className="max-h-[430px] flex-1 space-y-4 overflow-y-auto pr-1">
          {transactions.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="break-words text-base font-semibold text-slate-900">
                    {item.title}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        item.type === "Income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.type}
                    </span>

                    <span className="text-sm text-slate-500">
                      {new Date(item.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <p
                    className={`text-xl font-bold ${
                      item.type === "Income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.type === "Income" ? "+" : "-"}₹
                    {Number(item.amount).toLocaleString("en-IN")}
                  </p>

                  <p className="mt-1 break-words text-sm text-slate-400">
                    {item.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentTransactions;