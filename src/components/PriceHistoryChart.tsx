"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Snapshot = {
  totalPrice: number;
  capturedAt: string;
};

type Props = {
  data: Snapshot[];
};

export function PriceHistoryChart({ data }: Props) {
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.capturedAt).toLocaleTimeString(),
  }));

  const hasEnoughData = data.length >= 2;

  return (
    <div className="mb-8 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-zinc-900">
          Price history
        </h3>
        <p className="text-sm text-zinc-500">
          Historical price snapshots for the tracked product.
        </p>
      </div>

      {!hasEnoughData ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 text-center text-sm text-zinc-500">
          Search this product again after the cache refresh window to build a
          visible price history.
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="totalPrice"
                stroke="#2563eb"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}