output_file = Time.now.strftime("%Y%m%d-ldp-db")

`PGDATA=~/pgdata pg_dump ldp_development -U postgres -f #{output_file}`
