import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import { CartProvider } from "./contexts/cartContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
