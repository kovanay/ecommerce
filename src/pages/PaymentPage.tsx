import { Lock } from "lucide-react";

const PaymentPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-linear-to-b from-white to-pink-50">
      <h2 className="text-4xl">MKM</h2>
      <p className="text-2xl">Metodo de pago</p>
      <div className="flex flex-row gap-2 items-center">
        <img
          src="https://img.icons8.com/?size=100&id=1429&format=png&color=000000"
          className="w-auto h-15 object-cover"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmSKbW_d-6f2mFkWrVoHQKi7qo0E8IM9VhuQ&s"
          className="w-auto h-15 object-cover"
        />
        <img
          src="https://cdn-icons-png.freepik.com/256/349/349228.png"
          className="w-auto h-15 object-cover"
        />
        <img
          src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_1280.png"
          className="w-auto h-15 object-cover"
        />
      </div>
      <form className="flex flex-col rounded-lg p-4 shadow-md bg-white mt-5 gap-2">
        <label htmlFor="name" className="flex flex-col gap-1">
          Nombre del titular
          <input
            id="name"
            name="name"
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </label>
        <label htmlFor="card" className="flex flex-col gap-1">
          Numero de tarjeta
          <input
            id="card"
            name="card"
            placeholder="1234 5678 9101 1121"
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </label>

        <div className="grid grid-cols-2 gap-2">
          <label htmlFor="expire" className="flex flex-col gap-1">
            Vencimiento
            <input
              id="expire"
              name="expire"
              maxLength={5}
              placeholder="00/00"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </label>
          <label htmlFor="cvv" className="flex flex-col gap-1">
            CVV
            <input
              id="cvv"
              name="cvv"
              maxLength={3}
              placeholder="123"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </label>
        </div>
        <br />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 flex flex-row justify-center gap-2"
        >
          <Lock />
          Pagar
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
