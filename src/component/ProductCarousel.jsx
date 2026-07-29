import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ title, subtitle, icon: Icon, iconClassName, badge, items, onAdd }) {
  if (!items || items.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      aria-label={title}
      className="mx-auto max-w-7xl px-4 py-6 sm:px-6"
    >
      <div className="mb-4 flex items-center gap-2.5">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}>
          <Icon size={18} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">{title}</h2>
          {subtitle && <p className="text-xs text-gray-500 sm:text-sm">{subtitle}</p>}
        </div>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {items.map((item) => (
          <div key={item.id ?? item.name} className="w-40 shrink-0 snap-start sm:w-52">
            <ProductCard item={item} onAdd={onAdd} badge={badge} />
          </div>
        ))}
      </div>
    </motion.section>
  );
}
