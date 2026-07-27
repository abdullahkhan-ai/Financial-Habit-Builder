import { Pencil, Trash2, Wallet } from "lucide-react";
import EmptyState from "../ui/EmptyState";

function TransactionTable({
  data = [],
  titleField = "title",
  onEdit,
  onDelete,
  emptyMessage = "No records found.",
  emptyTitle = "No Transactions Yet",
  emptyButtonText,
  onEmptyButtonClick,
}) {
  if (!data.length) {
    return (
      <EmptyState
        icon={Wallet}
        title={emptyTitle}
        description={emptyMessage}
        buttonText={emptyButtonText}
        onButtonClick={onEmptyButtonClick}
      />
    );
  }

  return (
    <>
      {/* Desktop Table */}

      <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Title
                </th>

                <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Category
                </th>

                <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Amount
                </th>

                <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Date
                </th>

                <th className="whitespace-nowrap px-6 py-4 text-center text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-slate-200 transition hover:bg-slate-50"
                >
                  <td className="px-6 py-5 font-medium text-slate-900">
                    {item[titleField]}
                  </td>

                  <td className="px-6">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                      {item.category}
                    </span>
                  </td>

                  <td className="px-6 font-semibold text-green-600">
                    ₹ {Number(item.amount).toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 text-slate-500">
                    {new Date(item.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="rounded-xl p-2 transition hover:bg-blue-100"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(item)}
                        className="rounded-xl p-2 transition hover:bg-red-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}

      <div className="space-y-4 md:hidden">
        {data.map((item) => (
          <div
            key={item._id}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="break-words text-lg font-semibold text-slate-900">
                  {item[titleField]}
                </h3>

                <div className="mt-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                  {item.category}
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-green-600">
                  ₹ {Number(item.amount).toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-sm text-slate-500">
                {new Date(item.date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="rounded-xl bg-blue-50 p-2.5 text-blue-600 transition hover:bg-blue-100"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => onDelete(item)}
                  className="rounded-xl bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TransactionTable;