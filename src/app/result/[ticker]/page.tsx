import StockResult from '@/components/StockResult';
import Link from 'next/link';

type NewsArticle = {
  title: string;
  url: string;
  summary: string;
  sentiment: 'positive' | 'negative' | 'neutral';
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

async function getPrediction(ticker: string): Promise<StockResultData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/predict`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticker }),
      cache: 'no-store',
    }
  );

  const json = await res.json();

  if (!res.ok || json.error) {
    throw new Error(json.error || 'Prediction failed');
  }

  return json;
}

type Props = {
  params: { ticker: string };
};

export default async function ResultPage({ params }: Props) {
  const { ticker } = params;

  try {
    const data = await getPrediction(ticker);

    return (
      <main className="w-full max-w-5xl mx-auto px-4 py-10">
        <StockResult {...data} ticker={ticker.toUpperCase()} />
      </main>
    );
  } catch {
    return (
      <main className="w-full max-w-3xl mx-auto px-4 py-20 text-center text-red-400">
        <h2 className="text-2xl font-light mb-4">Error fetching data for &quot;{ticker}&quot;</h2>
        <Link href="/" className="text-blue-400 underline mt-6 block">← Go back</Link>
      </main>
    );
  }
}