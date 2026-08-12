const SIZE_FIELDS = [1, 2, 3, 4].map((n) => ({
  sizeKey: `size${n}`,
  priceKey: `price${n}`,
  availableKey: `available${n}`,
}));

function isAvailable(value) {
  return String(value ?? "TRUE").toUpperCase() !== "FALSE";
}

// Reads the sheet's explicit size/price/availability columns (size1/price1/
// available1 ... size4/price4/available4) so store owners set a real price
// and stock status per size directly, instead of the price being derived/
// guessed from a single base price and description string.
export function computeWeightVariants(item) {
  const variants = SIZE_FIELDS.map(({ sizeKey, priceKey, availableKey }) => {
    const label = String(item?.[sizeKey] ?? "").trim();
    const price = Number(item?.[priceKey]);
    if (!label || !price) return null;
    return { label, price, available: isAvailable(item?.[availableKey]) };
  }).filter(Boolean);

  if (variants.length === 0) return null;
  return variants.map((v, i) => ({ ...v, isDefault: i === 0 }));
}

// The size a quick "add to cart" (no size picker shown) should use — the
// default size if it's in stock, otherwise the first size that is.
export function getDefaultVariant(item) {
  const variants = computeWeightVariants(item);
  if (!variants) return null;
  return (
    variants.find((v) => v.isDefault && v.available) ??
    variants.find((v) => v.available) ??
    variants[0]
  );
}

// Default size's price, for the at-a-glance price shown on product cards —
// kept in sync with getDefaultVariant so the price shown is the price added.
export function getDisplayPrice(item) {
  const variant = getDefaultVariant(item);
  if (!variant) return { price: Number(item?.price) || 0, fromMultiple: false };

  const variants = computeWeightVariants(item);
  return { price: variant.price, fromMultiple: variants.length > 1 };
}

// In stock if any size is, for sized products; falls back to the sheet's
// whole-item "available" column for products with no size columns filled.
export function isItemInStock(item) {
  const variants = computeWeightVariants(item);
  if (!variants) return isAvailable(item?.available);
  return variants.some((v) => v.available);
}
