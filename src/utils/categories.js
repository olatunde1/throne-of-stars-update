export const CATEGORIES = [
  "All",
  "Fish and Seafood",
  "Meat",
  "Poultry",
  "Cereal and Diary",
  "Grains",
  "Flours and Poundo",
  "Drinks",
  "Spices and seasonings",
  "Vegetables and Tubers",
  "Sweet and Snacks",
  "Skin and Haircare",
];

const KNOWN_CATEGORIES = CATEGORIES.filter((c) => c !== "All");

// Trusts the sheet's own "category" column (matched case-insensitively so
// minor typing differences still resolve), falling back to "Grains" for
// any row whose category doesn't match the known list.
export function resolveCategory(item) {
  const raw = String(item?.category ?? "").trim().toLowerCase();
  return KNOWN_CATEGORIES.find((c) => c.toLowerCase() === raw) ?? "Grains";
}
