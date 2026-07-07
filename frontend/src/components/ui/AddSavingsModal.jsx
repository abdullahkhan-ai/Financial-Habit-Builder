import { useState } from "react";
import toast from "react-hot-toast";

import Modal from "../modal/Modal";
import CurrencyInput from "../forms/CurrencyInput";

function AddSavingsModal({
  goal,
  onClose,
  onSave,
}) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      return toast.error("Please enter a valid amount.");
    }

    try {
      setLoading(true);

      await onSave(Number(amount));

    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Add Savings"
      maxWidth="max-w-md"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div>

          <h3 className="text-lg font-semibold text-slate-900">
            {goal.title}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Saved ₹
            {goal.savedAmount.toLocaleString("en-IN")} of ₹
            {goal.targetAmount.toLocaleString("en-IN")}
          </p>

        </div>

        <CurrencyInput
          label="Amount to Add"
          name="amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-300 px-6 py-3 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Add Savings"}
          </button>

        </div>

      </form>
    </Modal>
  );
}

export default AddSavingsModal;