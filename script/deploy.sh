#! /bin/bash

export RAILS_ENV=production
export SECRET_KEY_BASE=foobarbaz
export RAILS_SERVE_STATIC_FILES=true

git pull origin main

bundle install
bundle exec rake assets:precompile
bundle exec rake db:migrate

kill -9 $(ps aux | grep [p]uma | awk '{print $2;}')
bundle exec rails s -b 0.0.0.0 --daemon
