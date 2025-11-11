import { Lock } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { FormPaymentType } from "../interface/payment.type";
import toast from "react-hot-toast";
import { useCart } from "../contexts/cartContext";
import { useAddress } from "../contexts/addressContext";
import { useNavigate } from "react-router-dom";
import { usePaymentHook } from "../hooks/usePayment";
import type { FormOrderType } from "../interface/order.type";

const PaymentPage = () => {
  const { cartTotal } = useCart();
  const { addressDefault } = useAddress();
  const { createFullOrderProcess } = usePaymentHook();

  const [formData, setFormData] = useState<FormPaymentType>({
    orderId: 0,
    amountCents: cartTotal,
    currency: "MXN",
    paymentMethodType: "credit_card",
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!addressDefault) {
      return toast.error("No hay una dirección");
    }

    const orderData: FormOrderType = {
      shipping_method_id: 1,
      recipient_name: addressDefault.recipient_name,
      street: addressDefault.street_address,
      line_2: addressDefault.address_line_2,
      city: addressDefault.city,
      state: addressDefault.state_province,
      postal_code: addressDefault.postal_code,
      country: addressDefault.country,
      subtotal_cents: 1000,
      cost_cents: 5900,
      taxes_cents: cartTotal * 0.16,
      total_cents: cartTotal,
      currency: "MXN",
    };
    const paymentData = {
      amountCents: cartTotal,
      currency: "MXN",
      paymentMethodType: "debit_card",
    };

    toast.promise(createFullOrderProcess(orderData, paymentData), {
      loading: "Procesando pago",
      success: () => {
        navigate("/product-catalog");
        return <b>Se creo realizo el pago con exito!</b>;
      },
      error: <b>No se pudo realizar el pago.</b>,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
      <h2 className="text-3xl font-bold mb-2">MKM</h2>
      <p className="text-xl mb-4">Payment Method</p>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Add a New Card
        </h3>
        <div className="flex flex-row gap-2 items-center justify-center mb-4">
          <img
            src="https://img.icons8.com/?size=100&id=1429&format=png&color=000000"
            className="w-auto h-8 object-cover"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmSKbW_d-6f2mFkWrVoHQKi7qo0E8IM9VhuQ&s"
            className="w-auto h-10 object-cover"
          />
          <img
            src="https://cdn-icons-png.freepik.com/256/349/349228.png"
            className="w-auto h-8 object-cover"
          />
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <label htmlFor="card_number" className="flex flex-col gap-1">
            Card Number
            <input
              id="card_number"
              name="card_number"
              //value={formData.card_number}
              //onChange={handleChange}
              placeholder="1234 5678 9101 1121"
              className="border border-gray-300 rounded-md px-3 py-2"
              //required
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="expiry_date" className="flex flex-col gap-1">
              Expiration
              <input
                id="expiry_date"
                name="expiry_date"
                //value={formData.expiry_date}
                //onChange={handleChange}
                maxLength={5}
                placeholder="MM/YY"
                className="border border-gray-300 rounded-md px-3 py-2"
                //required
              />
            </label>
            <label htmlFor="cvv" className="flex flex-col gap-1">
              CVV
              <input
                id="cvv"
                name="cvv"
                //value={formData.cvv}
                //onChange={handleChange}
                maxLength={3}
                placeholder="123"
                className="border border-gray-300 rounded-md px-3 py-2"
                //required
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 flex flex-row justify-center items-center gap-2 mt-4"
          >
            <Lock size={16} />
            Pagar
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
