import type { FormOrderType } from "../interface/order.type";
import type {
  FormPaymentType,
  PaymentTransactionType,
} from "../interface/payment.type";
import type {
  CreateShippingType,
  ShippingModel,
} from "../interface/shipping.type";
import { paymentFetch } from "../lib/paymentApi";
import { shippingFetch } from "../lib/shippingApi";

type PaymentDetails = Omit<FormPaymentType, "orderId" | "amountCents">;

export const usePaymentHook = () => {
  const createFullOrderProcess = async (
    orderData: FormOrderType,
    paymentDetails: PaymentDetails,
  ) => {
    try {
      // 1. Crear la orden
      // const orderResponse = await orderFetch<CreateOrderResponse>(
      //   "/api/orders/",
      //   {
      //     method: "POST",
      //     body: JSON.stringify(orderData),
      //   },
      // );
      //
      // if (!orderResponse.data) {
      //   throw new Error(orderResponse.error || "Failed to create order.");
      // }
      //
      // const { order_id, total_cents } = orderResponse.data;
      //
      // 2. Procesar el pago
      const paymentData: FormPaymentType = {
        orderId: 22,
        amountCents: orderData.total_cents,
        currency: paymentDetails.currency,
        paymentMethodType: paymentDetails.paymentMethodType,
      };

      const paymentResponse = await paymentFetch<PaymentTransactionType>(
        "/api/payments/",
        {
          method: "POST",
          body: JSON.stringify(paymentData),
        },
      );

      // 3. Crear el envío
      const shippingData: CreateShippingType = {
        order_id: 22,
        shipping_method_id: orderData.shipping_method_id,
      };

      const shippingResponse = await shippingFetch<ShippingModel>(
        "/api/shipments/",
        {
          method: "POST",
          body: JSON.stringify(shippingData),
        },
      );

      // Retornar toda la información relevante
      return {
        // order: orderResponse.data,
        payment: paymentResponse,
        shipping: shippingResponse,
      };
    } catch (error) {
      console.error("Error during the order process:", error);
      // Aquí podrías manejar la compensación de transacciones si algo falla.
      // Por ejemplo, si el pago falla, podrías querer cancelar la orden.
      throw error;
    }
  };

  return { createFullOrderProcess };
};
