import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Flame, Sparkles } from "lucide-react";
import useProducts from "./ProductApi";
import useLockBodyScroll from "../hooks/useLockBodyScroll";
import Header from "./Header";
import MobileDrawer from "./MobileDrawer";
import Hero from "./Hero";
import DeliveryMarquee from "./DeliveryMarquee";
import FeatureCards from "./FeatureCards";
import ProductCard from "./ProductCard";
import ProductCarousel from "./ProductCarousel";
import Pagination from "./Pagination";
import Testimonials from "./Testimonials";
import FAQAccordion from "./FAQAccordion";
import CTASection from "./CTASection";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import ProductDetailModal from "./ProductDetailModal";
import FloatingWhatsApp from "./FloatingWhatsApp";

const CATEGORIES = ["All", "Meat", "Fish", "Vegetables", "Groceries", "Rice", "Leaves"];
const PAGE_SIZE = 12;

export default function GroceryStoreLandingPage() {
  const { products, loading, error } = useProducts();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [addedMsg, setAddedMsg] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useLockBodyScroll(showCart || isMenuOpen || showDetail);

  const filtered = useMemo(() => {
    return products?.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery = query === "" || p.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, query, category]);

  useEffect(() => {
    setPage(1);
  }, [category, query]);

  const pageCount = Math.max(1, Math.ceil((filtered?.length ?? 0) / PAGE_SIZE));
  const pagedItems = useMemo(
    () => filtered?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  const hotSelling = useMemo(() => (products ?? []).slice(0, 10), [products]);
  const newProducts = useMemo(() => (products ?? []).slice(-10).reverse(), [products]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return (products ?? []).filter((p) => p.name.toLowerCase().includes(q)).slice(0, 6);
  }, [products, query]);

  function addToCart(product, options = {}) {
    const { qty = 1, price, variantLabel = null } = options;
    const key = `${product.id ?? product.name}${variantLabel ? `::${variantLabel}` : ""}`;

    setCart((prev) => {
      const existing = prev.find((c) => String(c.id) === String(key));
      if (existing) {
        return prev.map((c) => (String(c.id) === String(key) ? { ...c, qty: c.qty + qty } : c));
      }
      return [
        ...prev,
        {
          id: key,
          name: product.name ?? product.title ?? "Unnamed item",
          price: price != null ? Number(price) : Number(product.price) || 0,
          qty,
          image: product.image ?? null,
          category: product.category ?? null,
          variantLabel,
        },
      ];
    });

    setAddedMsg(product.name ?? product.title ?? "Item");
    setTimeout(() => setAddedMsg(null), 2000);
  }

  function openProductDetail(product) {
    setViewProduct(product);
    setShowDetail(true);
  }

  function handleAddFromDetail(product, options) {
    addToCart(product, options);
    setShowDetail(false);
  }

  function updateQty(id, qty) {
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, qty: Math.max(0, qty) } : c)).filter((c) => c.qty > 0)
    );
  }

  const cartQtyTotal = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, it) => s + it.price * it.qty, 0).toFixed(2);

  function scrollToProducts() {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectSearchResult(product) {
    setCategory("All");
    setQuery(product.name ?? product.title ?? "");
    scrollToProducts();
  }

  function goToPage(nextPage) {
    setPage(nextPage);
    scrollToProducts();
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <AnimatePresence>
        {addedMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-brand-accent px-5 py-2.5 text-sm font-medium text-white shadow-lg"
          >
            <CheckCircle2 size={18} /> <span>{addedMsg} added to cart</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Header
        query={query}
        onQueryChange={setQuery}
        cartCount={cartQtyTotal}
        onCartClick={() => setShowCart(true)}
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen((o) => !o)}
        searchResults={searchResults}
        cart={cart}
        onAddResult={addToCart}
        onUpdateResultQty={updateQty}
        onSelectResult={selectSearchResult}
      />

      <MobileDrawer
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        categories={CATEGORIES}
        activeCategory={category}
        onSelectCategory={setCategory}
      />

      <main>
        <Hero onShopClick={scrollToProducts} />
        <DeliveryMarquee />
        <FeatureCards />

        {!loading && !error && (
          <>
            <ProductCarousel
              title="Hot Selling Products"
              subtitle="Customer favourites, restocked often"
              icon={Flame}
              iconClassName="bg-orange-50 text-orange-500"
              badge="Hot"
              items={hotSelling}
              onAdd={addToCart}
              onView={openProductDetail}
            />
            <ProductCarousel
              title="All New Products"
              subtitle="Freshly added to the catalogue"
              icon={Sparkles}
              iconClassName="bg-purple-50 text-brand-accent"
              badge="New"
              items={newProducts}
              onAdd={addToCart}
              onView={openProductDetail}
            />
          </>
        )}

        <section id="products" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <aside className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-5 lg:sticky lg:top-24 lg:h-fit">
              <h2 className="mb-3 text-sm font-semibold text-gray-900">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`min-h-11 rounded-full px-3 text-sm font-medium transition ${
                      category === cat
                        ? "bg-brand-dark text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </aside>

            <div className="lg:col-span-3">
              <div className="mb-6 rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Shop Fresh Groceries</h2>
                <p className="mt-1 text-sm text-gray-500">Handpicked meats, fish, and African essentials.</p>
              </div>

              {loading ? (
                <ProductGridSkeleton />
              ) : error ? (
                <div className="rounded-xl bg-red-50 p-6 text-center text-sm text-red-600">
                  Something went wrong loading products. Please refresh the page.
                </div>
              ) : (
                <>
                  <motion.div layout className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
                    {pagedItems?.map((item) => (
                      <ProductCard
                        key={item.id ?? item.name}
                        item={item}
                        onAdd={addToCart}
                        onView={openProductDetail}
                      />
                    ))}
                  </motion.div>

                  {filtered?.length === 0 ? (
                    <div className="mt-8 rounded-xl bg-white p-6 text-center text-sm text-gray-500 shadow-sm ring-1 ring-gray-100">
                      No matching products found.
                    </div>
                  ) : (
                    <Pagination page={page} pageCount={pageCount} onPageChange={goToPage} />
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        <Testimonials />
        <FAQAccordion />
        <CTASection onShopClick={scrollToProducts} />
      </main>

      <Footer />

      <CartDrawer open={showCart} onClose={() => setShowCart(false)} cart={cart} onUpdateQty={updateQty} total={cartTotal} />

      <ProductDetailModal
        item={viewProduct}
        open={showDetail}
        onClose={() => setShowDetail(false)}
        onAdd={handleAddFromDetail}
      />

      <FloatingWhatsApp />
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
          <div className="aspect-square w-full bg-gray-200" />
          <div className="space-y-2 p-3 sm:p-4">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-200" />
            <div className="h-8 w-full rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
