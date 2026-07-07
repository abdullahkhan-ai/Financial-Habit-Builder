import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

import Modal from "../modal/Modal";
import FloatingInput from "../forms/FloatingInput";
import CurrencyInput from "../forms/CurrencyInput";
import SelectField from "../forms/SelectField";

import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";

const categories = [
  { label: "Emergency Fund", value: "Emergency Fund" },
  { label: "Travel", value: "Travel" },
  { label: "Vehicle", value: "Vehicle" },
  { label: "Electronics", value: "Electronics" },
  { label: "Education", value: "Education" },
  { label: "Home", value: "Home" },
  { label: "Investment", value: "Investment" },
  { label: "Business", value: "Business" },
  { label: "Other", value: "Other" },
];

function GoalModal({
  onClose,
  onSave,
  initialData = null,
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    savedAmount: "",
    category: "Other",
    targetDate: null,
    notes: "",
  });

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      title: initialData.title || "",
      targetAmount: initialData.targetAmount || "",
      savedAmount: initialData.savedAmount || "",
      category: initialData.category || "Other",
      targetDate: initialData.targetDate
        ? new Date(initialData.targetDate)
        : null,
      notes: initialData.notes || "",
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
      Number(formData.targetAmount) > 0 &&
      formData.targetDate
    );
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return toast.error("Please enter a goal title.");
    }

    if (Number(formData.targetAmount) <= 0) {
      return toast.error("Please enter a valid target amount.");
    }

    if (!formData.targetDate) {
      return toast.error("Please select a target date.");
    }

    try {
      setLoading(true);

      await onSave({
        ...formData,
        savedAmount: Number(formData.savedAmount) || 0,
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
          ? "Edit Goal"
          : "Create Goal"
      }
      maxWidth="max-w-xl"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <FloatingInput
          label="Goal Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <CurrencyInput
          label="Target Amount"
          name="targetAmount"
          value={formData.targetAmount}
          onChange={handleChange}
        />

        <CurrencyInput
          label="Already Saved"
          name="savedAmount"
          value={formData.savedAmount}
          onChange={handleChange}
        />

        <SelectField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={categories}
        />

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">
            Target Date
          </label>

          <DatePicker
            selected={formData.targetDate}
            onChange={(date) =>
              setFormData((prev) => ({
                ...prev,
                targetDate: date,
              }))
            }
            placeholderText="Select target date"
            dateFormat="dd MMMM yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            scrollableYearDropdown
            yearDropdownItemNumber={30}
            minDate={new Date()}
            withPortal
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">
            Notes
          </label>

          <textarea
            rows={4}
            name="notes"
            placeholder="Optional notes..."
            value={formData.notes}
            onChange={handleChange}
            className="w-full resize-none rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />

        </div>

        <div className="flex justify-end gap-3 pt-3">

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!isValid || loading}
            className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : initialData
              ? "Update Goal"
              : "Create Goal"}
          </button>

        </div>

      </form>
    </Modal>
  );
}

export default GoalModal;