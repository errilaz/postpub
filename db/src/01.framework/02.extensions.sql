create schema extensions;

create extension citext with schema extensions;

grant usage on schema extensions to postgres, api;

set search_path to "$user",public,extensions;
