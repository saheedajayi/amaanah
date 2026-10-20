const TROY_OUNCE_GRAMS = 31.1034768;

interface MetalPriceResponse {
  readonly price?: number;
  readonly updatedAt?: string;
  readonly timestamp?: number;
}

interface ExchangeRateResponse {
  readonly rate?: number;
  readonly rates?: Readonly<Record<string, number>>;
  readonly date?: string;
}

export interface LiveMetalRates {
  readonly goldPerGramNgn: number;
  readonly silverPerGramNgn: number;
  readonly usdToNgn: number;
  readonly updatedAt: string;
}

async function getJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Rate service returned ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchLiveMetalRates(): Promise<LiveMetalRates> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const [gold, silver, exchange] = await Promise.all([
      getJson<MetalPriceResponse>('https://api.gold-api.com/price/XAU', controller.signal),
      getJson<MetalPriceResponse>('https://api.gold-api.com/price/XAG', controller.signal),
      getJson<ExchangeRateResponse>(
        'https://api.frankfurter.dev/v2/rate/USD/NGN?providers=CBN',
        controller.signal,
      ),
    ]);
    const usdToNgn = Number(exchange.rate ?? exchange.rates?.NGN);
    const goldPerOunce = Number(gold.price);
    const silverPerOunce = Number(silver.price);

    if (![usdToNgn, goldPerOunce, silverPerOunce].every((value) => Number.isFinite(value) && value > 0)) {
      throw new Error('The rate service returned incomplete prices');
    }

    return {
      goldPerGramNgn: (goldPerOunce / TROY_OUNCE_GRAMS) * usdToNgn,
      silverPerGramNgn: (silverPerOunce / TROY_OUNCE_GRAMS) * usdToNgn,
      usdToNgn,
      updatedAt: gold.updatedAt ?? exchange.date ?? new Date().toISOString(),
    };
  } finally {
    clearTimeout(timeout);
  }
}
