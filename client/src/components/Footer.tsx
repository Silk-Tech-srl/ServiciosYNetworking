/**
 * Footer — Datos de contacto, links y formulario de presupuesto
 * Fondo: navy oscuro con degradado
 */
import { useState } from "react";
import { motion } from "framer-motion";
import {
  IconNetwork,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandWhatsapp,
  IconSend,
  IconCircleCheck,
} from "@tabler/icons-react";

const footerLinks = {
  Servicios: [
    "Diseño de Red",
    "Consultoría Técnica",
    "Instalación On-site",
    "Soporte 24/7",
    "Retrofitting",
  ],
  Productos: ["Switches", "Routers", "Firewalls", "SFPs", "Access Points"],
  Empresa: ["Nosotros", "Certificaciones", "Casos de éxito", "Blog técnico"],
};

export default function Footer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <footer
      id="contacto"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a1628 0%, #1E3A5F 50%, #0d2044 100%)",
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Main footer content */}
        <div className="pt-16 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="gradient-brand p-1.5 rounded-lg">
                <IconNetwork size={22} className="text-white" />
              </div>
              <span
                className="font-extrabold text-lg text-white"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Servicios & Networking
              </span>
            </div>
            <p
              className="text-blue-200/60 text-sm leading-relaxed mb-6"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Infraestructura tecnológica de alto rendimiento para empresas que
              no pueden permitirse tiempo de inactividad.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              {[
                { icon: IconPhone, text: "+54 11 0000-0000" },
                { icon: IconMail, text: "info@serviciosynetworking.com" },
                { icon: IconMapPin, text: "Buenos Aires, Argentina" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-sm text-blue-200/70">
                  <Icon size={15} className="text-cyan-400 shrink-0" />
                  <span style={{ fontFamily: "DM Sans, sans-serif" }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: IconBrandLinkedin, label: "LinkedIn" },
                { icon: IconBrandTwitter, label: "Twitter" },
                { icon: IconBrandWhatsapp, label: "WhatsApp" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-blue-200 hover:text-white transition-all"
                  aria-label={label}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-2">
              <h4
                className="text-white font-bold text-sm uppercase tracking-wider mb-5"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      className="text-sm text-blue-200/60 hover:text-cyan-300 transition-colors text-left"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact form */}
          <div className="lg:col-span-3">
            <h4
              className="text-white font-bold text-sm uppercase tracking-wider mb-5"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Solicitar Presupuesto
            </h4>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-6 text-center"
              >
                <IconCircleCheck size={40} className="text-emerald-400 mx-auto mb-3" />
                <p
                  className="text-emerald-300 font-semibold"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  ¡Mensaje enviado!
                </p>
                <p
                  className="text-emerald-200/70 text-sm mt-1"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Te contactaremos en menos de 24 horas.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/50 transition-all"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                />
                <input
                  type="email"
                  placeholder="Email corporativo"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/50 transition-all"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                />
                <input
                  type="text"
                  placeholder="Empresa"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/50 transition-all"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                />
                <textarea
                  placeholder="Describe tu proyecto o necesidad..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  required
                  className="w-full px-4 py-2.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/50 transition-all resize-none"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 gradient-brand text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 shadow-md"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  {loading ? (
                    <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  ) : (
                    <IconSend size={16} />
                  )}
                  {loading ? "Enviando..." : "Enviar consulta"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-blue-200/40 text-xs"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            © {new Date().getFullYear()} Servicios y Networking. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {["Política de Privacidad", "Términos de Uso"].map((item) => (
              <button
                key={item}
                className="text-blue-200/40 text-xs hover:text-blue-200/70 transition-colors"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
