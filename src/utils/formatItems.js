export const formatDate = (date) => {
  if (date === "X") return "X";
  else {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    return `${year}년 ${month}월 ${day}일`;
  }
};

export const formatArray = (arr) => {
  if (arr === "X") return "X";
  if (arr.length === 1) return arr[0];
  return arr.join(", ");
};

export const formatDateArray = (date) => {
  if (date === "X") return "X";

  if (Array.isArray(date)) {
    if (date.length === 1) return formatDate(date[0]);
    return date.map((d) => formatDate(d)).join(", ");
  }

  if (date.length === 1) {
    return formatDate(date[0]);
  }

  return date.map((d) => formatDate(d)).join(", ");
};
