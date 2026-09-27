import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { restaurant } from "@/lib/restaurant";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [
    { title: "Privacy Policy | Ember & Crust" },
    { name: "description", content: "How the Ember & Crust website handles locally saved orders and newsletter information." },
    { property: "og:title", content: "Privacy Policy | Ember & Crust" },
    { property: "og:description", content: "How the Ember & Crust website handles locally saved orders and newsletter information." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Privacy,
});

function Privacy() {
  return <LegalPage eyebrow="THE FINE PRINT" title="PRIVACY POLICY"><p>This page describes the current demonstration website. The restaurant contact details shown here are illustrative and should be replaced with verified information before launch.</p><h2>Your order</h2><p>Your cart is saved in your browser’s local storage so your selections remain available when you return. It stays on your device and is not sent to a restaurant or payment service by this site. Clear your cart or your browser’s site data to remove it.</p><h2>Newsletter</h2><p>The newsletter form checks that an email address looks valid, but does not save or send the address. A mailing list is not connected.</p><h2>Contact</h2><p>Phone, directions and email links open your device’s calling, maps or mail applications. Those services may process information under their own policies. For questions, contact <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a> after this example address has been replaced with the restaurant’s real address.</p></LegalPage>;
}