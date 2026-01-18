import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 6;
const rateLimit = new Map<string, { count: number; resetAt: number }>();

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  website?: string;
};

export async function POST(request: Request) {
  let body: Partial<ContactPayload> = {};
  try {
    body = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientId =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const now = Date.now();
  const existing = rateLimit.get(clientId);
  if (!existing || now > existing.resetAt) {
    rateLimit.set(clientId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  } else if (existing.count >= RATE_LIMIT_MAX) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  } else {
    rateLimit.set(clientId, { count: existing.count + 1, resetAt: existing.resetAt });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const company = (body.company ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  if (message.length > 4000) {
    return NextResponse.json(
      { error: "Message is too long. Please keep it under 4000 characters." },
      { status: 400 }
    );
  }

  // Log the contact submission to file
  try {
    const logsDir = join(process.cwd(), "logs");
    if (!existsSync(logsDir)) {
      await mkdir(logsDir, { recursive: true });
    }

    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      name,
      email,
      company: company || null,
      message,
      source: "insites-site",
    };

    const logFileName = join(logsDir, "contact-submissions.jsonl");
    const logLine = JSON.stringify(logEntry) + "\n";
    await writeFile(logFileName, logLine, { flag: "a" });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to log contact submission:", error);
    return NextResponse.json(
      { error: "Unable to process your message right now. Please email insitesglobal@gmail.com directly." },
      { status: 500 }
    );
  }
}
