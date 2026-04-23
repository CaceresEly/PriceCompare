export type Product = {
  id: string;
  title: string;
  store: string;
  image: string;
  price: number;
  shipping: number;
  rating: number;
  deliveryDays: number;
  productUrl: string;
  category: string;
};

export type SortOption =
  | "lowest-price"
  | "lowest-total"
  | "best-rating"
  | "fastest-delivery";