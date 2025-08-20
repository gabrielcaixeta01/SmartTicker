"use client";
import { FaArrowUp, FaArrowDown, FaShareAlt } from "react-icons/fa";
import { useLang } from "@/context/lang";

interface ResultHeaderProps {
  ticker: string;
  trendUp: boolean;
}

export default function ResultHeader({ ticker, trendUp }: ResultHeaderProps) {
  const { t, lang } = useLang();
  async function handleShare() {
    if (navigator.share) {
      await navigator.share({
        title: `${t("stockAnalysis")}: ${ticker.toUpperCase()}`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert(lang === "pt" ? "Link copiado!" : "Link copied!");
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-zinc-800 p-3 border border-zinc-700">
          <span className="text-2xl font-bold text-blue-400">
            {ticker.toUpperCase()}
          </span>
        </div>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            trendUp ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
          }`}
        >
          {trendUp ? (
            <FaArrowUp className="mr-1" />
          ) : (
            <FaArrowDown className="mr-1" />
          )}
          {trendUp ? t("trendUp") : t("trendDown")}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-300 hover:bg-zinc-700 transition"
        >
          {t("back")}
        </button>
        <button
          onClick={handleShare}
          className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-600 flex items-center gap-2 transition"
        >
          <FaShareAlt /> {t("share")}
        </button>
      </div>
    </div>
  );
}
