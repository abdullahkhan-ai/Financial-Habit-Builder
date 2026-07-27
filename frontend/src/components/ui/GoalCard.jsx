import {
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

function GoalCard({
  goal,
  onEdit,
  onDelete,
  onAddSavings,
}) {
  const progress = Math.min(
    Math.round(
      (goal.savedAmount / goal.targetAmount) * 100
    ),
    100
  );

  const remaining =
    goal.targetAmount - goal.savedAmount;

  const daysLeft = Math.ceil(
    (new Date(goal.targetDate) - new Date()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="break-words text-lg font-bold text-slate-900 sm:text-xl">
            {goal.title}
          </h3>

          <p className="mt-1 break-words text-sm text-slate-500">
            {goal.category}
          </p>
        </div>

        {goal.status === "Completed" ? (
          <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            Completed
          </span>
        ) : (
          <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            Active
          </span>
        )}
      </div>

      {/* Progress */}

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="font-medium">
            ₹{goal.savedAmount.toLocaleString("en-IN")}
          </span>

          <span className="text-right font-medium">
            ₹{goal.targetAmount.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-blue-600">
            {progress}%
          </span>

          <span className="text-right text-slate-500">
            Remaining ₹
            {remaining.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Footer */}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-500">
          {goal.status === "Completed"
            ? "Goal Achieved"
            : `${daysLeft} days left`}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onAddSavings(goal)}
            className="rounded-xl bg-green-50 p-2.5 text-green-600 transition hover:bg-green-100"
            title="Add Savings"
          >
            <Plus size={18} />
          </button>

          <button
            onClick={() => onEdit(goal)}
            className="rounded-xl bg-blue-50 p-2.5 text-blue-600 transition hover:bg-blue-100"
            title="Edit"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(goal)}
            className="rounded-xl bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoalCard;