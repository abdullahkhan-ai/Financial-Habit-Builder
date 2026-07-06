import { Pencil, Trash2 } from "lucide-react";

function TransactionTable({
  data = [],
  titleField = "title",
  onEdit,
  onDelete,
  emptyMessage = "No records found.",
}) {
  if (!data.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">

        <h3 className="text-xl font-semibold text-slate-700">
          {emptyMessage}
        </h3>

      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="px-6 py-4 text-left font-semibold">
              Title
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Category
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Amount
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Date
            </th>

            <th className="px-6 py-4 text-center font-semibold">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map((item) => (

            <tr
              key={item._id}
              className="border-t transition hover:bg-slate-50"
            >

              <td className="px-6 py-5">
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
                {new Date(item.date).toLocaleDateString("en-IN")}
              </td>

              <td>

                <div className="flex justify-center gap-3">

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
  );
}

export default TransactionTable;