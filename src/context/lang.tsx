"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const translations = {
  pt: {
    home: "Início",
    about: "Sobre",
    contact: "Contato",
    summary: "Resumo",
    price: "Preço",
    technical: "Técnico",
    news: "Notícias",
    predictionSummary: "Resumo da Previsão",
    historicalPrice: "Gráfico de Preço Histórico",
    sentimentGraph: "Gráfico de Sentimento",
    technicalIndicators: "Indicadores Técnicos",
    newsOverview: "Resumo das Notícias",
    currentPrice: "Preço Atual",
    forecast: "Previsão",
    probUp: "Prob. Alta",
    probDown: "Prob. Baixa",
    modelAccuracy: "Acurácia do Modelo",
    newsArticles: "Notícias",
    loading: "Carregando resultado...",
    error: "Erro ao buscar dados para",
    back: "← Voltar",
    share: "Compartilhar",
    trendUp: "Tendência de Alta",
    trendDown: "Tendência de Baixa",
    stockAnalysis: "Análise da Ação",
  },
  en: {
    home: "Home",
    about: "About",
    contact: "Contact",
    summary: "Summary",
    price: "Price",
    technical: "Technical",
    news: "News",
    predictionSummary: "Prediction Summary",
    historicalPrice: "Historical Price Graph",
    sentimentGraph: "Sentiment Graph",
    technicalIndicators: "Technical Indicators",
    newsOverview: "News Overview",
    currentPrice: "Current Price",
    forecast: "Forecast",
    probUp: "Prob. Up",
    probDown: "Prob. Down",
    modelAccuracy: "Model Accuracy",
    newsArticles: "News Articles",
    loading: "Loading result...",
    error: "Error fetching data for",
    back: "← Go back",
    share: "Share",
    trendUp: "Uptrend",
    trendDown: "Downtrend",
    stockAnalysis: "Stock Analysis",
  },
};

type Lang = "pt" | "en";

const LangContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: keyof (typeof translations)["pt"]) => string;
}>({
  lang: "pt",
  setLang: () => {},
  t: (key) => translations.pt[key],
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");
  const t = (key: keyof (typeof translations)["pt"]) =>
    translations[lang][key] || key;
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
