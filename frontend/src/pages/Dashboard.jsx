import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/ui/StatCard";
import WealthChart from "../components/ui/WealthChart";
import RecentTransactions from "../components/ui/RecentTransactions";
import FinancialHealth from "../components/ui/FinancialHealth";
import SavingsGoals from "../components/ui/SavingsGoals";

import { Wallet, Receipt, PiggyBank, TrendingUp } from "lucide-react";

import { getDashboard } from "../services/dashboardService";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboardData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <p className="text-lg text-slate-500">
            Loading Dashboard...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Heading */}

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back! Here's your financial overview.
          </p>

        </div>

        {/* Stat Cards */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Income"
            value={`₹${dashboardData.summary.totalIncome.toLocaleString(
              "en-IN"
            )}`}
            icon={Wallet}
            color="green"
            change={`${dashboardData.recentTransactions.filter(
              (item) => item.type === "Income"
            ).length} Income Records`}
          />

          <StatCard
            title="Total Expenses"
            value={`₹${dashboardData.summary.totalExpense.toLocaleString(
              "en-IN"
            )}`}
            icon={Receipt}
            color="red"
            change={`${dashboardData.recentTransactions.filter(
              (item) => item.type === "Expense"
            ).length} Expense Records`}
          />

          <StatCard
            title="Total Savings"
            value={`₹${dashboardData.summary.totalSavings.toLocaleString(
              "en-IN"
            )}`}
            icon={PiggyBank}
            color="blue"
            change={`${dashboardData.financialHealth.savingRate}% Saving Rate`}
          />

          <StatCard
            title="Net Worth"
            value={`₹${dashboardData.summary.netWorth.toLocaleString(
              "en-IN"
            )}`}
            icon={TrendingUp}
            color="purple"
            change="Live Data"
          />

        </div>

        {/* Chart + Financial Health */}

        <div className="grid gap-6 xl:grid-cols-3">

          <div className="xl:col-span-2">

            <WealthChart
              data={dashboardData.chartData}
            />

          </div>

          <FinancialHealth
  data={dashboardData.financialHealth}
/>

        </div>

        {/* Recent Transactions */}

        <div>

          <RecentTransactions
            transactions={dashboardData.recentTransactions}
          />

        </div>

        {/* Savings Goals */}

        <SavingsGoals />

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;