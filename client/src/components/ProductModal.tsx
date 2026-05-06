/**
 * ProductModal — Modal de detalle de producto estilo e-commerce
 * Specs detalladas, badge de stock, botón de consulta
 */
import { motion, AnimatePresence } from "framer-motion";
import {
  IconX,
  IconPackage,
  IconBuildingStore,
  IconTag,
  IconCircleCheck,
  IconAlertTriangle,
  IconCircleX,
  IconMessageCircle,
  IconChevronRight,
} from "@tabler/icons-react";
import type { Product } from "../data/products";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onConsult: (product: Product) => void;
}

const stockConfig = {
  "En stock": {
    icon: IconCircleCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
  },
  "Bajo stock": {
    icon: IconAlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
  },
  "Sin stock": {
    icon: IconCircleX,
    color: "text-red-500",
    bg: "bg-red-50 border-red-200",
  },
};

export default function ProductModal({
  product,
  onClose,
  onConsult,
}: ProductModalProps) {
  if (!product) return null;
  const stock = stockConfig[product.stock];
  const StockIcon = stock.icon;

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="relative">
                <div className="h-2 w-full gradient-brand rounded-t-2xl" />
                <div className="p-6 pb-0 flex items-start justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider font-medium">
                    <IconBuildingStore size={14} />
                    {product.category}
                    <IconChevronRight size={12} />
                    {product.brand}
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700"
                  >
                    <IconX size={18} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image */}
                  <div className="bg-slate-50 rounded-xl p-6 flex items-center justify-center aspect-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-4">
                    {/* Brand badge */}
                    <div className="flex items-center gap-2">
                      <span className="gradient-brand text-white text-xs font-bold px-3 py-1 rounded-full">
                        {product.brand}
                      </span>
                      {product.badge && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Name */}
                    <div>
                      <h2
                        className="text-2xl font-extrabold text-slate-900 leading-tight"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {product.name}
                      </h2>
                      <p className="text-sm text-slate-400 mt-1 font-mono">
                        {product.model}
                      </p>
                    </div>

                    {/* Description */}
                    <p
                      className="text-sm text-slate-600 leading-relaxed"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-3xl font-extrabold gradient-brand-text"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {product.currency}{" "}
                        {product.price.toLocaleString("es-AR")}
                      </span>
                      <span className="text-xs text-slate-400">+ IVA</span>
                    </div>

                    {/* Stock */}
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium w-fit ${stock.bg} ${stock.color}`}
                    >
                      <StockIcon size={15} />
                      {product.stock}
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => onConsult(product)}
                      className="flex items-center justify-center gap-2 gradient-brand text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity shadow-md"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      <IconMessageCircle size={18} />
                      Consultar Disponibilidad
                    </button>
                  </div>
                </div>

                {/* Specs table */}
                <div className="mt-6">
                  <h3
                    className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <IconPackage size={15} className="text-blue-600" />
                    Especificaciones Técnicas
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.specs.map(spec => (
                      <div
                        key={spec.label}
                        className="flex flex-col gap-0.5 bg-slate-50 rounded-lg px-3 py-2.5 border border-slate-100"
                      >
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                          {spec.label}
                        </span>
                        <span
                          className="text-sm font-semibold text-slate-800"
                          style={{ fontFamily: "DM Sans, sans-serif" }}
                        >
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tag */}
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                  <IconTag size={13} />
                  Precios en USD. Consultar por financiación y disponibilidad de
                  stock.
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
