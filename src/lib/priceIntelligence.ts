type PriceSnapshot = {
  id: string;
  source: string;
  title: string;
  price: number;
  shipping: number;
  totalPrice: number;
  productUrl: string;
  imageUrl?: string | null;
  capturedAt: Date;
};

export type PriceStatus = "great-deal" | "fair-price" | "expensive";

export function calculateAveragePrice(snapshots: PriceSnapshot[]) {
  if (snapshots.length === 0) return 0;

  const total = snapshots.reduce(
    (sum, snapshot) => sum + snapshot.totalPrice,
    0
  );

  return total / snapshots.length;
}

export function findHistoricalLow(snapshots: PriceSnapshot[]) {
  if (snapshots.length === 0) return null;

  return snapshots.reduce((lowest, current) =>
    current.totalPrice < lowest.totalPrice ? current : lowest
  );
}

export function findCurrentBestOffer(snapshots: PriceSnapshot[]) {
  if (snapshots.length === 0) return null;

  return snapshots.reduce((best, current) =>
    current.totalPrice < best.totalPrice ? current : best
  );
}

export function getPriceStatus(
  currentPrice: number,
  averagePrice: number
): PriceStatus {
  if (averagePrice <= 0) return "fair-price";

  const ratio = currentPrice / averagePrice;

  if (ratio <= 0.9) return "great-deal";
  if (ratio <= 1.05) return "fair-price";

  return "expensive";
}

export function getPriceIntelligence(snapshots: PriceSnapshot[]) {
  const averagePrice = calculateAveragePrice(snapshots);
  const historicalLow = findHistoricalLow(snapshots);
  const currentBestOffer = findCurrentBestOffer(snapshots);

  return {
    averagePrice,
    historicalLow,
    currentBestOffer,
    priceStatus: currentBestOffer
      ? getPriceStatus(currentBestOffer.totalPrice, averagePrice)
      : "fair-price",
  };
}