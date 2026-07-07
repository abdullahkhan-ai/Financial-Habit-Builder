import { LogOut } from "lucide-react";

import Modal from "../modal/Modal";

function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Logout"
      maxWidth="max-w-md"
    >
      <div className="space-y-6">

        <div className="flex justify-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

            <LogOut
              size={36}
              className="text-red-600"
            />

          </div>

        </div>

        <div className="text-center">

          <h2 className="text-xl font-bold text-slate-900">
            Are you sure?
          </h2>

          <p className="mt-3 text-slate-500">
            You will be logged out of your account.
          </p>

        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-2xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>

        </div>

      </div>
    </Modal>
  );
}

export default LogoutModal;