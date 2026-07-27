import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/ui/StatCard";
import WealthChart from "../components/ui/WealthChart";
import RecentTransactions from "../components/ui/RecentTransactions";
import FinancialHealth from "../components/ui/FinancialHealth";

import StatCardSkeleton from "../components/ui/StatCardSkeleton";
import RecentTransactionsSkeleton from "../components/ui/RecentTransactionsSkeleton";
import CardSkeleton from "../components/ui/CardSkeleton";
import WealthChartSkeleton from "../components/ui/WealthChartSkeleton";

import {
  Wallet,
  Receipt,
  PiggyBank,
  TrendingUp,
} from "lucide-react";

import { getDashboard } from "../services/dashboardService";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      try {
        const data = await getDashboard();

        if (mounted) {
          setDashboardData(data);
        }
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  const incomeCount = useMemo(() => {
    return (
      dashboardData?.recentTransactions?.filter(
        (item) => item.type === "Income"
      ).length || 0
    );
  }, [dashboardData]);

  const expenseCount = useMemo(() => {
    return (
      dashboardData?.recentTransactions?.filter(
        (item) => item.type === "Expense"
      ).length || 0
    );
  }, [dashboardData]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6 lg:space-y-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <StatCardSkeleton key={item} />
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-5">
            <div className="xl:col-span-3">
              <RecentTransactionsSkeleton />
            </div>

            <div className="xl:col-span-2">
              <CardSkeleton />
            </div>
          </div>

          <WealthChartSkeleton />
        </div>
      </DashboardLayout>
    );
  }

  if (!dashboardData) {
    return (
      <DashboardLayout>
        <div className="flex h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800">
              Unable to load dashboard
            </h2>

            <p className="mt-2 text-slate-500">
              Please refresh the page and try again.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Reload
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const {
    summary,
    recentTransactions,
    financialHealth,
    chartData,
  } = dashboardData;

  return (
    <DashboardLayout>
      <div className="space-y-6 lg:space-y-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Income"
            value={`₹${summary.totalIncome.toLocaleString("en-IN")}`}
            icon={Wallet}
            color="green"
            change={`${incomeCount} Income Records`}
            onClick={() => navigate("/income")}
          />

          <StatCard
            title="Total Expenses"
            value={`₹${summary.totalExpense.toLocaleString("en-IN")}`}
            icon={Receipt}
            color="red"
            change={`${expenseCount} Expense Records`}
            onClick={() => navigate("/expenses")}
          />

          <StatCard
            title="Total Savings"
            value={`₹${summary.totalSavings.toLocaleString("en-IN")}`}
            icon={PiggyBank}
            color="blue"
            change={`${financialHealth.savingRate}% Saving Rate`}
            onClick={() => navigate("/goals")}
          />

          <StatCard
            title="Net Worth"
            value={`₹${summary.netWorth.toLocaleString("en-IN")}`}
            icon={TrendingUp}
            color="purple"
            change="View Analytics"
            onClick={() => navigate("/analytics")}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-5">
          <div className="xl:col-span-3">
            <RecentTransactions
              transactions={recentTransactions}
            />
          </div>

          <div className="xl:col-span-2">
            <FinancialHealth
              data={financialHealth}
            />
          </div>
        </div>

        <WealthChart data={chartData} />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;