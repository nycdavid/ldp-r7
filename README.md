# Getting started
## New setup
- Install development dependencies
  - Docker
  - nvm:
    - [Installation docs](https://github.com/nvm-sh/nvm#install--update-script)
  - node: `nvm install $(cat .nvmrc)`
  - Yarn: `npm install --global yarn`

## Every time you start a new card (also periodically)
- Start services: `docker-compose up -d`
- Install any missing Ruby gems: `bundle`
- Install any missing yarn packages: `yarn`
- Prepare the development and test databases
  - `bundle exec rake db:migrate`
  - `bundle exec rake db:test:prepare`
- Start application processes: `./bin/dev`
