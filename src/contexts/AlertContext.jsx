import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const [isLock, setIsLock] = useState(false);

  const showAlert = (message, duration = 1500) => {
    setAlert(message);
    setIsLock(true);

    setTimeout(() => {
      setAlert(null);
      setIsLock(false);
    }, duration);
  };

  return (
    <AlertContext.Provider value={{ showAlert, isLock }}>
      {children}
      {alert && (
        <div className="animate-fade-in fixed top-6 left-1/2 z-9999 -translate-x-1/2 rounded-lg bg-blue-900 px-4 py-2 text-sm text-white opacity-0 shadow-lg">
          {alert}
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
