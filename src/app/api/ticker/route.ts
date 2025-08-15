import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET() {
  const symbols = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA', 'META', 'NVDA', 'NFLX', 'BRK-B', 'JPM'];
  try {
    const quotes = await Promise.all(
      symbols.map(symbol =>
        yahooFinance.quote(symbol).then(q => ({
          symbol,
          price: q.regularMarketPrice,
          change: q.regularMarketChangePercent
        }))
      )
    );
    return NextResponse.json(quotes);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}