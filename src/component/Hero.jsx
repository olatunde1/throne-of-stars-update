import { motion } from "framer-motion";
import HeroSlideshow from "./HeroSlideshow";

export default function Hero({ onShopClick }) {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[520px] items-center overflow-hidden scroll-mt-20 sm:min-h-[600px] md:min-h-[380px]"
    >
      <HeroSlideshow />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Fresh Groceries, <span className="text-brand-gold">Delivered</span> with Royal Care
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-base text-white/85 sm:text-lg"
          >
            Handpicked meats, fish, vegetables, and African essentials sourced fresh and delivered to your door.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 flex flex-col items-center justify-center gap-3 xs:flex-row"
          >
            <button
              type="button"
              onClick={onShopClick}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-gold px-6 text-sm font-semibold text-brand-dark shadow-sm transition md:hover:brightness-95 xs:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M7 6h14l-1.2 7.2a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.6L6.2 4.8H3V3h4.2c.3 0 .6.2.7.5L7 6Zm2 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm8 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              </svg>
              <span>Shop Now</span>
            </button>
            <a
              href="https://wa.me/447886280225"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 w-full items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition md:hover:border-white/60 md:hover:bg-white/20 xs:w-auto"
            >
              Chat with Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
