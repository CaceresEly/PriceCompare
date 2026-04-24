import { PriceStatus } from "@/lib/priceIntelligence";
import { formatCurrency } from "@/lib/utils";
import { PriceRuler } from "@/components/PriceRuler";

type PriceSummaryProps = {
  averagePrice: number;
  historicalLow: number;
  bestOffer: number;
  status: PriceStatus;
};

const statusLabel: Record<PriceStatus, string> = {
  "great-deal": "Great deal",
  "fair-price": "Fair price",
  expensive: "Expensive",
};

const statusClassName: Record<PriceStatus, string> = {
  "great-deal": "bg-green-100 text-green-700 border-green-200",
  "fair-price": "bg-yellow-100 text-yellow-700 border-yellow-200",
  expensive: "bg-red-100 text-red-700 border-red-200",
};

export function PriceSummary({
  averagePrice,
  historicalLow,
  bestOffer,
  status,
}: PriceSummaryProps) {
  return (
    <section className="mb-8 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">
            Price intelligence
          </h2>
          <p className="text-sm text-zinc-500">
            Summary based on the current search results.
          </p>
        </div>

        <span
          className={`w-fit rounded-full border px-3 py-1 text-sm font-medium ${statusClassName[status]}`}
        >
          {statusLabel[status]}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Best offer</p>
          <p className="mt-1 text-2xl font-bold text-zinc-900">
            {formatCurrency(bestOffer)}
          </p>
        </div>

        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Average price</p>
          <p className="mt-1 text-2xl font-bold text-zinc-900">
            {formatCurrency(averagePrice)}
          </p>
        </div>

        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Historical low</p>
          <p className="mt-1 text-2xl font-bold text-zinc-900">
            {formatCurrency(historicalLow)}
          </p>
        </div>
      </div>

      <PriceRuler
        currentPrice={bestOffer}
        averagePrice={averagePrice}
        historicalLow={historicalLow}
      />
    </section>
  );
}