import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import { CartProvider } from "./contexts/cartContext";
import { OrderProvider } from "./contexts/orderContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <AppRouter />
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
