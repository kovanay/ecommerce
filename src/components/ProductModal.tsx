import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import type { EditProductType } from "../interface/product.type";
import { pricePerUnit } from "../utils/convert_price_in_cents";

const EMPTY_PRODUCT = {
  name: "",
  description: "",
  category: "",
  price_cents: 0,
  stock: 0,
  status: "",
  url_image: "",
};

interface ProductModalProps {
  product: EditProductType | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditProductType) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<EditProductType>(EMPTY_PRODUCT);

  const isEditMode = product !== null;

  useEffect(() => {
    if (isOpen) {
      if (isEditMode) {
        setFormData(product!);
      } else {
        setFormData(EMPTY_PRODUCT);
      }
    }
  }, [product, isEditMode, isOpen]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Convierte el precio a número
    const finalValue =
      name === "price_cents" ? parseInt(value, 10) || 0 : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  // Manejador para enviar el formulario
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData); // Llama a la función 'onSave' del padre
    onClose(); // Cierra el modal después de guardar
  };

  // No renderizar nada si el modal está cerrado
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 z-10"
      >
        <form
          onSubmit={handleSubmit}
          className="max-h-[80vh] overflow-y-auto pr-2"
        >
          <h3 className="text-2xl font-bold mb-6">
            {isEditMode ? "Editar Producto" : "Agregar Nuevo Producto"}
          </h3>

          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Columna de Imagen */}
            <div className="shrink-0 w-full md:w-40">
              <img
                src={
                  formData.url_image ||
                  "https://via.placeholder.com/160x128.png?text=Imagen"
                }
                alt={formData.name || "Producto"}
                className="w-full h-32 md:w-40 md:h-32 object-cover rounded-lg"
              />
              <label className="block text-sm font-medium text-gray-700 mt-2">
                URL de Imagen
              </label>
              <input
                type="text"
                name="url_image"
                value={formData.url_image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            {/* Columna de Datos */}
            <div className="grow w-full">
              {/* Nombre */}
              <label className="block text-sm font-medium text-gray-700">
                Nombre del Producto
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Taza de Cerámica"
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />

              {/* Descripción */}
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Una breve descripción del producto..."
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />

              {/* --- ACTUALIZADO: Grid de 3 columnas --- */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* Categoría */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Categoría
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Ej: Cocina"
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                {/* Stock */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                {/* --- NUEVO: Campo Status --- */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Estado
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                  </select>
                </div>
              </div>

              {/* Precio */}
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Precio (en centavos)
              </label>
              <input
                type="number"
                name="price_cents"
                value={formData.price_cents}
                onChange={handleChange}
                required
                min="0"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <p className="text-sm text-gray-500 mt-1">
                {`Se mostrará como: $${pricePerUnit(formData.price_cents!)}`}
              </p>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg cursor-pointer"
            >
              {isEditMode ? "Guardar Cambios" : "Agregar Producto"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProductModal;
