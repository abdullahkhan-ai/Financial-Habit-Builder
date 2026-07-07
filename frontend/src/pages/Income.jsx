import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import IncomeModal from "../components/ui/IncomeModal";
import ExportButtons from "../components/ui/ExportButtons";
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
import toast from "react-hot-toast";

function Income() {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedIncome, setSelectedIncome] =
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

  const handleCreateIncome = async (formData) => {
    try {
      await createIncome(formData);

      toast.success("Income added successfully");

      setShowModal(false);

      fetchIncome();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add income"
      );
    }
  };

  const handleUpdateIncome = async (formData) => {
    try {
      await updateIncome(
        selectedIncome._id,
        formData
      );

      toast.success("Income updated successfully");

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

  const handleDeleteIncome = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this income?"
      )
    )
      return;

    try {
      await deleteIncome(id);

      toast.success("Income deleted successfully");

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

  // Export PDF

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
      `₹${item.amount}`,
      new Date(item.date).toLocaleDateString(),
    ]);

    exportToPDF(
      "Income Report",
      columns,
      rows,
      "income-report"
    );
  };

  // Export Excel

  const handleExportCSV = () => {
    exportToCSV(income, "income-report");
  };

  return (
    <DashboardLayout>

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Income
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all your income sources.
          </p>

        </div>

        <div className="flex gap-3">

          <ExportButtons
            onPDF={handleExportPDF}
            onCSV={handleExportCSV}
          />

          <button
            onClick={openAddModal}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Add Income
          </button>

        </div>

      </div>

      <div className="rounded-3xl bg-white p-6 shadow">

        {loading ? (
          <p>Loading...</p>
        ) : income.length === 0 ? (
          <p className="text-slate-500">
            No income records found.
          </p>
        ) : (
          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">
                  Source
                </th>

                <th className="py-3 text-left">
                  Category
                </th>

                <th className="py-3 text-left">
                  Amount
                </th>

                <th className="py-3 text-left">
                  Date
                </th>

                <th className="py-3 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {income.map((item) => (

                <tr
                  key={item._id}
                  className="border-b"
                >

                  <td className="py-4">
                    {item.source}
                  </td>

                  <td>{item.category}</td>

                  <td>
                    ₹
                    {item.amount.toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td>
                    {new Date(
                      item.date
                    ).toLocaleDateString()}
                  </td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          openEditModal(item)
                        }
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteIncome(
                            item._id
                          )
                        }
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

      </div>

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

    </DashboardLayout>
  );
}

export default Income;