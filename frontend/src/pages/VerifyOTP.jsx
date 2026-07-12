import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import API from "../services/authService";

function VerifyOTP() {
  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      return toast.error("Please enter OTP.");
    }

    try {
      setLoading(true);

      const res = await API.post(
        "/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      toast.success(res.data.message);

      navigate("/reset-password", {
        state: {
          email,
        },
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "OTP verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6">

      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl"></div>

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/60 bg-white/80 p-10 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl"
      >

        <h2 className="text-center text-3xl font-bold text-slate-900">
          Verify OTP
        </h2>

        <p className="mt-3 text-center text-slate-500">
          Enter the 6-digit OTP sent to
          <br />
          <span className="font-semibold text-slate-700">
            {email}
          </span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <input
            type="text"
            maxLength={6}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-2xl tracking-[10px] outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading
              ? "Verifying..."
              : "Verify OTP"}
          </button>

        </form>

        <div className="mt-6 text-center">

          <Link
            to="/forgot-password"
            className="font-medium text-blue-600 hover:underline"
          >
            ← Back
          </Link>

        </div>

      </motion.div>

    </div>
  );
}

export default VerifyOTP;