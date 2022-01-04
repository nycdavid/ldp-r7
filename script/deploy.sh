#! /bin/bash

git pull origin main

bundle exec rake assets:precompile

touch tmp/restart.txt
