import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import TransactionTable from "../components/table/TransactionTable";
import ExpenseModal from "../components/ui/ExpenseModal";
import ExportButtons from "../components/ui/ExportButtons";
import ConfirmModal from "../components/ui/ConfirmModal";

import {
  exportToPDF,
  exportToCSV,
} from "../utils/exportUtils";

import {
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../services/expenseService";

import toast from "react-hot-toast";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [selectedExpense, setSelectedExpense] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [deleteExpenseId, setDeleteExpenseId] =
    useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpense();

      setExpenses(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch expenses."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await createExpense(formData);

      toast.success(
        "Expense added successfully."
      );

      setShowModal(false);

      fetchExpenses();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add expense."
      );
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateExpense(
        selectedExpense._id,
        formData
      );

      toast.success(
        "Expense updated successfully."
      );

      setSelectedExpense(null);

      setShowModal(false);

      fetchExpenses();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update expense."
      );
    }
  };

  // Delete

  const openDeleteModal = (expense) => {
    setDeleteExpenseId(expense._id);

    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteExpense(deleteExpenseId);

      toast.success("Expense deleted.");

      setShowDeleteModal(false);

      setDeleteExpenseId(null);

      fetchExpenses();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete expense."
      );
    }
  };

  // Export PDF

  const handleExportPDF = () => {
    const columns = [
      "Title",
      "Category",
      "Amount",
      "Date",
    ];

    const rows = expenses.map((item) => [
      item.title,
      item.category,
      `INR ${item.amount}`,
      new Date(
        item.date
      ).toLocaleDateString(),
    ]);

    exportToPDF(
      "Expense Report",
      columns,
      rows,
      "expense-report"
    );
  };

  // Export Excel

  const handleExportCSV = () => {
  exportToCSV(
    expenses.map((item) => ({
      Title: item.title,
      Amount: `INR ${Number(item.amount).toLocaleString("en-IN")}`,
      Category: item.category,
      Date: new Date(item.date).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      ),
    })),
    "expense-report"
  );
};
    return (
    <DashboardLayout>

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Expenses
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all your expenses.
          </p>

        </div>

        <div className="flex gap-3">

          <ExportButtons
            onPDF={handleExportPDF}
            onCSV={handleExportCSV}
          />

          <button
            onClick={() => {
              setSelectedExpense(null);
              setShowModal(true);
            }}
            className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            + Add Expense
          </button>

        </div>

      </div>

      {loading ? (

        <div className="rounded-3xl bg-white p-10 text-center">
          Loading...
        </div>

      ) : (

        <TransactionTable
          data={expenses}
          titleField="title"
          emptyMessage="No expenses found."
          onEdit={(expense) => {
            setSelectedExpense(expense);
            setShowModal(true);
          }}
          onDelete={openDeleteModal}
        />

      )}

      {showModal && (

        <ExpenseModal
          initialData={selectedExpense}
          onClose={() => {
            setShowModal(false);
            setSelectedExpense(null);
          }}
          onSave={
            selectedExpense
              ? handleUpdate
              : handleCreate
          }
        />

      )}

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Expense"
        message="Are you sure you want to delete this expense? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger={true}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteExpenseId(null);
        }}
        onConfirm={handleDelete}
      />

    </DashboardLayout>
  );
}

export default Expenses;