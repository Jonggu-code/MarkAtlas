import { useState } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { useAlert } from "../contexts/AlertContext";

export const useFavoriteAction = () => {
  const [blockFavorite, setBlockFavorite] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { showAlert, isLock } = useAlert();

  const handleFavoriteClick = (id) => {
    if (blockFavorite || isLock) return;

    setBlockFavorite(true);

    const already = isFavorite(id);
    toggleFavorite(id);

    showAlert(
      already
        ? "즐겨찾기에서 제거되었습니다."
        : "즐겨찾기에 추가되었습니다!"
    );

    setTimeout(() => {
      setBlockFavorite(false);
    }, 1500);
  };

  return { handleFavoriteClick, blockFavorite, isFavorite };
};
