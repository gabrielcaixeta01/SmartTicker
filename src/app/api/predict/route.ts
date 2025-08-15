import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

export async function POST(req: Request) {
  try {
    const { ticker } = await req.json();

    const scriptPath = path.join(process.cwd(), "python", "generate.py");
    const pythonPath = path.join(process.cwd(), ".venv", "bin", "python");
    const command = `${pythonPath} ${scriptPath} ${ticker}`;

    return new Promise((resolve) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("Erro ao executar script:", error);
          return resolve(
            NextResponse.json(
              { error: "Erro ao executar script Python" },
              { status: 500 }
            )
          );
        }

        if (stderr) {
          console.error("Stderr:", stderr);
        }

        try {
          const data = JSON.parse(stdout);
          return resolve(NextResponse.json(data));
        } catch (parseError) {
          console.error(
            "Erro ao fazer parse do stdout:",
            stdout,
            "Parse error:",
            parseError
          );
          return resolve(
            NextResponse.json(
              { error: "Erro ao interpretar JSON do Python" },
              { status: 500 }
            )
          );
        }
      });
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
