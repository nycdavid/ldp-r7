# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.7.2"

gem "bootsnap", require: false
gem "importmap-rails"
gem "jsbundling-rails"
gem "pg"
gem "puma", "~> 5.6.2"
gem "rails", "~> 7.0.2.3"
gem "redis"
gem "redlock"
gem "sassc-rails"
gem "sprockets-rails"
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[mri mingw x64_mingw]
  gem "factory_bot_rails"
  gem "faker"
  gem "niceql"
  gem "pry"
  gem "rspec-rails", "~> 5.0.0"
end

group :development do
  gem "pry-rails"
  gem "rubocop", require: false
  gem "spring"
  gem "spring-commands-rspec"
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
  gem "test-prof", "~> 1.0"
  gem "webdrivers"
end
