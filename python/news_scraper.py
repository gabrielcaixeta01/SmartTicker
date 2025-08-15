import requests

API_KEY = "465c3df16e6c4942be0736eee109fea9"

def get_news_articles(ticker):
    url = (
        f"https://newsapi.org/v2/everything?"
        f"q={ticker}&sortBy=publishedAt&language=en&pageSize=5&apiKey={API_KEY}"
    )

    response = requests.get(url)
    if response.status_code != 200:
        return []

    data = response.json()

    articles = []
    for article in data.get("articles", []):
        title = article.get("title")
        url = article.get("url")
        description = article.get("description") or ""

        summary = summarize(description)
        articles.append({
            "title": title,
            "url": url,
            "summary": summary
        })

    return articles

def summarize(text):
    # Simples truncamento — pode usar NLP depois
    return text.strip()[:200] + "..." if len(text) > 200 else text.strip()