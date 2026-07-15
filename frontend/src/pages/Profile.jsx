import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";

import {
  UserCircle2,
  Phone,
  Briefcase,
  IndianRupee,
  PiggyBank,
  MapPin,
  Globe,
  FileText,
  Save,
  X,
  Mail,
} from "lucide-react";

import {
  getProfile,
  updateProfile,
} from "../services/profileService";

import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] = useState({
    phone: "",
    occupation: "",
    monthlyIncome: 0,
    monthlySavingsGoal: 0,
    city: "",
    country: "",
    currency: "INR",
    bio: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data =
        await getProfile();

      setForm(data);
    } catch {
      toast.error(
        "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateProfile(form);

      toast.success(
        "Profile updated successfully."
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 700);

    } catch {
      toast.error(
        "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>

        <div className="flex h-[70vh] items-center justify-center">

          <div className="text-lg font-semibold text-slate-500">
            Loading Financial Profile...
          </div>

        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="mx-auto max-w-6xl space-y-8">

        {/* Header */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-white shadow-xl">

          <div className="flex items-center gap-8">

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-lg">

              <UserCircle2
                size={84}
                className="text-blue-600"
              />

            </div>

            <div className="flex-1">

              <h1 className="text-4xl font-bold">
                {user?.name}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-blue-100">

                <Mail size={18} />

                <span>
                  {user?.email}
                </span>

              </div>

              <p className="mt-5 max-w-2xl text-blue-100">

                Complete your financial profile to
                receive better wealth insights,
                savings analysis and financial
                health tracking.

              </p>

            </div>

          </div>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
        >

          <div className="grid gap-8 md:grid-cols-2"></div>
                    {/* Phone */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

              <Phone size={18} />

              Phone Number

            </label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          {/* Occupation */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

              <Briefcase size={18} />

              Occupation

            </label>

            <input
              name="occupation"
              value={form.occupation}
              onChange={handleChange}
              placeholder="Enter occupation"
              className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          {/* Monthly Income */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

              <IndianRupee size={18} />

              Monthly Income

            </label>

            <input
              type="number"
              name="monthlyIncome"
              value={form.monthlyIncome}
              onChange={handleChange}
              placeholder="Monthly income"
              className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          {/* Monthly Savings Target */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

              <PiggyBank size={18} />

              Monthly Savings Target

            </label>

            <input
              type="number"
              name="monthlySavingsGoal"
              value={form.monthlySavingsGoal}
              onChange={handleChange}
              placeholder="Monthly savings target"
              className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          {/* City */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

              <MapPin size={18} />

              City

            </label>

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          {/* Country */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

              <Globe size={18} />

              Country

            </label>

            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country"
              className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          {/* Currency */}

          <div>

            <label className="mb-2 font-semibold text-slate-700">
              Currency
            </label>

            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >

              <option value="INR">
                INR (₹)
              </option>

              <option value="USD">
                USD ($)
              </option>

              <option value="EUR">
                EUR (€)
              </option>

              <option value="GBP">
                GBP (£)
              </option>

            </select>

          </div>

          <div></div>

          {/* Bio */}

          <div className="md:col-span-2">

            <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

              <FileText size={18} />

              About Me

            </label>

            <textarea
              rows={5}
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          {/* Buttons */}

          <div className="mt-6 flex justify-end gap-4 md:col-span-2">

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard")
              }
              className="flex items-center gap-2 rounded-2xl border border-slate-300 px-8 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >

              <X size={18} />

              Cancel

            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >

              <Save size={18} />

              {saving
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </form>

      </div>

    </DashboardLayout>
  );
}

export default Profile;