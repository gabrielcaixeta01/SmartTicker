# SmartTicker

SmartTicker is a modern web application for stock prediction and analysis. It combines financial data, technical indicators, and news sentiment to provide users with actionable insights about stocks. The project features a responsive, mobile-first UI and a Python backend for predictions.

## Features

- **Stock Price Prediction**: Uses machine learning models (Python) to predict future stock prices.
- **Technical Analysis**: Displays technical indicators and price charts.
- **News Sentiment**: Scrapes and analyzes news headlines for sentiment (positive/neutral/negative).
- **Responsive UI**: Mobile-first, modern design with TailwindCSS.
- **Fast API**: Next.js App Router for frontend and API routes.

## Tech Stack

- **Frontend**: Next.js (App Router), React, TailwindCSS
- **Backend**: Python (yfinance, scikit-learn, etc.)
- **UI Libraries**: react-icons, @headlessui/react

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Python 3.12+

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gabrielcaixeta01/SmartTicker.git
   cd SmartTicker/project
   ```
2. **Install Node dependencies:**
   ```bash
   npm install
   ```
3. **Set up Python environment:**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r python/requirements.txt
   ```
4. **Configure environment variables:**

   - Copy the example below to a `.env` file in the root:
     ```env
     NEWS_API_KEY=your_news_api_key_here
     PYTHON_PATH=/absolute/path/to/your/.venv/bin/python
     ```
   - Set `PYTHON_PATH` to the full path of your Python virtual environment binary.
   - Get a NewsAPI key at [newsapi.org](https://newsapi.org/).

5. **Run the development server:**

   ```bash
   PYTHON_PATH="$(pwd)/.venv/bin/python" npm run dev
   ```

   > O `PYTHON_PATH` é obrigatório para o backend funcionar corretamente.

6. **Access the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Enter a stock ticker (e.g., AAPL, MSFT) on the homepage and get predictions, technical analysis, and news sentiment.
- All processing is local: the backend Python scripts are called via Node.js API routes.

## Project Structure

```
project/
├── python/                # Python backend scripts
│   ├── generate.py
│   ├── model.py
│   ├── news_model.py
│   ├── news_scraper.py
│   └── technicals.py
│   └── requirements.txt
├── src/
│   ├── app/               # Next.js app router
│   │   ├── api/           # API routes (predict, quote, ticker, image)
│   │   └── result/        # Result pages
│   └── components/        # React components (Navbar, StockResult, etc.)
├── public/                # Static assets
├── package.json
├── tsconfig.json
├── .env                   # Environment variables
└── ...
```

## Environment Variables

- `NEWS_API_KEY`: Your NewsAPI key for fetching news headlines.
- `PYTHON_PATH`: Full path to your Python binary (from your virtual environment).

## Limitations

- **Deployment**: The backend Python scripts are executed locally via Node.js. This will not work on serverless platforms like Vercel. For production, host the Python backend separately (e.g., Railway, Render, AWS) and update the API routes to call it via HTTP.
- **No i18n**: The project is now English-only. All language switcher and translation logic has been removed.

## Customization

- **Add new indicators**: Extend `python/technicals.py` and update frontend cards.
- **Change styles**: Edit Tailwind classes in components.

## Python Requirements

See `python/requirements.txt`:

```
yfinance
matplotlib
numpy
pandas
scikit-learn
requests
textblob
beautifulsoup4
nltk
peewee
pillow
```

## Author

Gabriel Caixeta — [github.com/gabrielcaixeta01](https://github.com/gabrielcaixeta01)
