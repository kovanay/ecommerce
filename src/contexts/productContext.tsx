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
  EditProductType,
  PaginationProduct,
} from "../interface/product.type";
import { productFetch } from "../lib/productApi";

interface ProductContextType {
  productPagination: PaginationProduct | null;
  isLoading: boolean;
  createProduct: (newProduct: EditProductType) => Promise<void>;
  updateProduct: (
    productId: number,
    editProduct: EditProductType,
  ) => Promise<void>;
}

const CartContext = createContext<ProductContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [productPagination, setProductPagination] =
    useState<PaginationProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProductPagination = useCallback(async () => {
    try {
    } catch (error) {
      console.error("Error en auth: ", error);
    }

    setIsLoading(true);
    try {
      const response = await productFetch<PaginationProduct | null>(
        "/api/product-catalog/?page=1&limit=5",
        {
          method: "GET",
        },
      );
      setProductPagination(response);
    } catch (error) {
      setProductPagination(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductPagination();
  }, [fetchProductPagination]);

  const createProduct = async (newProduct: EditProductType) => {
    try {
      await productFetch("/api/product-catalog/", {
        method: "POST",
        body: JSON.stringify(newProduct),
      });
      fetchProductPagination();
    } catch (error) {
      console.error("Error en crear producto: ", error);
    }
  };

  const updateProduct = async (
    productId: number,
    editProduct: EditProductType,
  ) => {
    console.log(editProduct.product_id);
    const product = {
      name: editProduct.name,
      description: editProduct.description,
      price_cents: editProduct.price_cents,
      category: editProduct.category,
      stock: editProduct.stock,
      url_image: editProduct.url_image,
      status: editProduct.status,
    };

    try {
      await productFetch(`/api/product-catalog/?product_id=${productId}`, {
        method: "PUT",
        body: JSON.stringify(product),
      });
    } catch (error) {
      console.error("Error al editar el producto: ", error);
    }

    fetchProductPagination();
  };

  // Memoiza el valor del contexto para evitar renders innecesarios
  const value = useMemo(
    () => ({
      productPagination,
      isLoading,
      createProduct,
      updateProduct,
    }),
    [productPagination, isLoading, createProduct, updateProduct],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useProduct = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
