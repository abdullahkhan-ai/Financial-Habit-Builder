import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-50">

      {/* Fixed Sidebar */}

      <Sidebar />

      {/* Right Section */}

      <div className="ml-64 flex flex-1 flex-col">

        {/* Sticky Navbar */}

        <Navbar />

        {/* Scrollable Content */}

        <main className="flex-1 overflow-y-auto bg-slate-50 px-6 py-6 lg:px-8">

          <div className="mx-auto w-full">
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;