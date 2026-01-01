const ErrorMessage = ({ message = "ERROR 발생" }) => {
  return (
    <div className="flex h-dvh w-svw flex-col items-center justify-center py-10">
      <img
        className="w-40"
        src="/errorsvg.svg"
        alt="에러 발생"
      />
      <p className="mb-7 text-2xl font-bold text-blue-300">
        {message}
      </p>

      <p className="text-center text-xl leading-8 text-slate-500">
        페이지 로드에 실패했습니다. <br /> 신속히 조치하도록
        하겠습니다. <br /> 감사합니다.
      </p>
    </div>
  );
};

export default ErrorMessage;
