import {
  Users,
  Wallet,
  Receipt,
  ClipboardCheck,
} from "lucide-react";

const cards = [
  {
    title: "Total Users",
    valueKey: "totalUsers",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Total Income",
    valueKey: "totalIncome",
    icon: Wallet,
    color: "bg-green-100 text-green-600",
    money: true,
  },
  {
    title: "Total Expense",
    valueKey: "totalExpense",
    icon: Receipt,
    color: "bg-red-100 text-red-600",
    money: true,
  },
  {
    title: "Active Habits",
    valueKey: "activeHabits",
    icon: ClipboardCheck,
    color: "bg-purple-100 text-purple-600",
  },
];

function AdminStatsCards({ stats }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {card.money
                    ? `₹${Number(
                        stats?.[card.valueKey] || 0
                      ).toLocaleString("en-IN")}`
                    : Number(
                        stats?.[card.valueKey] || 0
                      ).toLocaleString("en-IN")}
                </h2>
              </div>

              <div
                className={`rounded-2xl p-4 ${card.color}`}
              >
                <Icon size={28} />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdminStatsCards;