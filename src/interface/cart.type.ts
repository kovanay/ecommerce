export interface CartType {
  cart_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface CartItemType {
  item_id: number;
  product_id: number;
  quantity: number;
  price_at_addition_cents: number;
}

export interface AllCartResponse {
  cart: {
    cart_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    items: CartItemType[];
  };
  status: string;
}
export interface AllCartType {
  cart_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  items: CartItemType[];
}

export interface AddToCartType {
  product_id: number;
  quantity: number;
  price_cents: number;
}

export interface changeQuantityType {
  cart_id: number;
  product_id: number;
  quantity: number;
}
