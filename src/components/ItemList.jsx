import { formatDate } from "../utils/formatItems";
import { statusColor } from "../styles/statusColor";
import EmptyItem from "./common/EmptyItem";
import { useFavoriteAction } from "../hooks/useFavoriteAction";

const ItemList = ({ items, country, onSelectItem }) => {
  if (!items.length) {
    return <EmptyItem />;
  }
  const { handleFavoriteClick, blockFavorite, isFavorite } =
    useFavoriteAction();

  const listTitle =
    "p-2 font-bold text-sm break-keep flex text-center justify-center items-center";
  const listItem =
    "p-2 text-sm flex justify-center items-center h-full break-all";

  return (
    <div className="flex h-max w-full flex-col items-center rounded-lg bg-blue-200">
      {/* 리스트 타이틀 박스 */}
      <div className="grid w-full grid-cols-[30%_50%_20%] px-4 py-2">
        <h1
          className={`${listTitle} border-r-2 border-slate-400`}
        >
          {country === "kr" ? (
            <>
              상표명 <br /> (한글 / 영문)
            </>
          ) : (
            "상표명"
          )}
        </h1>
        <h1
          className={`${listTitle} border-r-2 border-slate-400`}
        >
          출원일 / 출원번호
        </h1>
        <h1 className={`${listTitle} `}>등록 상태</h1>
      </div>

      {/* 리스트 아이템 반복 */}
      <ul className="w-full px-4 pb-1">
        {items.map((item, idx) => {
          const id = item.applicationNumber;
          return (
            <li
              className="group mb-3 grid h-max min-h-32 w-full grid-cols-[30%_50%_20%] grid-rows-[24%_38%_38%] rounded border-2 border-slate-400 bg-white text-center shadow transition-all duration-100 hover:-translate-0.5 hover:border-slate-500"
              key={id}
            >
              <div className="col-span-3 col-start-1 row-start-1 flex w-full items-center justify-between bg-slate-400 px-2 text-base transition-all duration-200 group-hover:bg-slate-500">
                {/* 넘버링 */}
                <p className="font-bold">{idx + 1}.</p>
                {/* 즐겨찾기 & 상세보기 버튼 박스 */}
                <div className="flex gap-3">
                  <button
                    onClick={() => onSelectItem(item)}
                  >
                    <img
                      className="w-5 cursor-pointer"
                      src="/modalicon.svg"
                      alt="상세정보 보기"
                    />
                  </button>
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
                </div>
              </div>
              <p
                className={`${listItem} ${
                  country === "us"
                    ? "row-span-2"
                    : "row-start-2"
                } col-start-1 border-r-2 border-b border-slate-400`}
              >
                {item.productName}
              </p>
              {country !== "us" && (
                <p
                  className={`${listItem} col-start-1 row-start-3 border-r-2 border-slate-400`}
                >
                  {item.productNameEng}
                </p>
              )}
              <p
                className={`${listItem} col-start-2 row-start-2 border-b border-slate-400`}
              >
                {formatDate(item.applicationDate)}
              </p>
              <p
                className={`${listItem} col-start-2 row-start-3`}
              >
                {item.applicationNumber}
              </p>
              <p
                className={`col-start-3 row-span-2 flex h-full items-center justify-center border-l-2 border-slate-400 bg-amber-50 ${statusColor(item.registerStatus)} `}
              >
                {item.registerStatus}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ItemList;
