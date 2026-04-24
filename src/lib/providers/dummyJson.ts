export type ExternalProductOffer = {
  id: string;
  source: string;
  title: string;
  price: number;
  shipping: number;
  totalPrice: number;
  productUrl: string;
  imageUrl: string | null;
  capturedAt: Date;
};

type DummyJsonProduct = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type DummyJsonSearchResponse = {
  products: DummyJsonProduct[];
};

export async function searchDummyJsonProducts(
  query: string,
  limit = 10
): Promise<ExternalProductOffer[]> {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  const searchParams = new URLSearchParams({
    q: normalizedQuery,
    limit: String(limit),
  });

  const response = await fetch(
    `https://dummyjson.com/products/search?${searchParams.toString()}`,
    {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`DummyJSON API error: ${response.status}`);
  }

  const data = (await response.json()) as DummyJsonSearchResponse;

  return data.products.map((product) => {
    const shipping = 0;

    return {
      id: String(product.id),
      source: "DummyJSON",
      title: product.title,
      price: product.price,
      shipping,
      totalPrice: product.price + shipping,
      productUrl: `https://dummyjson.com/products/${product.id}`,
      imageUrl: product.thumbnail || null,
      capturedAt: new Date(),
    };
  });
}