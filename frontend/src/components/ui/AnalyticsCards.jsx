import { Wallet, Receipt, PiggyBank, Percent } from "lucide-react";
import StatCard from "./StatCard";

function AnalyticsCards({ summary }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total Income"
        value={`₹${summary.totalIncome.toLocaleString("en-IN")}`}
        icon={Wallet}
        color="green"
        change="All Time"
      />

      <StatCard
        title="Total Expense"
        value={`₹${summary.totalExpense.toLocaleString("en-IN")}`}
        icon={Receipt}
        color="red"
        change="All Time"
      />

      <StatCard
        title="Total Savings"
        value={`₹${summary.totalSavings.toLocaleString("en-IN")}`}
        icon={PiggyBank}
        color="blue"
        change="Current"
      />

      <StatCard
        title="Saving Rate"
        value={`${summary.savingRate}%`}
        icon={Percent}
        color="purple"
        change="Efficiency"
      />

    </div>
  );
}

export default AnalyticsCards;