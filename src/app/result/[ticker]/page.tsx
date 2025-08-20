// src/app/result/[ticker]/page.tsx
import StockResult from "@/components/StockResult";
import Link from "next/link";
import { Suspense } from "react";
import ResultHeader from "@/components/ResultHeader";

// ⛔️ Remova qualquer `import type { PageProps } from "next";`

type NewsArticle = {
  title: string;
  url: string;
  summary: string;
  sentiment: "positive" | "negative" | "neutral";
};

type StockResultData = {
  prediction: number;
  ticker: string;
  today: number;
  next: number;
  probUp: number;
  probDown: number;
  score: number;
  news: NewsArticle[];
  imagePrice: string;
  imageTechnical: string;
  imageNews: string;
};

type Props = {
  params: { ticker: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

async function getPrediction(ticker: string): Promise<StockResultData> {
  // Usa variável pública em dev; em prod usa VERCEL_URL
  const base =
    process.env.NEXT_PUBLIC_API_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const res = await fetch(`${base}/api/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ticker }),
    cache: "no-store",
  });

  const json = await res.json();
  if (!res.ok || json.error) throw new Error(json.error || "Prediction failed");
  return json as StockResultData;
}

export default async function ResultPage(props: Props) {
  const { ticker } = await props.params;

  try {
    const data = await getPrediction(ticker);
    const trendUp = data.next > data.today;

    return (
      <main className="w-full max-w-5xl mx-auto px-4 py-10 pt-[72px] md:pt-24">
        <ResultHeader ticker={data.ticker} trendUp={trendUp} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-400 mb-1">Preço Atual</div>
            <div className="text-2xl font-bold text-blue-300">
              ${data.today.toFixed(2)}
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-400 mb-1">Previsão</div>
            <div
              className={`text-2xl font-bold ${
                trendUp ? "text-green-400" : "text-red-400"
              }`}
            >
              ${data.next.toFixed(2)}
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-400 mb-1">Prob. Alta</div>
            <div className="text-lg font-bold text-green-300">
              {(data.probUp * 100).toFixed(1)}%
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-400 mb-1">Prob. Baixa</div>
            <div className="text-lg font-bold text-red-300">
              {(data.probDown * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="text-center text-gray-400">
              Carregando detalhes...
            </div>
          }
        >
          <StockResult {...data} ticker={ticker.toUpperCase()} />
        </Suspense>
      </main>
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    return (
      <main className="w-full max-w-3xl mx-auto px-4 py-20 text-center text-red-400">
        <h2 className="text-2xl font-light mb-4">
          Erro ao buscar dados para &quot;{ticker}&quot;: {message}
        </h2>
        <Link href="/" className="text-blue-400 underline mt-6 block">
          ← Voltar
        </Link>
      </main>
    );
  }
}
