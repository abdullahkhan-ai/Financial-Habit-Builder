import {
  Bell,
  Clock3,
} from "lucide-react";

function ReminderCard({
  reminder,
  onToggle,
  onDelete,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex flex-1 gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">

            <Bell
              size={24}
              className="text-blue-600"
            />

          </div>

          <div className="flex-1">

            <div className="flex flex-wrap items-center gap-3">

              <h2 className="text-xl font-bold text-slate-900">
                {reminder.title}
              </h2>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {reminder.category}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  reminder.enabled
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {reminder.enabled
                  ? "Active"
                  : "Disabled"}
              </span>

            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">

              <Clock3 size={16} />

              <span>

                {reminder.frequency} •{" "}
                {reminder.reminderTime}

              </span>

            </div>

            {reminder.description && (

              <p className="mt-4 text-slate-600">

                {reminder.description}

              </p>

            )}

          </div>

        </div>

        {/* Right */}

        <div className="flex gap-3">

          <button
            onClick={() =>
              onToggle(reminder)
            }
            className={`rounded-xl px-5 py-2 font-semibold text-white transition ${
              reminder.enabled
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >

            {reminder.enabled
              ? "Disable"
              : "Enable"}

          </button>

          <button
            onClick={() =>
              onDelete(reminder)
            }
            className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default ReminderCard;