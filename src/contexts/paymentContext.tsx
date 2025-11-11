import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import type {
  FormPaymentType,
  PaymentResponse,
  PaymentMethodType,
} from "../interface/payment.type";
import { paymentFetch } from "../lib/paymentApi";

interface PaymentContextType {
  payments: PaymentMethodType[];
  isLoading: boolean;
  paymentDefault: PaymentMethodType | null;
  setPaymentDefault: (payment: PaymentMethodType) => void;
  createPayment: (newData: FormPaymentType) => Promise<void>;
  processPayment: (data: {
    paymentId: number;
    gatewayTransactionId: string;
  }) => Promise<boolean>;
}

export const PaymentContext = createContext<PaymentContextType | undefined>(
  undefined,
);

interface PaymentProviderProps {
  children: ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({
  children,
}) => {
  const [payments, setPayments] = useState<PaymentMethodType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentDefault, setPaymentDefault] =
    useState<PaymentMethodType | null>(null);

  const navigate = useNavigate();

  const fetchPayments = useCallback(async () => {
    setIsLoading(true);
    try {
      const paymentData = await paymentFetch<PaymentResponse>("/api/payments/");
      setPayments(paymentData.data);

      if (paymentData.data.length > 0) {
        setPaymentDefault(paymentData.data[0]);
      }
    } catch (error) {
      setPayments([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const createPayment = async (newData: FormPaymentType) => {
    setIsLoading(true);
    try {
      await paymentFetch("/api/payments/", {
        method: "POST",
        body: JSON.stringify(newData),
      });
      fetchPayments();
    } catch (error) {
      // Assuming the component will show an error toast
      console.error("Error creating payment:", error);
      throw error; // Re-throw to be caught by the promise toast
    } finally {
      setIsLoading(false);
    }
  };

  const processPayment = async (data: {
    paymentId: number;
    gatewayTransactionId: string;
  }) => {
    setIsLoading(true);
    try {
      await paymentFetch("/api/payments/", {
        method: "PUT",
        body: JSON.stringify(data),
      });
      console.log("Payment successful for order:", data.paymentId);
      return true;
    } catch (error) {
      console.error("Payment processing failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Memoiza el valor del contexto para evitar renders innecesarios
  const value = useMemo(
    () => ({
      payments,
      isLoading,
      paymentDefault,
      setPaymentDefault,
      createPayment,
      processPayment,
    }),
    [
      payments,
      isLoading,
      paymentDefault,
      setPaymentDefault,
      createPayment,
      processPayment,
    ],
  );

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};

// 4. Crea el Hook personalizado
export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePayment debe ser usado dentro de un PaymentProvider");
  }
  return context;
};
