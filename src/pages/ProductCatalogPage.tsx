import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Filter } from "lucide-react";
import useProductCatalog from "../hooks/useProductCatalog";
import { pricePerUnit } from "../utils/convert_price_in_cents";
import { useCart } from "../contexts/cartContext";
import CartModal from "../components/CartModal";

const CATEGORIES = ["Todo", "Rostro", "Ojos", "Labios", "Fragancias"];

export default function ProductCatalogPage() {
  const {
    products,
    filtered,
    setSelected,
    selected,
    setCategory,
    category,
    setSort,
    sort,
    setQuery,
    query,
  } = useProductCatalog();
  const { cart, cartProducts, addToCart } = useCart();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModalCart = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-pink-50 p-6">
      <header className="max-w-6xl mx-auto flex items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Catalogo de Productos
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
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
            </select>
          </div>

          <button
            className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer"
            title="Carrito"
            onClick={toggleModalCart}
          >
            <ShoppingCart size={18} />{" "}
            <span>{cart?.items !== undefined ? cart?.items.length : 0}</span>
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
                      ? "bg-gray-700 text-white"
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
              {products?.data.slice(0, 3).map((p) => (
                <button
                  key={p.product_id}
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
              Mostrando {filtered?.length} resultado(s)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered?.map((p) => (
              <motion.article
                key={p.product_id}
                layout
                whileHover={{
                  translateY: -6,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                }}
                className="bg-white rounded-2xl p-4 shadow-sm flex flex-col"
              >
                <img
                  src={p.url_image}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-sm text-gray-500">{p.category}</p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex flex-row items-center gap-1 ">
                    <div className="text-lg font-bold">
                      ${pricePerUnit(p.price_cents)}
                    </div>
                    <div className="text-xs text-gray-500">⭐</div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* <button
                      onClick={() => toggleLike(p.id)}
                      className={`p-2 rounded-md ${
                        liked.includes(p.id)
                          ? "bg-pink-100 text-shadow-gray-900"
                          : "hover:bg-gray-100"
                      }`}
                      title="Me gusta"
                    >
                      <Heart size={16} />
                    </button> */}

                    <button
                      onClick={() =>
                        addToCart({
                          product_id: p.product_id,
                          quantity: 1,
                          price_cents: p.price_cents,
                        })
                      }
                      className="px-3 py-2 bg-gray-700 text-white rounded-lg flex items-center gap-2 cursor-pointer"
                      title="Agregar al carrito"
                    >
                      <ShoppingCart size={14} /> Añadir
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setSelected(p)}
                  className="mt-3 text-sm text-left text-gary-500 underline cursor-pointer"
                >
                  Ver detalles
                </button>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      {/* Modal Cart */}
      <CartModal
        isOpen={isModalOpen}
        onClose={toggleModalCart}
        cartProducts={cartProducts}
      />

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
                src={selected.url_image}
                alt={selected.name}
                className="w-40 h-32 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-2xl font-bold">{selected.name}</h3>
                <p className="text-sm text-gray-600">
                  Categoría: {selected.category}
                </p>
                <div className="flex flex-row gap-2 items-center mt-4">
                  <p className="text-lg font-semibold">
                    ${pricePerUnit(selected.price_cents)}
                  </p>
                  <p className="text-sm text-gray-500">⭐</p>
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => {
                      addToCart({
                        product_id: selected.product_id,
                        quantity: 1,
                        price_cents: selected.price_cents,
                      });
                      setSelected(null);
                    }}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg cursor-pointer"
                  >
                    Comprar
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    className="px-4 py-2 border rounded-lg cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
