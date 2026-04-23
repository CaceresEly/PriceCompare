import { SortOption } from "@/types/product";

type FiltersProps = {
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
  selectedStore: string;
  setSelectedStore: (value: string) => void;
  stores: string[];
};

export function Filters({
  sortBy,
  setSortBy,
  selectedStore,
  setSelectedStore,
  stores,
}: FiltersProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortOption)}
        className="rounded-xl border border-zinc-300 bg-white px-4 py-3"
      >
        <option value="lowest-price">Lowest price</option>
        <option value="lowest-total">Lowest total price</option>
        <option value="best-rating">Best rating</option>
        <option value="fastest-delivery">Fastest delivery</option>
      </select>

      <select
        value={selectedStore}
        onChange={(e) => setSelectedStore(e.target.value)}
        className="rounded-xl border border-zinc-300 bg-white px-4 py-3"
      >
        <option value="all">All stores</option>
        {stores.map((store) => (
          <option key={store} value={store}>
            {store}
          </option>
        ))}
      </select>
    </div>
  );
}