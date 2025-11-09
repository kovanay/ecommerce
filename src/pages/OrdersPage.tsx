import { Filter, Search, Truck } from "lucide-react";
import { useOrder } from "../contexts/orderContext";
import {
  STATUS_COLOR_MAP,
  STATUS_DISPLAY_MAP,
  STATUS_ICON_MAP,
} from "../constants/status.const";
import type { ApiStatus } from "../interface/status.types";
import { format } from "date-fns";
import { pricePerUnit } from "../utils/convert_price_in_cents";
import { useState } from "react";

const STATUS = [
  "all",
  "pending_payment",
  "processing",
  "shipped",
  "delivered",
  "refunded",
  "cancelled",
];

const OrdersPage = () => {
  const { orders } = useOrder();
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const [status, setStatus] = useState("all");

  const toggleShowDetail = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-pink-50 p-6">
      <header className="max-w-6xl mx-auto flex items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Pedidos</h1>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              //value={query}
              //onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="pl-10 pr-4 py-2 rounded-xl border shadow-sm w-72 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <Search className="absolute left-3 top-2.5 opacity-70" size={16} />
          </div>

          <div className="flex items-center gap-2">
            <select
              // value={sort}
              //onChange={(e) => setSort(e.target.value)}
              className="py-2 px-3 rounded-lg border"
            >
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Sidebar de categorias */}
        <aside className="md:col-span-1 bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Filter size={16} /> Filtro
          </h2>
          <ul className="space-y-2">
            {STATUS.map((sta) => (
              <li key={sta}>
                <button
                  onClick={() => setStatus(sta)}
                  className={`w-full text-left py-2 px-3 rounded-lg ${
                    status === sta
                      ? "bg-gray-700 text-white"
                      : "hover:bg-pink-50"
                  }`}
                >
                  {STATUS_DISPLAY_MAP[sta as ApiStatus]}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Grid de productos */}
        <section className="md:col-span-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Pedido</h2>
            <p className="text-sm text-gray-600">
              {/* Mostrando {filtered?.length} resultado(s) */}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => {
              const IconComponent = STATUS_ICON_MAP[order.status as ApiStatus];
              const colorClasses = STATUS_COLOR_MAP[order.status as ApiStatus];
              const displayText = STATUS_DISPLAY_MAP[order.status as ApiStatus];

              return (
                <div
                  key={order.order_id}
                  className="relative shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out border border-gray-300 rounded-xl p-4 cursor-pointer"
                  onClick={toggleShowDetail}
                >
                  <div
                    className={
                      `absolute top-4 right-2 text-sm text-center rounded-lg boder px-2 flex flex-row items-center gap-2 ${colorClasses}` ||
                      "text-gray-500"
                    }
                  >
                    <IconComponent className="h-3.5 w-3.5" />

                    <span className="text-black font-semibold">
                      {displayText}
                    </span>
                  </div>

                  <p className="font-semibold">Pedido #{order.order_id}</p>
                  <p className="text-sm text-gray-500">
                    {format(order.created_at, "dd/mm/yyyy")}
                  </p>

                  <div className="mt-10 flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-1">
                      <Truck className="text-gray-400" />
                      <p>{order.shipping_city},</p>
                      <p>{order.shipping_country}</p>
                    </div>

                    <p className="font-bold text-blue-900 text-lg">
                      ${pricePerUnit(order.total_cents)}
                    </p>
                  </div>

                  {showDetails && (
                    <>
                      <hr className="border-0.5 border-gray-300 my-5" />

                      <div>
                        <p className="text-sm font-semibold text-black my-2">
                          Detalles de envío
                        </p>
                        <div className="text-sm text-gray-500">
                          <p>{order.shipping_recipient_name}</p>
                          <p>{order.shipping_street_address}</p>
                          <p>
                            {order.shipping_postal_code} {order.shipping_city},{" "}
                            {order.shipping_state_province}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-black my-2">
                          Resumen de costos
                        </p>
                        <div className="text-sm text-gray-500">
                          <div className="flex flex-row justify-between">
                            <p>Subtotal:</p>
                            <p>${pricePerUnit(order.subtotal_cents)}</p>
                          </div>

                          <div className="flex flex-row justify-between">
                            <p>Envío:</p>
                            <p>${pricePerUnit(order.shipping_cost_cents)}</p>
                          </div>

                          <div className="flex flex-row justify-between">
                            <p>Impuestos:</p>
                            <p>${pricePerUnit(order.taxes_cents)}</p>
                          </div>

                          <hr className="border-0.5 border-gray-300 my-1" />
                          <div className="flex flex-row text-black font-bold justify-between">
                            <p>Total:</p>
                            <p>${pricePerUnit(order.total_cents)}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default OrdersPage;
