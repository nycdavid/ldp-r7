#! /bin/bash

export RAILS_ENV=production
export SECRET_KEY_BASE=foobarbaz
export RAILS_SERVE_STATIC_FILES=true

bundle exec rails s -b 0.0.0.0 --daemon
