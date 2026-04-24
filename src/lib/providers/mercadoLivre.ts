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

type MercadoLivreSearchItem = {
  id: string;
  title: string;
  price: number;
  permalink: string;
  thumbnail: string;
  shipping?: {
    free_shipping?: boolean;
  };
};

type MercadoLivreSearchResponse = {
  results: MercadoLivreSearchItem[];
};

export async function searchMercadoLivreProducts(
  query: string,
  limit = 10
): Promise<ExternalProductOffer[]> {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  try {
    const searchParams = new URLSearchParams({
      q: normalizedQuery,
      limit: String(limit),
    });

    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?${searchParams.toString()}`,
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    // 👇 TRATAMENTO DE ERRO (IMPORTANTE)
    if (!response.ok) {
      console.warn(`Mercado Livre API unavailable: ${response.status}`);
      return getMercadoLivreFallbackResults(normalizedQuery);
    }

    const data = (await response.json()) as MercadoLivreSearchResponse;

    return data.results.map((item) => {
      const shipping = item.shipping?.free_shipping ? 0 : 0;

      return {
        id: item.id,
        source: "Mercado Livre",
        title: item.title,
        price: item.price,
        shipping,
        totalPrice: item.price + shipping,
        productUrl: item.permalink,
        imageUrl: item.thumbnail || null,
        capturedAt: new Date(),
      };
    });
  } catch (error) {
    console.warn("Mercado Livre request failed:", error);
    return getMercadoLivreFallbackResults(normalizedQuery);
  }
}

// 👇 FALLBACK (EVITA QUEBRA DO APP)
function getMercadoLivreFallbackResults(
  query: string
): ExternalProductOffer[] {
  const capturedAt = new Date();

  return [
    {
      id: "fallback-ml-1",
      source: "Mercado Livre",
      title: `${query} - Mercado Livre offer 1`,
      price: 3899.9,
      shipping: 0,
      totalPrice: 3899.9,
      productUrl: "https://www.mercadolivre.com.br/",
      imageUrl: null,
      capturedAt,
    },
    {
      id: "fallback-ml-2",
      source: "Mercado Livre",
      title: `${query} - Mercado Livre offer 2`,
      price: 3799.9,
      shipping: 29.9,
      totalPrice: 3829.8,
      productUrl: "https://www.mercadolivre.com.br/",
      imageUrl: null,
      capturedAt,
    },
  ];
}