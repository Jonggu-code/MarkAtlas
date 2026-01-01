import { useState } from "react";
import { useFilters } from "../hooks/useFilters";
import DateRangePicker from "./date/DateRangePicker";
import { format } from "date-fns";

function SearchForm({
  country,
  limitStep,
  filters,
  onChange,
  onReset,
  onCountryChange,
  onLimitChange,
  showFavoritesOnly,
  onToggleFavorites,
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { handleFilterChange } = useFilters(onChange);

  const handleResetClick = () => {
    setStartDate(null);
    setEndDate(null);
    onReset();
  };

  // 공통 스타일 함수
  const selectBox =
    "flex h-10 items-center justify-center rounded-lg bg-blue-300 text-sm font-bold sm:h-full hover:bg-blue-200 transition-colors duration-200";
  const selectItem = "p-2";
  const inputBox =
    "py-1 w-30 bg-white text-xs sm:text-sm text-center rounded-sm";
  const searchBox =
    "w-full h-full grid grid-rows-[70%_30%] justify-center items-center text-sm py-2 rounded-lg bg-blue-300 hover:bg-blue-200 transition-colors duraiton-200";
  const itemBox =
    "flex flex-wrap rounded-lg p-2 bg-blue-300 hover:bg-blue-200 transition-colors duration-200";
  const Title = "font-bold text-center w-full text-sm mb-4";

  return (
    <div className="mb-4 grid h-max grid-cols-2 gap-2 rounded-lg bg-blue-900 p-2 text-center sm:grid-cols-4">
      {/* 로고 (sm:block) */}
      <div className="col-span-2 flex aspect-auto items-center justify-center rounded-lg bg-white">
        <img
          className="w-48"
          src="./logosub.png"
          alt="로고"
        />
      </div>
      {/* 국가 선택 박스 (sm:hidden) */}
      <div
        className={`${selectBox} col-span-2 sm:col-span-1 sm:hidden`}
      >
        <h1>국가 선택 :</h1>
        <select
          className={selectItem}
          value={country}
          name="Country"
          onChange={(e) => onCountryChange(e.target.value)}
        >
          <option value="kr">🇰🇷한국</option>
          <option value="us">🇺🇸미국</option>
        </select>
      </div>

      {/* 검색 박스 */}
      <div className="col-span-2 flex h-24 w-full gap-2 sm:col-start-1 sm:row-start-1">
        {/* 이름 검색 */}
        <div className={searchBox}>
          <p className={Title}>
            상표명 검색
            <br /> (한글 / 영문)
          </p>
          <input
            className={inputBox}
            type="text"
            name="name"
            placeholder="상표명 입력"
            value={filters.name}
            onChange={handleFilterChange}
          />
        </div>

        {/* 출원 번호 검색 */}
        <div className={searchBox}>
          <p className={Title}>출원번호 검색</p>
          <input
            className={inputBox}
            type="text"
            name="applicationNumber"
            placeholder="출원번호 입력"
            value={filters.applicationNumber}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* 출원일 시작일 ~ 종료일 필터링 */}
      <div className={`${itemBox} col-span-2`}>
        <h1 className={Title}>
          출원일 조회 <br /> (시작일 ~ 종료일)
        </h1>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <button
          type="button"
          className="h-8 w-full cursor-pointer rounded bg-blue-500 text-sm text-white transition-colors duration-200 hover:bg-blue-600"
          onClick={() => {
            onChange((prev) => ({
              ...prev,
              applicationDateFrom: startDate
                ? format(startDate, "yyyyMMdd")
                : "",
              applicationDateTo: endDate
                ? format(endDate, "yyyyMMdd")
                : "",
            }));
          }}
        >
          조회
        </button>
      </div>

      {/* 아이템 재정렬 관련 버튼 모음 박스 */}
      <div className="col-span-2 grid w-full grid-cols-3 justify-between gap-2 sm:grid-rows-2">
        <div className="grid-row-2 col-span-2 col-start-1 grid grid-cols-2 gap-2 sm:row-span-2 sm:row-start-1">
          {/* 상표 등록 상태 필터링 select*/}
          <div className={selectBox}>
            <select
              className={selectItem}
              name="registerStatus"
              value={filters.registerStatus}
              onChange={handleFilterChange}
            >
              <option value="">등록 상태</option>
              {country === "kr" ? (
                <>
                  <option value="등록">등록</option>
                  <option value="실효">실효</option>
                  <option value="거절">거절</option>
                </>
              ) : (
                <>
                  <option value="LIVE">LIVE</option>
                  <option value="DEAD">DEAD</option>
                </>
              )}
            </select>
          </div>
          {/* 리스트 최대값 선택 select */}
          <div className={selectBox}>
            <select
              className={selectItem}
              value={limitStep}
              name="itemLimit"
              onChange={(e) =>
                onLimitChange(e.target.value)
              }
            >
              <option value={10}>10개</option>
              <option value={15}>15개</option>
              <option value={20}>20개</option>
              <option value={30}>30개</option>
              <option value={50}>50개</option>
            </select>
          </div>
          {/* 정렬 방식 선택 select */}
          <div className={selectBox}>
            <select
              className={selectItem}
              name="sortType"
              value={filters.sortType}
              onChange={handleFilterChange}
            >
              <option value="dataDesc">출원일순</option>
              <option value="koAsc">ㄱ-ㅎ</option>
              <option value="enAsc">A-Z</option>
            </select>
          </div>
          {/* 즐겨찾기 선택 / 해제 button */}
          <div className={selectBox}>
            <button
              className="flex w-full items-center justify-center"
              type="button"
              onClick={onToggleFavorites}
            >
              <img
                className="w-4 cursor-pointer"
                src={
                  showFavoritesOnly
                    ? "fullstar.svg"
                    : "emptystar.svg"
                }
                alt={
                  showFavoritesOnly
                    ? "전체보기"
                    : "즐겨찾기만 보기"
                }
              />
            </button>
          </div>
        </div>
        {/* 전체 항목 초기화 버튼 */}
        {/* 국가 선택 박스 (sm:hidden) */}
        <div
          className={`${selectBox} col-span-2 hidden sm:col-span-1 sm:flex sm:flex-col`}
        >
          <h1>국가 선택 :</h1>
          <select
            className={selectItem}
            value={country}
            name="Country"
            onChange={(e) =>
              onCountryChange(e.target.value)
            }
          >
            <option value="kr">🇰🇷한국</option>
            <option value="us">🇺🇸미국</option>
          </select>
        </div>
        <button
          type="button"
          className="textbase h-full w-full cursor-pointer rounded-lg bg-blue-500 font-bold text-white transition-all duration-200 hover:bg-blue-600"
          onClick={handleResetClick}
        >
          필터 초기화
        </button>
      </div>
    </div>
  );
}

export default SearchForm;
