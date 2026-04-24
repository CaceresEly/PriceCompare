import { searchMercadoLivreProducts } from "../src/lib/providers/mercadoLivre";

async function main() {
  const query = "iphone 14 128gb";

  const results = await searchMercadoLivreProducts(query, 5);

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