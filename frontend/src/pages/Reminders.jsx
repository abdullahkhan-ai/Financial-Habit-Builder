import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";

import ReminderForm from "../components/reminders/ReminderForm";
import ReminderCard from "../components/reminders/ReminderCard";
import EmptyReminder from "../components/reminders/EmptyReminder";
import DeleteReminderModal from "../components/reminders/DeleteReminderModal";

import {
  getReminders,
  createReminder,
  toggleReminder,
  deleteReminder,
} from "../services/reminderService";

function Reminders() {
  const [loading, setLoading] =
    useState(true);

  const [reminders, setReminders] =
    useState([]);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedReminder, setSelectedReminder] =
    useState(null);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const data =
        await getReminders();

      setReminders(data);
    } catch {
      toast.error(
        "Failed to load reminders."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (
    reminder
  ) => {
    try {
      await createReminder(
        reminder
      );

      toast.success(
        "Reminder created successfully."
      );

      fetchReminders();
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Unable to create reminder."
      );
    }
  };

  const handleToggle = async (
    reminder
  ) => {
    try {
      await toggleReminder(
        reminder._id
      );

      toast.success(
        reminder.enabled
          ? "Reminder disabled."
          : "Reminder enabled."
      );

      fetchReminders();
    } catch {
      toast.error(
        "Unable to update reminder."
      );
    }
  };

  const handleDeleteClick = (
    reminder
  ) => {
    setSelectedReminder(
      reminder
    );

    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteReminder(
        selectedReminder._id
      );

      toast.success(
        "Reminder deleted successfully."
      );

      setShowDeleteModal(false);

      setSelectedReminder(null);

      fetchReminders();
    } catch {
      toast.error(
        "Unable to delete reminder."
      );
    }
  };

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Habit Reminders
          </h1>

          <p className="mt-2 text-slate-500">
            Stay consistent with your
            financial habits.
          </p>

        </div>

        <ReminderForm
          onCreate={
            handleCreate
          }
        />

        {loading ? (

          <div className="rounded-3xl bg-white p-12 text-center shadow">

            Loading reminders...

          </div>

        ) : reminders.length ===
          0 ? (

          <EmptyReminder />

        ) : (

          <div className="space-y-5">

            {reminders.map(
              (
                reminder
              ) => (

                <ReminderCard
                  key={
                    reminder._id
                  }
                  reminder={
                    reminder
                  }
                  onToggle={
                    handleToggle
                  }
                  onDelete={
                    handleDeleteClick
                  }
                />

              )
            )}

          </div>

        )}

      </div>

      <DeleteReminderModal
        open={
          showDeleteModal
        }
        onClose={() => {
          setShowDeleteModal(
            false
          );

          setSelectedReminder(
            null
          );
        }}
        onConfirm={
          handleDelete
        }
      />

    </DashboardLayout>
  );
}

export default Reminders;