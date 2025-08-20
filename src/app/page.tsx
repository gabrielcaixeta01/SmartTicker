// app/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import StockTickerWidget from "@/components/StockTickerWidget";
import TopStocks from "@/components/TopStocks";
import { useLang } from "@/context/lang";

export default function HomePage() {
  const [ticker, setTicker] = useState("");
  const router = useRouter();
  const { lang } = useLang();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker) {
      router.push(`/result/${ticker.toUpperCase()}`);
    }
  };

  return (
    <div className="bg-gray-950 text-white">
      <Navbar />

      <div className="relative z-10">
        <StockTickerWidget />
      </div>

      <section
        id="home"
        className="relative h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden"
      >
        {/* Título principal com ênfase e animação sutil */}
        <h1 className="text-5xl md:text-6xl font-light text-center leading-tight mb-6">
          {lang === "pt" ? (
            <>
              Preveja o Mercado
              <br />
              com <span className="text-blue-500">Insights com IA</span>
            </>
          ) : (
            <>
              Predict the Market
              <br />
              with <span className="text-blue-500">AI-Powered Insights</span>
            </>
          )}
        </h1>

        {/* Subtítulo explicativo */}
        <p className="text-lg text-gray-400 font-extralight text-center mb-8 max-w-xl">
          {lang === "pt"
            ? "Digite um ticker para obter uma previsão com aprendizado de máquina e sentimento de notícias em tempo real."
            : "Enter a stock ticker to get a forecast powered by machine learning and real-time news sentiment."}
        </p>

        {/* Formulário de busca */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-4 font-extralight"
        >
          <input
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            list="tickers"
            placeholder={
              lang === "pt"
                ? "Digite o ticker (ex: AAPL)"
                : "Enter ticker (e.g. AAPL)"
            }
            className="w-full bg-gray-800 border border-gray-600 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <datalist id="tickers">
            <option value="AAPL" />
            <option value="GOOGL" />
            <option value="AMZN" />
            <option value="MSFT" />
            <option value="TSLA" />
            <option value="META" />
            <option value="NFLX" />
            <option value="NVDA" />
            <option value="BRK-B" />
            <option value="JPM" />
          </datalist>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 rounded-md font-light shadow-md"
          >
            {lang === "pt" ? "Prever" : "Predict"}
          </button>
        </form>

        {/* Link para rolar até a seção About */}
        <a href="#about" className="text-blue-400 text-sm mt-6">
          {lang === "pt" ? "Saiba como funciona ↓" : "Learn how it works ↓"}
        </a>
      </section>

      <section
        id="about"
        className="min-h-[90vh] py-24 px-6 bg-black text-gray-200 flex items-center"
      >
        <div className="max-w-5xl mx-auto space-y-10 font-light">
          <div>
            <h2 className="text-sm uppercase text-blue-500 tracking-widest">
              {lang === "pt" ? "Visão Geral" : "Overview"}
            </h2>
            <h3 className="text-3xl md:text-4xl font-light text-white mb-6">
              {lang === "pt" ? "Sobre o Projeto" : "About the Project"}
            </h3>
            <p className="text-lg font-extralight text-gray-400 leading-relaxed">
              {lang === "pt" ? (
                <>
                  <span className="text-white">Stock Predictor</span> é uma
                  plataforma orientada por IA projetada para ajudar usuários a
                  antecipar o comportamento de mercado de curto prazo usando
                  <span className="text-blue-400">
                    {" "}
                    algoritmos de aprendizado de máquina
                  </span>{" "}
                  e
                  <span className="text-green-400">
                    {" "}
                    análise de sentimento em tempo real
                  </span>{" "}
                  extraída das últimas notícias financeiras.
                </>
              ) : (
                <>
                  <span className="text-white">Stock Predictor</span> is an
                  AI-driven platform designed to help users anticipate
                  short-term market behavior using
                  <span className="text-blue-400">
                    {" "}
                    machine learning algorithms
                  </span>{" "}
                  and
                  <span className="text-green-400">
                    {" "}
                    real-time sentiment analysis
                  </span>{" "}
                  extracted from the latest financial news.
                </>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h4 className="text-xl text-white mb-2">
                🎯 {lang === "pt" ? "Objetivo" : "Objective"}
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {lang === "pt"
                  ? "Fornecer insights baseados em dados para decisões de trading mais inteligentes — mesmo para não especialistas."
                  : "Provide data-backed insights to empower smarter trading decisions — even for non-experts."}
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h4 className="text-xl text-white mb-2">
                🧠 {lang === "pt" ? "Como Funciona" : "How it Works"}
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {lang === "pt" ? (
                  <>
                    Combinamos um{" "}
                    <span className="text-blue-300">
                      modelo de regressão Random Forest
                    </span>{" "}
                    com
                    <span className="text-green-300">
                      {" "}
                      pontuação de sentimento baseada em PLN
                    </span>{" "}
                    de notícias para simular previsões realistas.
                  </>
                ) : (
                  <>
                    We combine a{" "}
                    <span className="text-blue-300">
                      Random Forest regression model
                    </span>{" "}
                    with
                    <span className="text-green-300">
                      {" "}
                      NLP-based sentiment scoring
                    </span>{" "}
                    from news to simulate realistic forecasts.
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h4 className="text-xl text-white mb-4">
              📈 {lang === "pt" ? "Destaques das Ações" : "Top Stocks Overview"}
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              {lang === "pt"
                ? "Abaixo está um panorama em tempo real das ações em destaque que estamos acompanhando:"
                : "Below is a real-time snapshot of trending stocks we're tracking:"}
            </p>
            <TopStocks />
          </div>

          <a
            href="#contact"
            className="inline-block mt-12 text-blue-400 hover:text-blue-300 text-sm transition"
          >
            {lang === "pt" ? "Fale comigo →" : "Get in touch →"}
          </a>
        </div>
      </section>

      <section
        id="contact"
        className="min-h-[60vh] py-24 px-6 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200 flex items-center"
      >
        <div className="max-w-4xl mx-auto space-y-10 font-light">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-blue-500">
              {lang === "pt" ? "Vamos nos conectar" : "Let's Connect"}
            </h2>
            <h3 className="text-3xl md:text-4xl text-white border-b border-gray-700 pb-4">
              {lang === "pt" ? "Contato" : "Contact"}
            </h3>
          </div>

          <p className="text-lg text-gray-400 font-extralight max-w-2xl leading-relaxed">
            {lang === "pt"
              ? "Se você tem curiosidade sobre o projeto, quer colaborar ou apenas dizer oi — estou aberto a conexões!"
              : "Whether you're curious about how the project works, want to collaborate, or just say hi — I'm open to connections!"}
          </p>

          <div className="space-y-6 text-gray-300 text-base">
            <div className="flex items-center space-x-3">
              <span className="text-xl">📧</span>
              <a
                href="mailto:gabrielcaixetaromero@gmail.com"
                className="hover:text-blue-400 transition"
              >
                gabrielcaixetaromero@gmail.com
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xl">💼</span>
              <a
                href="https://linkedin.com/in/gabriel-caixeta-romero"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                {lang === "pt"
                  ? "Gabriel Caixeta Romero — LinkedIn"
                  : "Gabriel Caixeta Romero — LinkedIn"}
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xl">💻</span>
              <a
                href="https://github.com/gabrielcaixeta01"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                github.com/gabrielcaixeta01
              </a>
            </div>
          </div>

          <div className="mt-10">
            <a
              href="mailto:gabrielcaixetaromero@gmail.com"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-light px-6 py-3 rounded-md transition-all duration-300 shadow-md"
            >
              {lang === "pt" ? "Me envie um e-mail →" : "Send me an email →"}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
