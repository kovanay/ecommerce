export interface ShippingModel {
  shipment_id: number;
  order_id: string;
  shipping_method_id: number;
  status: string;
  carrier_name: string;
  tracking_number: string;
  created_at: string;
  shipped_at: string;
  delivered_at: string;
}

export interface ShippingResponse {
  data: ShippingModel[];
}

export interface CreateShippingType {
  order_id: number;
  shipping_method_id: number;
}
