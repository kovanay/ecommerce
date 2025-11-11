import { Route, Routes } from "react-router-dom";
import ProductCatalogPage from "./pages/ProductCatalogPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Layout from "./layouts/Layout";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AdminLayout from "./layouts/AdminLayout";
import ProductPage from "./pages/AdminPages/ProductPage";
import OrdersPage from "./pages/OrdersPage";
import PaymentPage from "./pages/PaymentPage";
import AddressPage from "./pages/AddressPage";
import ShippingPage from "./pages/ShippingPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route path="/" element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/product-catalog" element={<ProductCatalogPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
        <Route path="/address" element={<AddressPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        {/* <Route path="/shipping" element={<ShippingPage />} /> */}
      </Route>

      <Route
        path="/admin"
        element={<ProtectedRoute allowedRoles={["admin"]} />}
      >
        <Route element={<AdminLayout />}>
          <Route index element={<ProductPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
