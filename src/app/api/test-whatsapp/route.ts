import { NextResponse } from "next/server";
import { sendWhatsAppMessage } from "@/lib/notifications/whatsapp";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { phoneNumber } = body;

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "phoneNumber is required" },
        { status: 400 }
      );
    }

    const result = await sendWhatsAppMessage({
      to: phoneNumber,
      message:
        "PriceCompare test alert: your WhatsApp notification service is working.",
    });

    return NextResponse.json({
      message: "WhatsApp test message sent",
      sid: result.sid,
      status: result.status,
    });
  } catch (error) {
    console.error("WhatsApp test error:", error);

    const message =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: "Failed to send WhatsApp test message",
        details: message,
      },
      { status: 500 }
    );
  }
}