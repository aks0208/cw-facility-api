# cw-facility-app

## Build Setup

```bash
# requirements
$ node.js <= 17.3.0
$ redis
$ postgres

# install dependencies
$ npm install
$ node ace migration:run (migration:rollback - for rollback)
$ node ace db:seed

# serve with watch at localhost:3333
$ node ace serve --watch

```

