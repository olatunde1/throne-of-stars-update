import { motion } from "framer-motion";

export default function CTASection({ onShopClick }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        className="flex flex-col items-center gap-4 rounded-2xl bg-brand-dark px-6 py-10 text-center sm:py-12 md:flex-row md:justify-between md:text-left"
      >
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">Ready to fill your basket?</h2>
          <p className="mt-1 text-sm text-white/70 sm:text-base">Fresh groceries are one tap away.</p>
        </div>
        <button
          type="button"
          onClick={onShopClick}
          className="min-h-11 w-full shrink-0 rounded-full bg-brand-gold px-6 text-sm font-semibold text-brand-dark transition md:hover:brightness-95 md:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Shop Now
        </button>
      </motion.div>
    </section>
  );
}
