import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const Layout = () => {
  const { logout } = useAuth()
  return <>
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-5 px-6 lg:px-16">
        <h1 className="text-3xl tracking-widest font-bold text-gray-800">
          MKM BEAUTY
        </h1>
        <ul className="hidden md:flex space-x-10 text-sm uppercase font-medium tracking-wide">
          <li>
            <a href="/#inicio" className="hover:text-gray-500 transition cursor-pointer">
              Inicio
            </a>
          </li>
          <li>
            <a
              href="/product-catalog"
              className="hover:text-gray-500 transition cursor-pointer"
            >
              Compras
            </a>
          </li>
          <li>
            <a href="#ofertas" className="hover:text-gray-500 transition cursor-pointer">
              Novedades
            </a>
          </li>
          <li>
            <a href="#contacto" className="hover:text-gray-500 transition cursor-pointer">
              Contacto
            </a>
          </li>
          <li>
            <a onClick={logout} className="hover:text-red-800 transition cursor-pointer">
              Cerrar Sesion
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <main className="mt-20"><Outlet /></main>

    <footer className="mt-10 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Tienda de Maquillaje — Demo
    </footer>
  </>
}

export default Layout;
