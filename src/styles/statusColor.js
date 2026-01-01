export const statusColor = (status) => {
  const map = {
    등록: "font-bold text-green-600",
    LIVE: "font-bold text-green-600",

    거절: "font-bold text-red-600",
    DEAD: "font-bold text-red-600",

    실효: "font-bold text-yellow-600",
  };

  return map[status] || "text-gray-600"; // 매칭 안 되면 기본값
};
