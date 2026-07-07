import {
  Pencil,
  Trash2,
  Plus,
  CheckCircle2,
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
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-bold text-slate-900">
            {goal.title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {goal.category}
          </p>

        </div>

        {goal.status === "Completed" ? (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            Completed
          </span>
        ) : (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            Active
          </span>
        )}

      </div>

      {/* Progress */}

      <div className="mt-6">

        <div className="mb-2 flex justify-between text-sm">

          <span>
            ₹{goal.savedAmount.toLocaleString("en-IN")}
          </span>

          <span>
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

        <div className="mt-2 flex justify-between text-sm">

          <span className="font-semibold text-blue-600">
            {progress}%
          </span>

          <span className="text-slate-500">
            Remaining ₹
            {remaining.toLocaleString("en-IN")}
          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between">

        <div className="text-sm text-slate-500">

          {goal.status === "Completed"
            ? "Goal Achieved"
            : `${daysLeft} days left`}

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => onAddSavings(goal)}
            className="rounded-xl bg-green-50 p-2 text-green-600 transition hover:bg-green-100"
            title="Add Savings"
          >
            <Plus size={18} />
          </button>

          <button
            onClick={() => onEdit(goal)}
            className="rounded-xl bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
            title="Edit"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(goal)}
            className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
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