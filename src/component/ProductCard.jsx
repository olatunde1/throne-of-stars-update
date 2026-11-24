import { memo } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import ProductThumbnail from "./ProductThumbnail";
import {
  computeWeightVariants,
  getDisplayPrice,
  isItemInStock,
} from "../utils/weightVariants";

function ProductCard({ item, onAdd, onView, badge }) {
  const { price, fromMultiple } = getDisplayPrice(item);
  const variants = computeWeightVariants(item);
  const singleVariant = variants?.length === 1 ? variants[0] : null;
  const outOfStock = !isItemInStock(item);

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
      className={`flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 ease-out md:hover:-translate-y-1 md:hover:shadow-xl ${
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
        <div
          className={`mt-auto pt-3 ${
            singleVariant
              ? "flex items-center justify-between gap-2"
              : "flex flex-col gap-2"
          }`}
        >
          {outOfStock ? (
            <span className="text-xs font-semibold text-red-500">Out of Stock</span>
          ) : (
            <span className="text-base font-bold text-brand-dark sm:text-lg">
              {fromMultiple && <span className="mr-1 text-xs font-medium text-gray-400">From</span>}
              £{price.toFixed(2)}
            </span>
          )}
          {singleVariant ? (
            <motion.button
              type="button"
              whileHover={singleVariant.available ? { scale: 1.08 } : undefined}
              whileTap={singleVariant.available ? { scale: 0.94 } : undefined}
              disabled={!singleVariant.available}
              onClick={(e) => {
                e.stopPropagation();
                onAdd?.(item, {
                  price: singleVariant.price,
                  variantLabel: singleVariant.label,
                  stockQuantity: singleVariant.stockQuantity,
                });
              }}
              aria-label={`Add ${item.name} (${singleVariant.label}) to cart`}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
                singleVariant.available
                  ? "bg-brand-dark hover:bg-brand hover:shadow-md"
                  : "cursor-not-allowed bg-gray-300"
              }`}
            >
              <ShoppingCart size={18} aria-hidden="true" />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.stopPropagation();
                onView?.(item);
              }}
              aria-label={`Select options for ${item.name}`}
              className="flex min-h-11 w-full items-center justify-center rounded-lg bg-brand-dark px-3 text-sm font-semibold text-white transition-colors duration-200 ease-out hover:bg-brand hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              Select Options
            </motion.button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default memo(ProductCard);
