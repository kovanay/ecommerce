import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import { CartProvider } from "./contexts/cartContext";
import { OrderProvider } from "./contexts/orderContext";
import { AddressProvider } from "./contexts/addressContext";
import { Toaster } from "react-hot-toast";
import { PaymentProvider } from "./contexts/paymentContext";
import { ShippingProvider } from "./contexts/shippingContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <AddressProvider>
              <PaymentProvider>
                <ShippingProvider>
                  <AppRouter />
                  <Toaster />
                </ShippingProvider>
              </PaymentProvider>
            </AddressProvider>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
