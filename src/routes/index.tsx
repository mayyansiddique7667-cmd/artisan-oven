import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/HomePage";
import { restaurant } from "@/lib/restaurant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ember & Crust | Artisan Wood-Fired Pizza" },
      { name: "description", content: "Handcrafted wood-fired pizza, fresh ingredients and bold flavors at Ember & Crust. Explore our menu, order online or visit us today." },
      { property: "og:title", content: "Ember & Crust | Artisan Wood-Fired Pizza" },
      { property: "og:description", content: "Handcrafted wood-fired pizza, fresh ingredients and bold flavors at Ember & Crust. Explore our menu, order online or visit us today." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Restaurant", name: restaurant.name, description: restaurant.tagline, telephone: restaurant.phone, address: { "@type": "PostalAddress", streetAddress: restaurant.address[0], addressLocality: "Lahore", addressCountry: "PK" }, openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "11:00", closes: "22:30" }, { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday"], opens: "11:00", closes: "23:30" }, { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "12:00", closes: "22:00" }] }) }],
  }),
  component: HomePage,
});
