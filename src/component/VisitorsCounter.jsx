import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";

const NAMESPACE = "throne-of-stars-groceries";
const SITE_LAUNCH_DATE = new Date(2026, 6, 28); // 28 Jul 2026

function formatDate(date) {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

let hasCountedThisSession = false;

export default function VisitorsCounter() {
  const [today, setToday] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (hasCountedThisSession) return;
    hasCountedThisSession = true;

    let cancelled = false;

    fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/day-${todayKey()}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setToday(data.value);
      })
      .catch(() => {});

    fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/total`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setTotal(data.value);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-brand-dark py-10 text-white">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <div className="flex items-center justify-center gap-2 text-lg font-bold tracking-wide">
          <BarChart3 size={22} aria-hidden="true" />
          <span>VISITORS COUNTER</span>
        </div>

        <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-16">
          <div>
            <p className="text-sm text-white/80">Today</p>
            <div className="mt-2 inline-block rounded bg-black px-4 py-2">
              <span className="text-2xl font-bold text-brand-gold">
                {today === null ? "—" : today.toLocaleString()}
              </span>
            </div>
            <p className="mt-2 text-xs text-white/60">{formatDate(new Date())}</p>
          </div>

          <div>
            <p className="text-sm text-white/80">Total</p>
            <div className="mt-2 inline-block rounded bg-black px-4 py-2">
              <span className="text-2xl font-bold text-brand-gold">
                {total === null ? "—" : total.toLocaleString()}
              </span>
            </div>
            <p className="mt-2 text-xs text-white/60">Since {formatDate(SITE_LAUNCH_DATE)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
