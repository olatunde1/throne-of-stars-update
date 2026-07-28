import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { q: "What areas do you deliver to?", a: "We currently deliver across the local metro area, with same-week delivery slots available at checkout." },
  { q: "What payment methods do you accept?", a: "We accept card payments and bank transfer. You can also arrange payment via WhatsApp for larger orders." },
  { q: "Can I change or cancel my order?", a: "Message us on WhatsApp as soon as possible and we'll update your order before it's packed." },
  { q: "Do you offer bulk or wholesale pricing?", a: "We do. Contact us on WhatsApp with your list and we'll send a custom quote." },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="scroll-mt-20 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Frequently asked questions</h2>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">Can&apos;t find your answer? Chat with us on WhatsApp.</p>
        </div>

        <div className="mt-8 divide-y divide-gray-100 rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex min-h-11 w-full items-center justify-between gap-3 px-4 py-4 text-left text-sm font-semibold text-gray-900 sm:text-base"
                >
                  {item.q}
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-sm text-gray-600">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
