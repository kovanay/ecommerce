import { useNavigate } from "react-router-dom";
import { useAddress } from "../contexts/addressContext";
import { type FormEvent, type ChangeEvent, useState, useEffect } from "react";
import type { FormAddressType, AddressType } from "../interface/address.type";
import toast from "react-hot-toast";

const AddressPage = () => {
  const { addresses, addressDefault, setAddressDefault, createAddress } =
    useAddress();

  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(
    addressDefault,
  );

  useEffect(() => {
    if (addressDefault) {
      setSelectedAddress(addressDefault);
    }
  }, [addressDefault]);

  const [formData, setFormData] = useState<FormAddressType>({
    recipientName: "Juanito Perez",
    streetAddress: "Av. Principal, #123",
    addressLine2: "Apartamento 4B",
    city: "Nogales",
    stateProvince: "Sonora",
    postalCode: "54321",
    country: "México",
    deliveryInstructions:
      "Dejar en recepción. No tocar el timbre después de las 8pm.",
    phoneNumber: "+52 55 1234 5678",
    addressLabel: "Casa",
    isDefault: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;

    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSelectAddress = (address: AddressType) => {
    setSelectedAddress(address);
    setAddressDefault(address);
  };

  const handleContinue = () => {
    if (selectedAddress) {
      navigate("/payment");
    } else {
      toast.error("Please select a shipping address.");
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await toast.promise(createAddress(formData), {
      loading: "Agregando dirección...",
      success: <b>Se agrego la dirección exitosamente</b>,
      error: <b>No se pudo agregar la Dirección</b>,
    });
    setFormData({
      recipientName: "",
      streetAddress: "",
      addressLine2: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      country: "",
      deliveryInstructions: "",
      phoneNumber: "",
      addressLabel: "",
      isDefault: false,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
      <h2 className="text-3xl font-bold mb-2">MKM</h2>
      <p className="text-xl mb-4">Shipping Address</p>

      <div className="w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-2">Your Addresses</h3>
        <div className="space-y-2 mb-4">
          {addresses.map((address) => (
            <div
              key={address.address_id}
              onClick={() => handleSelectAddress(address)}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedAddress?.address_id === address.address_id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <p className="font-semibold">{address.recipient_name}</p>
              <p className="text-sm text-gray-600">
                {address.street_address}, {address.city},{" "}
                {address.state_province} {address.postal_code}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedAddress}
          className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 mb-6 disabled:bg-gray-400"
        >
          Continue to Payment
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Add a New Address
        </h3>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="recipient_name"
              value={formData.recipientName}
              onChange={handleChange}
              placeholder="Full Name"
              className="border border-gray-300 rounded-md px-3 py-2"
              required
            />
            <input
              name="street"
              value={formData.streetAddress}
              onChange={handleChange}
              placeholder="Nombre de la calle"
              className="border border-gray-300 rounded-md px-3 py-2"
              required
            />
            <input
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              placeholder="Direccion 2"
              className="border border-gray-300 rounded-md px-3 py-2"
              required
            />
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ciudad"
              className="border border-gray-300 rounded-md px-3 py-2"
              required
            />
            <input
              name="state"
              value={formData.stateProvince}
              onChange={handleChange}
              placeholder="Estado / Proivincia"
              className="border border-gray-300 rounded-md px-3 py-2"
              required
            />
            <input
              name="postal_code"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Codigo postal"
              className="border border-gray-300 rounded-md px-3 py-2"
              required
            />
            <input
              name="deliveryInstructions"
              value={formData.deliveryInstructions}
              onChange={handleChange}
              placeholder="Intrucciones de entrega"
              className="border border-gray-300 rounded-md px-3 py-2"
              required
            />

            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Numero de telefono"
              className="border border-gray-300 rounded-md px-3 py-2"
              required
            />
            <input
              name="addressLabel"
              value={formData.addressLabel}
              onChange={handleChange}
              placeholder="Nombre de Direccion"
              className="border border-gray-300 rounded-md px-3 py-2"
              required
            />
            <label className="flex flex-row items-center gap-2">
              <input
                name="isDefault"
                type="checkbox"
                checked={formData.isDefault}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
              Poner como predeterminado
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 mt-4"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressPage;
