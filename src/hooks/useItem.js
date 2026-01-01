import { useQuery } from "@tanstack/react-query";
import { getItems } from "../api/items";

// null 값은 X로 변경
const nullToX = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === null || value === undefined ? "X" : value,
    ])
  );
};

export const useItems = (country = "kr") => {
  return useQuery({
    queryKey: ["items", country],
    queryFn: () => getItems(country),
    staleTime: Infinity,
    gcTime: Infinity,
    select: (items) => items.map(nullToX),
  });
};
