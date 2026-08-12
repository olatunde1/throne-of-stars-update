import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import Logo from "../assets/throne-of-stars-icon.png";
import ProductThumbnail from "./ProductThumbnail";
import { getDefaultVariant, getDisplayPrice, isItemInStock } from "../utils/weightVariants";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#products" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#footer" },
];

// Mirrors the cart id GroceryStoreLandingPage.addToCart builds, so lookups
// here find the right line even once items carry a size variant.
function cartKey(item, variantLabel) {
  const base = item.id ?? item.name;
  return variantLabel ? `${base}::${variantLabel}` : String(base);
}

function qtyInCart(item, cart, variantLabel) {
  const key = cartKey(item, variantLabel);
  return cart.find((c) => String(c.id) === key)?.qty ?? 0;
}

export default function Header({
  query,
  onQueryChange,
  cartCount,
  onCartClick,
  isMenuOpen,
  onMenuToggle,
  searchResults = [],
  cart = [],
  onAddResult,
  onUpdateResultQty,
  onSelectResult,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const searchBoxRef = useRef(null);
  const inputRef = useRef(null);

  const showDropdown = isFocused && query.trim().length > 0;

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(item) {
    setIsFocused(false);
    inputRef.current?.blur();
    onSelectResult?.(item);
  }

  return (
    <header className="sticky top-0 z-40 bg-brand-dark shadow-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 md:flex-nowrap md:gap-6">
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold md:hidden"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <motion.a
          href="#home"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <img
            src={Logo}
            alt="Throne of Stars emblem"
            className="h-10 w-auto shrink-0 object-contain drop-shadow-[0_1px_6px_rgba(248,215,24,0.35)] sm:h-12"
          />
          <span className="text-lg font-bold leading-tight tracking-tight text-brand-gold sm:text-xl">
            Throne of Stars
          </span>
        </motion.a>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition hover:text-brand-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div
          ref={searchBoxRef}
          className="relative order-last w-full md:order-none md:w-auto md:flex-1 md:max-w-sm"
        >
          <label htmlFor="site-search" className="sr-only">
            Search groceries
          </label>
          <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 shadow-sm ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-brand-gold">
            <Search size={18} className="shrink-0 text-gray-500" />
            <input
              ref={inputRef}
              id="site-search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsFocused(false);
              }}
              placeholder="Search groceries..."
              type="search"
              autoComplete="off"
              role="combobox"
              aria-expanded={showDropdown}
              aria-controls="search-results-listbox"
              className="search-input w-full min-w-0 bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  onQueryChange("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-200 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                id="search-results-listbox"
                role="listbox"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-x-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl bg-white p-2 shadow-2xl ring-1 ring-gray-100"
              >
                {searchResults.length === 0 ? (
                  <p className="px-3 py-4 text-center text-sm text-gray-500">
                    No products match &ldquo;{query}&rdquo;.
                  </p>
                ) : (
                  searchResults.map((item) => {
                    const defaultVariant = getDefaultVariant(item);
                    const addOptions = defaultVariant
                      ? { price: defaultVariant.price, variantLabel: defaultVariant.label }
                      : undefined;
                    const key = cartKey(item, defaultVariant?.label ?? null);
                    const qty = qtyInCart(item, cart, defaultVariant?.label ?? null);
                    const inStock = isItemInStock(item);
                    const { price, fromMultiple } = getDisplayPrice(item);

                    return (
                      <div
                        key={key}
                        role="option"
                        aria-selected="false"
                        tabIndex={0}
                        onClick={() => handleSelect(item)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSelect(item);
                        }}
                        className="flex cursor-pointer items-center gap-3 rounded-lg p-2 text-left transition hover:bg-gray-50"
                      >
                        <ProductThumbnail
                          item={item}
                          className="h-12 w-12 shrink-0 rounded-lg"
                          iconClassName="h-1/3 w-1/3"
                          nameClassName="hidden"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">{item.name}</p>
                          <div className="mt-0.5 flex items-center gap-2">
                            <span className="text-xs font-semibold text-brand-dark">
                              {fromMultiple && <span className="mr-0.5 font-normal text-gray-400">From</span>}
                              £{price.toFixed(2)}
                            </span>
                            <span
                              className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                                inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                              }`}
                            >
                              {inStock ? "In Stock" : "Out of Stock"}
                            </span>
                          </div>
                        </div>

                        {!inStock ? null : qty > 0 ? (
                          <div
                            className="flex shrink-0 items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              onClick={() => onUpdateResultQty?.(key, qty - 1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                            >
                              −
                            </button>
                            <span className="w-5 text-center text-sm font-medium">{qty}</span>
                            <button
                              type="button"
                              onClick={() => onAddResult?.(item, addOptions)}
                              aria-label={`Increase quantity of ${item.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddResult?.(item, addOptions);
                            }}
                            aria-label={`Add ${item.name} to cart`}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-dark text-white transition hover:bg-brand"
                          >
                            <ShoppingCart size={16} aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={onCartClick}
          aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
          className="relative flex h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-accent px-4 text-white transition hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          <ShoppingCart size={20} />
          <span className="text-sm font-semibold">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}
