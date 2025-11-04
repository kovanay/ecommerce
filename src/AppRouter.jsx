import { Route, Routes } from "react-router-dom";
import MenuPrincipalMaquillaje from "./pages/IndexPages";
import LoginPages from "./pages/LoginPages";

const AppRouter = () => {
  return <Routes>
    {/* Protector de rutas */}
    {/* Layout */}
    <Route index element={<MenuPrincipalMaquillaje />} />
    <Route path="/login" element={<LoginPages />} />

  </Routes>
}

export default AppRouter;
