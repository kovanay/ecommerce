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
  CreateShippingType,
  ShippingModel,
  ShippingResponse,
} from "../interface/shipping.type";
import { shippingFetch } from "../lib/shippingApi";

interface ShippingContextType {
  shipments: ShippingModel[];
  isLoading: boolean;
  createShipping: (newData: CreateShippingType) => Promise<void>;
}

const ShippingContext = createContext<ShippingContextType | undefined>(
  undefined,
);

interface ShippingProviderProps {
  children: ReactNode;
}

export const ShippingProvider: React.FC<ShippingProviderProps> = ({
  children,
}) => {
  const [shipments, setShipments] = useState<ShippingModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchShippings = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await shippingFetch<ShippingResponse>("/api/shippings/");
      setShipments(result.data);
    } catch (error) {
      setShipments([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShippings();
  }, [fetchShippings]);

  const createShipping = async (newData: CreateShippingType) => {
    try {
      await shippingFetch("/api/shippings/", {
        method: "POST",
        body: JSON.stringify(newData),
      });
      fetchShippings();
    } catch (error) {
      console.error("Error en crear producto: ", error);
    }
  };

  // Memoiza el valor del contexto para evitar renders innecesarios
  const value = useMemo(
    () => ({
      shipments,
      isLoading,
      createShipping,
    }),
    [shipments, isLoading, createShipping],
  );

  return (
    <ShippingContext.Provider value={value}>
      {children}
    </ShippingContext.Provider>
  );
};

// 4. Crea el Hook personalizado
export const useShipping = () => {
  const context = useContext(ShippingContext);
  if (context === undefined) {
    throw new Error("useShipping debe ser usado dentro de un ShippingContext");
  }
  return context;
};
