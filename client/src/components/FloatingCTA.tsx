/**
 * FloatingCTA — Botón flotante de WhatsApp/Consulta
 * Aparece después del scroll inicial
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconBrandWhatsapp, IconX, IconMessageCircle } from "@tabler/icons-react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
        >
          {/* Expanded panel */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 w-64"
              >
                <p
                  className="font-bold text-slate-800 text-sm mb-1"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  ¿Necesitás una cotización?
                </p>
                <p
                  className="text-xs text-slate-500 mb-4"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Respondemos en menos de 2 horas en días hábiles.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://wa.me/5491100000000?text=Hola,%20me%20interesa%20una%20cotización%20de%20infraestructura%20de%20red."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    <IconBrandWhatsapp size={18} />
                    WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      setExpanded(false);
                      const el = document.querySelector("#contacto");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-2 gradient-brand text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    <IconMessageCircle size={18} />
                    Formulario
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="relative gradient-brand text-white w-14 h-14 rounded-full shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40 hover:scale-105 transition-all flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {expanded ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <IconX size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <IconMessageCircle size={22} />
                </motion.div>
              )}
            </AnimatePresence>
            {/* Pulse ring */}
            {!expanded && (
              <span className="absolute inset-0 rounded-full gradient-brand animate-ping opacity-20" />
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
