import {
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  Tag,
} from "lucide-react";

function HighestTransactionCard({
  title,
  transaction,
  type,
}) {
  const isIncome = type === "income";

  if (!transaction) {
    return (
      <div className="flex h-56 sm:h-64 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
          {title}
        </h2>

        <p className="mt-3 text-center text-sm text-slate-500 sm:text-base">
          No transaction found.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 break-words text-2xl font-bold text-slate-900 sm:text-3xl">
            ₹{transaction.amount.toLocaleString("en-IN")}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl sm:h-auto sm:w-auto sm:p-4 ${
            isIncome
              ? "bg-green-100"
              : "bg-red-100"
          }`}
        >
          {isIncome ? (
            <ArrowUpCircle
              className="text-green-600"
              size={28}
            />
          ) : (
            <ArrowDownCircle
              className="text-red-600"
              size={28}
            />
          )}
        </div>
      </div>

      <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-4">
        <div className="flex items-start gap-3">
          <Tag
            size={18}
            className="mt-0.5 flex-shrink-0 text-slate-400"
          />

          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Title
            </p>

            <p className="break-words font-semibold text-slate-800">
              {transaction.title}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Tag
            size={18}
            className="mt-0.5 flex-shrink-0 text-slate-400"
          />

          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Category
            </p>

            <p className="break-words font-semibold text-slate-800">
              {transaction.category}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar
            size={18}
            className="mt-0.5 flex-shrink-0 text-slate-400"
          />

          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Date
            </p>

            <p className="break-words font-semibold text-slate-800">
              {new Date(
                transaction.date
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HighestTransactionCard;