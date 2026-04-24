import { NextResponse } from "next/server";
import { searchDummyJsonProducts } from "@/lib/providers/dummyJson";
import { prisma } from "@/lib/prisma";
import { normalizeProductKey } from "@/lib/normalizeProductKey";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q") ?? "";
  const limit = Number(searchParams.get("limit") ?? 10);

  if (!query.trim()) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const normalizedKey = normalizeProductKey(query);

    const trackedProduct = await prisma.trackedProduct.upsert({
      where: {
        normalizedKey,
      },
      update: {
        query,
      },
      create: {
        query,
        normalizedKey,
      },
    });

    const products = await searchDummyJsonProducts(query, limit);

    if (products.length > 0) {
      await prisma.priceSnapshot.createMany({
        data: products.map((product) => ({
          productId: trackedProduct.id,
          source: product.source,
          title: product.title,
          price: product.price,
          shipping: product.shipping,
          totalPrice: product.totalPrice,
          productUrl: product.productUrl,
          imageUrl: product.imageUrl,
          capturedAt: product.capturedAt,
        })),
      });
    }

    return NextResponse.json({
      query,
      total: products.length,
      trackedProductId: trackedProduct.id,
      products,
    });
  } catch (error) {
    console.error("Search API error:", error);

    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    );
  }
}