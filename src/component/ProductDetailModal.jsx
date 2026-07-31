import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, X } from "lucide-react";
import { computeWeightVariants } from "../utils/weightVariants";

export default function ProductDetailModal({ item, open, onClose, onAdd }) {
  const variants = item ? computeWeightVariants(item) : null;
  const defaultVariant = variants?.find((v) => v.isDefault) ?? variants?.[0] ?? null;

  const [selectedKg, setSelectedKg] = useState(defaultVariant?.kg ?? null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setSelectedKg(defaultVariant?.kg ?? null);
    setQty(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.id, item?.name]);

  const inStock = item ? String(item.available ?? "TRUE").toUpperCase() !== "FALSE" : false;
  const selectedVariant = variants?.find((v) => v.kg === selectedKg) ?? null;
  const unitPrice = selectedVariant ? selectedVariant.price : Number(item?.price) || 0;
  const totalPrice = (unitPrice * qty).toFixed(2);

  function handleAdd() {
    if (!item || !inStock) return;
    onAdd(item, {
      qty,
      price: unitPrice,
      variantLabel: selectedVariant?.label ?? null,
    });
  }

  return (
    <AnimatePresence>
      {open && item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={item.name}
            className="fixed inset-x-4 top-1/2 z-50 mx-auto flex max-h-[90vh] w-auto max-w-3xl -translate-y-1/2 flex-col overflow-y-auto rounded-2xl bg-white shadow-2xl sm:inset-x-0"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close product details"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-2">
              <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={item.image || "https://via.placeholder.com/500"}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{item.name}</h2>
                  <div className="mt-1 flex items-center gap-2">
                    {item.category && <span className="text-sm text-gray-500">{item.category}</span>}
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                      }`}
                    >
                      {inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>

                {variants && (
                  <div>
                    <p className="mb-2 text-sm font-semibold text-gray-900">Select by weight:</p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {variants.map((v) => (
                        <button
                          key={v.kg}
                          type="button"
                          onClick={() => setSelectedKg(v.kg)}
                          className={`rounded-xl border px-3 py-2 text-center transition ${
                            selectedKg === v.kg
                              ? "border-brand-dark bg-brand-dark text-white"
                              : "border-gray-200 text-gray-900 hover:border-brand-accent"
                          }`}
                        >
                          <span className="block text-sm font-semibold">{v.label}</span>
                          <span
                            className={`block text-xs ${
                              selectedKg === v.kg ? "text-white/80" : "text-gray-500"
                            }`}
                          >
                            £{v.price.toFixed(2)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold text-gray-900">Product Details</p>
                  {item.description && <p className="mt-1 text-sm text-gray-600">{item.description}</p>}
                  {item.category && (
                    <p className="mt-1 text-sm text-gray-600">
                      <span className="font-medium text-gray-900">Category:</span> {item.category}
                    </p>
                  )}
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Total Price</p>
                    <p className="text-lg font-bold text-brand-dark">£{totalPrice}</p>
                  </div>
                </div>

                <motion.button
                  type="button"
                  whileTap={inStock ? { scale: 0.97 } : undefined}
                  onClick={handleAdd}
                  disabled={!inStock}
                  className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white transition ${
                    inStock ? "bg-brand-dark md:hover:bg-brand" : "cursor-not-allowed bg-gray-300"
                  }`}
                >
                  <ShoppingCart size={18} aria-hidden="true" />
                  {inStock ? "Add To Cart" : "Out of Stock"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
