import React from "react";

const App = () => {
  const productos = [
    {
      nombre: "Sérum Iluminador de Piel",
      precio: "$890 MXN",
      descripcion:
        "Un toque de lujo para tu rutina. Fórmula ligera con perlas luminosas que realzan la piel.",
      imagen: "",
    },
    {
      nombre: "Labial Luxe Mate",
      precio: "$720 MXN",
      descripcion:
        "Color intenso y textura sedosa con acabado profesional. Inspirado en el glamour parisino.",
      imagen:
        "https://images.unsplash.com/photo-1619352520578-8fefbfa2f904?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
    },
    {
      nombre: "Paleta de Sombras Doradas",
      precio: "$1,050 MXN",
      descripcion:
        "Tonos cálidos con pigmentos brillantes. Ideal para un maquillaje elegante de día o noche.",
      imagen: "",
    },
  ];

  return (
    <div className="bg-neutral-50 text-gray-900 font-serif">
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-5 px-6 lg:px-16">
          <h1 className="text-3xl tracking-widest font-bold text-gray-800">
            MKM BEAUTY
          </h1>
          <ul className="hidden md:flex space-x-10 text-sm uppercase font-medium tracking-wide">
            <li>
              <a href="#inicio" className="hover:text-gray-500 transition">
                Inicio
              </a>
            </li>
            <li>
              <a
                href="/product-catalog"
                className="hover:text-gray-500 transition"
              >
                Colección
              </a>
            </li>
            <li>
              <a href="#ofertas" className="hover:text-gray-500 transition">
                Novedades
              </a>
            </li>
            <li>
              <a href="#contacto" className="hover:text-gray-500 transition">
                Contacto
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-red-800 transition">
                Cerrar Sesion
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="inicio"
        className="relative h-[90vh] flex items-center justify-center bg-black"
      >
        <img
          src="https://images.unsplash.com/photo-1590152151060-d1e9b1b4af6c?q=80&w=2000"
          alt="Makeup Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative text-center text-white px-6">
          <h2 className="text-5xl lg:text-6xl font-light tracking-widest mb-4">
            Belleza Atemporal
          </h2>
          <p className="text-lg lg:text-xl font-light mb-8">
            Redefine tu esencia con nuestra nueva colección de maquillaje de
            lujo.
          </p>
          <a
            href="#productos"
            className="border border-white px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition duration-300"
          >
            DESCUBRIR COLECCIÓN
          </a>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section id="productos" className="py-24 container mx-auto px-6 lg:px-16">
        <h3 className="text-3xl font-light text-center tracking-widest mb-12 text-gray-800">
          COLECCIÓN DESTACADA
        </h3>
        <div className="grid md:grid-cols-3 gap-12">
          {productos.map((p, i) => (
            <div key={i} className="text-center group">
              <div className="overflow-hidden rounded-lg shadow-sm">
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="mt-6 text-xl font-semibold text-gray-800">
                {p.nombre}
              </h4>
              <p className="text-gray-500 text-sm mt-2 mb-3">{p.descripcion}</p>
              <p className="font-medium text-gray-900">{p.precio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OFERTA / CAMPAÑA */}
      <section
        id="ofertas"
        className="relative bg-black text-white py-24 flex flex-col md:flex-row items-center"
      >
        <div className="md:w-1/2 px-8 lg:px-20 mb-8 md:mb-0">
          <h3 className="text-4xl font-light mb-4 tracking-widest">
            La Nueva Era del Glamour
          </h3>
          <p className="text-gray-300 leading-relaxed mb-8">
            Presentamos una experiencia de maquillaje inspirada en la elegancia
            clásica y la innovación moderna. Siente el poder de la simplicidad.
          </p>
          <a
            href="#productos"
            className="border border-white px-6 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition duration-300"
          >
            EXPLORAR
          </a>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1500"
            alt="Oferta Especial"
            className="w-full h-96 object-cover opacity-90"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contacto"
        className="bg-white text-center py-10 border-t border-gray-200"
      >
        <h4 className="text-xl font-light tracking-widest text-gray-700 mb-2">
          MKM BEAUTY
        </h4>
        <p className="text-gray-500 text-sm mb-3">
          Inspirando confianza, elegancia y belleza desde 2025.
        </p>
        <div className="flex justify-center space-x-6 mt-4 text-gray-600">
          <a href="#" className="hover:text-gray-800 transition">
            Instagram
          </a>
          <a href="#" className="hover:text-gray-800 transition">
            Facebook
          </a>
          <a href="#" className="hover:text-gray-800 transition">
            TikTok
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-6">
          © 2025 MKM Beauty. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default App;
