import { useEffect, useState } from "react";
import { Repeat } from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";
import HabitCard from "../components/ui/HabitCard";
import HabitModal from "../components/ui/HabitModal";
import ConfirmModal from "../components/ui/ConfirmModal";
import EmptyState from "../components/ui/EmptyState";

import PageHeaderSkeleton from "../components/ui/PageHeaderSkeleton";
import HabitCardSkeleton from "../components/ui/HabitCardSkeleton";

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

      {loading ? (
        <>
          <PageHeaderSkeleton />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <HabitCardSkeleton key={item} />
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-8">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold text-slate-900">
                Habit Tracker
              </h1>

              <p className="mt-2 max-w-xl text-slate-500">
                Build strong financial habits, maintain your streak, and improve your money management one day at a time.
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

          {habits.length === 0 ? (

            <EmptyState
              icon={Repeat}
              title="No Habits Yet"
              description="Create your first financial habit and start building consistency one day at a time."
              buttonText="New Habit"
              onButtonClick={() => {
                setSelectedHabit(null);
                setShowModal(true);
              }}
            />

          ) : (

            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">

              {habits.map((habit) => (
                              <HabitCard
                key={habit._id}
                habit={habit}
                onComplete={() =>
                  handleComplete(habit)
                }
                onEdit={() => {
                  setSelectedHabit(habit);
                  setShowModal(true);
                }}
                onDelete={() =>
                  openDeleteModal(habit)
                }
              />
            ))}

            </div>

          )}

        </div>
      )}

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

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Habit"
        message="Are you sure you want to delete this habit? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteHabitId(null);
        }}
        onConfirm={handleDelete}
      />

    </DashboardLayout>
  );
}

export default Habits;