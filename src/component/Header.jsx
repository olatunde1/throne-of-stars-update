import { motion } from "framer-motion";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import Logo from "../assets/throne-of-stars-icon.png";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#products" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#footer" },
];

export default function Header({ query, onQueryChange, cartCount, onCartClick, isMenuOpen, onMenuToggle }) {
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

        <div className="order-last w-full md:order-none md:w-auto md:flex-1 md:max-w-sm">
          <label htmlFor="site-search" className="sr-only">
            Search groceries
          </label>
          <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 shadow-sm ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-brand-gold">
            <Search size={18} className="shrink-0 text-gray-500" />
            <input
              id="site-search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search groceries..."
              type="search"
              className="search-input w-full min-w-0 bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => onQueryChange("")}
                aria-label="Clear search"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-200 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              >
                <X size={14} />
              </button>
            )}
          </div>
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
