import Image from "next/image";

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
  return (
    <div className="w-full max-w-5xl mx-auto mt-10 px-4 space-y-12 text-gray-200 font-light tracking-wide">
      <h2 className="text-2xl md:text-3xl text-center">{ticker} Stock Analysis</h2>

      {/* Resumo de Previsões */}
      <section id="summary" className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 shadow-xl scroll-mt-20">
        <h3 className="text-xl text-white mb-4">Prediction Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-base text-gray-300">
          <p><span className="text-gray-400">Today:</span> ${today.toFixed(2)}</p>
          <p><span className="text-gray-400">Predicted:</span> ${next.toFixed(2)}</p>
          <p><span className="text-gray-400">Model Accuracy:</span> {(score * 100).toFixed(2)}%</p>
          <p><span className="text-gray-400">Probability Up:</span> {(probUp * 100).toFixed(2)}%</p>
          <p><span className="text-gray-400">Probability Down:</span> {(probDown * 100).toFixed(2)}%</p>
          <p><span className="text-gray-400">News Articles:</span> {news.length}</p>
        </div>
      </section>

      {/* Gráfico de Preço */}
      <section id="price" className="space-y-6 scroll-mt-20">
        <h3 className="text-lg border-b border-gray-700 pb-2">Historical Price Graph</h3>
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
        <h3 className="text-lg border-b border-gray-700 pb-2">Sentiment Graph</h3>
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
          <h3 className="text-lg border-b border-gray-700 pb-2">Technical Indicators</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            This chart shows <span className="text-gray-300">Bollinger Bands</span> and <span className="text-gray-300">RSI (Relative Strength Index)</span>. 
            Bollinger Bands help visualize volatility and potential overbought/oversold zones. 
            RSI suggests momentum and trend shifts — above 70 means overbought; below 30 means oversold.
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
        <div className="grid md:grid-cols-2 gap-6">
          {news.map((item, index) => (
            <div key={index} className="p-4 border border-gray-700 rounded-lg bg-[#1e1f24]">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-base"
              >
                {item.title}
              </a>
              <p className="text-sm text-gray-300 mt-2">
                {item.summary || "No summary available."}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}