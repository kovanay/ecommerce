import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type {
  AddToCartType,
  AllCartResponse,
  AllCartType,
  changeQuantityType,
} from "../interface/cart.type";
import { cartFetch } from "../lib/cartApi";
import { productFetch } from "../lib/productApi";
import type { ProductResponse, ProductType } from "../interface/product.type";

interface CartContextType {
  cart: AllCartType | null;
  cartProducts: ProductType[];
  cartTotal: number;
  isLoading: boolean;
  addToCart: (newCart: AddToCartType) => Promise<void>;
  clearAllCart: () => Promise<void>;
  changeQuantity: (data: changeQuantityType) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<AllCartType | null>(null);
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const checkCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const cartData = await cartFetch<AllCartResponse>("/api/cart/", {
        method: "GET",
      });
      setCart(cartData.cart);
    } catch (error) {
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkCart();
  }, [checkCart]);

  const fetchProductsLogic = async () => {
    if (!cart?.items || cart.items.length === 0) {
      setCartProducts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const quantityMap = new Map<number, number>();
      for (const item of cart.items) {
        quantityMap.set(item.product_id, item.quantity);
      }
      const idsToFetch = cart.items.map((item) => item.product_id);
      const batchParams = { product_ids: idsToFetch };

      const productsResponse = await productFetch<ProductResponse | null>(
        "/api/product-catalog/products/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(batchParams),
        },
      );
      const productsFromApi = productsResponse?.data || [];
      const mergedProducts = productsFromApi.map((product) => ({
        ...product,

        quantity: quantityMap.get(product.product_id) || 0,
      }));
      setCartProducts(mergedProducts);
    } catch (error) {
      console.error("Error al obtener los productos del carrito:", error);
      setCartProducts([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProductsLogic();
  }, [cart, productFetch]);

  const addToCart = useCallback(
    async (newCart: AddToCartType) => {
      try {
        await cartFetch("/api/cart/", {
          method: "POST",
          body: JSON.stringify(newCart),
        });
        checkCart();
      } catch (error) {
        console.error("Error en el agregar al carrito:", error);
        setCart(null);
        throw error;
      }
    },
    [checkCart],
  );

  const clearAllCart = useCallback(async () => {
    try {
      await cartFetch("/api/cart/", {
        method: "DELETE",
      });
      setCart(null);
    } catch (error) {
      console.error("Error en el limpiar carrito:", error);
      setCart(null);
      throw error;
    }
  }, []);

  const changeQuantity = useCallback(
    async (data: changeQuantityType) => {
      const changeQuantityParams = {
        cart_id: data.cart_id,
        product_id: data.product_id,
        quantity: data.quantity,
      };
      console.log(changeQuantityParams);
      try {
        await cartFetch("/api/cart/", {
          method: "PUT",
          body: JSON.stringify(changeQuantityParams),
        });
        checkCart();
      } catch (error) {
        console.error("Error en el cambiar la cantidad:", error);
      }
    },
    [checkCart],
  );

  const cartTotal = useMemo(() => {
    return cartProducts.reduce((total, product) => {
      const itemPrice = product.price_cents || 0;
      const itemQuantity = product.quantity || 0;
      return total + itemPrice * itemQuantity;
    }, 0);
  }, [cartProducts]);

  // Memoiza el valor del contexto para evitar renders innecesarios
  const value = useMemo(
    () => ({
      cart,
      cartProducts,
      cartTotal,
      isLoading,
      addToCart,
      clearAllCart,
      changeQuantity,
    }),
    [
      cart,
      cartProducts,
      cartTotal,
      isLoading,
      addToCart,
      clearAllCart,
      changeQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 4. Crea el Hook personalizado
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
