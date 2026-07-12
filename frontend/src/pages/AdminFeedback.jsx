import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import FeedbackTable from "../components/admin/FeedbackTable";
import ConfirmModal from "../components/ui/ConfirmModal";

import {
  getAllFeedback,
  resolveFeedback,
  deleteFeedback,
} from "../services/feedbackService";

function AdminFeedback() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedFeedback, setSelectedFeedback] =
    useState(null);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const data = await getAllFeedback();

      setFeedback(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load feedback."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      await resolveFeedback(id);

      toast.success(
        "Feedback marked as resolved."
      );

      fetchFeedback();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to resolve feedback."
      );
    }
  };

  const openDeleteModal = (item) => {
    setSelectedFeedback(item);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteFeedback(
        selectedFeedback._id
      );

      toast.success(
        "Feedback deleted successfully."
      );

      setShowDeleteModal(false);
      setSelectedFeedback(null);

      fetchFeedback();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete feedback."
      );
    }
  };

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Feedback Management
          </h1>

          <p className="mt-2 text-slate-500">
            Review user feedback, suggestions and bug reports.
          </p>

        </div>

        {loading ? (

          <div className="rounded-3xl bg-white p-12 text-center">
            Loading feedback...
          </div>

        ) : (

          <FeedbackTable
            feedback={feedback}
            onResolve={handleResolve}
            onDelete={openDeleteModal}
          />

        )}

      </div>

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Feedback"
        message="Are you sure you want to permanently delete this feedback?"
        confirmText="Delete"
        cancelText="Cancel"
        danger={true}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedFeedback(null);
        }}
        onConfirm={handleDelete}
      />

    </DashboardLayout>
  );
}

export default AdminFeedback;