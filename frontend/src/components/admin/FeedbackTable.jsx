import {
  CheckCircle2,
  Trash2,
} from "lucide-react";

function FeedbackTable({
  feedback,
  onResolve,
  onDelete,
}) {
  if (feedback.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

        <h2 className="text-2xl font-bold text-slate-900">
          No Feedback Found
        </h2>

        <p className="mt-3 text-slate-500">
          User feedback will appear here.
        </p>

      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="border-b bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                User
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Subject
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Date
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {feedback.map((item) => (

              <tr
                key={item._id}
                className="border-b transition hover:bg-slate-50"
              >

                <td className="px-6 py-5">

                  <p className="font-semibold text-slate-900">
                    {item.user?.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {item.user?.email}
                  </p>

                </td>

                <td className="px-6 py-5">

                  <p className="font-semibold text-slate-900">
                    {item.subject}
                  </p>

                  <p className="mt-1 max-w-sm text-sm text-slate-500 line-clamp-2">
                    {item.message}
                  </p>

                </td>

                <td className="px-6 py-5">
                  {item.category}
                </td>

                <td className="px-6 py-5">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === "Resolved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

                <td className="px-6 py-5 text-slate-500">

                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}

                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-center gap-2">

                    {item.status ===
                      "Pending" && (

                      <button
                        onClick={() =>
                          onResolve(item._id)
                        }
                        className="rounded-xl bg-green-50 p-2 text-green-600 transition hover:bg-green-100"
                        title="Mark Resolved"
                      >

                        <CheckCircle2
                          size={18}
                        />

                      </button>

                    )}

                    <button
                      onClick={() =>
                        onDelete(item)
                      }
                      className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                      title="Delete"
                    >

                      <Trash2
                        size={18}
                      />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default FeedbackTable;