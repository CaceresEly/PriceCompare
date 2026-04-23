export function Header() {
  return (
    <header className="mb-8 flex flex-col gap-3">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-5xl">
        PriceCompare
      </h1>
      <p className="max-w-2xl text-zinc-600">
        Compare prices, shipping, and ratings to find the best deal.
      </p>
    </header>
  );
}