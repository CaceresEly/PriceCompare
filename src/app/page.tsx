"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { Filters } from "@/components/Filters";
import { ProductCard } from "@/components/ProductCard";
import { PriceSummary } from "@/components/PriceSummary";
import { SearchMetadata } from "@/components/SearchMetadata";
import { getBestOffer, sortProducts } from "@/lib/utils";
import { getPriceIntelligence } from "@/lib/priceIntelligence";
import { Product, SortOption } from "@/types/product";

type ApiProduct = {
  id: string;
  source: string;
  title: string;
  price: number;
  shipping: number;
  totalPrice: number;
  productUrl: string;
  imageUrl: string | null;
  capturedAt: string;
};

type SearchMetadataType = {
  source: "database" | "provider";
  isStale: boolean;
  lastUpdatedAt: string;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("lowest-total");
  const [selectedStore, setSelectedStore] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchMetadata, setSearchMetadata] =
    useState<SearchMetadataType | null>(null);

  async function handleSearch(value: string) {
    const query = value.trim();

    if (!query) {
      setProducts([]);
      setHasSearched(false);
      setSearchMetadata(null);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&limit=10`
      );

      if (!response.ok) {
        throw new Error("Failed to search products");
      }

      const data = await response.json();

      setSearchMetadata({
        source: data.source,
        isStale: data.isStale,
        lastUpdatedAt: data.lastUpdatedAt,
      });

      const mappedProducts: Product[] = data.products.map(
        (product: ApiProduct) => ({
          id: product.id,
          title: product.title,
          store: product.source,
          image: product.imageUrl ?? "",
          price: product.price,
          shipping: product.shipping,
          rating: 4.5,
          deliveryDays: 3,
          productUrl: product.productUrl,
          category: "external",
        })
      );

      setProducts(mappedProducts);
    } catch (error) {
      console.error(error);
      setProducts([]);
      setSearchMetadata(null);
    } finally {
      setIsLoading(false);
    }
  }

  const stores = useMemo(() => {
    return [...new Set(products.map((product) => product.store))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesStore =
        selectedStore === "all" || product.store === selectedStore;

      return matchesStore;
    });

    return sortProducts(filtered, sortBy);
  }, [products, sortBy, selectedStore]);

  const bestOffer = getBestOffer(filteredProducts);

  const priceIntelligence = getPriceIntelligence(
    filteredProducts.map((product) => ({
      id: product.id,
      source: product.store,
      title: product.title,
      price: product.price,
      shipping: product.shipping,
      totalPrice: product.price + product.shipping,
      productUrl: product.productUrl,
      imageUrl: product.image,
      capturedAt: new Date(),
    }))
  );

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <Header />

        <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto]">
          <SearchBar
            value={search}
            onChange={setSearch}
            onSearch={() => handleSearch(search)}
          />

          <Filters
            sortBy={sortBy}
            setSortBy={setSortBy}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
            stores={stores}
          />
        </div>

        {searchMetadata && <SearchMetadata {...searchMetadata} />}

        {!hasSearched && (
          <div className="mb-8 rounded-2xl border border-dashed border-zinc-300 bg-white p-5 text-sm text-zinc-500">
            Search for a product to view real offers and price intelligence.
          </div>
        )}

        {isLoading && (
          <div className="mb-8 rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-500">
            Searching products...
          </div>
        )}

        {!isLoading &&
          hasSearched &&
          priceIntelligence.currentBestOffer &&
          priceIntelligence.historicalLow && (
            <PriceSummary
              averagePrice={priceIntelligence.averagePrice}
              historicalLow={priceIntelligence.historicalLow.totalPrice}
              bestOffer={priceIntelligence.currentBestOffer.totalPrice}
              status={priceIntelligence.priceStatus}
            />
          )}

        {!isLoading && hasSearched && filteredProducts.length === 0 ? (
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