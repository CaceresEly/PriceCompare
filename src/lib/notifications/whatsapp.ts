import twilio from "twilio";

type SendWhatsAppMessageParams = {
  to: string;
  message: string;
};

function getTwilioClient() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    throw new Error("Twilio credentials are not configured");
  }

  return twilio(accountSid, authToken);
}

export async function sendWhatsAppMessage({
  to,
  message,
}: SendWhatsAppMessageParams) {
  const from = process.env.TWILIO_WHATSAPP_FROM;

  if (!from) {
    throw new Error("TWILIO_WHATSAPP_FROM is not configured");
  }

  const client = getTwilioClient();

  return client.messages.create({
    from,
    to: `whatsapp:${to}`,
    body: message,
  });
}