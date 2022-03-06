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
- Prepare the development and test databases
  - `rails db:migrate`
  - `rails db:test:prepare`
- Install any missing yarn packages: `yarn`
- Install any missing Ruby gems: `bundle`
- Start application processes: `./bin/dev`
