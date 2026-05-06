/**
 * StoreSection — E-commerce estilo Mercado Libre
 * Buscador funcional, filtros de categoría, grid de productos con modal
 */
import { useState, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  IconSearch,
  IconCircleCheck,
  IconAlertTriangle,
  IconCircleX,
  IconZoom,
  IconShoppingCart,
  IconFilter,
} from "@tabler/icons-react";
import { products, type Product, type ProductCategory } from "../data/products";
import ProductModal from "./ProductModal";

const CATEGORIES: ProductCategory[] = ["Switches", "Routers", "Firewalls", "SFPs", "Access Points"];

const stockConfig = {
  "En stock": { icon: IconCircleCheck, color: "text-emerald-600", dot: "bg-emerald-500" },
  "Bajo stock": { icon: IconAlertTriangle, color: "text-amber-600", dot: "bg-amber-500" },
  "Sin stock": { icon: IconCircleX, color: "text-red-500", dot: "bg-red-400" },
};

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const stock = stockConfig[product.stock];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="relative bg-slate-50 p-4 aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 gradient-brand text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-2 shadow-md">
            <IconZoom size={18} className="text-blue-600" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Brand */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            {product.brand}
          </span>
          <div className={`flex items-center gap-1 text-xs font-medium ${stock.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${stock.dot}`} />
            {product.stock}
          </div>
        </div>

        {/* Name */}
        <h3
          className="font-bold text-slate-800 text-sm leading-snug mb-1 line-clamp-2"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {product.name}
        </h3>
        <p className="text-xs text-slate-400 font-mono mb-3">{product.model}</p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span
              className="text-lg font-extrabold gradient-brand-text"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {product.currency} {product.price.toLocaleString("es-AR")}
            </span>
            <span className="text-xs text-slate-400 ml-1">+ IVA</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
          >
            <IconShoppingCart size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function StoreSection() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "Todos">("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [consultProduct, setConsultProduct] = useState<Product | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase()) ||
        p.model.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        activeCategory === "Todos" || p.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [search, activeCategory]);

  const handleConsult = (product: Product) => {
    setSelectedProduct(null);
    setConsultProduct(product);
    setTimeout(() => {
      const el = document.querySelector("#contacto");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <section id="tienda" className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Header */}
        <div ref={ref} className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <span className="w-8 h-0.5 bg-blue-700" />
            Catálogo de Productos
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Equipamiento{" "}
                <span className="gradient-brand-text">certificado</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-slate-500 mt-2"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {filtered.length} productos disponibles
              </motion.p>
            </div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative w-full md:w-80"
            >
              <IconSearch
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Buscar por nombre, marca o modelo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mr-2">
            <IconFilter size={13} />
            <span style={{ fontFamily: "DM Sans, sans-serif" }}>Filtrar:</span>
          </div>
          {(["Todos", ...CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as typeof activeCategory)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "gradient-brand text-white shadow-md shadow-blue-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Products grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <IconSearch size={48} className="text-slate-200 mx-auto mb-4" />
            <p
              className="text-slate-400 text-lg"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              No se encontraron productos para "{search}"
            </p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("Todos"); }}
              className="mt-4 text-blue-600 text-sm font-medium hover:underline"
            >
              Limpiar filtros
            </button>
          </motion.div>
        )}

        {/* Brands row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 pt-10 border-t border-slate-100"
        >
          <p
            className="text-center text-xs text-slate-400 uppercase tracking-widest mb-6"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Marcas con las que trabajamos
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {["Cisco", "Meraki", "Fortinet", "Aruba", "Ubiquiti", "Juniper", "Palo Alto"].map(
              (brand) => (
                <span
                  key={brand}
                  className="text-lg font-extrabold text-slate-200 hover:text-slate-400 transition-colors"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {brand}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onConsult={handleConsult}
      />
    </section>
  );
}
