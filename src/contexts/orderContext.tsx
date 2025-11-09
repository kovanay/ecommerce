import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
  useEffect,
  useCallback,
} from "react";
import type { OrderModel, OrderResponse } from "../interface/order.type";
import { orderFetch } from "../lib/orderApi";

interface OrderContextType {
  orders: OrderModel[];
  isLoading: boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await orderFetch<OrderResponse>("/api/orders/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setOrders(response.data);
    } catch (error) {
      console.error("Error al obtener las ordenes:", error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Memoiza el valor del contexto para evitar renders innecesarios
  const value = useMemo(
    () => ({
      orders,
      isLoading,
    }),
    [orders, isLoading],
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

// 4. Crea el Hook personalizado
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
