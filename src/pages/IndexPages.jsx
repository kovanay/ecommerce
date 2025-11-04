import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Heart, Filter } from "lucide-react";

// Componente principal: MenuPrincipalMaquillaje
// Requisitos:
// - Export por defecto
// - Tailwind para estilos (no necesita import en este archivo)
// - Animaciones con framer-motion
// - Datos mock (puedes sustituir por API más adelante)

const PRODUCTS = [
  {
    id: 1,
    name: "Labial Mate",
    category: "Labios",
    price: 199,
    rating: 4.5,
    img: "https://via.placeholder.com/240x160?text=Labial",
  },
  {
    id: 2,
    name: "Base Hidratante",
    category: "Rostro",
    price: 349,
    rating: 4.7,
    img: "https://via.placeholder.com/240x160?text=Base",
  },
  {
    id: 3,
    name: "Sombras 12 tonos",
    category: "Ojos",
    price: 299,
    rating: 4.3,
    img: "https://via.placeholder.com/240x160?text=Sombras",
  },
  {
    id: 4,
    name: "Delineador Líquido",
    category: "Ojos",
    price: 129,
    rating: 4.1,
    img: "https://via.placeholder.com/240x160?text=Delineador",
  },
  {
    id: 5,
    name: "Rubor en Crema",
    category: "Rostro",
    price: 159,
    rating: 4.0,
    img: "https://via.placeholder.com/240x160?text=Rubor",
  },
  {
    id: 6,
    name: "Perfume de Bolsillo",
    category: "Fragancias",
    price: 499,
    rating: 4.8,
    img: "https://via.placeholder.com/240x160?text=Perfume",
  },
];

const CATEGORIES = ["Todo", "Rostro", "Ojos", "Labios", "Fragancias"];

export default function MenuPrincipalMaquillaje() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todo");
  const [sort, setSort] = useState("relevance");
  const [cart, setCart] = useState([]);
  const [liked, setLiked] = useState([]);
  const [selected, setSelected] = useState(null);

  const filtered = PRODUCTS.filter((p) => {
    const matchesCategory = category === "Todo" || p.category === category;
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }).sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return a.id - b.id; // relevance (default)
  });

  function addToCart(product) {
    setCart((c) => [...c, product]);
  }

  function toggleLike(productId) {
    setLiked((l) =>
      l.includes(productId)
        ? l.filter((x) => x !== productId)
        : [...l, productId]
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-pink-50 p-6">
      <header className="max-w-6xl mx-auto flex items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Menu de Maquillaje
        </h1>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="pl-10 pr-4 py-2 rounded-xl border shadow-sm w-72 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <Search className="absolute left-3 top-2.5 opacity-70" size={16} />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="py-2 px-3 rounded-lg border"
            >
              <option value="relevance">Más relevantes</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="rating">Mejor calificados</option>
            </select>
          </div>

          <button
            className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md"
            title="Carrito"
          >
            <ShoppingCart size={18} /> <span>{cart.length}</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Sidebar de categorias */}
        <aside className="md:col-span-1 bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Filter size={16} /> Categorías
          </h2>
          <ul className="space-y-2">
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setCategory(cat)}
                  className={`w-full text-left py-2 px-3 rounded-lg ${
                    category === cat
                      ? "bg-pink-600 text-white"
                      : "hover:bg-pink-50"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <h3 className="text-sm font-medium">Favoritos rápidos</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {PRODUCTS.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="text-xs px-2 py-1 rounded-md border"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid de productos */}
        <section className="md:col-span-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Productos</h2>
            <p className="text-sm text-gray-600">
              Mostrando {filtered.length} resultado(s)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <motion.article
                key={p.id}
                layout
                whileHover={{
                  translateY: -6,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                }}
                className="bg-white rounded-2xl p-4 shadow-sm flex flex-col"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-sm text-gray-500">{p.category}</p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold">${p.price}</div>
                    <div className="text-xs text-gray-500">⭐ {p.rating}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleLike(p.id)}
                      className={`p-2 rounded-md ${
                        liked.includes(p.id)
                          ? "bg-pink-100 text-pink-600"
                          : "hover:bg-gray-100"
                      }`}
                      title="Me gusta"
                    >
                      <Heart size={16} />
                    </button>

                    <button
                      onClick={() => addToCart(p)}
                      className="px-3 py-2 bg-pink-600 text-white rounded-lg flex items-center gap-2"
                      title="Agregar al carrito"
                    >
                      <ShoppingCart size={14} /> Añadir
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setSelected(p)}
                  className="mt-3 text-sm text-left text-pink-600 underline"
                >
                  Ver detalles
                </button>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      {/* Modal simple para ver detalles */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelected(null)}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 z-10"
          >
            <div className="flex items-start gap-4">
              <img
                src={selected.img}
                alt={selected.name}
                className="w-40 h-32 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-2xl font-bold">{selected.name}</h3>
                <p className="text-sm text-gray-600">
                  Categoría: {selected.category}
                </p>
                <p className="mt-2 text-lg font-semibold">${selected.price}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Calificación: ⭐ {selected.rating}
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => {
                      addToCart(selected);
                      setSelected(null);
                    }}
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg"
                  >
                    Comprar
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Footer simple */}
      <footer className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Tienda de Maquillaje — Demo
      </footer>
    </div>
  );
}
