import {
  CheckCircle2,
  Flame,
  CalendarDays,
  Pencil,
  Trash2,
} from "lucide-react";

function HabitCard({
  habit,
  onComplete,
  onEdit,
  onDelete,
}) {
  const progress = Math.min(
    Math.round((habit.currentStreak / habit.targetStreak) * 100),
    100
  );

  const completedToday = habit.completedToday;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-bold text-slate-900">
            {habit.title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {habit.description}
          </p>

        </div>

        <div className="rounded-2xl bg-orange-100 p-3">

          <Flame
            size={24}
            className="text-orange-600"
          />

        </div>

      </div>

      {/* Streak */}

      <div className="mt-8">

        <div className="mb-2 flex items-center justify-between">

          <span className="text-sm font-medium text-slate-600">
            Current Streak
          </span>

          <span className="font-bold text-orange-600">
            🔥 {habit.currentStreak} Days
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200">

          <div
            className="h-full rounded-full bg-orange-500 transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Info */}

      <div className="mt-8 space-y-4">

        <div className="flex items-center gap-3">

          <CalendarDays
            size={18}
            className="text-slate-400"
          />

          <span className="text-slate-600">
            Target: {habit.targetStreak} Days
          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between">

        <button
          onClick={() => onComplete(habit)}
          disabled={completedToday}
          className={`rounded-2xl px-5 py-3 font-semibold transition ${
            completedToday
              ? "cursor-not-allowed bg-green-100 text-green-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {completedToday ? (
            <span className="flex items-center gap-2">

              <CheckCircle2 size={18} />

              Completed

            </span>
          ) : (
            "Complete Today"
          )}
        </button>

        <div className="flex gap-2">

          <button
            onClick={() => onEdit(habit)}
            className="rounded-xl bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(habit)}
            className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default HabitCard;