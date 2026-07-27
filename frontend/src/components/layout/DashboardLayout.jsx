import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }

      if (window.innerWidth < 1024) {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`flex min-h-screen flex-col transition-all duration-300 ease-in-out ${
          collapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <Navbar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
  collapsed={collapsed}
  setCollapsed={setCollapsed}
/>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 px-4 py-5 pb-24 sm:px-6 lg:px-8 lg:py-6 lg:pb-6">
          <div className="mx-auto w-full max-w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;