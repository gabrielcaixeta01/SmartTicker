import sys
import json
from model import train_model
from news_model import train_model_news
from news_scraper import get_news_articles
from technicals import generate_technical_chart

def main():
    if len(sys.argv) < 2:
        print("Error: No ticker provided", file=sys.stderr)
        sys.exit(1)

    ticker = sys.argv[1]

    try:
        # Rodar modelos
        model_result = train_model(ticker)
        news_prediction, news_image = train_model_news(ticker)
        technical_image = generate_technical_chart(ticker)
        news_articles = get_news_articles(ticker)

        # Empacotar resultado
        result = {
            "ticker": ticker,
            "today": model_result["today_price"],
            "next": model_result["next_price"],
            "probUp": model_result["prob_up"],
            "probDown": model_result["prob_down"],
            "score": model_result["score"],
            "prediction": news_prediction,
            "imagePrice": model_result["graph_path"],
            "imageNews": news_image,
            "imageTechnical": technical_image,
            "news": news_articles
        }

        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()