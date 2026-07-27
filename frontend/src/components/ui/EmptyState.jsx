import { PlusCircle } from "lucide-react";

function EmptyState({
  icon: Icon,
  title = "Nothing Here Yet",
  description = "There is currently no data to display.",
  buttonText,
  onButtonClick,
}) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center shadow-sm">

      {Icon && (
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
          <Icon
            size={40}
            className="text-blue-600"
          />
        </div>
      )}

      <h2 className="text-2xl font-bold text-slate-900">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-md text-slate-500">
        {description}
      </p>

      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700"
        >
          <PlusCircle size={20} />
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;