type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  return (
    <div className="flex w-full gap-2">
      <input
        type="text"
        placeholder="Search for products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
        className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-zinc-500"
      />

      <button
        type="button"
        onClick={onSearch}
        className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
      >
        Search
      </button>
    </div>
  );
}