import { useEffect, useState } from "react";
import { Target } from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import GoalCard from "../components/ui/GoalCard";
import GoalModal from "../components/ui/GoalModal";
import AddSavingsModal from "../components/ui/AddSavingsModal";
import ConfirmModal from "../components/ui/ConfirmModal";
import EmptyState from "../components/ui/EmptyState";

import PageHeaderSkeleton from "../components/ui/PageHeaderSkeleton";
import GoalCardSkeleton from "../components/ui/GoalCardSkeleton";

import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  addSavings,
} from "../services/goalService";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showSavingsModal, setShowSavingsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedGoal, setSelectedGoal] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const data = await getGoals();
      setGoals(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch goals."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await createGoal(formData);

      toast.success("Goal created successfully.");

      setShowGoalModal(false);

      fetchGoals();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create goal."
      );
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateGoal(selectedGoal._id, formData);

      toast.success("Goal updated.");

      setSelectedGoal(null);
      setShowGoalModal(false);

      fetchGoals();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update goal."
      );
    }
  };

  const openDeleteModal = (goal) => {
    setSelectedGoal(goal);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteGoal(selectedGoal._id);

      toast.success("Goal deleted.");

      setShowDeleteModal(false);
      setSelectedGoal(null);

      fetchGoals();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete goal."
      );
    }
  };

  const handleAddSavings = async (amount) => {
    try {
      await addSavings(selectedGoal._id, amount);

      toast.success("Savings added.");

      setShowSavingsModal(false);
      setSelectedGoal(null);

      fetchGoals();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add savings."
      );
    }
  };

  return (
    <DashboardLayout>
      {loading ? (
        <>
          <PageHeaderSkeleton />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <GoalCardSkeleton key={item} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-slate-900 lg:text-3xl">
                Goals
              </h1>

              <p className="mt-2 max-w-xl text-sm text-slate-500 sm:text-base">
                Set savings targets, monitor your progress, and stay motivated
                to achieve your financial goals.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedGoal(null);
                setShowGoalModal(true);
              }}
              className="w-full rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
            >
              + New Goal
            </button>
          </div>

          {goals.length === 0 ? (
            <EmptyState
              icon={Target}
              title="No Goals Yet"
              description="Create your first financial goal and start tracking your progress towards financial freedom."
              buttonText="New Goal"
              onButtonClick={() => {
                setSelectedGoal(null);
                setShowGoalModal(true);
              }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
              {goals.map((goal) => (
                <GoalCard
                  key={goal._id}
                  goal={goal}
                  onEdit={(goal) => {
                    setSelectedGoal(goal);
                    setShowGoalModal(true);
                  }}
                  onDelete={openDeleteModal}
                  onAddSavings={(goal) => {
                    setSelectedGoal(goal);
                    setShowSavingsModal(true);
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}

      {showGoalModal && (
        <GoalModal
          initialData={selectedGoal}
          onClose={() => {
            setShowGoalModal(false);
            setSelectedGoal(null);
          }}
          onSave={
            selectedGoal
              ? handleUpdate
              : handleCreate
          }
        />
      )}

      {showSavingsModal && selectedGoal && (
        <AddSavingsModal
          goal={selectedGoal}
          onClose={() => {
            setShowSavingsModal(false);
            setSelectedGoal(null);
          }}
          onSave={handleAddSavings}
        />
      )}

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Goal"
        message="Are you sure you want to delete this goal? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedGoal(null);
        }}
        onConfirm={handleDelete}
      />
    </DashboardLayout>
  );
}

export default Goals;