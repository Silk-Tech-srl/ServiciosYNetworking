/**
 * Navbar — Tech Precision Fixed
 * Solución: Se eliminaron transiciones conflictivas y se optimizó el estado del scroll.
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconNetwork, IconMenu2, IconX, IconPhone } from "@tabler/icons-react";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Tienda", href: "#tienda" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Bajamos el umbral a 10 para una respuesta más rápida
    const onScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Ejecutar inmediatamente para chequear posición inicial
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      // Eliminamos transition-all para evitar el lag visual del fondo
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 group"
          >
            <div className="gradient-brand p-1.5 rounded-lg shrink-0">
              <IconNetwork size={22} className="text-white" />
            </div>
            <span
              className="font-bold text-lg tracking-tight whitespace-nowrap"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <span className="gradient-brand-text">Servicios</span>
              <span className={scrolled ? "text-slate-800" : "text-slate-600"}>
                {" "}
                & Networking
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors rounded-md hover:bg-blue-50"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+541100000000"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              <IconPhone size={16} />
              <span>+54 11 0000-0000</span>
            </a>
            <button
              onClick={() => handleNavClick("#contacto")}
              className="gradient-brand text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:shadow-lg hover:scale-[1.02] transition-all active:scale-95"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Consultar
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-slate-800"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-2">
              {navLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
                >
                  {link.label}
                </button>
              ))}
              <div className="h-px bg-slate-100 my-2" />
              <button
                onClick={() => handleNavClick("#contacto")}
                className="gradient-brand text-white text-center font-bold py-4 rounded-xl shadow-md"
              >
                Consultar ahora
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
