import useProductCatalog from "../../hooks/useProductCatalog";
import { motion } from "framer-motion";
import { pricePerUnit } from "../../utils/convert_price_in_cents";
import { useState } from "react";
import type { EditProductType } from "../../interface/product.type";
import { DiamondPlus } from "lucide-react";
import ProductModal from "../../components/ProductModal";
import {
  STATUS_COLOR_MAP,
  STATUS_DISPLAY_MAP,
} from "../../constants/status.const";
import type { ApiStatus } from "../../interface/status.types";

const ProductPage = () => {
  const { products, createProduct, updateProduct } = useProductCatalog();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<EditProductType | null>(
    null,
  );

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: EditProductType) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = async (productData: EditProductType) => {
    if (productData.product_id) {
      await updateProduct(productData.product_id, productData);
    } else {
      await createProduct(productData);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Catalogo de productos</h2>
      <p className="text-d">Ver, Crear, Actulizar y Desactivar productos</p>
      <hr className="border-0.5 border-gray-300 my-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!products?.data.length === null && <p>No hay productos</p>}
        {products?.data.map((p) => (
          <motion.article
            key={p.product_id}
            layout
            whileHover={{
              translateY: -6,
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            }}
            className="relative bg-white rounded-2xl p-4 shadow-sm flex flex-col cursor-pointer"
            onClick={() =>
              handleOpenEditModal({
                product_id: p.product_id,
                name: p.name,
                description: p.description,
                category: p.category,
                price_cents: p.price_cents,
                stock: p.stock,
                url_image: p.url_image,
                status: p.status,
              })
            }
          >
            <span
              className={
                `absolute top-2 right-2 text-sm text-center rounded-lg border px-2 ${STATUS_COLOR_MAP[p.status as ApiStatus]}` ||
                "text-gray-500"
              }
            >
              {STATUS_DISPLAY_MAP[p.status as ApiStatus] || "Desconocido"}
            </span>
            <img
              src={p.url_image}
              alt={p.name}
              className="w-full h-20 object-cover rounded-lg mb-3"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-sm text-gray-500">
                Categoria: <span className="font-bold">{p.category}</span>
              </p>
            </div>
            <p className="text-sm text-gray-600">
              Cantidad: <span className="font-bold">{p.stock}</span>
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-lg font-bold">
                ${pricePerUnit(p.price_cents)} c/u
              </div>
            </div>
            <p className="text-sm text-center text-gray-600">
              Click para editar
            </p>
          </motion.article>
        ))}

        <div className="fixed right-8 bottom-8">
          <DiamondPlus
            className="w-15 h-15 cursor-pointer transition-all duration-200 ease-in-out hover:scale-90 active:scale-60 text-green-500 hover:text-gray-700 active:rotate-90"
            onClick={handleOpenAddModal}
          />
        </div>

        <ProductModal
          product={editingProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveProduct}
        />
      </div>
    </div>
  );
};

export default ProductPage;
