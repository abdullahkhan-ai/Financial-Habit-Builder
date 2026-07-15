import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";

import AnalyticsCards from "../components/ui/AnalyticsCards";
import IncomeExpenseChart from "../components/ui/IncomeExpenseChart";
import ExpensePieChart from "../components/ui/ExpensePieChart";
import HighestTransactionCard from "../components/ui/HighestTransactionCard";
import ExportButtons from "../components/ui/ExportButtons";

import {
  exportToPDF,
  exportToCSV,
} from "../utils/exportUtils";

import { getAnalytics } from "../services/analyticsService";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load analytics."
      );
    } finally {
      setLoading(false);
    }
  };

  // Export PDF

  const handleExportPDF = () => {
    const columns = ["Metric", "Value"];

    const rows = [
      [
        "Total Income",
        `INR ${analytics.summary.totalIncome.toLocaleString(
          "en-IN"
        )}`,
      ],
      [
        "Total Expense",
        `INR ${analytics.summary.totalExpense.toLocaleString(
          "en-IN"
        )}`,
      ],
      [
        "Total Savings",
        `INR ${analytics.summary.totalSavings.toLocaleString(
          "en-IN"
        )}`,
      ],
      [
        "Saving Rate",
        `${analytics.summary.savingRate}%`,
      ],
    ];

    exportToPDF(
      "Financial Analytics Report",
      columns,
      rows,
      "analytics-report"
    );
  };

  // Export Excel

  const handleExportCSV = () => {
  exportToCSV(
    [
      {
        "Total Income": `INR ${analytics.summary.totalIncome.toLocaleString("en-IN")}`,
        "Total Expense": `INR ${analytics.summary.totalExpense.toLocaleString("en-IN")}`,
        "Total Savings": `INR ${analytics.summary.totalSavings.toLocaleString("en-IN")}`,
        "Saving Rate": `${analytics.summary.savingRate}%`,
      },
    ],
    "analytics-report"
  );
};

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <p className="text-lg text-slate-500">
            Loading Analytics...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-900">
              Analytics
            </h1>

            <p className="mt-2 text-slate-500">
              Financial insights and spending trends.
            </p>

          </div>

          <ExportButtons
            onPDF={handleExportPDF}
            onCSV={handleExportCSV}
          />

        </div>

        {/* Summary */}

        <AnalyticsCards
          summary={analytics.summary}
        />

        {/* Charts */}

        <div className="grid gap-6 xl:grid-cols-2">

          <IncomeExpenseChart
            data={analytics.monthlyData}
          />

          <ExpensePieChart
            data={analytics.categoryBreakdown}
          />

        </div>

        {/* Highest Transactions */}

        <div className="grid gap-6 md:grid-cols-2">

          <HighestTransactionCard
            title="Highest Income"
            transaction={analytics.highestIncome}
            type="income"
          />

          <HighestTransactionCard
            title="Highest Expense"
            transaction={analytics.highestExpense}
            type="expense"
          />

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Analytics;