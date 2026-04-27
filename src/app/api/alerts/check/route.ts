import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/notifications/whatsapp";

const ALERT_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour

function canSendAlert(lastSentAt: Date | null) {
  if (!lastSentAt) return true;

  return Date.now() - new Date(lastSentAt).getTime() > ALERT_COOLDOWN_MS;
}

export async function POST() {
  try {
    const alerts = await prisma.priceAlert.findMany({
      where: {
        isActive: true,
      },
    });

    const results = [];

    for (const alert of alerts) {
      if (!canSendAlert(alert.lastSentAt)) {
        results.push({
          alertId: alert.id,
          status: "skipped",
          reason: "cooldown_active",
        });

        continue;
      }

      const latestSnapshot = await prisma.priceSnapshot.findFirst({
        where: {
          product: {
            normalizedKey: alert.normalizedKey,
          },
          ...(alert.externalProductId
            ? {
                externalProductId: alert.externalProductId,
              }
            : {}),
        },
        orderBy: {
          capturedAt: "desc",
        },
      });

      if (!latestSnapshot) {
        results.push({
          alertId: alert.id,
          status: "skipped",
          reason: "no_snapshot_found",
        });

        continue;
      }

      const currentPrice = latestSnapshot.totalPrice;

      if (currentPrice > alert.targetPrice) {
        results.push({
          alertId: alert.id,
          status: "skipped",
          reason: "price_above_target",
          currentPrice,
          targetPrice: alert.targetPrice,
        });

        continue;
      }

      await sendWhatsAppMessage({
        to: alert.phoneNumber,
        message: `PriceCompare alert: ${alert.productTitle} reached US$ ${currentPrice.toFixed(
          2
        )}. Your target price was US$ ${alert.targetPrice.toFixed(
          2
        )}. View deal: ${latestSnapshot.productUrl}`,
      });

      await prisma.priceAlert.update({
        where: {
          id: alert.id,
        },
        data: {
          lastSentAt: new Date(),
        },
      });

      results.push({
        alertId: alert.id,
        status: "sent",
        currentPrice,
        targetPrice: alert.targetPrice,
      });
    }

    return NextResponse.json({
      checked: alerts.length,
      results,
    });
  } catch (error) {
    console.error("Check alerts error:", error);

    return NextResponse.json(
      { error: "Failed to check price alerts" },
      { status: 500 }
    );
  }
}