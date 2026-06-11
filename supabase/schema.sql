create table if not exists matches (
  id text primary key,
  home text not null,
  away text not null,
  home_ku text,
  away_ku text,
  home_ar text,
  away_ar text,
  home_flag text default '🏳️',
  away_flag text default '🏳️',
  kickoff timestamptz not null,
  close_at timestamptz not null,
  home_score integer,
  away_score integer,
  winner_name text,
  winner_apartment text,
  created_at timestamptz default now()
);

create table if not exists predictions (
  id uuid primary key default gen_random_uuid(),
  match_id text references matches(id) on delete cascade,
  name text not null,
  phone text not null,
  apartment_code text not null,
  home_score integer not null,
  away_score integer not null,
  created_at timestamptz default now(),
  unique(match_id, phone),
  unique(match_id, apartment_code)
);

create table if not exists winner_history (
  match_id text primary key references matches(id) on delete cascade,
  game text,
  game_ku text,
  game_ar text,
  date timestamptz,
  winner_name text,
  apartment_code text,
  created_at timestamptz default now()
);

alter table matches add column if not exists home_ar text;
alter table matches add column if not exists away_ar text;
alter table winner_history add column if not exists game_ar text;
