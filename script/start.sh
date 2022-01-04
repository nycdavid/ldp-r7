#! /bin/bash

export RAILS_ENV=production
export SECRET_KEY_BASE=foobarbaz

bundle exec rails s -b 0.0.0.0 --daemon
