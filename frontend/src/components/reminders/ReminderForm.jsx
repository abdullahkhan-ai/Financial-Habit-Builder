import { useState } from "react";
import {
  Plus,
  X,
} from "lucide-react";

function ReminderForm({
  onCreate,
}) {
  const [showForm, setShowForm] =
    useState(false);

  const [form, setForm] =
    useState({
      title: "",
      category: "Saving",
      frequency: "Daily",
      reminderTime: "09:00",
      description: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate(form);

    setForm({
      title: "",
      category: "Saving",
      frequency: "Daily",
      reminderTime: "09:00",
      description: "",
    });

    setShowForm(false);
  };

  return (
    <div className="space-y-5">

      <div className="flex justify-end">

        <button
          onClick={() =>
            setShowForm(!showForm)
          }
          className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >

          {showForm ? (
            <X size={18} />
          ) : (
            <Plus size={18} />
          )}

          {showForm
            ? "Close"
            : "Create Reminder"}

        </button>

      </div>

      {showForm && (

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2"
        >

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Reminder Title
            </label>

            <input
              required
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title:
                    e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Category
            </label>

            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category:
                    e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >

              <option>
                Saving
              </option>

              <option>
                Expense
              </option>

              <option>
                Investment
              </option>

              <option>
                Budget
              </option>

            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Frequency
            </label>

            <select
              value={form.frequency}
              onChange={(e) =>
                setForm({
                  ...form,
                  frequency:
                    e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >

              <option>
                Daily
              </option>

              <option>
                Weekly
              </option>

              <option>
                Monthly
              </option>

            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Reminder Time
            </label>

            <input
              type="time"
              required
              value={
                form.reminderTime
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  reminderTime:
                    e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              rows={3}
              value={
                form.description
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          <div className="flex justify-end gap-3 md:col-span-2">

            <button
              type="button"
              onClick={() =>
                setShowForm(false)
              }
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Create Reminder
            </button>

          </div>

        </form>

      )}

    </div>
  );
}

export default ReminderForm;