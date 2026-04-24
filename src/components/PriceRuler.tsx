import { formatCurrency } from "@/lib/utils";

type PriceRulerProps = {
  currentPrice: number;
  averagePrice: number;
  historicalLow: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function PriceRuler({
  currentPrice,
  averagePrice,
  historicalLow,
}: PriceRulerProps) {
  const expensiveThreshold = averagePrice * 1.05;
  const greatDealThreshold = averagePrice * 0.9;

  const minPrice = Math.min(historicalLow, greatDealThreshold);
  const maxPrice = Math.max(expensiveThreshold, currentPrice);

  const position =
    ((currentPrice - minPrice) / (maxPrice - minPrice || 1)) * 100;

  const markerPosition = clamp(position, 0, 100);

  return (
    <div className="mt-6 rounded-xl bg-zinc-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-900">Price ruler</p>
          <p className="text-xs text-zinc-500">
            Shows where the current best offer sits among the current search results.
          </p>
        </div>

        <p className="text-sm font-semibold text-zinc-900">
          Current: {formatCurrency(currentPrice)}
        </p>
      </div>

      <div className="relative pt-6">
        <div className="h-3 overflow-hidden rounded-full bg-linear-to-r from-green-400 via-yellow-300 to-red-400" />

        <div
          className="absolute top-3 h-9 w-1 rounded-full bg-zinc-900"
          style={{ left: `${markerPosition}%` }}
        />

        <div
          className="absolute top-0 -translate-x-1/2 rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white"
          style={{ left: `${markerPosition}%` }}
        >
          Now
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 text-xs text-zinc-500">
        <span>Great deal</span>
        <span className="text-center">Fair price</span>
        <span className="text-right">Expensive</span>
      </div>

      <div className="mt-4 grid gap-2 text-xs text-zinc-500 md:grid-cols-3">
        <p>
          Historical low:{" "}
          <span className="font-medium text-zinc-700">
            {formatCurrency(historicalLow)}
          </span>
        </p>

        <p className="md:text-center">
          Average:{" "}
          <span className="font-medium text-zinc-700">
            {formatCurrency(averagePrice)}
          </span>
        </p>

        <p className="md:text-right">
          Expensive from:{" "}
          <span className="font-medium text-zinc-700">
            {formatCurrency(expensiveThreshold)}
          </span>
        </p>
      </div>
    </div>
  );
}