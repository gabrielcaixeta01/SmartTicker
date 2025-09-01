import { NextResponse } from "next/server";
import dotenv from "dotenv";
dotenv.config();
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

export const runtime = "nodejs"; // garante runtime Node, não Edge

const execFileAsync = promisify(execFile);

type PredictData = Record<string, unknown>; // ajuste se quiser um tipo mais específico

async function execPythonPredict(ticker: string): Promise<PredictData> {
  const scriptPath = path.join(process.cwd(), "python", "generate.py");
  const pythonBin =
    process.env.PYTHON_PATH ??
    path.join(process.cwd(), ".venv", "bin", "python");

  const { stdout, stderr } = await execFileAsync(
    pythonBin,
    [scriptPath, ticker],
    {
      cwd: process.cwd(),
      env: process.env,
    }
  );

  if (stderr && stderr.trim().length > 0) {
    console.error("predict stderr:", stderr);
  }

  try {
    return JSON.parse(stdout) as PredictData;
  } catch {
    throw new Error("Erro ao interpretar JSON do Python");
  }
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = (await req.json()) as { ticker?: string };
    const ticker = body?.ticker;

    if (!ticker || typeof ticker !== "string") {
      return NextResponse.json({ error: "Ticker inválido" }, { status: 400 });
    }

    const data = await execPythonPredict(ticker);
    return NextResponse.json(data);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
