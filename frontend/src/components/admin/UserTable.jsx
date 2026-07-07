import { Trash2 } from "lucide-react";

function UserTable({
  users = [],
  onDelete,
}) {
  if (!users.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          No Users Found
        </h2>

        <p className="mt-2 text-slate-500">
          No registered users available.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Joined
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-t border-slate-200 hover:bg-slate-50"
              >

                <td className="px-6 py-4 font-medium text-slate-800">
                  {user.name}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {user.email}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString("en-IN")}
                </td>

                <td className="px-6 py-4">

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Active
                  </span>

                </td>

                <td className="px-6 py-4 text-center">

                  <button
                    onClick={() =>
                      onDelete(user._id)
                    }
                    className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={18} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default UserTable;