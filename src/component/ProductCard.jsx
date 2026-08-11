import { memo } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import ProductThumbnail from "./ProductThumbnail";

function ProductCard({ item, onAdd, onView, badge }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      onClick={() => onView?.(item)}
      role={onView ? "button" : undefined}
      tabIndex={onView ? 0 : undefined}
      onKeyDown={
        onView
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onView(item);
              }
            }
          : undefined
      }
      className={`flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition-shadow md:hover:shadow-lg ${
        onView ? "cursor-pointer" : ""
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        {badge && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-brand-dark/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            {badge}
          </span>
        )}
        <ProductThumbnail item={item} className="h-full w-full" />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
        <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 sm:text-base">{item.name}</h3>
        <p className="text-xs text-gray-500 sm:text-sm">{item.category}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-base font-bold text-brand-dark sm:text-lg">£{item.price}</span>
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={(e) => {
              e.stopPropagation();
              onAdd(item);
            }}
            aria-label={`Add ${item.name} to cart`}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-brand-dark px-3 text-white transition md:hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            <ShoppingCart size={18} aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

export default memo(ProductCard);
