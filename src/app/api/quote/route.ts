import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ticker = searchParams.get('ticker');

  if (!ticker) {
    return NextResponse.json({ error: 'Ticker is required' }, { status: 400 });
  }

  try {
    const quote = await yahooFinance.quote(ticker);
    return NextResponse.json({
      price: quote.regularMarketPrice,
      change: quote.regularMarketChangePercent,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch quote' }, { status: 500 });
  }
}