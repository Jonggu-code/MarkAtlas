export default function DateInput({
  label,
  value,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="flex w-32 cursor-pointer items-center justify-between rounded bg-white px-2 py-2 text-xs sm:w-40 sm:text-sm"
    >
      <span
        className={value ? "text-black" : "text-gray-400"}
      >
        {value || label}
      </span>

      <img
        src="/calendarsvg.svg"
        alt="calendar"
        className="ml-2 h-4 w-4"
      />
    </div>
  );
}
