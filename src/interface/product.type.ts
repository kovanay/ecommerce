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
}

export interface PaginationMeta {
  totalPages: number;
  totalCount: number;
  pageSize: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
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
