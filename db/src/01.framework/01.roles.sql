create role api nologin noinherit;
grant usage on schema public to postgres, api;
alter default privileges in schema public grant all on tables to postgres, api;
alter default privileges in schema public grant all on functions to postgres, api;
alter default privileges in schema public grant all on sequences to postgres, api;

do $$ begin
  execute format('create user app with password %L login noinherit',  current_setting('postpub.app_pass'));
end $$;

grant api to app;
