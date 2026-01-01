import { useState, useEffect } from "react";
import { useItems } from "./hooks/useItem";
import SearchForm from "./components/SearchForm";
import ItemList from "./components/ItemList";
import Modal from "./components/modal/Modal";
import FullPageSpinner from "./components/common/FullPageSpinner";
import ErrorMessage from "./components/common/ErrorMessage";
import MoveTopBtn from "./components/common/MoveTopButton";
import { INITIAL_FILTERS } from "./utils/initailFilters";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { useItemPageState } from "./hooks/useItemPageState";

function App() {
  // 현재 국가 상태관리
  const [country, setCountry] = useState("kr");

  const { data: items = [], isLoading, isError } = useItems(country);

  const {
    filters,
    limit,
    limitStep,
    filteredItemsLength,
    visibleItems,
    handleFilterChange,
    handleToggleFavorites,
    handleLimitChange,
    handleReset,
    loadMore,
  } = useItemPageState(items);

  // 리스팅 개수 상태 관리
  const [showMoveTop, setShowMoveTop] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // 국가 변경 핸들링
  const handleCountryChange = (nextCountry) => {
    setCountry(nextCountry);
    setFilters(INITIAL_FILTERS);
  };

  // 무한 스크롤 핸들링
  const bottomRef = useInfiniteScroll({
    onIntersect: loadMore,
    enabled: !isLoading && visibleItems.length < filteredItemsLength,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowMoveTop(true);
      } else {
        setShowMoveTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) return <FullPageSpinner />;
  if (isError) return <ErrorMessage />;

  return (
    <div className="flex justify-center p-4 text-neutral-800 bg-slate-900">
      <div className="w-full max-w-5xl p-4 bg-blue-400/60 rounded-xl">
        <SearchForm
          filters={filters}
          country={country}
          limit={limit}
          limitStep={limitStep}
          onChange={handleFilterChange}
          onReset={handleReset}
          onCountryChange={handleCountryChange}
          onLimitChange={handleLimitChange}
          showFavoritesOnly={filters.showFavoritesOnly}
          onToggleFavorites={handleToggleFavorites}
        />
        <div className="mb-4 w-full items-center rounded-lg bg-blue-900 px-3 py-2 text-center font-bold text-white/90">
          검색된 상표 개수: {filteredItemsLength} 개
        </div>
        <ItemList
          items={visibleItems}
          country={country}
          onSelectItem={setSelectedItem}
        />
        {selectedItem && (
          <Modal
            item={selectedItem}
            country={country}
            onClose={() => setSelectedItem(null)}
          />
        )}
        {showMoveTop && <MoveTopBtn />}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default App;
