import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import FeedbackModal from "../components/ui/FeedbackModal";

import {
  createFeedback,
  getMyFeedback,
} from "../services/feedbackService";

function Feedback() {
  const [feedback, setFeedback] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const data =
        await getMyFeedback();

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

  const handleCreate = async (formData) => {
    try {
      await createFeedback(formData);

      toast.success(
        "Feedback submitted successfully."
      );

      setShowModal(false);

      fetchFeedback();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit feedback."
      );
    }
  };

  return (
    <DashboardLayout>

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Feedback
          </h1>

          <p className="mt-2 text-slate-500">
            Share your ideas, report bugs or help us improve FinHabit.
          </p>

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          + Submit Feedback
        </button>

      </div>

      {loading ? (

        <div className="rounded-3xl bg-white p-10 text-center">
          Loading...
        </div>

      ) : feedback.length === 0 ? (

        <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

          <h2 className="text-2xl font-bold text-slate-900">
            No Feedback Yet
          </h2>

          <p className="mt-3 text-slate-500">
            Submit your first feedback to help improve FinHabit.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {feedback.map((item) => (

            <div
              key={item._id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
            >

              <div className="flex items-start justify-between">

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    {item.subject}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.category}
                  </p>

                </div>

                <span
                  className={`rounded-full px-4 py-1 text-sm font-semibold ${
                    item.status === "Resolved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>

              </div>

              <p className="mt-5 whitespace-pre-line text-slate-700">
                {item.message}
              </p>

              <p className="mt-6 text-sm text-slate-400">
                Submitted on{" "}
                {new Date(
                  item.createdAt
                ).toLocaleDateString()}
              </p>

            </div>

          ))}

        </div>

      )}

      <FeedbackModal
        open={showModal}
        onClose={() =>
          setShowModal(false)
        }
        onSave={handleCreate}
      />

    </DashboardLayout>
  );
}

export default Feedback;