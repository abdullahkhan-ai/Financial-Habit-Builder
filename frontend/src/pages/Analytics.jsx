import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";

import AnalyticsCards from "../components/ui/AnalyticsCards";
import IncomeExpenseChart from "../components/ui/IncomeExpenseChart";
import ExpensePieChart from "../components/ui/ExpensePieChart";
import HighestTransactionCard from "../components/ui/HighestTransactionCard";
import ExportButtons from "../components/ui/ExportButtons";

import PageHeaderSkeleton from "../components/ui/PageHeaderSkeleton";
import StatCardSkeleton from "../components/ui/StatCardSkeleton";
import CardSkeleton from "../components/ui/CardSkeleton";
import ChartSkeleton from "../components/ui/ChartSkeleton";

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

  const handleExportPDF = () => {
    const columns = ["Metric", "Value"];

    const rows = [
      [
        "Total Income",
        `INR ${analytics.summary.totalIncome.toLocaleString("en-IN")}`,
      ],
      [
        "Total Expense",
        `INR ${analytics.summary.totalExpense.toLocaleString("en-IN")}`,
      ],
      [
        "Total Savings",
        `INR ${analytics.summary.totalSavings.toLocaleString("en-IN")}`,
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
        <PageHeaderSkeleton />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <StatCardSkeleton key={item} />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-slate-900 lg:text-3xl">
              Analytics
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Financial insights and spending trends.
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <ExportButtons
              onPDF={handleExportPDF}
              onCSV={handleExportCSV}
            />
          </div>
        </div>

        <AnalyticsCards
          summary={analytics.summary}
        />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <IncomeExpenseChart
            data={analytics.monthlyData}
          />

          <ExpensePieChart
            data={analytics.categoryBreakdown}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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