import {
  ArrowUpRight,
  Search,
} from "lucide-react";

function SearchResult({
  item,
  active,
  onClick,
}) {
  const title = item.title;

  const page =
    title.includes("(")
      ? title.substring(
          title.indexOf("(") + 1,
          title.indexOf(")")
        )
      : "";

  const label =
    title.includes("(")
      ? title.substring(
          0,
          title.indexOf("(")
        ).trim()
      : title;

  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between px-5 py-4 transition-all duration-200 ${
        active
          ? "bg-blue-50"
          : "hover:bg-slate-50"
      }`}
    >

      <div className="flex items-center gap-4">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            active
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-600"
          }`}
        >

          <Search size={18} />

        </div>

        <div className="text-left">

          <h3 className="font-semibold text-slate-900">

            {label}

          </h3>

          {page && (

            <p className="text-sm text-slate-500">

              {page}

            </p>

          )}

        </div>

      </div>

      <ArrowUpRight
        size={18}
        className={`${
          active
            ? "text-blue-600"
            : "text-slate-400"
        }`}
      />

    </button>
  );
}

export default SearchResult;