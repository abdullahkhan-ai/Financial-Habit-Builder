import {
  LayoutDashboard,
  Wallet,
  Receipt,
  Target,
  BarChart3,
  Shield,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Income",
    icon: Wallet,
    path: "/income",
  },
  {
    name: "Expenses",
    icon: Receipt,
    path: "/expenses",
  },
  {
    name: "Goals",
    icon: Target,
    path: "/goals",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    name: "Admin",
    icon: Shield,
    path: "/admin",
  },
];

function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}

      <div className="border-b border-slate-200 px-6 py-6">

        <h1 className="text-2xl font-bold text-slate-900">
          FinHabit
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Wealth Tracker
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6">

        <ul className="space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <li key={item.name}>

                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                    }`
                  }
                >

                  <Icon size={20} />

                  {item.name}

                </NavLink>

              </li>
            );
          })}

        </ul>

      </nav>

      {/* Logout */}

      <div className="border-t border-slate-200 p-4">

        <button
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-50"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;