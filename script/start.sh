#! /bin/bash

RAILS_ENV=production SECRET_KEY_BASE=foobarbaz bundle exec rails s -b 0.0.0.0 --daemon
