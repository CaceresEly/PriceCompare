import { Product, SortOption } from "@/types/product";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function getTotalPrice(product: Product) {
  return product.price + product.shipping;
}

export function sortProducts(products: Product[], sortBy: SortOption) {
  const sorted = [...products];

  switch (sortBy) {
    case "lowest-price":
      return sorted.sort((a, b) => a.price - b.price);
    case "lowest-total":
      return sorted.sort((a, b) => getTotalPrice(a) - getTotalPrice(b));
    case "best-rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "fastest-delivery":
      return sorted.sort((a, b) => a.deliveryDays - b.deliveryDays);
    default:
      return sorted;
  }
}

export function getBestOffer(products: Product[]) {
  if (!products.length) return null;

  return [...products].sort(
    (a, b) => getTotalPrice(a) - getTotalPrice(b)
  )[0];
}