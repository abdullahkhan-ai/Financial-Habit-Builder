import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../components/layout/DashboardLayout";

import {
  getProfile,
  updateProfile,
} from "../services/profileService";

function Profile() {
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
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow">

        <h1 className="mb-8 text-3xl font-bold">
          Financial Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 md:grid-cols-2"
        >

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="occupation"
            placeholder="Occupation"
            value={form.occupation}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="monthlyIncome"
            type="number"
            placeholder="Monthly Income"
            value={
              form.monthlyIncome
            }
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="monthlySavingsGoal"
            type="number"
            placeholder="Monthly Savings Goal"
            value={
              form.monthlySavingsGoal
            }
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="rounded-xl border p-3"
          >
            <option>
              INR
            </option>

            <option>
              USD
            </option>

            <option>
              EUR
            </option>

            <option>
              GBP
            </option>

          </select>

          <textarea
            rows={5}
            name="bio"
            placeholder="Bio"
            value={form.bio}
            onChange={handleChange}
            className="rounded-xl border p-3 md:col-span-2"
          />

          <button
            disabled={saving}
            className="rounded-xl bg-blue-600 py-3 font-semibold text-white md:col-span-2"
          >
            {saving
              ? "Saving..."
              : "Save Profile"}
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}

export default Profile;