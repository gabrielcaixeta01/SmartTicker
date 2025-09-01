import Image from "next/image";
import { FaSmile, FaMeh, FaFrown } from "react-icons/fa";
// ...existing code...

type Props = {
  today: number;
  next: number;
  probUp: number;
  probDown: number;
  score: number;
  news: {
    title: string;
    url: string;
    summary: string;
    sentiment?: "positive" | "negative" | "neutral";
  }[];
  imagePrice: string;
  imageNews: string;
  imageTechnical: string;
  ticker: string;
};

export default function StockResult({
  today,
  next,
  probUp,
  probDown,
  score,
  news,
  imagePrice,
  imageNews,
  imageTechnical,
  ticker,
}: Props) {
  // ...existing code...
  return (
    <div className="w-full max-w-5xl mx-auto mt-10 px-4 space-y-12 text-gray-200 font-light tracking-wide">
      <h2 className="text-2xl md:text-3xl text-center">
        {ticker} Stock Analysis
      </h2>

      {/* Resumo de Previsões */}
      <section
        id="summary"
        className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 shadow-xl scroll-mt-20"
      >
        <h3 className="text-xl text-white mb-4">Prediction Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-base text-gray-300">
          <p>
            <span className="text-gray-400">Current Price:</span> $
            {today.toFixed(2)}
          </p>
          <p>
            <span className="text-gray-400">Forecast:</span> ${next.toFixed(2)}
          </p>
          <p>
            <span className="text-gray-400">Model Accuracy:</span>{" "}
            {(score * 100).toFixed(2)}%
          </p>
          <p>
            <span className="text-gray-400">Prob. Up:</span>{" "}
            {(probUp * 100).toFixed(2)}%
          </p>
          <p>
            <span className="text-gray-400">Prob. Down:</span>{" "}
            {(probDown * 100).toFixed(2)}%
          </p>
          <p>
            <span className="text-gray-400">News:</span> {news.length}
          </p>
        </div>
      </section>

      {/* Gráfico de Preço */}
      <section id="price" className="space-y-6 scroll-mt-20">
        <h3 className="text-lg border-b border-gray-700 pb-2">
          Historical Price
        </h3>
        <Image
          src={`/api/image?name=${imagePrice}`}
          alt="Price chart"
          className="rounded-lg w-full"
          width={800}
          height={500}
        />
      </section>

      {/* Gráfico de Sentimento */}
      <section className="space-y-6">
        <h3 className="text-lg border-b border-gray-700 pb-2">
          Sentiment Graph
        </h3>
        <Image
          src={`/api/image?name=${imageNews}`}
          alt="News chart"
          className="rounded-lg w-full"
          width={800}
          height={500}
        />
      </section>

      {/* Indicadores Técnicos */}
      {imageTechnical && (
        <section id="technical" className="space-y-6 scroll-mt-20">
          <h3 className="text-lg border-b border-gray-700 pb-2">
            Technical Indicators
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            This chart shows Bollinger Bands and RSI (Relative Strength Index).
            Bollinger Bands help visualize volatility and potential
            overbought/oversold zones. RSI suggests momentum and trend shifts —
            above 70 means overbought; below 30 means oversold.
          </p>
          <Image
            src={`/api/image?name=${imageTechnical}`}
            alt="Technical indicators chart"
            className="rounded-lg w-full"
            width={800}
            height={500}
          />
        </section>
      )}

      {/* Notícias */}
      <section id="news" className="space-y-6 scroll-mt-20">
        <h3 className="text-lg border-b border-gray-700 pb-2">News Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {news.map((item, index) => {
            let sentimentColor = "text-gray-400";
            let sentimentIcon = <FaMeh className="inline-block mr-1" />;
            if (item.sentiment === "positive") {
              sentimentColor = "text-green-400";
              sentimentIcon = <FaSmile className="inline-block mr-1" />;
            } else if (item.sentiment === "negative") {
              sentimentColor = "text-red-400";
              sentimentIcon = <FaFrown className="inline-block mr-1" />;
            }
            return (
              <div
                key={index}
                className="p-4 border border-gray-700 rounded-lg bg-[#1e1f24] flex flex-col gap-2 min-h-[140px]"
              >
                <div className="flex items-center gap-2">
                  <span className={`text-lg ${sentimentColor}`}>
                    {sentimentIcon}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-base flex-1"
                  >
                    {item.title}
                  </a>
                </div>
                <p className="text-sm text-gray-300 mt-1">
                  {item.summary || "No summary available."}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
