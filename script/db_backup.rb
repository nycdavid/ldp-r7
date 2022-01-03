require "fileutils"

output_file = Time.now.strftime("%Y%m%d-%H%M")
source = "./#{output_file}"
destination = "/Volumes/Storage/ldp-db-backups/#{output_file}"

`PGDATA=~/pgdata pg_dump ldp_development -U postgres -f #{output_file}`

FileUtils.mv(source, destination)
