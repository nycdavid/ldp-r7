#! /bin/bash

git pull origin main

bundle install
bundle exec rake assets:clean
bundle exec rake assets:precompile
bundle exec rake db:migrate

kill -9 $(ps aux | grep [p]uma | awk '{print $2;}')
bundle exec rails s -b 0.0.0.0 --daemon
