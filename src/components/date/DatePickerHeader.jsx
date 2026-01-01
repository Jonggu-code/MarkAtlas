export default function DatePickerHeader({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
}) {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 101 },
    (_, i) => currentYear - i
  );
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  return (
    <div className="flex items-center justify-center gap-2 py-1">
      <button onClick={decreaseMonth}>◀</button>

      <select
        value={date.getFullYear()}
        onChange={(e) => changeYear(Number(e.target.value))}
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}년
          </option>
        ))}
      </select>

      <select
        value={date.getMonth()}
        onChange={(e) =>
          changeMonth(Number(e.target.value))
        }
      >
        {months.map((m, i) => (
          <option key={m} value={i}>
            {m}
          </option>
        ))}
      </select>

      <button onClick={increaseMonth}>▶</button>
    </div>
  );
}
