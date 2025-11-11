export interface OrderModel {
  order_id: number;
  user_id: number;
  payment_id: number;
  shipping_method_id: number;
  shipping_recipient_name: string;
  shipping_street_address: string;
  shipping_address_line_2: string;
  shipping_city: string;
  shipping_state_province: string;
  shipping_postal_code: string;
  shipping_country: string;
  status: string;
  subtotal_cents: number;
  shipping_cost_cents: number;
  taxes_cents: number;
  total_cents: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface OrderResponse {
  data: OrderModel[];
}

export interface OrderByIdResponse {
  data: OrderModel;
}

export interface CreateOrderResponse {
  message?: string;
  error?: string;
  data: { order_id: number; total_cents: number };
}

export interface FormOrderType {
  shipping_method_id: number;
  recipient_name: string;
  street: string;
  line_2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  subtotal_cents: number;
  cost_cents: number;
  taxes_cents: number;
  total_cents: number;
  currency: string;
}
