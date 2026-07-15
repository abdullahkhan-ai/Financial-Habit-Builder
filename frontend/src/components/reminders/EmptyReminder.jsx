import {
  Bell,
} from "lucide-react";

function EmptyReminder() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center shadow-sm">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">

        <Bell
          size={40}
          className="text-blue-600"
        />

      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900">
        No Reminders Yet
      </h2>

      <p className="mt-3 text-slate-500">
        Create your first reminder and stay
        consistent with your financial habits.
      </p>

    </div>
  );
}

export default EmptyReminder;