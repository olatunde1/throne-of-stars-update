import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SLIDES = [
  { src: "https://loremflickr.com/1600/900/vegetables,fresh", alt: "Fresh vegetables" },
  { src: "https://loremflickr.com/1600/900/fruits,market", alt: "Fresh fruits" },
  { src: "https://loremflickr.com/1600/900/fish,market", alt: "Fresh fish" },
  { src: "https://loremflickr.com/1600/900/meat,butcher", alt: "Fresh meat" },
  { src: "https://loremflickr.com/1600/900/rice,grain", alt: "Rice and grains" },
  { src: "https://loremflickr.com/1600/900/spices,market", alt: "Spices" },
];

const SLIDE_DURATION = 5000;

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  const slide = SLIDES[index];

  return (
    <div className="absolute inset-0 overflow-hidden bg-brand-dark" aria-hidden="true">
      <AnimatePresence>
        {reduceMotion ? (
          <img
            key="static"
            src={SLIDES[0].src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <motion.img
            key={slide.src}
            src={slide.src}
            alt=""
            loading={index === 0 ? "eager" : "lazy"}
            initial={{ opacity: 0, x: "12%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "-12%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </AnimatePresence>

      {/* Tint the photography with the brand color, then flatten for guaranteed text contrast */}
      <div className="absolute inset-0 bg-brand-dark mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/80 via-brand-dark/60 to-brand-accent/50" />
    </div>
  );
}
