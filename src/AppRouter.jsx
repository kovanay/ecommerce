import { Route, Routes } from "react-router-dom";
import ProductCatalogPage from "./pages/ProductCatalogPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

const AppRouter = () => {
  return (
    <Routes>
      {/* Protector de rutas */}
      {/* Layout */}
      <Route path="/home" element={<ProductCatalogPage />} />
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/product-catalog" element={<ProductCatalogPage />} />
    </Routes>
  );
};

export default AppRouter;
