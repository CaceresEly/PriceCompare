"use client";

import { useState } from "react";

type PriceAlertFormProps = {
  query: string;
  externalProductId?: string;
  productTitle: string;
  currentPrice: number;
};

export function PriceAlertForm({
  query,
  externalProductId,
  productTitle,
  currentPrice,
}: PriceAlertFormProps) {
  const [targetPrice, setTargetPrice] = useState(String(currentPrice));
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          externalProductId,
          productTitle,
          targetPrice: Number(targetPrice),
          phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create alert");
      }

      setMessage("Price alert created successfully.");
      setPhoneNumber("");
    } catch (error) {
      console.error(error);
      setMessage("Could not create price alert.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mb-8 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-zinc-900">
          Create price alert
        </h2>
        <p className="text-sm text-zinc-500">
          Get notified on WhatsApp when this product reaches your target price.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-3 md:grid-cols-[1fr_1fr_auto]"
      >
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-600">
            Target price
          </label>
          <input
            type="number"
            min="1"
            step="0.01"
            value={targetPrice}
            onChange={(event) => setTargetPrice(event.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-600">
            WhatsApp number
          </label>
          <input
            type="tel"
            placeholder="+5511999999999"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !phoneNumber || !targetPrice}
          className="self-end rounded-xl bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          {isSubmitting ? "Creating..." : "Set alert"}
        </button>
      </form>

      {message && (
        <p className="mt-3 text-sm text-zinc-600">
          {message}
        </p>
      )}
    </section>
  );
}