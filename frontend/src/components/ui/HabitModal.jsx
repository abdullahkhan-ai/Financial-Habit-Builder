import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import Modal from "../modal/Modal";
import FloatingInput from "../forms/FloatingInput";
import SelectField from "../forms/SelectField";

const frequencies = [
  { label: "Daily", value: "Daily" },
  { label: "Weekly", value: "Weekly" },
  { label: "Monthly", value: "Monthly" },
];

function HabitModal({
  initialData = null,
  onClose,
  onSave,
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    frequency: "Daily",
    targetStreak: 30,
  });

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      title: initialData.title || "",
      description: initialData.description || "",
      frequency: initialData.frequency || "Daily",
      targetStreak:
        initialData.targetStreak || 30,
    });
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isValid = useMemo(() => {
    return (
      formData.title.trim() &&
      Number(formData.targetStreak) > 0
    );
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return toast.error("Habit title is required.");
    }

    try {
      setLoading(true);

      await onSave({
        ...formData,
        targetStreak: Number(
          formData.targetStreak
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={
        initialData
          ? "Edit Habit"
          : "Create Habit"
      }
      maxWidth="max-w-xl"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <FloatingInput
          label="Habit Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <FloatingInput
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <SelectField
          label="Frequency"
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          options={frequencies}
        />

        <FloatingInput
          label="Target Streak (Days)"
          name="targetStreak"
          type="number"
          value={formData.targetStreak}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-3 pt-3">

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-300 px-6 py-3 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!isValid || loading}
            className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : initialData
              ? "Update Habit"
              : "Create Habit"}
          </button>

        </div>

      </form>
    </Modal>
  );
}

export default HabitModal;