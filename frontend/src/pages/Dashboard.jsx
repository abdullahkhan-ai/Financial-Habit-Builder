import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/ui/StatCard";
import WealthChart from "../components/ui/WealthChart";
import RecentTransactions from "../components/ui/RecentTransactions";
import FinancialHealth from "../components/ui/FinancialHealth";

import {
  Wallet,
  Receipt,
  PiggyBank,
  TrendingUp,
} from "lucide-react";

import { getDashboard } from "../services/dashboardService";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

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
              (item) =>
                item.type === "Income"
            ).length} Income Records`}
            onClick={() =>
              navigate("/income")
            }
          />

          <StatCard
            title="Total Expenses"
            value={`₹${dashboardData.summary.totalExpense.toLocaleString(
              "en-IN"
            )}`}
            icon={Receipt}
            color="red"
            change={`${dashboardData.recentTransactions.filter(
              (item) =>
                item.type === "Expense"
            ).length} Expense Records`}
            onClick={() =>
              navigate("/expenses")
            }
          />

          <StatCard
            title="Total Savings"
            value={`₹${dashboardData.summary.totalSavings.toLocaleString(
              "en-IN"
            )}`}
            icon={PiggyBank}
            color="blue"
            change={`${dashboardData.financialHealth.savingRate}% Saving Rate`}
            onClick={() =>
              navigate("/goals")
            }
          />

          <StatCard
            title="Net Worth"
            value={`₹${dashboardData.summary.netWorth.toLocaleString(
              "en-IN"
            )}`}
            icon={TrendingUp}
            color="purple"
            change="View Analytics"
            onClick={() =>
              navigate("/analytics")
            }
          />

        </div>

        {/* Recent Transactions + Financial Health */}

        <div className="grid gap-6 xl:grid-cols-5">

          <div className="xl:col-span-3">

            <RecentTransactions
              transactions={
                dashboardData.recentTransactions
              }
            />

          </div>

          <div className="xl:col-span-2">

            <FinancialHealth
              data={
                dashboardData.financialHealth
              }
            />

          </div>

        </div>

        {/* Wealth Growth */}

        <div className="pt-2">

          <WealthChart
            data={
              dashboardData.chartData
            }
          />

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;