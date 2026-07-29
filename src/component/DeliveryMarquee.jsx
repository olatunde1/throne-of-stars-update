import { Zap } from "lucide-react";
import LogoIcon from "../assets/throne-of-stars-icon.png";

function DeliveryBike({ className }) {
  return (
    <svg viewBox="0 0 240 140" className={className} aria-hidden="true">
      {/* speed lines */}
      <g stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.45">
        <line x1="0" y1="44" x2="26" y2="44" />
        <line x1="0" y1="60" x2="18" y2="60" />
        <line x1="0" y1="76" x2="30" y2="76" />
      </g>

      {/* ground shadow */}
      <ellipse cx="134" cy="128" rx="90" ry="7" fill="#1a0022" opacity="0.25" />

      {/* rear wheel */}
      <circle cx="70" cy="104" r="23" fill="#1a1a1a" />
      <circle cx="70" cy="104" r="23" fill="none" stroke="#f8d718" strokeWidth="2" />
      <circle cx="70" cy="104" r="8" fill="#f8d718" />

      {/* front wheel */}
      <circle cx="196" cy="104" r="23" fill="#1a1a1a" />
      <circle cx="196" cy="104" r="23" fill="none" stroke="#f8d718" strokeWidth="2" />
      <circle cx="196" cy="104" r="8" fill="#f8d718" />

      {/* low scooter deck connecting the two wheels */}
      <path d="M70,104 Q133,122 196,104" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />

      {/* delivery box on a rear rack */}
      <rect x="34" y="48" width="52" height="44" rx="8" fill="#ffffff" stroke="#330143" strokeWidth="3" />
      <image href={LogoIcon} x="41" y="57" width="38" height="26" preserveAspectRatio="xMidYMid meet" />
      <path d="M86,72 L108,84" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />

      {/* seat post */}
      <path d="M108,104 L108,76" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />

      {/* steering column + handlebar */}
      <path d="M160,108 L184,54" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
      <path d="M184,54 L204,47" stroke="#f8d718" strokeWidth="6" strokeLinecap="round" />

      {/* rider */}
      <path d="M108,76 Q126,42 148,49" fill="none" stroke="#330143" strokeWidth="13" strokeLinecap="round" />
      <circle cx="153" cy="38" r="13" fill="#330143" />
    </svg>
  );
}

const REPEAT_COUNT = 6;

export default function DeliveryMarquee() {
  const items = Array.from({ length: REPEAT_COUNT });

  return (
    <div className="overflow-hidden bg-brand-accent py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-12">
        {[...items, ...items].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center gap-3">
            <DeliveryBike className="aspect-[240/140] h-14 sm:h-16" />
            <span className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-white sm:text-base">
              <Zap size={16} className="fill-brand-gold text-brand-gold" />
              Fast Delivery
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
