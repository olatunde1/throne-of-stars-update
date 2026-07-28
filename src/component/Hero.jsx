import { motion } from "framer-motion";

export default function Hero({ onShopClick }) {
  return (
    <section id="home" className="scroll-mt-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl"
          >
            Fresh Groceries, <span className="text-brand-accent">Delivered</span> with Royal Care
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-base text-gray-600 sm:text-lg"
          >
            Handpicked meats, fish, vegetables, and African essentials — sourced fresh and delivered to your door.
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
              className="min-h-11 w-full rounded-full bg-brand-dark px-6 text-sm font-semibold text-white shadow-sm transition md:hover:bg-brand xs:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
            >
              Shop Now
            </button>
            <a
              href="https://wa.me/447886280225"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 w-full items-center justify-center rounded-full border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-700 shadow-sm transition md:hover:border-gray-300 md:hover:bg-gray-50 xs:w-auto"
            >
              Chat with Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
