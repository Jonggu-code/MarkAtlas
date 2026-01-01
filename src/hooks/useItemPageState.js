import { useState, useMemo } from "react";
import { useFilteredItems } from "./useFilteredItems";
import { INITIAL_FILTERS } from "../utils/initailFilters";

export function useItemPageState(items) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [limit, setLimit] = useState(10);
  const [limitStep, setLimitStep] = useState(10);

  const filteredItems = useFilteredItems(items, filters);

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, limit);
  }, [filteredItems, limit]);

  const handleFilterChange = (updater) => {
    setFilters((prev) =>
      typeof updater === "function"
        ? updater(prev)
        : updater
    );
  };

  const handleToggleFavorites = () => {
    setFilters((prev) => ({
      ...prev,
      showFavoritesOnly: !prev.showFavoritesOnly,
    }));
  };

  const handleLimitChange = (nextLimit) => {
    const value = Number(nextLimit);
    setLimit(value);
    setLimitStep(value);
  };

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
    setLimit(10);
    setLimitStep(10);
  };

  const loadMore = () => {
    setLimit((prev) => {
      if (prev >= filteredItems.length) return prev;
      return prev + limitStep;
    });
  };

  return {
    filters,
    limit,
    limitStep,
    filteredItemsLength: filteredItems.length,
    visibleItems,
    handleFilterChange,
    handleToggleFavorites,
    handleLimitChange,
    handleReset,
    loadMore,
  };
}
