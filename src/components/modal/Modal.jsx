import { useEffect, useState } from "react";
import {
  KR_SCHEMA,
  US_SCHEMA,
} from "../../utils/dataSchema";
import { FORMATTER } from "../../utils/formatMap";
import { statusColor } from "../../styles/statusColor";
import { useFavoriteAction } from "../../hooks/useFavoriteAction";

const Modal = ({ item, country, onClose }) => {
  // 데이터 국가 관리
  const schema = country === "kr" ? KR_SCHEMA : US_SCHEMA;
  // 즐겨찾기 버튼&상태 관리
  const { handleFavoriteClick, blockFavorite, isFavorite } =
    useFavoriteAction();
  const id = item.applicationNumber;
  // 모달창 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  // 모달창 열리면 전체 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // 모달창 esc 닫기 & 외부 클릭 닫기
  useEffect(() => {
    setTimeout(() => setIsOpen(true), 10);

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () =>
      window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // 모달창 애니메이션 관리
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => onClose(), 200);
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex h-dvh w-svw items-center justify-center bg-black/80 transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}
      onClick={handleClose}
    >
      <div className="h-[80%] w-[80%] max-w-[600px] overflow-scroll overflow-x-hidden border-4 border-slate-400">
        <h1 className="flex h-8 w-full justify-end bg-slate-400 px-2">
          <button
            disabled={blockFavorite}
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteClick(id);
            }}
          >
            <img
              className="w-4 cursor-pointer"
              src={
                isFavorite(id)
                  ? "fullstar.svg"
                  : "emptystar.svg"
              }
              alt={
                isFavorite(id)
                  ? "즐겨찾기 해제"
                  : "즐겨찾기 선택"
              }
            />
          </button>
        </h1>
        <div
          className={`grid grid-cols-2 bg-white p-2 transition-all duration-200 ${isOpen ? "scale-100" : "scale-95"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {schema.map(({ key, label, type, style }) => {
            const raw = item[key];
            const formatted = type
              ? FORMATTER[type](raw)
              : raw;
            const registerStatusColor =
              key === "registerStatus"
                ? statusColor(formatted)
                : "";

            return (
              <div
                key={key}
                className={`flex flex-col items-center border border-slate-400 ${style || ""}`}
              >
                <h1 className="w-full bg-amber-100 py-2 text-center text-sm font-bold break-all">
                  {label}
                </h1>
                <span
                  className={`w-full p-2 text-center text-sm break-all ${registerStatusColor}`}
                >
                  {formatted}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="absolute top-4 right-4 flex h-5 w-5 cursor-pointer items-center justify-center border border-white p-2 text-white"
        onClick={handleClose}
      >
        ✕
      </button>
    </div>
  );
};

export default Modal;
