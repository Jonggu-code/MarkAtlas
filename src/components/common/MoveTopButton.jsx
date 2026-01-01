const MoveTopButton = () => {
  return (
    <button
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      className="fixed right-6 bottom-6 z-50 rounded-lg bg-gray-500/60 px-4 py-3 text-black shadow-lg transition hover:bg-gray-500"
    >
      ▲
    </button>
  );
};

export default MoveTopButton;
