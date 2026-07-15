function RecentTransactions({
  transactions = [],
}) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">

      {/* Header */}

      <div className="sticky top-0 z-10 mb-5 flex items-center justify-between bg-white/80 pb-3 backdrop-blur-xl">

        <h2 className="text-xl font-bold text-slate-900">
          Recent Transactions
        </h2>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {transactions.length} Records
        </span>

      </div>

      {transactions.length === 0 ? (

        <div className="flex flex-1 items-center justify-center text-slate-400">

          No transactions found.

        </div>

      ) : (

        <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-hide max-h-[430px]">
                      {transactions.map((item) => (

            <div
              key={item._id}
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md"
            >

              <div>

                <p className="font-semibold text-slate-900">
                  {item.title}
                </p>

                <div className="mt-1 flex items-center gap-2">

                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      item.type === "Income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.type}
                  </span>

                  <span className="text-sm text-slate-500">
                    {new Date(item.date).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>

                </div>

              </div>

              <div className="text-right">

                <p
                  className={`text-lg font-bold ${
                    item.type === "Income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.type === "Income" ? "+" : "-"}₹
                  {Number(item.amount).toLocaleString(
                    "en-IN"
                  )}
                </p>

                <p className="text-xs text-slate-400">
                  {item.category}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default RecentTransactions;