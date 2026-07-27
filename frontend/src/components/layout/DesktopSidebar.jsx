import {
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

import NavigationItems from "./NavigationItems";

function DesktopSidebar({
  user,
  collapsed,
  setCollapsed,
  menuItems,
  onLogout,
}) {
  return (
    <aside
      className={`hidden lg:flex fixed left-0 top-0 z-40 h-screen flex-col border-r border-slate-200 bg-white shadow-sm transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}

      <div className="flex h-20 items-center justify-between border-b border-slate-200 px-4">

        <div
          className={`overflow-hidden transition-all duration-300 ${
            collapsed
              ? "w-0 opacity-0"
              : "w-full opacity-100"
          }`}
        >
          <h1 className="text-2xl font-bold text-slate-900">
            FinHabit
          </h1>

          <p className="text-sm text-slate-500">
            Wealth Growth Tracker
          </p>
        </div>

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-slate-100"
        >
          {collapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>

      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto px-3 py-5">

        <NavigationItems
          menuItems={menuItems}
          collapsed={collapsed}
        />

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-200 p-3">
                

        <button
          onClick={onLogout}
          className={`flex w-full items-center rounded-2xl text-red-600 transition-all duration-300 hover:bg-red-50 ${
            collapsed
              ? "justify-center px-0 py-3"
              : "gap-3 px-4 py-3"
          }`}
        >
          <LogOut
            size={20}
            className="flex-shrink-0"
          />

          {!collapsed && (
            <span className="font-medium">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}

export default DesktopSidebar;