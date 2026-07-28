import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#products" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#footer" },
];

export default function MobileDrawer({ open, onClose, categories, activeCategory, onSelectCategory }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-xs flex-col bg-white shadow-2xl md:hidden"
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <span className="text-base font-bold text-brand-dark">Menu</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-col p-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex min-h-11 items-center rounded-lg px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-50"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="border-t border-gray-100 p-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat);
                      onClose();
                    }}
                    className={`min-h-11 rounded-full px-3 py-1.5 text-sm transition ${
                      activeCategory === cat
                        ? "bg-brand-dark text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/447886280225"
              target="_blank"
              rel="noopener noreferrer"
              className="m-4 mt-auto flex min-h-11 items-center justify-center rounded-lg bg-green-500 px-4 text-sm font-semibold text-white hover:bg-green-600"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
