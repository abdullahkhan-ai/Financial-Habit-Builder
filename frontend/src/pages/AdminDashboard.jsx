import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import AdminStatsCards from "../components/admin/AdminStatsCards";
import UserTable from "../components/admin/UserTable";
import ConfirmModal from "../components/ui/ConfirmModal";

import {
  getAdminStats,
  getUsers,
  deleteUser,
} from "../services/adminService";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState(null);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [statsData, usersData] =
        await Promise.all([
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

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(selectedUser._id);

      toast.success(
        "User deleted successfully."
      );

      setShowDeleteModal(false);
      setSelectedUser(null);

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

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-900">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Monitor users and platform activity.
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/admin/feedback")
            }
            className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Manage Feedback
          </button>

        </div>

        <AdminStatsCards stats={stats} />

        <div>

          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Registered Users
          </h2>

          <UserTable
            users={users}
            onDelete={openDeleteModal}
          />

        </div>

      </div>

      <ConfirmModal
        open={showDeleteModal}
        title="Delete User"
        message="Are you sure you want to permanently delete this user?"
        confirmText="Delete"
        cancelText="Cancel"
        danger={true}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDeleteUser}
      />

    </DashboardLayout>
  );
}

export default AdminDashboard;