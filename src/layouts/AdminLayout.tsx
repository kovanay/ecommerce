import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { LogOut } from "lucide-react";

const AdminLayout = () => {
  const { user, logout } = useAuth();

  const linkAside = [
    {
      name: "Catalogo de productos",
      route: "/admin/",
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <header className="flex flex-row  justify-between bg-gray-800 text-white p-4 shadow-md">
        <h1 className="text-xl">Panel de Administrador</h1>
        <button
          onClick={logout}
          className="flex flex-row gap-2 text-red-500 hover:text-gray-300 hover:bg-red-500 rounded-lg py-1 px-2 transition-colors duration-200  cursor-pointer"
        >
          <LogOut />
          <span>Cerrar sesión</span>
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="bg-gray-200 w-64 p-4 overflow-y-auto">
          <h2 className="text-lg">Bienvenido, {user?.data.username} </h2>
          <hr className="border-0.5 border-gray-300 my-2" />
          <ul className="space-y-2">
            {linkAside.map((link) => (
              <li
                key={link.name}
                className="border-l-5 border-gray-900 hover:border-l-10 transition-all duration-200 "
              >
                <a href={link.route} className="cursor-pointer">
                  <span className="pl-1 text-lg">{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <footer className="flex justify-center mt-5 text-center items-center text-sm text-gray-500">
        © {new Date().getFullYear()} Tienda de Maquillaje — Demo
      </footer>
    </div>
  );
};

export default AdminLayout;
