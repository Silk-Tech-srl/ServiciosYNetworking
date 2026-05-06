/**
 * CTABanner — Banner de llamada a la acción con degradado
 */
import { motion } from "framer-motion";
import { IconArrowRight, IconPhone } from "@tabler/icons-react";

export default function CTABanner() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-brand" />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
      {/* Glow circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-extrabold text-white mb-3"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              ¿Listo para modernizar tu red?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-blue-100/80 text-lg"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Hablá con nuestros ingenieros y obtené una propuesta sin cargo.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <button
              onClick={() => handleScroll("#contacto")}
              className="flex items-center gap-2 bg-white text-blue-700 font-bold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Solicitar propuesta
              <IconArrowRight size={18} />
            </button>
            <a
              href="tel:+5491100000000"
              className="flex items-center gap-2 bg-white/20 border border-white/40 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/30 transition-colors"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              <IconPhone size={18} />
              Llamar ahora
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
