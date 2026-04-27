create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  customer_name text,
  customer_email text,
  customer_phone text,
  customer_cpf text,
  total_amount numeric,
  payment_method text,
  zip_code text,
  address_street text,
  address_number text,
  address_complement text,
  address_neighborhood text,
  address_city text,
  address_state text,
  card_last4 text,
  card_name text,
  card_expiry text,
  installments text,
  items jsonb,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.orders enable row level security;

drop policy if exists "Allow public insert" on public.orders;
drop policy if exists "Allow authenticated select" on public.orders;

create policy "Allow public insert"
on public.orders
for insert
with check (true);

create policy "Allow authenticated select"
on public.orders
for select
to authenticated
using (true);