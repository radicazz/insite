import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  website?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ContactPayload>;

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

  console.log("Contact request", {
    name,
    email,
    company: company || undefined,
    message,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
