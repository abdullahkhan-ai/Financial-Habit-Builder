import {
  LayoutDashboard,
  Wallet,
  Receipt,
  Target,
  BarChart3,
  ClipboardCheck,
  Shield,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import LogoutModal from "../ui/LogoutModal";

function Sidebar() {
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

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
      name: "Habits",
      icon: ClipboardCheck,
      path: "/habits",
    },
  ];

  // Show Admin only to Admin users
  if (user?.role === "admin") {
    menuItems.push({
      name: "Admin",
      icon: Shield,
      path: "/admin",
    });
  }

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
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

        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <ul className="space-y-2">

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.name}>

                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                      }`
                    }
                  >

                    <Icon size={20} />

                    <span>{item.name}</span>

                  </NavLink>

                </li>
              );
            })}

          </ul>

        </nav>

        {/* Logout */}

        <div className="border-t border-slate-200 p-4">

          <button
            onClick={() =>
              setShowLogoutModal(true)
            }
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-500 transition-all duration-200 hover:bg-red-50"
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

      </aside>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() =>
          setShowLogoutModal(false)
        }
        onConfirm={handleLogout}
      />
    </>
  );
}

export default Sidebar;