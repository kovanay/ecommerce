import { useState } from "react";
import { CartType } from "../interface/cart.type";

const useCart = () => {
  const [cart, setCart] = useState<CartType[]>([]);

  const addToCart = async (productId: number, quantity: number, priceCents: number) => {
    const productData = {
      product_id: productId,
      quantity: quantity,
      price_cents: priceCents,
    }
    try {
      const response = await fetch('http://localhost:3004/api/cart/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error al realizar la petición:', error);
    }

  }

  return { cart, addToCart }
}

export default useCart;
