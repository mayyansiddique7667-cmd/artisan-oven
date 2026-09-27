import { restaurant } from "@/lib/restaurant";

export function Brand({ compact = false }: { compact?: boolean }) {
  return <a href="#home" className={`brand ${compact ? "brand--compact" : ""}`} aria-label={`${restaurant.name} home`}>
    <svg className="brand-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 3C11.9 3 3 12.7 3 24s9.4 21 21 21 21-9.4 21-21S35.7 3 24 3Z" stroke="currentColor" strokeWidth="1.5"/><path d="M11 33 25 8l12 26c-7.7-2.6-17.2-2.7-26-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M18 24c2.5-2.3 5-3.8 6-7 1.3 3.1 4.3 4.3 3.2 8.8-.7 2.8-3.4 4.5-5.6 4.7 1.2-2.2.7-3.8-3.6-6.5Z" fill="currentColor"/></svg>
    <span className="brand-type"><strong>EMBER <em>&</em> CRUST</strong><small>PIZZERIA · EST. 2014</small></span>
  </a>;
}