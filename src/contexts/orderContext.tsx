import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
  useEffect,
  useCallback,
} from "react";
import type {
  OrderModel,
  OrderResponse,
  FormOrderType,
  OrderByIdResponse,
  CreateOrderResponse,
} from "../interface/order.type";
import { orderFetch } from "../lib/orderApi";

interface OrderContextType {
  orders: OrderModel[];
  order: OrderModel | null;
  orderCreate: CreateOrderResponse | null;
  isLoading: boolean;
  createOrder: (
    newData: FormOrderType,
  ) => Promise<CreateOrderResponse | null | undefined>;
  fetchOrderById: (orderId: number) => Promise<void>;
}

export const OrderContext = createContext<OrderContextType | undefined>(
  undefined,
);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [orderCreate, setOrderCreate] = useState<CreateOrderResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<OrderModel | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const ordersData = await orderFetch<OrderResponse>("/api/orders/");

      setOrders(ordersData.data);
    } catch (error) {
      console.error("Error al obtener las ordenes:", error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchOrderById = useCallback(async (orderId: number) => {
    setIsLoading(true);
    try {
      const result = await orderFetch<OrderByIdResponse>(
        `/api/orders/${orderId}`,
      );

      setOrder(result.data);
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

  const createOrder = async (newData: FormOrderType) => {
    setIsLoading(true);
    try {
      const result = await orderFetch<CreateOrderResponse | null>(
        "/api/orders/",
        {
          method: "POST",
          body: JSON.stringify(newData),
        },
      );

      if (result === null) {
        return null;
      }
      fetchOrders();
      setOrderCreate(result);
    } catch (error) {
      console.error("Error al crear la orden:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Memoiza el valor del contexto para evitar renders innecesarios
  const value = useMemo(
    () => ({
      orders,
      order,
      orderCreate,
      isLoading,
      createOrder,
      fetchOrderById,
    }),
    [orders, order, orderCreate, isLoading, createOrder, fetchOrderById],
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
