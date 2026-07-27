import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

import ErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <ErrorBoundary>

      <AuthProvider>

        <Toaster position="top-right" />

        <App />

      </AuthProvider>

    </ErrorBoundary>

  </StrictMode>
);