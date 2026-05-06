/**
 * Navbar — Tech Precision design
 * Fondo: blanco hueso con blur, logo con degradado azul-celeste
 * Fuente: Inter para logo, DM Sans para links
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 group"
          >
            <div className="gradient-brand p-1.5 rounded-lg">
              <IconNetwork size={22} className="text-white" />
            </div>
            <span
              className="font-display font-700 text-lg tracking-tight"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}
            >
              <span className="gradient-brand-text">Servicios</span>
              <span className="text-slate-800"> & Networking</span>
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
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-blue-700 transition-colors"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              <IconPhone size={16} />
              <span>+54 11 0000-0000</span>
            </a>
            <button
              onClick={() => handleNavClick("#contacto")}
              className="gradient-brand text-white text-sm font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-sm"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Consultar
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-slate-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
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
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-slate-100 shadow-lg"
          >
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3 text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("#contacto")}
                className="mt-2 gradient-brand text-white text-sm font-semibold px-5 py-3 rounded-lg"
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
