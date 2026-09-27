import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Clock3, Flame, Heart, MapPin, Menu as MenuIcon, Phone, Plus, Search, ShoppingBag, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand } from "@/components/Brand";
import { CartDrawer, type CartItem } from "@/components/CartDrawer";
import { money, pizzaOptions, products, restaurant, type Product } from "@/lib/restaurant";
import hero from "@/assets/hero-pizza.webp";
import oven from "@/assets/oven.webp";
import chef from "@/assets/chef-dough.webp";
import interior from "@/assets/interior.webp";
import catering from "@/assets/catering.webp";
import delivery from "@/assets/delivery.webp";
import bread from "@/assets/garlic-bread.webp";
import salad from "@/assets/salad.webp";
import dessert from "@/assets/tiramisu.webp";

const nav = [{ title: "Home", href: "#home" }, { title: "Menu", href: "#menu" }, { title: "Locations", href: "#locations" }, { title: "Catering", href: "#catering" }, { title: "About", href: "#about" }];
const categories = ["All", "Pizza", "Sides", "Salads", "Desserts"];
const imageCategories = [
  { name: "SIDES", description: "The little things worth sharing.", image: bread, filter: "Sides" },
  { name: "FRESH SALADS", description: "Something bright for the table.", image: salad, filter: "Salads" },
  { name: "SWEET FINISHES", description: "One last delicious moment.", image: dessert, filter: "Desserts" },
];

function SectionHeading({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return <div className={`section-heading ${light ? "section-heading--light" : ""}`}><span className="eyebrow"><span className="heading-rule" />{eyebrow}<span className="heading-rule" /></span><h2>{title}</h2></div>;
}

function Header({ count, onCart }: { count: number; onCart: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 35);
    scroll(); window.addEventListener("scroll", scroll, { passive: true });
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }); }, { rootMargin: "-20% 0px -65% 0px" });
    ["home", "menu", "locations", "catering", "about"].forEach(id => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => { window.removeEventListener("scroll", scroll); observer.disconnect(); };
  }, []);
  return <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}><div className="container header-inner"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{nav.map(link => <a key={link.href} className={active === link.href.slice(1) ? "active" : ""} href={link.href}>{link.title}</a>)}</nav><div className="header-actions"><a className="header-order" href="#menu">ORDER ONLINE <ArrowUpRight size={15}/></a><Button variant="quiet" size="icon" className="cart-trigger" onClick={onCart} aria-label={`Open cart, ${count} items`}><ShoppingBag size={20}/>{count > 0 && <span className="cart-count">{count}</span>}</Button><Button variant="quiet" size="icon" className="mobile-toggle" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <MenuIcon />}</Button></div></div><nav className={`mobile-nav ${mobileOpen ? "is-open" : ""}`} aria-label="Mobile navigation" inert={!mobileOpen}>{nav.map(link => <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>{link.title}<ArrowUpRight size={18}/></a>)}<a href="#menu" onClick={() => setMobileOpen(false)} className="mobile-order">ORDER ONLINE <ArrowRight size={18}/></a></nav></header>;
}

function Hero() {
  return <section id="home" className="hero"><img className="hero-image" src={hero} alt="Wood-fired margherita pizza on a rustic peel" width="1920" height="1080" fetchPriority="high"/><div className="hero-shade"/><div className="container hero-content"><div className="hero-copy"><div className="hero-eyebrow"><Flame size={15} fill="currentColor"/> ARTISAN PIZZA <span>·</span> WOOD-FIRED DAILY</div><h1>HANDCRAFTED<br/><span>PIZZA.</span><br/>FIRED WITH<br/>PASSION.</h1><p>Slow-fermented dough, bold ingredients, and a blazing hot oven. Every slice has a story to tell.</p><div className="hero-buttons"><a className="cta cta--fire" href="#menu">VIEW MENU & ORDER <ArrowUpRight size={18}/></a><a className="cta cta--outline" href="#about">EXPLORE OUR STORY <ArrowRight size={18}/></a></div></div></div><div className="hero-bottom container"><span>01 / THE ART OF PIZZA</span><a href="#bestsellers">SCROLL TO EXPLORE <ArrowDown size={15}/></a><span>LAHORE, PAKISTAN</span></div></section>;
}

function ProductCard({ product, onAdd, featured = false }: { product: Product; onAdd: (product: Product) => void; featured?: boolean }) {
  return <article className={`product-card ${featured ? "product-card--featured" : ""}`}><div className="product-image"><img src={product.image} alt={`${product.name} from Ember & Crust`} width="768" height="768" loading="lazy"/>{featured && <span className="product-badge">HOUSE FAVORITE</span>}</div><div className="product-details"><div className="product-top"><h3>{product.name}</h3><strong>{money(product.price)}</strong></div><p>{product.description}</p><Button variant="fire" onClick={() => onAdd(product)} aria-label={`Add ${product.name} to cart`}>ADD TO CART <Plus size={17}/></Button></div></article>;
}

function Bestsellers({ onAdd, onBrowse }: { onAdd: (product: Product) => void; onBrowse: () => void }) {
  return <section id="bestsellers" className="bestsellers section-pad"><div className="container"><div className="section-top"><div><span className="eyebrow eyebrow--gold">THE CROWD FAVORITES</span><h2>OUR BESTSELLERS<span className="title-dot">.</span></h2></div><button className="browse-menu" onClick={onBrowse}>EXPLORE FULL MENU <ArrowUpRight size={18}/></button></div><div className="product-grid">{products.filter(item => item.popular).map((product, index) => <ProductCard product={product} onAdd={onAdd} featured={index === 0} key={product.id}/>)}</div></div></section>;
}

function Experience() {
  return <section className="experience section-pad"><div className="container"><SectionHeading eyebrow="OUR PROMISE" title="THE EMBER & CRUST EXPERIENCE"/><div className="experience-grid"><article><div className="experience-icon"><Heart size={32} strokeWidth={1.25}/></div><span className="experience-number">01 /</span><h3>QUALITY INGREDIENTS</h3><p>Fresh produce, premium cheese, carefully selected meats and sauces made in our own kitchen.</p></article><article><div className="experience-icon"><Clock3 size={32} strokeWidth={1.25}/></div><span className="experience-number">02 /</span><h3>SLOW-FERMENTED DOUGH</h3><p>Good things take time. Our dough develops its depth of flavor over a patient 48 hours.</p></article><article><div className="experience-icon"><Flame size={32} strokeWidth={1.25}/></div><span className="experience-number">03 /</span><h3>FIRE-BORN CRAFT</h3><p>A blazing hot oven gives every pizza that crisp edge and beautifully charred crust.</p></article></div></div></section>;
}

function OptionGroup({ number, title, options, value, onChange, multiple = false }: { number: string; title: string; options: { label: string; price: number }[]; value: string | string[]; onChange: (name: string) => void; multiple?: boolean }) {
  return <fieldset className="builder-group"><legend><span>{number}</span> {title}</legend><div className="option-list">{options.map(option => { const selected = Array.isArray(value) ? value.includes(option.label) : value === option.label; return <button key={option.label} type="button" role={multiple ? "checkbox" : "radio"} aria-checked={selected} className={`option ${selected ? "selected" : ""}`} onClick={() => onChange(option.label)}><span className="option-indicator">{selected && <Check size={13} strokeWidth={3}/>}</span><span>{option.label}</span>{option.price > 0 && <small>+{money(option.price)}</small>}</button>; })}</div></fieldset>;
}

function PizzaBuilder({ onAdd }: { onAdd: (item: CartItem) => void }) {
  const [size, setSize] = useState("Medium"); const [base, setBase] = useState("Classic Tomato"); const [crust, setCrust] = useState("Classic"); const [toppings, setToppings] = useState<string[]>([]);
  const price = (pizzaOptions.sizes.find(x => x.label === size)?.price ?? 0) + (pizzaOptions.bases.find(x => x.label === base)?.price ?? 0) + (pizzaOptions.crusts.find(x => x.label === crust)?.price ?? 0) + toppings.reduce((sum, t) => sum + (pizzaOptions.toppings.find(x => x.label === t)?.price ?? 0), 0);
  const details = `${size} · ${base} · ${crust}${toppings.length ? ` · ${toppings.join(", ")}` : ""}`;
  const add = () => { const key = `custom-${size}-${base}-${crust}-${[...toppings].sort().join("-")}`; onAdd({ key, name: "Your Custom Pizza", details, price, image: hero, quantity: 1 }); };
  return <section id="builder" className="builder section-pad"><div className="container"><SectionHeading eyebrow="MAKE IT YOURS" title="BUILD YOUR OWN PIZZA"/><p className="builder-intro">Your perfect pizza starts here. Every choice, entirely yours.</p><div className="builder-layout"><div className="builder-controls"><OptionGroup number="01" title="CHOOSE YOUR SIZE" options={pizzaOptions.sizes} value={size} onChange={setSize}/><OptionGroup number="02" title="PICK YOUR BASE" options={pizzaOptions.bases} value={base} onChange={setBase}/><OptionGroup number="03" title="MAKE IT YOURS" options={pizzaOptions.toppings} value={toppings} multiple onChange={name => setToppings(current => current.includes(name) ? current.filter(x => x !== name) : [...current, name])}/><OptionGroup number="04" title="FINISH WITH CRUST" options={pizzaOptions.crusts} value={crust} onChange={setCrust}/></div><div className="builder-preview"><div className="builder-preview-image"><img src={hero} alt="Wood-fired pizza ready to customize" width="900" height="700" loading="lazy"/></div><div className="builder-summary"><span className="eyebrow">MADE JUST FOR YOU</span><h3>YOUR PIZZA, YOUR WAY.</h3><p>{details}</p><div className="builder-total"><span>YOUR TOTAL</span><strong>{money(price)}</strong></div><Button variant="fire" size="wide" onClick={add}>ADD TO CART <ShoppingBag size={18}/></Button></div></div></div></div></section>;
}

function Delivery() {
  return <section className="delivery"><div className="delivery-photo"><img src={delivery} alt="Freshly baked pizza packed for delivery" width="768" height="768" loading="lazy"/></div><div className="delivery-copy"><div className="delivery-copy-inner"><span className="eyebrow eyebrow--gold">GOOD FOOD, NO WAITING</span><h2>HOT. FRESH.<br/><span>AT YOUR DOOR.</span></h2><p>From our oven to your table, we keep every order moving without compromising the craft.</p><div className="delivery-perks"><span><Truck size={22}/> 25–40 MIN AVERAGE DELIVERY</span><span><ShoppingBag size={22}/> PICKUP AVAILABLE</span></div><a className="cta cta--fire" href="#menu">ORDER FOR DELIVERY <ArrowUpRight size={18}/></a></div></div></section>;
}

function MenuSection({ onAdd, category, setCategory }: { onAdd: (product: Product) => void; category: string; setCategory: (category: string) => void }) {
  const [search, setSearch] = useState("");
  const filtered = products.filter(p => (category === "All" || p.category === category) && `${p.name} ${p.description}`.toLowerCase().includes(search.trim().toLowerCase()));
  return <section id="menu" className="menu-section section-pad"><div className="container"><div className="section-top"><div><span className="eyebrow">PICK YOUR FAVORITES</span><h2>EXPLORE THE MENU<span className="title-dot">.</span></h2></div><p>Good food is meant to be shared. Find something worth gathering around.</p></div><div className="menu-tools"><div className="filter-list" role="group" aria-label="Filter menu by category">{categories.map(item => <Button key={item} variant="quiet" className={`filter-button ${category === item ? "is-active" : ""}`} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</Button>)}</div><label className="menu-search"><Search size={18}/><span className="sr-only">Search menu</span><input value={search} onChange={e => setSearch(e.target.value)} type="search" placeholder="Search the menu..." /></label></div>{filtered.length ? <div className="product-grid menu-grid">{filtered.map(product => <ProductCard product={product} onAdd={onAdd} key={product.id}/>)}</div> : <div className="menu-empty">No dishes found. Try another search or category.</div>}</div></section>;
}

function CategorySection({ onCategory }: { onCategory: (category: string) => void }) {
  return <section className="categories-section section-pad"><div className="container"><SectionHeading eyebrow="BEYOND THE PIZZA" title="MORE FROM THE OVEN" light/><div className="category-grid">{imageCategories.map(item => <a href="#menu" className="category-card" onClick={() => onCategory(item.filter)} key={item.name}><img src={item.image} alt={item.name.toLowerCase() + " from our kitchen"} width="768" height="768" loading="lazy"/><div className="category-card-copy"><span>DISCOVER</span><h3>{item.name}</h3><p>{item.description}</p></div><ArrowUpRight className="category-arrow" size={25}/></a>)}</div></div></section>;
}

function Story() {
  return <section id="about" className="story section-pad"><div className="container story-grid"><div className="story-photos"><img className="story-main" src={chef} alt="Chef stretching pizza dough by hand" width="768" height="768" loading="lazy"/><img className="story-inset" src={oven} alt="Pizza baking in the wood-fired oven" width="768" height="768" loading="lazy"/><span className="story-stamp">MADE<br/>WITH<br/>FIRE <Flame size={18}/></span></div><div className="story-content"><span className="eyebrow">OUR STORY</span><h2>MADE BY HAND.<br/><span>DEFINED BY FIRE.</span></h2><div className="story-rule"/><p>We believe the best things happen around a table. At Ember & Crust, it begins with flour, water, time, and the kind of fire that makes you want to stay a little longer.</p><p>Our dough rests for 48 hours. Our ingredients are chosen with care. And every pizza is stretched by hand, fired hot, and made to be shared.</p><div className="story-stats"><div><strong>12+</strong><span>YEARS OF CRAFT</span></div><div><strong>48 HR</strong><span>DOUGH FERMENTATION</span></div><div><strong>450°C</strong><span>OVEN TEMPERATURE</span></div></div><a href="#locations" className="cta cta--dark">COME MEET US <ArrowUpRight size={18}/></a></div></div></section>;
}

function Location() {
  return <section id="locations" className="location"><div className="location-info"><div className="location-info-inner"><span className="eyebrow eyebrow--gold">FIND YOUR SEAT</span><h2>VISIT EMBER<br/><span>& CRUST.</span></h2><p className="location-lede">Pull up a chair. The oven's already on.</p><div className="location-detail"><MapPin size={22}/><div><h3>FIND US</h3><p>{restaurant.address[0]}<br/>{restaurant.address[1]}</p></div></div><div className="location-detail"><Clock3 size={22}/><div><h3>OPENING HOURS</h3>{restaurant.hours.map(h => <p className="hours-row" key={h.days}><span>{h.days}</span><span>{h.time}</span></p>)}</div></div><div className="location-detail"><Phone size={22}/><div><h3>GIVE US A CALL</h3><a href={`tel:${restaurant.phoneHref}`}>{restaurant.phone}</a></div></div><div className="location-buttons"><a className="cta cta--fire" href={restaurant.directions} target="_blank" rel="noopener noreferrer">GET DIRECTIONS <ArrowUpRight size={18}/></a><a className="cta cta--outline" href={`tel:${restaurant.phoneHref}`}>CALL US <Phone size={17}/></a></div></div></div><div className="location-image"><img src={interior} alt="Warmly lit Ember & Crust dining room with rustic tables" width="768" height="768" loading="lazy"/><div className="location-image-label"><MapPin size={18}/><span>YOUR TABLE IS WAITING</span></div></div></section>;
}

function Catering() {
  return <section id="catering" className="catering"><img src={catering} alt="Selection of wood-fired pizzas ready for a gathering" width="768" height="768" loading="lazy"/><div className="catering-shade"/><div className="container catering-content"><span className="eyebrow eyebrow--gold">GOOD FOOD BRINGS PEOPLE TOGETHER</span><h2>BRING THE FIRE<br/>TO YOUR NEXT EVENT.</h2><p>Office lunches, private celebrations, and everything in between. We bring handcrafted pizza and warm hospitality to the party.</p><div className="catering-actions"><a href={`mailto:${restaurant.email}?subject=Catering%20enquiry`} className="cta cta--fire">REQUEST A QUOTE <ArrowUpRight size={18}/></a><a href={`mailto:${restaurant.email}?subject=Catering%20information`} className="cta cta--outline">ASK ABOUT CATERING <ArrowRight size={18}/></a></div></div></section>;
}

function Newsletter() {
  const [email, setEmail] = useState(""); const [message, setMessage] = useState("");
  const subscribe = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setMessage("Please enter a valid email address."); return; } setMessage("Thanks for your interest! Subscriptions will open soon."); setEmail(""); };
  return <section className="newsletter"><div className="container newsletter-inner"><div><span className="eyebrow eyebrow--gold">A LITTLE SOMETHING EXTRA</span><h2>GET THE GOOD STUFF.</h2><p>New menu drops, seasonal specials, and good news from the oven.</p></div><form onSubmit={subscribe} noValidate><label className="sr-only" htmlFor="newsletter-email">Your email address</label><div className="newsletter-field"><input id="newsletter-email" type="email" autoComplete="email" placeholder="Your email address" value={email} onChange={e => { setEmail(e.target.value); setMessage(""); }} required/><Button type="submit" variant="fire">SUBSCRIBE <ArrowRight size={17}/></Button></div><p role="status" className="newsletter-message">{message || "No spam. Just the good stuff."}</p></form></div></section>;
}

function Footer() {
  const socialEntries = Object.entries(restaurant.socials).filter(([, value]) => value);
  return <footer className="footer"><div className="container"><div className="footer-grid"><div className="footer-brand"><Brand compact/><p>Good pizza. Good people. A little bit of fire. Handcrafted in Lahore, made to share.</p></div><div><h3>EXPLORE</h3>{nav.map(link => <a key={link.href} href={link.href}>{link.title}</a>)}<a href="#builder">Build your pizza</a></div><div><h3>COME ON IN</h3><p>{restaurant.address[0]}<br/>{restaurant.address[1]}</p><a href={`tel:${restaurant.phoneHref}`}>{restaurant.phone}</a><a href={`mailto:${restaurant.email}`}>{restaurant.email}</a></div><div><h3>HOURS & MORE</h3>{restaurant.hours.map(h => <p key={h.days}>{h.days}: {h.time}</p>)}{socialEntries.length > 0 && <div className="footer-socials">{socialEntries.map(([name, url]) => <a href={url} key={name} target="_blank" rel="noopener noreferrer">{name}</a>)}</div>}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} EMBER & CRUST. ALL RIGHTS RESERVED.</span><div className="footer-legal"><a href="/privacy">PRIVACY POLICY</a><a href="/terms">TERMS & CONDITIONS</a></div></div></div></footer>;
}

export function HomePage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [cartLoaded, setCartLoaded] = useState(false);
  useEffect(() => { try { const saved = localStorage.getItem("ember-crust-cart"); if (saved) { const parsed: unknown = JSON.parse(saved); if (Array.isArray(parsed)) setItems(parsed.filter(x => x && typeof x.key === "string" && typeof x.price === "number" && typeof x.quantity === "number")); } } catch { /* Ignore invalid saved carts. */ } setCartLoaded(true); }, []);
  useEffect(() => { if (cartLoaded) localStorage.setItem("ember-crust-cart", JSON.stringify(items)); }, [items, cartLoaded]);
  const addItem = useCallback((item: CartItem) => { setItems(current => { const exists = current.find(x => x.key === item.key); return exists ? current.map(x => x.key === item.key ? { ...x, quantity: x.quantity + 1 } : x) : [...current, item]; }); setCartOpen(true); }, []);
  const addProduct = useCallback((product: Product) => addItem({ key: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 }), [addItem]);
  const update = useCallback((key: string, delta: number) => setItems(current => current.map(x => x.key === key ? { ...x, quantity: x.quantity + delta } : x).filter(x => x.quantity > 0)), []);
  const count = useMemo(() => items.reduce((sum, x) => sum + x.quantity, 0), [items]);
  return <><Header count={count} onCart={() => setCartOpen(true)}/><main><Hero/><Bestsellers onAdd={addProduct} onBrowse={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}/><Experience/><PizzaBuilder onAdd={addItem}/><Delivery/><MenuSection onAdd={addProduct} category={category} setCategory={setCategory}/><CategorySection onCategory={setCategory}/><Story/><Location/><Catering/><Newsletter/></main><Footer/><CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={items} update={update} clear={() => setItems([])}/></>;
}
