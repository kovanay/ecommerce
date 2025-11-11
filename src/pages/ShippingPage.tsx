import { useNavigate } from "react-router-dom";
import { useOrder } from "../contexts/orderContext";
import { usePayment } from "../contexts/paymentContext";
import { useAddress } from "../contexts/addressContext";
import { useCart } from "../contexts/cartContext";
import { v4 as uuid4 } from "uuid";

const ShippingPage = () => {
  const navigate = useNavigate();
  const { createOrder } = useOrder();
  const { processPayment, paymentDefault } = usePayment();
  const { addressDefault } = useAddress();
  const { cartProducts, cartTotal, clearAllCart } = useCart();

  const handleConfirmOrder = async () => {
    if (!addressDefault || !paymentDefault) {
      alert("Please select a shipping address and payment method.");
      return;
    }

    try {
      // 1. Create Order
      const orderData = {
        shipping_address: addressDefault.address_id,
        billing_address: addressDefault., // Assuming same for simplicity
        shipping_cost: 500, // Example shipping cost in cents
        tax_cost: Math.round(cartTotal * 0.1), // Example tax 10%
      };
      const order = await createOrder(orderData);

      if (order && order.id) {
        // 2. Process Payment
        const paymentData = {
          paymentId: paymentDefault.id,
          gatewayTransactionId: uuid4() as string,
        };
        const paymentResult = await processPayment(paymentData);

        if (paymentResult) {
          // 3. Clear cart and redirect
          clearAllCart();
          alert("Order placed successfully!");
          navigate(`/orders/${order.id}`);
        } else {
          alert("Payment failed. Please try again.");
        }
      } else {
        alert("Failed to create order.");
      }
    } catch (error) {
      console.error("Order confirmation failed", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
          {addressDefault ? (
            <div className="p-4 border rounded">
              <p>{addressDefault.street}</p>
              <p>
                {addressDefault.city}, {addressDefault.state}{" "}
                {addressDefault.zip_code}
              </p>
              <p>{addressDefault.country}</p>
            </div>
          ) : (
            <p>No shipping address selected.</p>
          )}

          <h2 className="text-xl font-semibold mt-6 mb-2">Payment Method</h2>
          {paymentDefault ? (
            <div className="p-4 border rounded">
              <p>
                Card ending in **** **** ****{" "}
                {paymentDefault.card_number.slice(-4)}
              </p>
              <p>Expires: {paymentDefault.expiry_date}</p>
            </div>
          ) : (
            <p>No payment method selected.</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Items</h2>
          <div className="p-4 border rounded mb-4">
            {cartProducts.map((item) => (
              <div key={item.product_id} className="flex justify-between mb-2">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price_cents / 100).toFixed(2)}</span>
              </div>
            ))}
            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Subtotal</span>
              <span>${(cartTotal / 100).toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleConfirmOrder}
            disabled={
              !addressDefault || !paymentDefault || cartProducts.length === 0
            }
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Confirm and Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
