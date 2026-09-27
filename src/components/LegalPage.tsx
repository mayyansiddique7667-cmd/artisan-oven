import { Brand } from "@/components/Brand";
import { restaurant } from "@/lib/restaurant";

export function LegalPage({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return <div className="legal-page"><header className="legal-header"><div className="container legal-header-inner"><Brand/><a href="/">← BACK TO HOME</a></div></header><main className="container legal-main"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><div className="legal-copy">{children}</div></main><footer className="legal-footer"><div className="container"><span>© {new Date().getFullYear()} {restaurant.name}</span><a href="/">RETURN TO HOME ↑</a></div></footer></div>;
}