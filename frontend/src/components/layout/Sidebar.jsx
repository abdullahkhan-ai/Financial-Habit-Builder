import {
  LayoutDashboard,
  Wallet,
  Receipt,
  Target,
  BarChart3,
  ClipboardCheck,
  Bell,
  Shield,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

import LogoutModal from "../ui/LogoutModal";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  collapsed,
  setCollapsed,
}) {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

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
    {
      name: "Reminders",
      icon: Bell,
      path: "/reminders",
    },
    
  ];

  if (user?.role === "admin") {
    menuItems.push({
      name: "Admin",
      icon: Shield,
      path: "/admin",
    });
  }

  const handleLogout = () => {
    setShowLogoutModal(false);

    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
      <DesktopSidebar
        user={user}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        menuItems={menuItems}
        onLogout={() =>
          setShowLogoutModal(true)
        }
      />

      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
        menuItems={menuItems}
        onLogout={() =>
          setShowLogoutModal(true)
        }
      />
            <LogoutModal
        open={showLogoutModal}
        onClose={() =>
          setShowLogoutModal(false)
        }
        onConfirm={handleLogout}
      />
    </>
  );
}

export default Sidebar;