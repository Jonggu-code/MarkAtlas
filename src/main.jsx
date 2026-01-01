import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "./index.css";
import { FavoritesProvider } from "./contexts/FavoritesContext.jsx";
import { AlertProvider } from "./contexts/AlertContext.jsx";

if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  await worker.start();
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </AlertProvider>
    </QueryClientProvider>
  </StrictMode>
);
