import Logo from "../assets/throne-of-stars-icon.png";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#products" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Footer() {
  return (
    <footer id="footer" className="scroll-mt-20 border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-brand-dark px-3">
                <img src={Logo} alt="Throne of Stars emblem" className="h-8 w-auto object-contain" />
              </span>
              <span className="text-lg font-bold text-brand-dark">Throne of Stars</span>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Fresh meats, fish, vegetables, and African essentials, delivered with care.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-gray-500 hover:text-brand-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li>
                <a
                  href="https://wa.me/447886280225"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-accent"
                >
                  WhatsApp: +44 7886 280225
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Hours</h3>
            <ul className="mt-3 space-y-1 text-sm text-gray-500">
              <li>Mon &ndash; Sat: 9am &ndash; 7pm</li>
              <li>Sunday: 10am &ndash; 4pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-center text-xs text-gray-400 sm:text-sm">
          © {new Date().getFullYear()} Throne of Stars. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
