import { X, LogOut } from "lucide-react";

import NavigationItems from "./NavigationItems";

function MobileSidebar({
  sidebarOpen,
  setSidebarOpen,
  user,
  menuItems,
  onLogout,
}) {
  return (
    <>
      {/* Overlay */}

      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          sidebarOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      />

      {/* Sidebar */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[85vw] max-w-xs flex-col border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
  sidebarOpen
    ? "translate-x-0"
    : "-translate-x-full"
}`}
      >
        {/* Header */}

        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5">

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              FinHabit
            </h1>

            <p className="text-sm text-slate-500">
              Wealth Growth Tracker
            </p>
          </div>

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto px-4 py-5">

          <NavigationItems
            menuItems={menuItems}
            mobile
            onNavigate={() =>
              setSidebarOpen(false)
            }
          />

        </nav>

        {/* Footer */}

        <div className="border-t border-slate-200 p-4">
                      <button
            onClick={() => {
              setSidebarOpen(false);
              onLogout();
            }}
            className="flex w-full items-center gap-4 rounded-2xl px-4 py-3 font-medium text-red-600 transition-all duration-300 hover:bg-red-50"
          >
            <LogOut
              size={20}
              className="flex-shrink-0"
            />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default MobileSidebar;