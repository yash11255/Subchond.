-- Run once in Supabase → SQL Editor
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  age text,
  gender text,
  phone text not null,
  action text,
  question text,
  summary text
);

-- Lock the table: only the server (service role key) can read/write
alter table public.leads enable row level security;
create index if not exists leads_created_at_idx on public.leads (created_at desc);
