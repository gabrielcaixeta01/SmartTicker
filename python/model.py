import yfinance as yf
import matplotlib.pyplot as plt
import os
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.calibration import CalibratedClassifierCV
from sklearn.model_selection import train_test_split

def train_model(ticker):
    df = yf.download(ticker, period="90d", auto_adjust=False)
    if df.empty or len(df) < 30:
        raise Exception("Insufficient data for ticker.")

    df = df.reset_index()
    df['Return'] = df['Close'].pct_change()
    df['Target'] = (df['Return'].shift(-1) > 0).astype(int)
    df['MA5'] = df['Close'].rolling(window=5).mean()
    df['MA10'] = df['Close'].rolling(window=10).mean()
    df['Volume'] = df['Volume'] / 1e6
    df['Volatility'] = df['Close'].rolling(window=5).std()
    df = df.dropna()

    X = df[['MA5', 'MA10', 'Volume', 'Volatility']]
    y = df['Target']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    calibrated = CalibratedClassifierCV(clf, method='sigmoid', cv=3)
    calibrated.fit(X_train, y_train)

    probas = calibrated.predict_proba(X_test)
    prob_up = float(np.mean(probas[:, 1]))
    prob_down = float(np.mean(probas[:, 0]))
    score = float(calibrated.score(X_test, y_test))

    today_price = float(df['Close'].iloc[-1])
    next_price = float(today_price * (1 + df['Return'].tail(5).mean()))

    #Caminho para salvar a imagem
    os.makedirs(".next/cache/images", exist_ok=True)
    img_path = f".next/cache/images/{ticker}_price.png"

    # Gráfico
    plt.style.use("dark_background")
    fig, ax = plt.subplots(figsize=(12, 6), facecolor='black')
    fig.patch.set_facecolor('black')

    ax.plot(df['Date'], df['Close'], label='Actual Close Price', color='#00BFFF', linewidth=2.5)
    ax.scatter(
        df['Date'].iloc[-1], next_price,
        color='red', edgecolor='white', linewidths=1.5,
        label='Prediction (Next Day)', zorder=10, s=120
    )

    ax.set_title(f"{ticker} - Forecast using Random Forest", fontsize=18, color='white')
    ax.set_xlabel("Date", fontsize=13, color='white')
    ax.set_ylabel("Price ($)", fontsize=13, color='white')
    ax.tick_params(colors='white', labelsize=10)
    ax.grid(True, linestyle='--', linewidth=0.5, alpha=0.3)
    ax.legend(facecolor='black', edgecolor='white', labelcolor='white', fontsize=10)

    plt.xticks(rotation=45, color='white')
    plt.yticks(color='white')
    plt.tight_layout()
    plt.savefig(img_path, dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close()

    return {
        "today_price": round(today_price, 2),
        "next_price": round(next_price, 2),
        "prob_up": round(prob_up, 4),
        "prob_down": round(prob_down, 4),
        "score": round(score, 4),
        "graph_path": f"{ticker}_price.png"
    }