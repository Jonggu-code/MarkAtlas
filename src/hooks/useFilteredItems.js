import { useMemo } from "react";
import { useFavorites } from "../contexts/FavoritesContext";

const normalize = (value) =>
  String(value ?? "")
    .toLowerCase()
    .trim();

export const useFilteredItems = (items, filters) => {
  // 즐겨찾기 상태 관리
  const { isFavorite } = useFavorites();
  // 정렬 순서 (한글, 영어 분류)용 함수
  const firstChar = (str) => str?.trim()?.[0] ?? "";
  const isKorean = (str) => /^[가-힣]/.test(firstChar(str));
  const isEnglish = (str) =>
    /^[A-Za-z]/.test(firstChar(str));

  return useMemo(() => {
    return items
      .filter((item) => {
        // 이름 검색
        if (filters.name) {
          const nameTarget = normalize(
            `${item.productName} ${item.productNameEng}`
          );

          if (
            !nameTarget.includes(normalize(filters.name))
          ) {
            return false;
          }
        }

        // 출원번호 검색
        if (
          filters.applicationNumber &&
          String(item.applicationNumber) !==
            String(filters.applicationNumber)
        ) {
          return false;
        }

        // 출원일 필터
        if (
          filters.applicationDateFrom ||
          filters.applicationDateTo
        ) {
          const itemDate = Number(item.applicationDate);

          if (
            filters.applicationDateFrom &&
            itemDate < Number(filters.applicationDateFrom)
          ) {
            return false;
          }

          if (
            filters.applicationDateTo &&
            itemDate > Number(filters.applicationDateTo)
          ) {
            return false;
          }
        }

        // 즐겨찾기
        if (filters.showFavoritesOnly) {
          if (!isFavorite(item.applicationNumber)) {
            return false;
          }
        }

        // 상표 등록 상태
        if (
          filters.registerStatus &&
          item.registerStatus !== filters.registerStatus
        ) {
          return false;
        }

        return true;
      })

      .sort((a, b) => {
        switch (filters.sortType) {
          // 한글 정렬 (ㄱ~ㅎ)
          case "koAsc": {
            const aName = a.productName || "";
            const bName = b.productName || "";

            const aKo = isKorean(aName);
            const bKo = isKorean(bName);

            if (aKo && !bKo) return -1;
            if (!aKo && bKo) return 1;

            if (aKo && bKo)
              return aName.localeCompare(bName, "ko");

            return 0;
          }
          // 영어 정렬 (A~Za~Z)
          case "enAsc": {
            const aFinal = (
              a.productNameEng ||
              a.productName ||
              ""
            ).trim();
            const bFinal = (
              b.productNameEng ||
              b.productName ||
              ""
            ).trim();

            const aEn = isEnglish(aFinal);
            const bEn = isEnglish(bFinal);

            if (aEn && !bEn) return -1;
            if (!aEn && bEn) return 1;

            if (aEn && bEn) {
              return aFinal
                .toLowerCase()
                .localeCompare(bFinal.toLowerCase());
            }

            return 0;
          }

          // 출원일 최근순 정렬
          case "dateDesc":
          default:
            return (
              Number(b.applicationDate) -
              Number(a.applicationDate)
            );
        }
      });
  }, [items, filters, isFavorite]);
};
