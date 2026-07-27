import { useEffect, useState } from "react";
import { Wallet } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import IncomeModal from "../components/ui/IncomeModal";
import ExportButtons from "../components/ui/ExportButtons";
import ConfirmModal from "../components/ui/ConfirmModal";
import EmptyState from "../components/ui/EmptyState";

import PageHeaderSkeleton from "../components/ui/PageHeaderSkeleton";
import TableSkeleton from "../components/ui/TableSkeleton";

import {
  exportToPDF,
  exportToCSV,
} from "../utils/exportUtils";

import {
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
} from "../services/incomeService";

import TransactionTable from "../components/table/TransactionTable";

import toast from "react-hot-toast";

function Income() {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedIncome, setSelectedIncome] =
    useState(null);

  const [deleteId, setDeleteId] =
    useState(null);

  useEffect(() => {
    fetchIncome();
  }, []);

  const fetchIncome = async () => {
    try {
      const data = await getIncome();
      setIncome(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch income"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateIncome = async (
    formData
  ) => {
    try {
      await createIncome(formData);

      toast.success(
        "Income added successfully"
      );

      setShowModal(false);

      fetchIncome();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add income"
      );
    }
  };

  const handleUpdateIncome = async (
    formData
  ) => {
    try {
      await updateIncome(
        selectedIncome._id,
        formData
      );

      toast.success(
        "Income updated successfully"
      );

      setSelectedIncome(null);

      setShowModal(false);

      fetchIncome();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update income"
      );
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteIncome = async () => {
    try {
      await deleteIncome(deleteId);

      toast.success(
        "Income deleted successfully"
      );

      setDeleteId(null);

      setShowDeleteModal(false);

      fetchIncome();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete income"
      );
    }
  };

  const openAddModal = () => {
    setSelectedIncome(null);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setSelectedIncome(item);
    setShowModal(true);
  };

  const handleExportPDF = () => {
    const columns = [
      "Source",
      "Category",
      "Amount",
      "Date",
    ];

    const rows = income.map((item) => [
      item.source,
      item.category,
      `INR ${item.amount}`,
      new Date(
        item.date
      ).toLocaleDateString(),
    ]);

    exportToPDF(
      "Income Report",
      columns,
      rows,
      "income-report"
    );
  };

  const handleExportCSV = () => {
    exportToCSV(
      income.map((item) => ({
        Source: item.source,
        Amount: `INR ${Number(
          item.amount
        ).toLocaleString("en-IN")}`,
        Category: item.category,
        Date: new Date(
          item.date
        ).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      })),
      "income-report"
    );
  };

  return (
    <DashboardLayout>
      {loading ? (
        <>
          <PageHeaderSkeleton />

          <TableSkeleton
            rows={6}
            columns={5}
          />
        </>
      ) : (
        <>
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Income
              </h1>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Manage all your income
                sources.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <ExportButtons
                onPDF={handleExportPDF}
                onCSV={handleExportCSV}
              />

              <button
                onClick={openAddModal}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                + Add Income
              </button>
            </div>
          </div>

          {income.length === 0 ? (
            <EmptyState
              icon={Wallet}
              title="No Income Yet"
              description="Start tracking your income sources to unlock analytics, reports and financial insights."
              buttonText="Add Income"
              onButtonClick={openAddModal}
            />
          ) : (
            <TransactionTable
              data={income}
              titleField="source"
              emptyTitle="No Income Yet"
              emptyMessage="Start tracking your income sources to unlock analytics, reports and financial insights."
              emptyButtonText="Add Income"
              onEmptyButtonClick={openAddModal}
              onEdit={openEditModal}
              onDelete={(item) =>
                openDeleteModal(item._id)
              }
            />
          )}
        </>
      )}

      {showModal && (
        <IncomeModal
          initialData={selectedIncome}
          onClose={() => {
            setShowModal(false);
            setSelectedIncome(null);
          }}
          onSave={
            selectedIncome
              ? handleUpdateIncome
              : handleCreateIncome
          }
        />
      )}

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Income"
        message="Are you sure you want to delete this income record? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteId(null);
        }}
        onConfirm={handleDeleteIncome}
      />
    </DashboardLayout>
  );
}

export default Income;