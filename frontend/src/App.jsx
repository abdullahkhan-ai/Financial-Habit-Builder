import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Goals from "./pages/Goals";
import Analytics from "./pages/Analytics";
import Habits from "./pages/Habits";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />

        <Route
          path="/income"
          element={<ProtectedRoute><Income /></ProtectedRoute>}
        />

        <Route
          path="/expenses"
          element={<ProtectedRoute><Expenses /></ProtectedRoute>}
        />

        <Route
          path="/goals"
          element={<ProtectedRoute><Goals /></ProtectedRoute>}
        />

        <Route
          path="/analytics"
          element={<ProtectedRoute><Analytics /></ProtectedRoute>}
        />

        <Route
          path="/habits"
          element={<ProtectedRoute><Habits /></ProtectedRoute>}
        />

        <Route
          path="/admin"
          element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;