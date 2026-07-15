import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useSearch } from "../../context/SearchContext";
import SearchDropdown from "./SearchDropdown";

function SearchBox() {
  const navigate = useNavigate();

  const wrapperRef = useRef(null);

  const inputRef = useRef(null);

  const {
    search,
    setSearch,
    results,
  } = useSearch();

  const [open, setOpen] =
    useState(false);

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState(0);

  useEffect(() => {
    const handleClickOutside = (
      e
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          e.target
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  useEffect(() => {
    if (search.trim()) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    setSelectedIndex(0);
  }, [search]);

  const filteredResults =
    useMemo(() => {
      if (!search.trim())
        return [];

      return results;
    }, [search, results]);

  const goToResult = (
    item
  ) => {
    navigate(item.path);

    setSearch("");

    setOpen(false);

    inputRef.current?.blur();
  };

  const handleKeyDown = (
    e
  ) => {
    if (!open) return;

    if (
      e.key ===
      "ArrowDown"
    ) {
      e.preventDefault();

      setSelectedIndex(
        (prev) =>
          prev ===
          filteredResults.length - 1
            ? 0
            : prev + 1
      );
    }

    if (
      e.key ===
      "ArrowUp"
    ) {
      e.preventDefault();

      setSelectedIndex(
        (prev) =>
          prev === 0
            ? filteredResults.length -
              1
            : prev - 1
      );
    }

    if (
      e.key === "Enter"
    ) {
      e.preventDefault();

      if (
        filteredResults[
          selectedIndex
        ]
      ) {
        goToResult(
          filteredResults[
            selectedIndex
          ]
        );
      }
    }

    if (
      e.key === "Escape"
    ) {
      setOpen(false);
    }
  };
    return (
    <div
      ref={wrapperRef}
      className="relative w-full"
    >

      <Search
        size={18}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
      />

      <input
        ref={inputRef}
        type="text"
        value={search}
        placeholder="Search anywhere..."
        onFocus={() => {
          if (search.trim()) {
            setOpen(true);
          }
        }}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        onKeyDown={handleKeyDown}
        className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
      />

      <SearchDropdown
        open={
          open &&
          filteredResults.length > 0
        }
        results={filteredResults}
        selectedIndex={
          selectedIndex
        }
        onSelect={goToResult}
      />

      {open &&
        search &&
        filteredResults.length ===
          0 && (
          <div className="absolute left-0 right-0 top-14 z-50 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-2xl">

            <p className="font-semibold text-slate-700">
              No Results Found
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Try searching for
              Income, Expenses,
              Dashboard,
              Analytics,
              Goals,
              Habits,
              Reminders,
              Feedback or
              Profile.
            </p>

          </div>
        )}

    </div>
  );
}

export default SearchBox;