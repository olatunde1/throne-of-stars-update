const STANDARD_TIERS_KG = [1, 2, 5, 10];

function formatWeight(kg) {
  return kg >= 1 ? `${Number(kg.toFixed(2))}kg` : `${Math.round(kg * 1000)}g`;
}

// Derives weight-based pricing tiers from a product's listed price and its
// sheet "description" (e.g. "2kg box", "500g pack"). Returns null when the
// description has no parseable weight, so count-based items (e.g. "1 bunch",
// "1 basket") fall back to a single quantity selector instead.
export function computeWeightVariants(item) {
  const price = Number(item?.price) || 0;
  const desc = item?.description || "";
  const match = desc.match(/(\d+(?:\.\d+)?)\s*(kg|g)\b/i);
  if (!match || !price) return null;

  const rawNum = parseFloat(match[1]);
  const baseKg = match[2].toLowerCase() === "g" ? rawNum / 1000 : rawNum;
  if (!baseKg) return null;

  const pricePerKg = price / baseKg;
  const tierKgs = Array.from(new Set([...STANDARD_TIERS_KG, Number(baseKg.toFixed(2))])).sort(
    (a, b) => a - b
  );

  return tierKgs.map((kg) => ({
    kg,
    label: formatWeight(kg),
    price: Math.round(pricePerKg * kg * 100) / 100,
    isDefault: Math.abs(kg - baseKg) < 0.001,
  }));
}
