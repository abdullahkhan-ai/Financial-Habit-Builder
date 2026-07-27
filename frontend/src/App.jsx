import { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { SearchProvider } from "./context/SearchContext";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import NotFound from "./pages/NotFound";

// Lazy Loaded Pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const VerifyOTP = lazy(() => import("./pages/VerifyOTP"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Income = lazy(() => import("./pages/Income"));
const Expenses = lazy(() => import("./pages/Expenses"));
const Goals = lazy(() => import("./pages/Goals"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Habits = lazy(() => import("./pages/Habits"));
const Reminders = lazy(() => import("./pages/Reminders"));
const Feedback = lazy(() => import("./pages/Feedback"));
const Profile = lazy(() => import("./pages/Profile"));

const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminFeedback = lazy(() => import("./pages/AdminFeedback"));

function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <LoadingSpinner />
    </div>
  );
}

function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>

            {/* Default */}

            <Route
              path="/"
              element={<Navigate to="/login" replace />}
            />

            {/* Authentication */}

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />

            <Route
              path="/verify-otp"
              element={<VerifyOTP />}
            />

            <Route
              path="/reset-password"
              element={<ResetPassword />}
            />

            {/* User */}

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/income"
              element={
                <ProtectedRoute>
                  <Income />
                </ProtectedRoute>
              }
            />

            <Route
              path="/expenses"
              element={
                <ProtectedRoute>
                  <Expenses />
                </ProtectedRoute>
              }
            />

            <Route
              path="/goals"
              element={
                <ProtectedRoute>
                  <Goals />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />

            <Route
              path="/habits"
              element={
                <ProtectedRoute>
                  <Habits />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reminders"
              element={
                <ProtectedRoute>
                  <Reminders />
                </ProtectedRoute>
              }
            />

            <Route
              path="/feedback"
              element={
                <ProtectedRoute>
                  <Feedback />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Admin */}

            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/feedback"
              element={
                <ProtectedRoute role="admin">
                  <AdminFeedback />
                </ProtectedRoute>
              }
            />

            {/* 404 */}

            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;