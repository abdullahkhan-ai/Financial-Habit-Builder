import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

function ErrorPage({ onRetry }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">

      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

          <AlertTriangle
            size={42}
            className="text-red-600"
          />

        </div>

        <h1 className="mt-8 text-3xl font-bold text-slate-900">
          Oops! Something went wrong.
        </h1>

        <p className="mt-4 text-slate-500">
          An unexpected error occurred while rendering this page.
          Please try again.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">

          <button
            onClick={onRetry}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <RefreshCcw size={18} />
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-300 px-6 py-3 font-semibold transition hover:bg-slate-100"
          >
            <Home size={18} />
            Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}

export default ErrorPage;