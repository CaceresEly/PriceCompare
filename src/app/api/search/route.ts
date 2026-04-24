import { NextResponse } from "next/server";
import { searchDummyJsonProducts } from "@/lib/providers/dummyJson";

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
    const products = await searchDummyJsonProducts(query, limit);

    return NextResponse.json({
      query,
      total: products.length,
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