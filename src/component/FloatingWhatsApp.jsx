import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function FloatingWhatsApp() {
  const [showBubble, setShowBubble] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const bubbleTimer = setTimeout(() => setShowBubble(true), 3000);
    const buttonTimer = setTimeout(() => {
      setShowBubble(false);
      setShowButton(true);
    }, 7000);

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setShowBubble(false);
        setShowButton(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(bubbleTimer);
      clearTimeout(buttonTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {showBubble && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 right-4 z-30 hidden max-w-[220px] items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm shadow-md sm:right-6 sm:flex"
        >
          <span className="font-medium text-gray-800">Need help? Chat with us</span>
        </motion.div>
      )}

      {showButton && (
        <motion.a
          href="https://wa.me/447886280225?text=Hello%20Throne%20of%20Stars%20Admin!%20I%27m%20interested%20in%20your%20products."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-5 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform md:hover:scale-110 sm:right-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.87 7.87 0 008.003 0a7.996 7.996 0 00-6.99 11.93L0 16l4.153-1.09A7.965 7.965 0 008 16a7.995 7.995 0 005.658-13.674h-.057zM8.003 14.52a6.46 6.46 0 01-3.292-.896l-.235-.139-2.463.647.657-2.4-.152-.246A6.479 6.479 0 118.003 14.52z" />
            <path d="M11.745 9.485c-.2-.1-1.177-.58-1.36-.646-.182-.067-.316-.1-.45.1-.133.2-.515.646-.63.78-.117.133-.233.15-.433.05-.2-.1-.846-.312-1.61-.995a6.037 6.037 0 01-1.12-1.393c-.117-.2-.012-.3.088-.4.09-.09.2-.233.3-.35.1-.117.133-.2.2-.333.066-.133.033-.25-.017-.35-.05-.1-.45-1.08-.617-1.48-.163-.392-.33-.337-.45-.343h-.383c-.133 0-.35.05-.533.25s-.7.683-.7 1.663.717 1.93.817 2.063c.1.133 1.413 2.16 3.423 3.03.479.206.852.329 1.143.42.48.152.917.13 1.262.08.385-.058 1.177-.48 1.343-.943.167-.463.167-.86.117-.943-.05-.083-.183-.133-.383-.233z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
