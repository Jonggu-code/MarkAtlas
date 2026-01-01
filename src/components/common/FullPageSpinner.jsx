export default function FullPageSpinner() {
  const dotStyle =
    "h-3 w-3 animate-bounce rounded-full bg-blue-400";
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-6">
      <div className="flex gap-4">
        <span
          className={`${dotStyle} [animation-delay:-0.3s]`}
        ></span>
        <span
          className={`${dotStyle} [animation-delay:-0.15s]`}
        ></span>
        <span className={`${dotStyle}`}></span>
      </div>
      <p className="text-center text-2xl text-blue-400">
        Loading{" "}
        <span className="animate-dots inline-block w-6 text-left"></span>
      </p>
    </div>
  );
}
