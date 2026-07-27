import { TrendingUp } from "lucide-react";

function StatCard({
  title,
  value,
  icon: Icon,
  color = "blue",
  change = "",
  onClick,
}) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-3xl border border-white/60 bg-white/80 p-5 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)] sm:p-6 ${
        onClick
          ? "cursor-pointer hover:border-blue-300 active:scale-[0.98]"
          : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${colorClasses[color]}`}
        >
          <Icon size={24} className="sm:h-7 sm:w-7" />
        </div>
      </div>

      {change && (
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-green-600">
          <TrendingUp size={16} />

          <span className="break-words">
            {change}
          </span>
        </div>
      )}
    </div>
  );
}

export default StatCard;