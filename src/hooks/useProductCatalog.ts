import { useCallback, useEffect, useState } from "react";
import {
  type EditProductType,
  type PaginationProduct,
} from "../interface/product.type";
import { productFetch } from "../lib/productApi";

const useProductCatalog = () => {
  const [products, setProducts] = useState<PaginationProduct | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const productsResponse = await productFetch<PaginationProduct | null>(
        "/api/product-catalog/?page=1&limit=5",
        {
          method: "GET",
        },
      );
      setProducts(productsResponse);
    } catch (error) {
      console.error("Error en auth: ", error);
    }
  }, []);

  const createProduct = async (newProduct: EditProductType) => {
    try {
      await productFetch("/api/product-catalog/", {
        method: "POST",
        body: JSON.stringify(newProduct),
      });
      fetchProducts();
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

    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, createProduct, updateProduct };
};

export default useProductCatalog;
