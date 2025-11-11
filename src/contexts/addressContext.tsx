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
  AddressDefaultResponse,
  AddressResponse,
  AddressType,
  FormAddressType,
} from "../interface/address.type";
import { addressFetch } from "../lib/addressApi";

interface AddressContextType {
  addresses: AddressType[];
  addressDefault: AddressType | null;
  isLoading: boolean;
  setAddressDefault: (address: AddressType) => void;
  createAddress: (newData: FormAddressType) => Promise<void>;
}

export const AddressContext = createContext<AddressContextType | undefined>(
  undefined,
);

interface AddressProviderProps {
  children: ReactNode;
}

export const AddressProvider: React.FC<AddressProviderProps> = ({
  children,
}) => {
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [addressDefault, setAddressDefault] = useState<AddressType | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchAddresses = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await addressFetch<AddressResponse>("/api/address/");

      setAddresses(result.data);
    } catch (error) {
      setAddresses([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const fetchDefaultAddress = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await addressFetch<AddressDefaultResponse | null>(
        "/api/address/default",
      );

      if (!result) {
        setAddressDefault(null);
        return;
      }

      setAddressDefault(result.data);
    } catch (error) {
      setAddresses([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDefaultAddress();
  }, [fetchDefaultAddress]);

  const createAddress = async (newData: FormAddressType) => {
    setIsLoading(true);
    try {
      await addressFetch("/api/address/", {
        method: "POST",
        body: JSON.stringify(newData),
      });
      fetchAddresses();
    } catch (error) {
      console.error("Error creating address:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Memoiza el valor del contexto para evitar renders innecesarios
  const value = useMemo(
    () => ({
      addresses,
      addressDefault,
      isLoading,
      setAddressDefault,
      createAddress,
    }),
    [addresses, addressDefault, isLoading, createAddress],
  );

  return (
    <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
  );
};

// 4. Crea el Hook personalizado
export const useAddress = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error("useAddress debe ser usado dentro de un AddressProvider");
  }
  return context;
};
