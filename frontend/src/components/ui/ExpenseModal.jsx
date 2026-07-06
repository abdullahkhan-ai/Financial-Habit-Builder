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
  { label: "Food", value: "Food" },
  { label: "Transport", value: "Transport" },
  { label: "Shopping", value: "Shopping" },
  { label: "Bills", value: "Bills" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Education", value: "Education" },
  { label: "Travel", value: "Travel" },
  { label: "Other", value: "Other" },
];

function ExpenseModal({
  onClose,
  onSave,
  initialData = null,
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: null,
    notes: "",
  });

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      title: initialData.title || "",
      amount: initialData.amount || "",
      category: initialData.category || "Food",
      date: initialData.date
        ? new Date(initialData.date)
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
      Number(formData.amount) > 0 &&
      formData.date
    );
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Please enter an expense title.");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    if (!formData.date) {
      toast.error("Please select a date.");
      return;
    }

    try {
      setLoading(true);
      await onSave(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={initialData ? "Edit Expense" : "Add Expense"}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">

        <FloatingInput
          label="Expense Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <CurrencyInput
          label="Amount"
          name="amount"
          value={formData.amount}
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
            Expense Date
          </label>

          <DatePicker
  selected={formData.date}
  onChange={(date) =>
    setFormData((prev) => ({
      ...prev,
      date,
    }))
  }
  placeholderText="Select a date"
  dateFormat="dd MMMM yyyy"
  showMonthDropdown
  showYearDropdown
  dropdownMode="select"
  yearDropdownItemNumber={25}
  scrollableYearDropdown
  maxDate={new Date()}

  /* Positioning */
  popperPlacement="bottom-start"

  /* Render outside the modal */
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
            className="rounded-2xl border border-slate-300 px-6 py-3 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!isValid || loading}
            className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : initialData
              ? "Update Expense"
              : "Save Expense"}
          </button>

        </div>

      </form>
    </Modal>
  );
}

export default ExpenseModal;