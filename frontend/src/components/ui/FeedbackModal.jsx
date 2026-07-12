import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

function FeedbackModal({
  open,
  onClose,
  onSave,
}) {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    subject: "",
    category: "Feedback",
    message: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await onSave(form);

      setForm({
        subject: "",
        category: "Feedback",
        message: "",
      });

      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
        }}
        className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl"
      >

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              Send Feedback
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Help us improve FinHabit.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>
                Feedback
              </option>

              <option>
                Suggestion
              </option>

              <option>
                Bug Report
              </option>

            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Message
            </label>

            <textarea
              rows={6}
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-5 py-3 font-medium transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {loading
                ? "Submitting..."
                : "Submit Feedback"}
            </button>

          </div>

        </form>

      </motion.div>

    </div>
  );
}

export default FeedbackModal;