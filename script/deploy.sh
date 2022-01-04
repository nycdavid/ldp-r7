#! /bin/bash

export RAILS_ENV=production
export SECRET_KEY_BASE=foobarbaz

git pull origin main

bundle exec rake assets:precompile

touch tmp/restart.txt
