import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import { normalizeProductKey } from "../src/lib/normalizeProductKey";

async function main() {
  const query = "iPhone 14 128GB";
  const normalizedKey = normalizeProductKey(query);

  const product = await prisma.trackedProduct.upsert({
    where: { normalizedKey },
    update: {},
    create: {
      query,
      normalizedKey,
    },
  });

  await prisma.priceSnapshot.createMany({
    data: [
      {
        productId: product.id,
        source: "Amazon",
        title: "iPhone 14 128GB",
        price: 3899.9,
        shipping: 19.9,
        totalPrice: 3919.8,
        productUrl: "https://example.com/amazon/iphone14",
        imageUrl:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
      },
      {
        productId: product.id,
        source: "Magazine Luiza",
        title: "iPhone 14 128GB",
        price: 3999.9,
        shipping: 0,
        totalPrice: 3999.9,
        productUrl: "https://example.com/magalu/iphone14",
        imageUrl:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
      },
      {
        productId: product.id,
        source: "Mercado Livre",
        title: "iPhone 14 128GB",
        price: 3849.9,
        shipping: 29.9,
        totalPrice: 3879.8,
        productUrl: "https://example.com/mercadolivre/iphone14",
        imageUrl:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
      },
    ],
  });

  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });