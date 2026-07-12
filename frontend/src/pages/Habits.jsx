import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import HabitCard from "../components/ui/HabitCard";
import HabitModal from "../components/ui/HabitModal";
import ConfirmModal from "../components/ui/ConfirmModal";

import {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  completeHabit,
} from "../services/habitService";

function Habits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedHabit, setSelectedHabit] =
    useState(null);

  const [deleteHabitId, setDeleteHabitId] =
    useState(null);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const data = await getHabits();

      setHabits(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch habits."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await createHabit(formData);

      toast.success("Habit created.");

      setShowModal(false);

      fetchHabits();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create habit."
      );
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateHabit(
        selectedHabit._id,
        formData
      );

      toast.success("Habit updated.");

      setSelectedHabit(null);

      setShowModal(false);

      fetchHabits();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update habit."
      );
    }
  };

  // Delete

  const openDeleteModal = (habit) => {
    setDeleteHabitId(habit._id);

    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteHabit(deleteHabitId);

      toast.success("Habit deleted.");

      setDeleteHabitId(null);

      setShowDeleteModal(false);

      fetchHabits();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete habit."
      );
    }
  };

  // Complete Habit

  const handleComplete = async (habit) => {
    try {
      await completeHabit(habit._id);

      toast.success(
        "Great! Habit completed."
      );

      fetchHabits();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to complete habit."
      );
    }
  };
    return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-900">
              Habit Tracker
            </h1>

            <p className="mt-2 text-slate-500">
              Build strong financial habits and maintain your streak.
            </p>

          </div>

          <button
            onClick={() => {
              setSelectedHabit(null);
              setShowModal(true);
            }}
            className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            + New Habit
          </button>

        </div>

        {/* Loading */}

        {loading ? (

          <div className="rounded-3xl bg-white p-12 text-center">
            Loading habits...
          </div>

        ) : habits.length === 0 ? (

          <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

            <h2 className="text-2xl font-bold text-slate-900">
              No Habits Yet
            </h2>

            <p className="mt-3 text-slate-500">
              Create your first financial habit and start building consistency.
            </p>

          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {habits.map((habit) => (

              <HabitCard
                key={habit._id}
                habit={habit}
                onComplete={handleComplete}
                onEdit={(habit) => {
                  setSelectedHabit(habit);
                  setShowModal(true);
                }}
                onDelete={openDeleteModal}
              />

            ))}

          </div>

        )}

        {/* Habit Modal */}

        {showModal && (

          <HabitModal
            initialData={selectedHabit}
            onClose={() => {
              setShowModal(false);
              setSelectedHabit(null);
            }}
            onSave={
              selectedHabit
                ? handleUpdate
                : handleCreate
            }
          />

        )}

        {/* Delete Confirmation */}

        <ConfirmModal
          open={showDeleteModal}
          title="Delete Habit"
          message="Are you sure you want to delete this habit? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          danger={true}
          onClose={() => {
            setShowDeleteModal(false);
            setDeleteHabitId(null);
          }}
          onConfirm={handleDelete}
        />

      </div>

    </DashboardLayout>
  );
}

export default Habits;