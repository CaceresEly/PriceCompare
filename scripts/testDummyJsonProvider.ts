import { searchDummyJsonProducts } from "../src/lib/providers/dummyJson";

async function main() {
  const query = "phone";

  const results = await searchDummyJsonProducts(query, 5);

  console.log(`Results for: ${query}`);
  console.log(`Total returned: ${results.length}`);

  for (const result of results) {
    console.log({
      source: result.source,
      title: result.title,
      price: result.price,
      totalPrice: result.totalPrice,
      productUrl: result.productUrl,
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});