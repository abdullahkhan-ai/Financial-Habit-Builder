import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">

        <AlertTriangle
          className="mx-auto text-red-500 mb-5"
          size={70}
        />

        <h1 className="text-6xl font-bold text-gray-800">
          404
        </h1>

        <h2 className="text-2xl font-semibold mt-3">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-3">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/dashboard"
          className="mt-8 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition"
        >
          <Home size={18} />
          Back to Dashboard
        </Link>

      </div>
    </div>
  );
}