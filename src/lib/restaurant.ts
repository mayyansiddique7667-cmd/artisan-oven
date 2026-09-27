import pepperoni from "@/assets/pepperoni.webp";
import garden from "@/assets/garden.webp";
import smokehouse from "@/assets/smokehouse.webp";
import bbqChicken from "@/assets/bbq-chicken.webp";
import garlicBread from "@/assets/garlic-bread.webp";
import salad from "@/assets/salad.webp";
import tiramisu from "@/assets/tiramisu.webp";

export const restaurant = {
  name: "EMBER & CRUST",
  tagline: "Handcrafted pizza. Fired with passion.",
  address: ["123 Artisan Avenue", "Lahore, Pakistan"],
  phone: "+92 300 1234567",
  phoneHref: "+923001234567",
  email: "hello@emberandcrust.example",
  hours: [
    { days: "Mon–Thu", time: "11:00 AM – 10:30 PM" },
    { days: "Fri–Sat", time: "11:00 AM – 11:30 PM" },
    { days: "Sunday", time: "12:00 PM – 10:00 PM" },
  ],
  directions: "https://www.google.com/maps/search/?api=1&query=123+Artisan+Avenue+Lahore+Pakistan",
  // Set these to real profile URLs before publishing. Empty values hide the links.
  socials: { instagram: "", facebook: "", tiktok: "" },
} as const;

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Pizza" | "Sides" | "Salads" | "Desserts";
  popular?: boolean;
};

export const products: Product[] = [
  { id: "pepperoni", name: "Ember Pepperoni", description: "Slow-cooked tomato, mozzarella, crisp pepperoni & oregano.", price: 14.9, image: pepperoni, category: "Pizza", popular: true },
  { id: "garden", name: "Garden Fire", description: "Roasted vegetables, mozzarella, basil & garden herbs.", price: 15.9, image: garden, category: "Pizza", popular: true },
  { id: "smokehouse", name: "The Smokehouse", description: "Spiced beef, caramelized onion & smoked peppers.", price: 17.5, image: smokehouse, category: "Pizza", popular: true },
  { id: "bbq", name: "BBQ Chicken", description: "Grilled chicken, smoky BBQ sauce & sweet red onion.", price: 16.9, image: bbqChicken, category: "Pizza", popular: true },
  { id: "bread", name: "Fire-Roasted Garlic Bread", description: "Warm, buttery sourdough with garlic, herbs & parmesan.", price: 7.5, image: garlicBread, category: "Sides" },
  { id: "salad", name: "Market Greens", description: "Crisp leaves, cherry tomato, shaved parmesan & house vinaigrette.", price: 9.5, image: salad, category: "Salads" },
  { id: "tiramisu", name: "House Tiramisu", description: "Espresso-soaked layers, mascarpone & a dusting of cocoa.", price: 8.5, image: tiramisu, category: "Desserts" },
];

export const pizzaOptions = {
  sizes: [{ label: "Small", price: 11.9 }, { label: "Medium", price: 14.9 }, { label: "Large", price: 18.9 }],
  bases: [{ label: "Classic Tomato", price: 0 }, { label: "Spicy Tomato", price: 1 }, { label: "Garlic Cream", price: 1.5 }],
  toppings: [{ label: "Pepperoni", price: 2 }, { label: "Mushrooms", price: 1.5 }, { label: "Olives", price: 1 }, { label: "Jalapeños", price: 1 }, { label: "Chicken", price: 2.5 }, { label: "Beef", price: 2.5 }, { label: "Roasted Peppers", price: 1.5 }, { label: "Extra Cheese", price: 2 }, { label: "Basil", price: 1 }],
  crusts: [{ label: "Classic", price: 0 }, { label: "Thin & Crispy", price: 0 }, { label: "Stuffed", price: 3 }],
};

export const money = (value: number) => `$${value.toFixed(2)}`;