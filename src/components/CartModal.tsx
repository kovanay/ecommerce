import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../contexts/cartContext";
import { pricePerUnit } from "../utils/convert_price_in_cents";
import { Plus, Minus } from "lucide-react";
import type { ProductType } from "../interface/product.type";
import { useNavigate } from "react-router-dom";
import { useAddress } from "../contexts/addressContext";

interface CartAsideProps {
  cartProducts: ProductType[];
  isOpen: boolean;
  onClose: () => void;
}

const CartAside: React.FC<CartAsideProps> = ({
  cartProducts,
  isOpen,
  onClose,
}) => {
  const { cart, cartTotal, changeQuantity, clearAllCart } = useCart();
  const { addressDefault } = useAddress();

  const navigate = useNavigate();

  const handlePayment = async () => {
    console.log(addressDefault);
    if (addressDefault !== null) {
      navigate("/payment");
    } else {
      navigate("/address");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-300">
              <h2 className="text-xl font-semibold">Tu Carrito</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 text-2xl"
                title="Cerrar panel"
              >
                &times;
              </button>
            </div>

            <form className="flex-1 overflow-y-auto p-6">
              {cartProducts.length === null && (
                <p>No hay productos en el carrito</p>
              )}
              {cartProducts.map((p) => (
                <div
                  key={p.product_id}
                  className="flex flex-row mb-4 justify-between items-center"
                >
                  <div className="flex flex-row gap-2">
                    <img
                      src={p.url_image}
                      alt="Product"
                      className="w-22 h-18 rounded-lg object-cover"
                    />
                    <div className="flex flex-col justify-center gap-2">
                      <strong>{p.name}</strong>
                      <p className="font-medium">
                        {pricePerUnit(p.price_cents)} c/u
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-1 justify-center items-center">
                    <Plus
                      onClick={() =>
                        changeQuantity({
                          cart_id: cart!.cart_id,
                          product_id: p.product_id,
                          quantity: 1,
                        })
                      }
                      className="hover:bg-gray-300 active:bg-gray-400 rounded-full transition-colors duration-100 ease-in-out"
                    />
                    <p className="border border-gray-300 w-10 text-center">
                      {p.quantity}
                    </p>
                    <Minus
                      onClick={() =>
                        changeQuantity({
                          cart_id: cart!.cart_id,
                          product_id: p.product_id,
                          quantity: -1,
                        })
                      }
                      className="hover:bg-gray-300 active:bg-gray-400 rounded-full transition-colors duration-100 ease-in-out"
                    />
                  </div>
                </div>
              ))}
            </form>

            <div className="p-6 border-t border-gray-300 bg-gray-50">
              <div className="flex flex-row justify-between mb-4 text-lg">
                <p>Total</p>
                <p className="font-semibold">${pricePerUnit(cartTotal)}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  disabled={cartProducts.length <= 0}
                  className={`${cartProducts.length <= 0 ? "cursor-not-allowed bg-gray-500 hover:bg-gray-500" : " bg-blue-600   hover:bg-blue-700"} text-white w-full p-3 rounded-lg font-bold`}
                  onClick={handlePayment}
                >
                  Proceder al Pago
                </button>
                <button
                  type="button"
                  disabled={cartProducts.length <= 0}
                  onClick={clearAllCart}
                  className={`${cartProducts.length <= 0 ? "cursor-not-allowed" : "text-blue-600  border border-transparent hover:border-blue-700  active:bg-blue-50"} w-full p-3 rounded-lg font-bold transition-colors`}
                >
                  Limpiar Carrito
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartAside;
