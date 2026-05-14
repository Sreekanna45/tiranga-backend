create table users (
  id uuid primary key default gen_random_uuid(),
  phone text unique,
  name text,
  password_hash text,
  balance numeric default 0,
  status text default 'active',
  created_at timestamp default now()
);

create table admins (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  password_hash text,
  role text,
  created_at timestamp default now()
);

create table deposits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  gateway_payment_id text,
  amount numeric,
  status text default 'created',
  created_at timestamp default now()
);

create table withdrawals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  amount numeric,
  status text default 'pending',
  created_at timestamp default now()
);

create table bets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  round_id text,
  selected text,
  amount numeric,
  status text default 'pending',
  created_at timestamp default now()
);
