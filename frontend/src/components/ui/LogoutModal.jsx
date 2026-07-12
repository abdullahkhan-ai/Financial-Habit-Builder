import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";

function LogoutModal({
  open,
  onClose,
  onConfirm,
}) {
  return (
    <AnimatePresence>

      {open && (

        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            transition={{
              duration: 0.2,
            }}
            className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
          >

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">

              <LogOut
                size={30}
                className="text-red-600"
              />

            </div>

            <h2 className="mt-6 text-center text-2xl font-bold text-slate-900">
              Logout
            </h2>

            <p className="mt-3 text-center text-slate-500">
              Are you sure you want to logout from your account?
            </p>

            <div className="mt-8 flex gap-3">

              <button
                onClick={onClose}
                className="flex-1 rounded-2xl border border-slate-300 py-3 font-semibold transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="flex-1 rounded-2xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Logout
              </button>

            </div>

          </motion.div>

        </div>

      )}

    </AnimatePresence>
  );
}

export default LogoutModal;