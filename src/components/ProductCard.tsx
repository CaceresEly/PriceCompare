import { Product } from "@/types/product";
import { formatCurrency, getTotalPrice } from "@/lib/utils";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
  isBestOffer?: boolean;
};

export function ProductCard({ product, isBestOffer = false }: ProductCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      {isBestOffer && (
        <span className="absolute right-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
          Best Offer
        </span>
      )}

      <Image
        src={product.image}
        alt={product.title}
        width={500}
        height={300}
        className="mb-4 h-48 w-full rounded-xl object-cover"
    />

      <h3 className="text-lg font-semibold text-zinc-900">{product.title}</h3>
      <p className="mt-1 text-sm text-zinc-500">{product.store}</p>

      <div className="mt-4 space-y-2 text-sm text-zinc-700">
        <p>
          <span className="font-medium">Price:</span> {formatCurrency(product.price)}
        </p>
        <p>
          <span className="font-medium">Shipping:</span> {formatCurrency(product.shipping)}
        </p>
        <p>
          <span className="font-medium">Total:</span> {formatCurrency(getTotalPrice(product))}
        </p>
        <p>
          <span className="font-medium">Rating:</span> {product.rating} ⭐
        </p>
        <p>
          <span className="font-medium">Delivery:</span> {product.deliveryDays} days
        </p>
      </div>

      <a
        href={product.productUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-block rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
      >
        View deal
      </a>
    </div>
  );
}