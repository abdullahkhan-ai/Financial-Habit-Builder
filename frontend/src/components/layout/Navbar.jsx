import { Bell, Search, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

      {/* Search */}

      <div className="relative w-96">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none transition-all duration-200 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-5">

        <button className="rounded-xl p-3 transition hover:bg-slate-100">
          <Bell size={22} />
        </button>

        <div className="flex items-center gap-3">

          <UserCircle
            size={42}
            className="text-slate-700"
          />

          <div>

            <p className="font-semibold text-slate-900">
              Abdullah Khan
            </p>

            <p className="text-sm text-slate-500">
              Welcome back
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;