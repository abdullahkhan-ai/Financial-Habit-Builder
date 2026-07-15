import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { useAuth } from "./AuthContext";
import { searchData } from "../components/search/searchData";

const SearchContext = createContext();

export function SearchProvider({
  children,
}) {
  const { user } = useAuth();

  const [search, setSearch] =
    useState("");

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const results = useMemo(() => {
    if (!search.trim()) return [];

    const query = search.toLowerCase();

    const visibleItems =
      searchData.filter((item) => {
        if (!item.roles) return true;

        return item.roles.includes(
          user?.role || "user"
        );
      });

    return visibleItems
      .filter((item) => {
        return (
          item.title
            .toLowerCase()
            .includes(query) ||
          item.keywords.some((keyword) =>
            keyword
              .toLowerCase()
              .includes(query)
          )
        );
      })
      .sort((a, b) => {
        const aExact =
          a.title
            .toLowerCase()
            .startsWith(query);

        const bExact =
          b.title
            .toLowerCase()
            .startsWith(query);

        if (aExact && !bExact)
          return -1;

        if (!aExact && bExact)
          return 1;

        return a.title.localeCompare(
          b.title
        );
      });
  }, [search, user]);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        results,
        selectedIndex,
        setSelectedIndex,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}