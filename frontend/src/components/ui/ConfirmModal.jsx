import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  X,
} from "lucide-react";

function ConfirmModal({
  open,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  onConfirm,
  onClose,
}) {
  if (!open) return null;

  return (
    <AnimatePresence>

      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.92,
            y: 20,
          }}
          transition={{
            duration: 0.2,
          }}
          className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
        >

          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={18} />
          </button>

          <div
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
              danger
                ? "bg-red-100"
                : "bg-amber-100"
            }`}
          >

            <AlertTriangle
              size={30}
              className={
                danger
                  ? "text-red-600"
                  : "text-amber-600"
              }
            />

          </div>

          <h2 className="mt-6 text-center text-2xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-3 text-center text-slate-500">
            {message}
          </p>

          <div className="mt-8 flex gap-3">

            <button
              onClick={onClose}
              className="flex-1 rounded-2xl border border-slate-300 py-3 font-semibold transition hover:bg-slate-100"
            >
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              className={`flex-1 rounded-2xl py-3 font-semibold text-white transition ${
                danger
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {confirmText}
            </button>

          </div>

        </motion.div>

      </div>

    </AnimatePresence>
  );
}

export default ConfirmModal;