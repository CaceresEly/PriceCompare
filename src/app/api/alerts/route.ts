import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizeProductKey } from "@/lib/normalizeProductKey";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      query,
      externalProductId,
      productTitle,
      targetPrice,
      phoneNumber,
    } = body;

    if (!query || !productTitle || !targetPrice || !phoneNumber) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const numericTargetPrice = Number(targetPrice);

    if (Number.isNaN(numericTargetPrice) || numericTargetPrice <= 0) {
      return NextResponse.json(
        { error: "Target price must be a valid number" },
        { status: 400 }
      );
    }

    const normalizedKey = normalizeProductKey(query);

    const alert = await prisma.priceAlert.create({
      data: {
        query,
        normalizedKey,
        externalProductId,
        productTitle,
        targetPrice: numericTargetPrice,
        phoneNumber,
      },
    });

    return NextResponse.json(
      {
        message: "Price alert created",
        alert,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create alert error:", error);

    return NextResponse.json(
      { error: "Failed to create price alert" },
      { status: 500 }
    );
  }
}