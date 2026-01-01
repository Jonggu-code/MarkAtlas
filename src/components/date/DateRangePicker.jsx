import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import DateInput from "./DateInput";
import DatePickerHeader from "./DatePickerHeader";
import { ko } from "date-fns/locale";

export default function DateRangePicker({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  const [open, setOpen] = useState(null); // 'start' | 'end' | null
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target)
      ) {
        setOpen(null);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () =>
      window.removeEventListener(
        "click",
        handleClickOutside
      );
  }, []);

  return (
    <div
      ref={pickerRef}
      className="relative mb-2 flex w-full items-center justify-between gap-2"
    >
      {/* 시작일 */}
      <DateInput
        label="시작일"
        value={startDate && format(startDate, "yyyy.MM.dd")}
        onClick={() =>
          setOpen(open === "start" ? null : "start")
        }
      />

      <span className="text-gray-500">~</span>

      {/* 종료일 */}
      <DateInput
        label="종료일"
        value={endDate && format(endDate, "yyyy.MM.dd")}
        onClick={() =>
          setOpen(open === "end" ? null : "end")
        }
      />

      {/* 시작일 캘린더 */}
      {open === "start" && (
        <div className="absolute top-12 left-0 z-50">
          <DatePicker
            inline
            locale={ko}
            calendarStartDay={0}
            showPreviousMonths={false}
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              if (endDate && date > endDate) {
                setEndDate(null);
              }
              setOpen(null);
            }}
            renderCustomHeader={(props) => (
              <DatePickerHeader {...props} />
            )}
          />
        </div>
      )}

      {/* 종료일 캘린더 */}
      {open === "end" && (
        <div className="absolute top-12 left-44 z-50">
          <DatePicker
            inline
            locale={ko}
            calendarStartDay={0}
            showPreviousMonths={false}
            selected={endDate}
            minDate={startDate}
            onChange={(date) => {
              setEndDate(date);
              setOpen(null);
            }}
            renderCustomHeader={(props) => (
              <DatePickerHeader {...props} />
            )}
          />
        </div>
      )}
    </div>
  );
}
