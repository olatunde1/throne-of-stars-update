import { motion } from "framer-motion";
import { BadgePercent, Leaf, ShieldCheck, Truck } from "lucide-react";

const FEATURES = [
  { icon: Leaf, title: "Fresh Daily", desc: "Sourced and stocked fresh every day." },
  { icon: Truck, title: "Fast Delivery", desc: "Quick delivery across your area." },
  { icon: ShieldCheck, title: "Secure Checkout", desc: "Safe and reliable ordering." },
  { icon: BadgePercent, title: "Best Prices", desc: "Honest pricing, no surprises." },
];

export default function FeatureCards() {
  return (
    <section aria-label="Why shop with us" className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex flex-col items-start gap-2 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-brand-accent">
              <f.icon size={20} />
            </span>
            <h3 className="text-sm font-semibold text-gray-900 sm:text-base">{f.title}</h3>
            <p className="text-xs text-gray-500 sm:text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
