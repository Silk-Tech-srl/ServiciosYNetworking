/**
 * PartnersSection — Logos de marcas con scroll infinito
 */
import { motion } from "framer-motion";
import {
  IconNetwork,
  IconCloud,
  IconShieldLock,
  IconRouter,
  IconWifi,
  IconServer2,
} from "@tabler/icons-react";

const partners = [
  { name: "Cisco", icon: IconNetwork },
  { name: "Meraki", icon: IconCloud },
  { name: "Fortinet", icon: IconShieldLock },
  { name: "Aruba", icon: IconWifi },
  { name: "Juniper", icon: IconRouter },
  { name: "Ubiquiti", icon: IconServer2 },
  { name: "Palo Alto", icon: IconShieldLock },
  { name: "HPE", icon: IconServer2 },
];

export default function PartnersSection() {
  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <p
          className="text-center text-xs text-slate-400 uppercase tracking-widest mb-8"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Partners y marcas certificadas
        </p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 items-center">
          {partners.map((partner, i) => {
            const Icon = partner.icon;
            return (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-2 text-slate-300 hover:text-slate-500 transition-colors group"
              >
                <Icon
                  size={20}
                  className="group-hover:text-blue-500 transition-colors"
                />
                <span
                  className="text-base font-extrabold"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {partner.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
