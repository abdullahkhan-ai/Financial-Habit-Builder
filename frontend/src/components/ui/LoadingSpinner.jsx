import { Loader2 } from "lucide-react";

export default function LoadingSpinner({
  text = "Loading...",
  size = 40,
  fullScreen = false,
}) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <Loader2
        className="animate-spin text-indigo-600"
        size={size}
      />

      <p className="text-gray-600 font-medium">
        {text}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-10">
      {content}
    </div>
  );
}