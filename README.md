# SmartTicker: Stock Predictor

SmartTicker is a modern web application for stock prediction and analysis. It combines financial data, technical indicators, and news sentiment to provide users with actionable insights about stocks. The project features a responsive, mobile-first UI, internationalization (English/Portuguese), and a Python backend for predictions.

## Features

- **Stock Price Prediction**: Uses machine learning models (Python) to predict future stock prices.
- **Technical Analysis**: Displays technical indicators and price charts.
- **News Sentiment**: Scrapes and analyzes news headlines for sentiment (positive/neutral/negative).
- **Responsive UI**: Mobile-first, modern design with TailwindCSS.
- **Internationalization**: Switch between English and Portuguese with a flag dropdown.
- **Fast API**: Next.js App Router for frontend and API routes.

## Tech Stack

- **Frontend**: Next.js (App Router), React, TailwindCSS
- **Backend**: Python (yfinance, scikit-learn, etc.)
- **UI Libraries**: react-icons, @headlessui/react, react-country-flag
- **i18n**: Context API for language switching

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Python 3.12+

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gabrielcaixeta01/StockPredictor.git
   cd StockPredictor/project
   ```
2. **Install Node dependencies:**
   ```bash
   npm install
   ```
3. **Set up Python environment:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

   _(Create `requirements.txt` with needed packages: yfinance, scikit-learn, matplotlib, etc.)_

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Access the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
project/
├── python/                # Python backend scripts
│   ├── generate.py
│   ├── model.py
│   ├── news_model.py
│   ├── news_scraper.py
│   └── technicals.py
├── src/
│   ├── app/               # Next.js app router
│   │   ├── api/           # API routes (predict, quote, ticker, image)
│   │   └── result/        # Result pages
│   └── components/        # React components (Navbar, StockResult, etc.)
├── context/               # React context (language)
├── public/                # Static assets
├── package.json
├── tsconfig.json
└── ...
```

## Customization

- **Add new languages:** Edit `src/context/lang.tsx`.
- **Add new indicators:** Extend `python/technicals.py` and update frontend cards.
- **Change styles:** Edit Tailwind classes in components.

## License

MIT License. See [LICENSE](LICENSE) for details.

## Author

Gabriel Caixeta — [github.com/gabrielcaixeta01](https://github.com/gabrielcaixeta01)
