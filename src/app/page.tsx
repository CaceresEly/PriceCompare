"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { Filters } from "@/components/Filters";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { getBestOffer, sortProducts } from "@/lib/utils";
import { SortOption } from "@/types/product";

export default function Home() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("lowest-total");
  const [selectedStore, setSelectedStore] = useState("all");

  const stores = useMemo(() => {
    return [...new Set(products.map((product) => product.store))];
  }, []);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStore =
        selectedStore === "all" || product.store === selectedStore;

      return matchesSearch && matchesStore;
    });

    return sortProducts(filtered, sortBy);
  }, [search, sortBy, selectedStore]);

  const bestOffer = getBestOffer(filteredProducts);

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <Header />

        <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto]">
          <SearchBar value={search} onChange={setSearch} />
          <Filters
            sortBy={sortBy}
            setSortBy={setSortBy}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
            stores={stores}
          />
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center text-zinc-500">
            No products found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isBestOffer={bestOffer?.id === product.id}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}