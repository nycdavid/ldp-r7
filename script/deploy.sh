#! /bin/bash

export RAILS_ENV=production
export SECRET_KEY_BASE=foobarbaz
export RAILS_SERVE_STATIC_FILES=true

git pull origin main

bundle exec rake assets:precompile
bundle exec rake db:migrate

touch tmp/restart.txt
