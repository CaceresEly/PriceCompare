import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import { getPriceIntelligence } from "../src/lib/priceIntelligence";

async function main() {
  const product = await prisma.trackedProduct.findFirst({
    include: {
      snapshots: true,
    },
  });

  if (!product) {
    console.log("No product found");
    return;
  }

  console.log("Product:", product.query);
  console.log("Snapshots:", product.snapshots.length);

  const intelligence = getPriceIntelligence(product.snapshots);

  console.log("\n--- PRICE INTELLIGENCE ---");
  console.log("Average price:", intelligence.averagePrice);
  console.log("Historical low:", intelligence.historicalLow?.totalPrice);
  console.log("Best offer:", intelligence.currentBestOffer?.totalPrice);
  console.log("Status:", intelligence.priceStatus);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });