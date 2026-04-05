import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { SlidersHorizontal, X } from "lucide-react";

const categories = ["all", "men", "women", "minimalist", "leather"];
const colors = ["All", "Black", "Brown", "Tan", "Pink", "Navy", "Burgundy"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $80", min: 0, max: 79 },
  { label: "$80 – $120", min: 80, max: 120 },
  { label: "Over $120", min: 121, max: Infinity },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [category, setCategory] = useState(initialCategory);
  const [color, setColor] = useState("All");
  const [priceRange, setPriceRange] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (color !== "All" && p.color !== color) return false;
      const range = priceRanges[priceRange];
      if (p.price < range.min || p.price > range.max) return false;
      return true;
    });
  }, [category, color, priceRange]);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    if (cat === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <main className="pt-20 md:pt-24 min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-2">Collection</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold">Shop All Wallets</h1>
        </motion.div>

        {/* Filter toggle mobile */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center gap-2 mb-6 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {showFilters ? <X size={16} /> : <SlidersHorizontal size={16} />}
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters */}
          <aside className={`lg:w-56 shrink-0 space-y-8 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div>
              <h3 className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`block w-full text-left font-body text-sm py-1 transition-colors capitalize ${
                      category === cat ? "text-gold font-semibold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat === "all" ? "All" : cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-3">Color</h3>
              <div className="space-y-2">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`block w-full text-left font-body text-sm py-1 transition-colors ${
                      color === c ? "text-gold font-semibold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-3">Price</h3>
              <div className="space-y-2">
                {priceRanges.map((range, i) => (
                  <button
                    key={range.label}
                    onClick={() => setPriceRange(i)}
                    className={`block w-full text-left font-body text-sm py-1 transition-colors ${
                      priceRange === i ? "text-gold font-semibold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            <p className="font-body text-sm text-muted-foreground mb-6">{filtered.length} products</p>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground font-body">No products match your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Shop;
