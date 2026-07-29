import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  { name: "Amara O.", quote: "The freshest fish I've found in the city, and delivery was quick.", rating: 5 },
  { name: "Kunle A.", quote: "Great prices and the produce always looks hand-picked.", rating: 5 },
  { name: "Ngozi E.", quote: "My weekly order takes two minutes now. Love the WhatsApp support.", rating: 4 },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20 bg-purple-50/40 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">What our customers say</h2>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">Real feedback from the Throne of Stars community.</p>
        </motion.div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex gap-0.5 text-brand-gold" aria-hidden="true">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="text-sm text-gray-700 sm:text-base">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-auto text-sm font-semibold text-gray-900">{t.name}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
