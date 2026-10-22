import { NextResponse } from "next/server";
import { contactSchema, topicLabel } from "@/lib/contact";

/**
 * Riceve il form contatti e lo inoltra via email con Resend (https://resend.com).
 * Variabili d'ambiente (vedi .env.example):
 *   RESEND_API_KEY  chiave dell'account Resend
 *   CONTACT_TO      indirizzo che riceve i messaggi
 *   CONTACT_FROM    mittente; senza un dominio verificato usa onboarding@resend.dev
 * Senza chiave risponde 503 e il form apre l'app di posta del visitatore.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) },
      { status: 422 },
    );
  }

  const { name, email, topic, message, company } = parsed.data;

  // Un bot ha compilato il campo nascosto: fingiamo che sia andato tutto bene.
  if (company) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const to = process.env.CONTACT_TO ?? "sergiomaselli1@gmail.com";
  const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio: ${topicLabel(topic)} da ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nMotivo: ${topicLabel(topic)}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error("Invio con Resend non riuscito", res.status, await res.text());
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
