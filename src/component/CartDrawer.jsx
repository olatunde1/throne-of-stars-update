import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import ProductThumbnail from "./ProductThumbnail";

const WHATSAPP_NUMBER = "447886280225";

function lineName(c) {
  return c.variantLabel ? `${c.name} (${c.variantLabel})` : c.name;
}

function buildOrderMessage(cart, total) {
  const lines = cart.map(
    (c, i) => `${i + 1}. ${lineName(c)} — £${c.price} x ${c.qty} = £${(c.price * c.qty).toFixed(2)}`
  );
  return [
    "Hello Throne of Stars! I'd like to place an order:",
    "",
    ...lines,
    "",
    `Total: £${total}`,
  ].join("\n");
}

export default function CartDrawer({ open, onClose, cart, onUpdateQty, total }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const hasItems = cart.length > 0;
  const checkoutHref = hasItems
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage(cart, total))}`
    : undefined;

  return (
    <AnimatePresence>
      {open && (
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
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl sm:rounded-l-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <h2 className="text-lg font-semibold text-brand-dark">Your Cart</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close cart"
                className="flex h-11 w-11 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <p className="mt-20 text-center text-sm text-gray-500">Your cart is empty.</p>
              ) : (
                <div className="space-y-3">
                  {cart.map((c) => (
                    <div key={c.id} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                      <ProductThumbnail
                        item={c}
                        className="h-14 w-14 shrink-0 rounded-lg"
                        iconClassName="h-1/3 w-1/3"
                        nameClassName="hidden"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">{lineName(c)}</p>
                        <p className="text-xs text-gray-500">
                          £{c.price} × {c.qty}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(c.id, c.qty - 1)}
                          aria-label={`Decrease quantity of ${c.name}`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{c.qty}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(c.id, c.qty + 1)}
                          aria-label={`Increase quantity of ${c.name}`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="safe-bottom border-t border-gray-100 p-4">
              <div className="flex items-center justify-between text-base font-semibold text-brand-dark">
                <span>Total</span>
                <span>£{total}</span>
              </div>
              <motion.button
                type="button"
                whileTap={hasItems ? { scale: 0.97 } : undefined}
                onClick={() => {
                  if (!hasItems) return;
                  setShowConfirm(true);
                }}
                disabled={!hasItems}
                className={`mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white transition ${
                  hasItems
                    ? "bg-brand-dark md:hover:bg-brand"
                    : "pointer-events-none bg-gray-300"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M13.601 2.326A7.87 7.87 0 008.003 0a7.996 7.996 0 00-6.99 11.93L0 16l4.153-1.09A7.965 7.965 0 008 16a7.995 7.995 0 005.658-13.674h-.057zM8.003 14.52a6.46 6.46 0 01-3.292-.896l-.235-.139-2.463.647.657-2.4-.152-.246A6.479 6.479 0 118.003 14.52z" />
                  <path d="M11.745 9.485c-.2-.1-1.177-.58-1.36-.646-.182-.067-.316-.1-.45.1-.133.2-.515.646-.63.78-.117.133-.233.15-.433.05-.2-.1-.846-.312-1.61-.995a6.037 6.037 0 01-1.12-1.393c-.117-.2-.012-.3.088-.4.09-.09.2-.233.3-.35.1-.117.133-.2.2-.333.066-.133.033-.25-.017-.35-.05-.1-.45-1.08-.617-1.48-.163-.392-.33-.337-.45-.343h-.383c-.133 0-.35.05-.533.25s-.7.683-.7 1.663.717 1.93.817 2.063c.1.133 1.413 2.16 3.423 3.03.479.206.852.329 1.143.42.48.152.917.13 1.262.08.385-.058 1.177-.48 1.343-.943.167-.463.167-.86.117-.943-.05-.083-.183-.133-.383-.233z" />
                </svg>
                Proceed to Checkout
              </motion.button>
            </div>
          </motion.div>
        </>
      )}

      {showConfirm && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConfirm(false)}
            className="fixed inset-0 z-[60] bg-black/50"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Confirm your order"
            className="fixed inset-x-4 top-1/2 z-[70] mx-auto flex max-h-[80vh] w-auto max-w-md -translate-y-1/2 flex-col rounded-2xl bg-white shadow-2xl sm:inset-x-0"
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <h2 className="text-lg font-semibold text-brand-dark">Confirm Your Order</h2>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                aria-label="Cancel and close"
                className="flex h-11 w-11 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {cart.map((c) => (
                  <div key={c.id} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                    <ProductThumbnail
                      item={c}
                      className="h-14 w-14 shrink-0 rounded-lg"
                      iconClassName="h-1/3 w-1/3"
                      nameClassName="hidden"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">{lineName(c)}</p>
                      <p className="text-xs text-gray-500">
                        £{c.price} × {c.qty}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-brand-dark">
                      £{(c.price * c.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="safe-bottom border-t border-gray-100 p-4">
              <div className="flex items-center justify-between text-base font-semibold text-brand-dark">
                <span>Total</span>
                <span>£{total}</span>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="flex min-h-11 flex-1 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                >
                  Cancel
                </button>
                <motion.a
                  href={checkoutHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setShowConfirm(false);
                    onClose();
                  }}
                  className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-brand-dark text-sm font-semibold text-white transition md:hover:bg-brand"
                >
                  Confirm
                </motion.a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
