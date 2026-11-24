const SIZE_FIELDS = [1, 2, 3, 4, 5].map((n) => ({
  sizeKey: `size${n}`,
  priceKey: `price${n}`,
  availableKey: `available${n}`,
  stockKey: `stock${n}`,
}));

function isAvailable(value) {
  return !["FALSE", "NO", "0", "OUT OF STOCK"].includes(
    String(value ?? "TRUE").trim().toUpperCase()
  );
}

function firstValue(...values) {
  return values.find((value) => value != null && String(value).trim() !== "");
}

function parseStockQuantity(value) {
  if (value == null || String(value).trim() === "") return null;
  const quantity = Number(String(value).replace(/,/g, "").trim());
  return Number.isFinite(quantity) && quantity >= 0 ? Math.floor(quantity) : null;
}

function parsePrice(value) {
  if (value == null || String(value).trim() === "") return null;
  const price = Number(value);
  return Number.isFinite(price) ? price : null;
}

export function getItemStockQuantity(item) {
  return parseStockQuantity(firstValue(item?.stock, item?.stockQuantity, item?.quantity));
}

function variantStockQuantity(item, stockKey) {
  const index = stockKey.match(/\d+$/)?.[0];
  return parseStockQuantity(
    firstValue(item?.[stockKey], item?.[`quantity${index}`])
  );
}

function withStockAvailability(available, stockQuantity) {
  return isAvailable(available) && (stockQuantity == null || stockQuantity > 0);
}

function parseWeightLabel(value) {
  const match = String(value ?? "")
    .trim()
    .match(/^(\d+(?:[.,]\d+)?)\s*(kg|g)$/i);
  if (!match) return null;

  const amount = Number(match[1].replace(",", "."));
  const grams = amount * (match[2].toLowerCase() === "kg" ? 1000 : 1);
  if (!Number.isFinite(grams) || grams <= 0) return null;

  return { grams, label: `${Number(grams.toFixed(3))}g` };
}

function extractProductWeight(item) {
  const name = String(item?.name ?? item?.title ?? "").trim();
  const explicitWeight = firstValue(item?.weight, item?.weightLabel, item?.size);
  const parsed = parseWeightLabel(explicitWeight);
  const suffix = name.match(/\s*[-–—(]?\s*\d+(?:[.,]\d+)?\s*(?:kg|g)\s*\)?\s*$/i);
  const weight = parsed ?? (suffix ? parseWeightLabel(suffix[0].replace(/[()–—-]/g, "").trim()) : null);

  if (!weight) return null;
  const baseName = name.replace(/\s*[-–—(]?\s*\d+(?:[.,]\d+)?\s*(?:kg|g)\s*\)?\s*$/i, "").trim();
  return baseName ? { ...weight, baseName } : null;
}

// Reads explicit size, price, availability, and stock columns from the sheet.
export function computeWeightVariants(item) {
  if (Array.isArray(item?.weightVariants)) {
    return item.weightVariants
      .map((variant) => {
        const label = String(variant?.label ?? "").trim();
        const price = parsePrice(variant?.price);
        if (!label || price == null) return null;
        const stockQuantity = parseStockQuantity(variant.stockQuantity);
        return {
          label,
          price,
          available: withStockAvailability(variant.available, stockQuantity),
          stockQuantity,
          isDefault: Boolean(variant.isDefault),
        };
      })
      .filter(Boolean);
  }

  const variants = SIZE_FIELDS.map(({ sizeKey, priceKey, availableKey, stockKey }) => {
    const label = String(item?.[sizeKey] ?? "").trim();
    const price = parsePrice(item?.[priceKey]);
    if (!label || price == null) return null;
    const stockQuantity = variantStockQuantity(item, stockKey);
    return {
      label,
      price,
      available: withStockAvailability(item?.[availableKey], stockQuantity),
      stockQuantity,
    };
  }).filter(Boolean);

  if (variants.length === 0) return null;
  return variants.map((v, i) => ({ ...v, isDefault: i === 0 }));
}

export function groupWeightProducts(products) {
  const result = [];
  const groups = new Map();

  for (const product of products) {
    const parsedWeight = extractProductWeight(product);
    const price = parsePrice(product?.price);
    if (!parsedWeight || price == null) {
      result.push(product);
      continue;
    }

    const categoryKey = String(product.category ?? "").trim().toLowerCase();
    const nameKey = parsedWeight.baseName.replace(/\s+/g, " ").toLowerCase();
    const groupKey = `${categoryKey}::${nameKey}`;
    const stockQuantity = getItemStockQuantity(product);
    const variant = {
      label: parsedWeight.label,
      price,
      available: withStockAvailability(product.available, stockQuantity),
      stockQuantity,
      grams: parsedWeight.grams,
      isDefault: false,
    };
    const existing = groups.get(groupKey);

    if (existing) {
      const duplicateIndex = existing.weightVariants.findIndex((entry) => entry.label === variant.label);
      if (duplicateIndex >= 0) existing.weightVariants[duplicateIndex] = variant;
      else existing.weightVariants.push(variant);
      continue;
    }

    const grouped = {
      ...product,
      id: `weight:${groupKey}`,
      name: parsedWeight.baseName,
      price,
      available: variant.available,
      weightVariants: [variant],
    };
    groups.set(groupKey, grouped);
    result.push(grouped);
  }

  for (const product of groups.values()) {
    product.weightVariants.sort((a, b) => a.grams - b.grams);
    product.weightVariants.forEach((variant, index) => {
      variant.isDefault = index === 0;
    });
    product.available = product.weightVariants.some((variant) => variant.available);
  }

  return result;
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
  if (!variants) {
    const stockQuantity = getItemStockQuantity(item);
    return withStockAvailability(item?.available, stockQuantity);
  }
  return variants.some((v) => v.available);
}

export function matchesProductQuery(item, query) {
  const normalizedQuery = String(query ?? "").trim().toLowerCase();
  if (!normalizedQuery) return true;

  const name = String(item?.name ?? item?.title ?? "").toLowerCase();
  return (
    name.includes(normalizedQuery) ||
    (computeWeightVariants(item) ?? []).some((variant) =>
      variant.label.toLowerCase().includes(normalizedQuery)
    )
  );
}
