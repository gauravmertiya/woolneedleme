import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState("");

  // 🔍 Filtering logic
  let filtered = products.filter((p) => {
    const matchCategory =
      activeCategory === "All" || p.category === activeCategory;

    const matchSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  // 🔽 Sorting logic
  if (sortBy === "low") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  }

  if (sortBy === "high") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container mx-auto px-4 py-10">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
          Our Collection
        </h1>
        <p className="text-muted-foreground">
          Every piece handmade with love ✨
        </p>
      </div>

      {/* 🔍 Search + Filter Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 rounded-lg border bg-background text-sm"
        />

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground hover:bg-accent/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-lg border bg-background text-sm"
        >
          <option value="default">Sort by</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-20">
          No products found.
        </p>
      )}
    </div>
  );
};

export default Shop;