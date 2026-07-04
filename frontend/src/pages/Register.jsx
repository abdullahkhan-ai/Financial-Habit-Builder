import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { registerSchema } from "../validations/authSchema";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      await registerUser(formData);

      toast.success("Account created successfully");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6">

    {/* Background Blurs */}
    <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl"></div>
    <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl"></div>

    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 w-full max-w-md rounded-3xl border border-white/60 bg-white/80 p-10 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl"
    >

      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-slate-900">
          Create Account
        </h2>

        <p className="mt-2 text-slate-500">
          Start building better financial habits.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Name */}
<div>
  <input
    type="text"
    placeholder="Full Name"
    {...register("name")}
    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
  />

  {errors.name && (
    <p className="mt-1 text-sm text-red-500">
      {errors.name.message}
    </p>
  )}
</div>

{/* Email */}
<div>
  <input
    type="email"
    placeholder="Email Address"
    {...register("email")}
    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
  />

  {errors.email && (
    <p className="mt-1 text-sm text-red-500">
      {errors.email.message}
    </p>
  )}
</div>

{/* Password */}
<div className="relative">

  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    {...register("password")}
    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-blue-600"
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>

</div>

{errors.password && (
  <p className="mt-1 text-sm text-red-500">
    {errors.password.message}
  </p>
)}

<button
  type="submit"
  disabled={loading}
  className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
>
  {loading ? "Creating Account..." : "Create Account"}
</button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/"
          className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
        >
          Sign In
        </Link>
      </p>

    </motion.div>

  </div>
);
}

export default Register;