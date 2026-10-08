import { useEffect, useState } from "react";
import { resolveCategory } from "../utils/categories";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch("https://sheet.best/api/sheets/d5320c77-0be8-4837-a0bc-75854d3e6762")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setProducts(
          data.map((item, index) => ({
            ...item,
            id: item.id ?? `${item.name}-${index}`,
            category: resolveCategory(item),
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        if (cancelled) return;
        setError(err);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
}
