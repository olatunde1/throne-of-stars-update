import { memo } from "react";
import { motion } from "framer-motion";

function ProductCard({ item, onAdd }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition-shadow md:hover:shadow-lg"
    >
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <img
          src={item.image || "https://via.placeholder.com/300"}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
        <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 sm:text-base">{item.name}</h3>
        <p className="text-xs text-gray-500 sm:text-sm">{item.category}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-base font-bold text-brand-dark sm:text-lg">£{item.price}</span>
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => onAdd(item)}
            aria-label={`Add ${item.name} to cart`}
            className="min-h-11 rounded-lg bg-brand-dark px-4 text-sm font-semibold text-white transition md:hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            Add
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

export default memo(ProductCard);
