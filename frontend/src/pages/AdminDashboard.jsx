import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import AdminStatsCards from "../components/admin/AdminStatsCards";
import UserTable from "../components/admin/UserTable";

import {
  getAdminStats,
  getUsers,
  deleteUser,
} from "../services/adminService";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [statsData, usersData] = await Promise.all([
        getAdminStats(),
        getUsers(),
      ]);

      setStats(statsData);
      setUsers(usersData);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load admin dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);

      toast.success("User deleted successfully.");

      fetchAdminData();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete user."
      );
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <p className="text-lg text-slate-500">
            Loading Admin Dashboard...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor users and platform activity.
          </p>

        </div>

        <AdminStatsCards stats={stats} />

        <div>

          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Registered Users
          </h2>

          <UserTable
            users={users}
            onDelete={handleDeleteUser}
          />

        </div>

      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;