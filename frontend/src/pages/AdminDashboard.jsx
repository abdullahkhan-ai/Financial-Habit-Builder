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

  const [deleteLoading, setDeleteLoading] =
    useState(false);

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

      /*
       * Normalize the user ID.
       *
       * Different API responses can sometimes expose
       * the MongoDB ID as _id, id, or userId.
       */
      const normalizedUsers = usersData.map((user) => ({
        ...user,
        _id:
          user._id ||
          user.id ||
          user.userId ||
          null,
      }));

      setStats(statsData);
      setUsers(normalizedUsers);
    } catch (error) {
      console.error("Admin dashboard error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load admin dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (user) => {
    if (!user) {
      toast.error("User information is unavailable.");
      return;
    }

    const userId =
      user._id ||
      user.id ||
      user.userId;

    if (!userId) {
      console.error(
        "Cannot delete user. Missing user ID:",
        user
      );

      toast.error("Unable to identify this user.");
      return;
    }

    setSelectedUser({
      ...user,
      _id: userId,
    });

    setShowDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) {
      toast.error("No user selected.");
      return;
    }

    const userId =
      selectedUser._id ||
      selectedUser.id ||
      selectedUser.userId;

    if (!userId) {
      toast.error("User ID is missing.");
      return;
    }

    /*
     * Try to identify the currently logged-in admin.
     * We use both localStorage and sessionStorage because
     * your authentication supports Remember Me.
     */
    const localUser =
      JSON.parse(
        localStorage.getItem("user") || "null"
      );

    const sessionUser =
      JSON.parse(
        sessionStorage.getItem("user") || "null"
      );

    const currentUser =
      localUser || sessionUser;

    const currentUserId =
      currentUser?._id ||
      currentUser?.id ||
      currentUser?.user?._id ||
      currentUser?.user?.id;

    /*
     * Prevent the admin from deleting themselves.
     */
    if (
      currentUserId &&
      String(userId) === String(currentUserId)
    ) {
      toast.error(
        "You cannot delete your own admin account."
      );

      setShowDeleteModal(false);
      setSelectedUser(null);

      return;
    }

    try {
      setDeleteLoading(true);

      await deleteUser(userId);

      toast.success(
        "User deleted successfully."
      );

      setShowDeleteModal(false);
      setSelectedUser(null);

      await fetchAdminData();
    } catch (error) {
      console.error(
        "Delete user error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete user."
      );
    } finally {
      setDeleteLoading(false);
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

        {/* Header */}

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

        {/* Statistics */}

        <AdminStatsCards
          stats={stats}
        />

        {/* Users */}

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

      {/* Delete Confirmation */}

      <ConfirmModal
        open={showDeleteModal}
        title="Delete User"
        message={
          selectedUser
            ? `Are you sure you want to permanently delete ${selectedUser.name || selectedUser.email || "this user"}?`
            : "Are you sure you want to permanently delete this user?"
        }
        confirmText={
          deleteLoading
            ? "Deleting..."
            : "Delete"
        }
        cancelText="Cancel"
        danger={true}
        onClose={() => {
          if (deleteLoading) return;

          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDeleteUser}
      />

    </DashboardLayout>
  );
}

export default AdminDashboard;