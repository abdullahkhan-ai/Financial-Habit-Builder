import {
  Trash2,
  X,
} from "lucide-react";

function DeleteReminderModal({
  open,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl animate-in fade-in zoom-in duration-200">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">

          <Trash2
            size={30}
            className="text-red-600"
          />

        </div>

        <h2 className="mt-6 text-center text-2xl font-bold text-slate-900">
          Delete Reminder
        </h2>

        <p className="mt-3 text-center text-slate-500">
          Are you sure you want to delete this reminder?
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-center gap-4">

          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >

            <X size={18} />

            Cancel

          </button>

          <button
            onClick={onConfirm}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
          >

            <Trash2 size={18} />

            Delete

          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteReminderModal;