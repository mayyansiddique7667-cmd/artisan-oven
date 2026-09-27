import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [
    { title: "Terms & Conditions | Ember & Crust" },
    { name: "description", content: "Information about the Ember & Crust demonstration menu, cart, and ordering experience." },
    { property: "og:title", content: "Terms & Conditions | Ember & Crust" },
    { property: "og:description", content: "Information about the Ember & Crust demonstration menu, cart, and ordering experience." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Terms,
});

function Terms() {
  return <LegalPage eyebrow="THE FINE PRINT" title="TERMS & CONDITIONS"><p>This website presents an illustrative restaurant concept. Product prices, availability, opening hours and contact details are examples until the restaurant owner confirms and replaces them.</p><h2>Orders and payments</h2><p>The menu and pizza builder let you assemble an order in your browser. Adding items to the cart does not place an order, reserve food or make a payment. Online checkout is not connected. Any order must be confirmed directly with the restaurant once its contact details are verified.</p><h2>Pricing</h2><p>Displayed prices are examples in US dollars. Delivery charges and taxes, if applicable, are not included in the cart subtotal. Confirm all final pricing with the restaurant before ordering.</p><h2>Site content</h2><p>Photography, branding, and copy belong to this original concept. Please do not rely on illustrative location or opening-hour information for travel plans until verified business details are published.</p></LegalPage>;
}