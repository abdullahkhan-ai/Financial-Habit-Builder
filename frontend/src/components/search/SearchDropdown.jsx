import SearchResult from "./SearchResult";

function SearchDropdown({
  open,
  results,
  selectedIndex,
  onSelect,
}) {
  if (!open) return null;

  return (
    <div className="absolute left-0 right-0 top-14 z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

      {results.length === 0 ? (

        <div className="p-8 text-center">

          <h3 className="font-semibold text-slate-800">
            No Results Found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try searching for Income,
            Expenses, Analytics,
            Goals, Habits,
            Reminders, Feedback,
            Profile or Dashboard.
          </p>

        </div>

      ) : (

        <div className="max-h-[420px] overflow-y-auto">

          {results.map(
            (
              item,
              index
            ) => (

              <SearchResult
                key={`${item.path}-${item.title}`}
                item={item}
                active={
                  selectedIndex ===
                  index
                }
                onClick={() =>
                  onSelect(item)
                }
              />

            )
          )}

        </div>

      )}

    </div>
  );
}

export default SearchDropdown;