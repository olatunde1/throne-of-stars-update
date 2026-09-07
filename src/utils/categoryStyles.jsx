import {
  Beef,
  Bird,
  CookingPot,
  Coffee,
  Cookie,
  Droplet,
  Fish,
  Flame,
  Carrot,
  Milk,
  Wheat,
} from "lucide-react";

// Visual identity per new category: icon + Tailwind color classes, used by
// ProductThumbnail to render a guaranteed-accurate placeholder card (icon +
// product name) instead of relying on unreliable stock-photo lookups.
export const CATEGORY_STYLES = {
  "Fish and Seafood": { icon: Fish, bg: "bg-sky-50", text: "text-sky-600", ring: "ring-sky-100" },
  Meat: { icon: Beef, bg: "bg-red-50", text: "text-red-600", ring: "ring-red-100" },
  Poultry: { icon: Bird, bg: "bg-orange-50", text: "text-orange-600", ring: "ring-orange-100" },
  "Cereal and Dairy": { icon: Milk, bg: "bg-yellow-50", text: "text-yellow-600", ring: "ring-yellow-100" },
  Grains: { icon: Wheat, bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-100" },
  "Flours and Poundo": { icon: CookingPot, bg: "bg-stone-50", text: "text-stone-600", ring: "ring-stone-100" },
  Drinks: { icon: Coffee, bg: "bg-purple-50", text: "text-brand-accent", ring: "ring-purple-100" },
  "Spices and seasonings": { icon: Flame, bg: "bg-orange-50", text: "text-orange-600", ring: "ring-orange-100" },
  "Vegetables and Tubers": { icon: Carrot, bg: "bg-green-50", text: "text-green-600", ring: "ring-green-100" },
  "Sweet and Snacks": { icon: Cookie, bg: "bg-pink-50", text: "text-pink-600", ring: "ring-pink-100" },
  "Skin and Haircare": { icon: Droplet, bg: "bg-teal-50", text: "text-teal-600", ring: "ring-teal-100" },
  "Oils and vinegar": { icon: Droplet, bg: "bg-lime-50", text: "text-lime-600", ring: "ring-lime-100" },
};

export const DEFAULT_CATEGORY_STYLE = {
  icon: Wheat,
  bg: "bg-gray-50",
  text: "text-gray-500",
  ring: "ring-gray-100",
};

export function getCategoryStyle(category) {
  return CATEGORY_STYLES[category] ?? DEFAULT_CATEGORY_STYLE;
}
