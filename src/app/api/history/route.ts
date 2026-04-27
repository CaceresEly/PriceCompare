import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizeProductKey } from "@/lib/normalizeProductKey";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q") ?? "";

  if (!query.trim()) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const normalizedKey = normalizeProductKey(query);

    const product = await prisma.trackedProduct.findUnique({
      where: {
        normalizedKey,
      },
      include: {
        snapshots: {
          orderBy: {
            capturedAt: "asc",
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({
        query,
        total: 0,
        snapshots: [],
      });
    }

    return NextResponse.json({
      query,
      total: product.snapshots.length,
      snapshots: product.snapshots.map((snapshot) => ({
        id: snapshot.id,
        source: snapshot.source,
        title: snapshot.title,
        price: snapshot.price,
        shipping: snapshot.shipping,
        totalPrice: snapshot.totalPrice,
        capturedAt: snapshot.capturedAt,
      })),
    });
  } catch (error) {
    console.error("History API error:", error);

    return NextResponse.json(
      { error: "Failed to load price history" },
      { status: 500 }
    );
  }
}