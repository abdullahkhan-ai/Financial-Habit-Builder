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
      <div className="flex h-64 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          {title}
        </h2>

        <p className="mt-3 text-slate-500">
          No transaction found.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            ₹{transaction.amount.toLocaleString("en-IN")}
          </h2>

        </div>

        <div
          className={`rounded-2xl p-4 ${
            isIncome
              ? "bg-green-100"
              : "bg-red-100"
          }`}
        >
          {isIncome ? (
            <ArrowUpCircle
              className="text-green-600"
              size={32}
            />
          ) : (
            <ArrowDownCircle
              className="text-red-600"
              size={32}
            />
          )}
        </div>

      </div>

      <div className="mt-8 space-y-4">

        <div className="flex items-center gap-3">

          <Tag
            size={18}
            className="text-slate-400"
          />

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-400">
              Title
            </p>

            <p className="font-semibold text-slate-800">
              {transaction.title}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Tag
            size={18}
            className="text-slate-400"
          />

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-400">
              Category
            </p>

            <p className="font-semibold text-slate-800">
              {transaction.category}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Calendar
            size={18}
            className="text-slate-400"
          />

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-400">
              Date
            </p>

            <p className="font-semibold text-slate-800">
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