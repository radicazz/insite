import { NextResponse } from "next/server";

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

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      {
        error:
          "Contact is temporarily unavailable. Please email insitesglobal@gmail.com.",
      },
      { status: 503 }
    );
  }

  const webhookSecret = process.env.CONTACT_WEBHOOK_SECRET;
  const forwardResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(webhookSecret ? { "x-contact-secret": webhookSecret } : {}),
    },
    body: JSON.stringify({
      name,
      email,
      company: company || undefined,
      message,
      receivedAt: new Date().toISOString(),
      source: "insites-site",
    }),
  });

  if (!forwardResponse.ok) {
    return NextResponse.json(
      { error: "Unable to deliver your message right now. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
