export interface MessageAndError {
  message?: string;
  error?: string | [];
}

export interface ProductType {
  product_id: number;
  name: string;
  category: string;
  description: string;
  price_cents: number;
  status: string;
  stock: number;
  updated_at: string;
  created_at: string;
  url_image: string;
  quantity?: number;
}

export interface PaginationMeta {
  totalPages: number;
  totalCount: number;
  pageSize: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ProductResponse extends MessageAndError {
  data: ProductType[];
}

export interface ProductsParams {
  product_ids: number[];
}

export interface PaginationProduct {
  pagination: PaginationMeta;
  data: ProductType[];
}

export interface EditProductType {
  product_id?: number;
  name?: string;
  description?: string;
  price_cents?: number;
  category?: string;
  stock?: number;
  url_image?: string;
  status?: string;
}
