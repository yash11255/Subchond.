import { NextResponse } from "next/server";
// Leads are stored in Supabase (table schema: supabase/leads.sql) via its REST API — no SDK needed.
// Server-only env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (never expose to the browser).
const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export interface Lead {
  id: string;
  createdAt: string;
  name: string;
  age: string;
  gender: string;
  phone: string;
  action: string;
  question: string;
  summary: string;
}

type Row = Omit<Lead, "createdAt" | "id"> & { id: string; created_at: string };

function supabase(pathAndQuery: string, init: RequestInit = {}) {
  return fetch(`${SB_URL}/rest/v1/${pathAndQuery}`, {
    ...init,
    headers: {
      apikey: SB_KEY!,
      Authorization: `Bearer ${SB_KEY}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });
}

const notConfigured = () =>
  NextResponse.json({ error: "Database not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." }, { status: 503 });

const clip = (v: unknown, n: number) => String(v ?? "").slice(0, n);

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!b.name || !b.phone) return NextResponse.json({ error: "Name and phone required." }, { status: 400 });

  if (!SB_URL || !SB_KEY) return notConfigured();

  const res = await supabase("leads", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      name: clip(b.name, 100),
      age: clip(b.age, 3),
      gender: clip(b.gender, 10),
      phone: clip(b.phone, 20),
      action: clip(b.action, 10),
      question: clip(b.question, 500),
      summary: clip(b.summary, 1500),
    }),
  });
  if (!res.ok) return NextResponse.json({ error: "Could not save." }, { status: 502 });
  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass || req.headers.get("x-admin-password") !== pass) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!SB_URL || !SB_KEY) return notConfigured();

  const res = await supabase("leads?select=*&order=created_at.desc&limit=1000");
  if (!res.ok) return NextResponse.json({ error: "Could not load leads." }, { status: 502 });
  const rows: Row[] = await res.json();
  const leads: Lead[] = rows.map(({ created_at, ...r }) => ({ ...r, createdAt: created_at }) as Lead);
  return NextResponse.json({ leads });
}
