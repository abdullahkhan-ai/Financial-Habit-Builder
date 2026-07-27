import { AlertTriangle } from "lucide-react";

function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md rounded-3xl bg-white p-10 text-center shadow-xl">

        <AlertTriangle
          className="mx-auto mb-6 text-red-500"
          size={64}
        />

        <h1 className="mb-3 text-3xl font-bold">
          Something went wrong
        </h1>

        <p className="mb-8 text-slate-500">
          An unexpected error occurred while rendering this page.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          Reload Page
        </button>

      </div>
    </div>
  );
}

export default ErrorPage;