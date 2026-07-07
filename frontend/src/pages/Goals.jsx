import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import GoalCard from "../components/ui/GoalCard";
import GoalModal from "../components/ui/GoalModal";
import AddSavingsModal from "../components/ui/AddSavingsModal";

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

  const handleDelete = async (goal) => {
    if (!window.confirm("Delete this goal?")) return;

    try {
      await deleteGoal(goal._id);

      toast.success("Goal deleted.");

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

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Goals
          </h1>

          <p className="mt-2 text-slate-500">
            Track your financial goals.
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedGoal(null);
            setShowGoalModal(true);
          }}
          className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          + New Goal
        </button>

      </div>

      {loading ? (

        <div className="rounded-3xl bg-white p-10 text-center">
          Loading...
        </div>

      ) : goals.length === 0 ? (

        <div className="rounded-3xl bg-white p-12 text-center text-slate-500">
          No goals created yet.
        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {goals.map((goal) => (

            <GoalCard
              key={goal._id}
              goal={goal}
              onEdit={(goal) => {
                setSelectedGoal(goal);
                setShowGoalModal(true);
              }}
              onDelete={handleDelete}
              onAddSavings={(goal) => {
                setSelectedGoal(goal);
                setShowSavingsModal(true);
              }}
            />

          ))}

        </div>

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

    </DashboardLayout>
  );
}

export default Goals;