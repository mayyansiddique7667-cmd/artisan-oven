import { useEffect, useRef, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { money } from "@/lib/restaurant";

export type CartItem = { key: string; name: string; price: number; image: string; quantity: number; details?: string };

export function CartDrawer({ open, onClose, items, update, clear }: { open: boolean; onClose: () => void; items: CartItem[]; update: (key: string, delta: number) => void; clear: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [checkoutMessage, setCheckoutMessage] = useState(false);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = prior; document.removeEventListener("keydown", handleKey); };
  }, [open, onClose]);
  useEffect(() => { if (open) setCheckoutMessage(false); }, [open]);
  return <div className={`cart-layer ${open ? "is-open" : ""}`} aria-hidden={!open}>
    <div className="cart-scrim" onClick={onClose} />
    <aside className="cart-panel" role="dialog" aria-modal="true" aria-label="Your order" inert={!open}>
      <div className="cart-head"><div><span className="eyebrow">FRESH FROM THE OVEN</span><h2>Your order <span>({items.reduce((sum, i) => sum + i.quantity, 0)})</span></h2></div><Button ref={closeRef} size="icon" variant="quiet" onClick={onClose} aria-label="Close cart"><X /></Button></div>
      {items.length ? <><div className="cart-items">{items.map(item => <article className="cart-item" key={item.key}><img src={item.image} alt="" width="88" height="88"/><div className="cart-item-copy"><h3>{item.name}</h3>{item.details && <p>{item.details}</p>}<strong>{money(item.price * item.quantity)}</strong><div className="quantity"><Button variant="quiet" size="icon" onClick={() => update(item.key, -1)} aria-label={`Decrease ${item.name} quantity`}><Minus /></Button><span>{item.quantity}</span><Button variant="quiet" size="icon" onClick={() => update(item.key, 1)} aria-label={`Increase ${item.name} quantity`}><Plus /></Button></div></div><Button className="remove-item" variant="quiet" size="icon" onClick={() => update(item.key, -item.quantity)} aria-label={`Remove ${item.name}`}><Trash2 /></Button></article>)}</div><div className="cart-bottom"><Button variant="text" onClick={clear} className="clear-cart">Clear order</Button><div className="total-line"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Delivery fees, if applicable, are calculated when ordering is available.</p><Button variant="fire" size="wide" onClick={() => setCheckoutMessage(true)}>CONTINUE TO CHECKOUT <span>↗</span></Button>{checkoutMessage && <p role="status" className="checkout-notice">Online checkout is not connected yet. Please call us to place this order: <a href="tel:+923001234567">+92 300 1234567</a>.</p>}</div></> : <div className="cart-empty"><ShoppingBag size={42} strokeWidth={1.2}/><h3>Nothing in the oven yet.</h3><p>Find your new favorite on our menu.</p><Button variant="fire" onClick={() => { onClose(); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); }}>EXPLORE THE MENU</Button></div>}
    </aside>
  </div>;
}