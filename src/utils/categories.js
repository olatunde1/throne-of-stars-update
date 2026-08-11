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

// Maps each known product name (as returned by the sheet) to the new,
// more granular category taxonomy. The sheet's own "category" column still
// uses the old coarse categories (Meat, Fish, Rice, Leaves, Vegetables,
// Groceries), so product-level overrides are required to get the split
// right (e.g. splitting old "Meat" into Meat vs Poultry).
const NAME_TO_CATEGORY = {
  "Chicken Gizzard": "Poultry",
  "Goat Meat": "Meat",
  "Beef": "Meat",
  "Chicken Laps": "Poultry",
  "Turkey": "Poultry",
  "Chicken Breast": "Poultry",
  "Cow Leg": "Meat",
  "Assorted Meat": "Meat",
  "Chicken Wings": "Poultry",
  "Pork": "Meat",
  "Cow Tail": "Meat",
  "Tripe (Shaki)": "Meat",
  "Liver": "Meat",
  "Chicken Feet": "Poultry",
  "Ram Meat": "Meat",

  "Titus Fish": "Fish and Seafood",
  "Mackerel": "Fish and Seafood",
  "Croaker Fish": "Fish and Seafood",
  "Catfish": "Fish and Seafood",
  "Stockfish": "Fish and Seafood",
  "Dried Fish": "Fish and Seafood",
  "Smoked Fish": "Fish and Seafood",
  "Sardine": "Fish and Seafood",
  "Tilapia": "Fish and Seafood",
  "Prawns": "Fish and Seafood",
  "Crayfish": "Fish and Seafood",
  "Panla Fish": "Fish and Seafood",
  "Sardine Tin": "Fish and Seafood",

  "Ofada Rice": "Grains",
  "Basmati Rice": "Grains",
  "Long Grain Rice": "Grains",
  "Local Rice": "Grains",
  "Jasmine Rice": "Grains",
  "Unpolished Ofada Rice": "Grains",
  "Rice": "Grains",
  "Brown Rice": "Grains",
  "Indomie Chicken": "Grains",
  "Indomie Onion": "Grains",
  "Spaghetti": "Grains",
  "Macaroni": "Grains",
  "Beans": "Grains",

  "Ugu Leaves": "Vegetables and Tubers",
  "Bitter Leaf": "Vegetables and Tubers",
  "Waterleaf": "Vegetables and Tubers",
  "Scent Leaf": "Vegetables and Tubers",
  "Spinach": "Vegetables and Tubers",
  "Uziza Leaf": "Vegetables and Tubers",
  "Ewedu Leaf": "Vegetables and Tubers",
  "Efo Riro Leaves": "Vegetables and Tubers",
  "Okazi Leaf": "Vegetables and Tubers",
  "Utazi Leaf": "Vegetables and Tubers",
  "Tomatoes": "Vegetables and Tubers",
  "Onions": "Vegetables and Tubers",
  "Garden Egg": "Vegetables and Tubers",
  "Cabbage": "Vegetables and Tubers",
  "Carrot": "Vegetables and Tubers",
  "Green Beans": "Vegetables and Tubers",
  "Cucumber": "Vegetables and Tubers",
  "Okra": "Vegetables and Tubers",
  "Sweet Potato": "Vegetables and Tubers",
  "Irish Potato": "Vegetables and Tubers",
  "Plantain": "Vegetables and Tubers",

  "Tatashe Pepper": "Spices and seasonings",
  "Scotch Bonnet Pepper": "Spices and seasonings",
  "Green Pepper": "Spices and seasonings",
  "Ginger": "Spices and seasonings",
  "Vegetable Oil": "Spices and seasonings",
  "Palm Oil": "Spices and seasonings",
  "Groundnut Oil": "Spices and seasonings",
  "Salt": "Spices and seasonings",
  "Maggi Cubes": "Spices and seasonings",
  "Tomato Paste": "Spices and seasonings",

  "Golden Morn": "Cereal and Diary",
  "Peak Milk": "Cereal and Diary",
  "Milk Powder": "Cereal and Diary",
  "Cornflakes": "Cereal and Diary",
  "Cerelac": "Cereal and Diary",
  "Butter": "Cereal and Diary",
  "Margarine": "Cereal and Diary",
  "Cheese": "Cereal and Diary",

  "Semovita": "Flours and Poundo",
  "Garri": "Flours and Poundo",
  "Poundo Yam": "Flours and Poundo",
  "Flour": "Flours and Poundo",
  "Baking Powder": "Flours and Poundo",
  "Yeast": "Flours and Poundo",

  "Milo": "Drinks",
  "Tea Bags": "Drinks",
  "Coffee": "Drinks",
  "Bournvita": "Drinks",
  "Ovaltine": "Drinks",

  "Sugar": "Sweet and Snacks",
  "Honey": "Sweet and Snacks",
  "Custard Powder": "Sweet and Snacks",
  "Bread": "Sweet and Snacks",
  "Biscuits": "Sweet and Snacks",

  "Detergent": "Skin and Haircare",
  "Bar Soap": "Skin and Haircare",
  "Toilet Roll": "Skin and Haircare",
  "Toothpaste": "Skin and Haircare",
};

// Coarse fallback for any product the sheet adds later that isn't in the
// exact name map above, based on the sheet's own (old, coarser) category.
const OLD_CATEGORY_FALLBACK = {
  Meat: "Meat",
  Fish: "Fish and Seafood",
  Rice: "Grains",
  Leaves: "Vegetables and Tubers",
  Vegetables: "Vegetables and Tubers",
  Groceries: "Grains",
};

export function resolveCategory(item) {
  return (
    NAME_TO_CATEGORY[item?.name] ??
    OLD_CATEGORY_FALLBACK[item?.category] ??
    "Grains"
  );
}
