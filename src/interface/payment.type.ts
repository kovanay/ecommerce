export interface MessageAndError {
  message?: string;
  error?: string | [];
}

export interface PaymentMethodType {
  card_number: string;
  expiry_date: string;
  is_default: boolean;
  payment_id: number;
  order_id: number;
  user_id: number;
  amount_cents: number;
  currency: string;
  status: string;
  payment_method_type: string;
  gateway_transaction_id?: string;
  gateway_error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentTransactionType {
  transaction_id: string;
  order_id: string;
  amount_cents: number;
  currency: string;
  status: string;
  gateway_transaction_id?: string;
  gateway_error_message?: string;
  created_at: string;
}

export interface PaymentResponse {
  data: PaymentMethodType[];
}

export interface FormPaymentType {
  orderId: number;
  amountCents: number;
  currency: string;
  paymentMethodType: string;
}
