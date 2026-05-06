/**
 * AboutSection — Sección "Nosotros" con valores y estadísticas
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  IconAward,
  IconUsers,
  IconBuildingSkyscraper,
  IconClock,
  IconShieldCheck,
  IconBulb,
  IconUsersGroup,
} from "@tabler/icons-react";

const stats = [
  {
    icon: IconBuildingSkyscraper,
    value: "500+",
    label: "Proyectos completados",
  },
  { icon: IconUsers, value: "120+", label: "Clientes activos" },
  { icon: IconClock, value: "15+", label: "Años de experiencia" },
  { icon: IconAward, value: "12", label: "Certificaciones" },
];

const values = [
  {
    icon: IconShieldCheck,
    title: "Confiabilidad",
    description:
      "Infraestructuras diseñadas para el 99.9% de uptime con redundancia y failover automático.",
  },
  {
    icon: IconBulb,
    title: "Innovación",
    description:
      "Adoptamos las últimas tecnologías SD-WAN, Wi-Fi 6E y Zero Trust para mantener tu red al día.",
  },
  {
    icon: IconUsersGroup,
    title: "Compromiso",
    description:
      "Soporte post-venta real con SLAs garantizados y equipo técnico disponible 24/7.",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="nosotros" className="py-24" style={{ background: "#F5F5F3" }}>
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4"
            >
              <span className="w-8 h-0.5 bg-blue-700" />
              Quiénes somos
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Expertos en{" "}
              <span className="gradient-brand-text">infraestructura</span> de
              red
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-500 text-lg leading-relaxed mb-8"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Somos una empresa especializada en soluciones de conectividad e
              infraestructura tecnológica. Nuestro equipo de ingenieros
              certificados diseña, implementa y mantiene redes empresariales de
              alto rendimiento para organizaciones de todos los tamaños.
            </motion.p>

            {/* Values */}
            <div className="flex flex-col gap-5">
              {values.map((val, i) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={val.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-2.5 gradient-brand rounded-xl shrink-0 shadow-sm">
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h4
                        className="font-bold text-slate-800 mb-1"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {val.title}
                      </h4>
                      <p
                        className="text-sm text-slate-500 leading-relaxed"
                        style={{ fontFamily: "DM Sans, sans-serif" }}
                      >
                        {val.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: stats */}
          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="gradient-brand p-3 rounded-xl w-fit mb-4 shadow-sm">
                    <Icon size={22} className="text-white" />
                  </div>
                  <div
                    className="text-4xl font-extrabold gradient-brand-text mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-sm text-slate-500"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
