# Gearshaft Example Projection

An example is often worth a thousand words. This repository is provided as an example of how to leverage Gearshaft to run autonomous components. There is a `registration` component which is setup to be run inside a single `host`.

## Quick Start

1. Run a Postgres instance
2. Provision a message store database
3. Configure the Postgres credentials used by the example
4. Run the tests: `npm run test`
5. Run the host: `npm run dev`
6. Write a test message: `node registration/test/interactive/create-registration.js`

### Running Postgres

Use Docker to run Postgres or install Postgres from scratch. The automated tests expect the following defaults which can be overriden:

  - HOST: `localhost`
  - PORT: `5432` (Postgres default)
  - USER: `postgres`
  - PASS: `NInAN5t3kJo8d7I3`


You can run Postgres with docker as follows:

```
docker run --name pg -d -p 5432:5432 -e POSTGRES_PASSWORD=NInAN5t3kJo8d7I3 postgres:10.5
```

Terminate Postgres and delete all data as follow:

```
docker rm -fv pg
```

### Provisioning Message Store Database

1. Install the Postgres client (psql)

   Ubuntu: `sudo apt install postgresql-client`

2. (Re)create the message store database and user credentials

   If you are using the default (compromised) credentials, simply run: `npm run recreate`; otherwise, customize the following commands as necessary:

   1. Create the message_store database:

      ```
      PGHOST=localhost \
        PGUSER=postgres \
        PGPASSWORD=NInAN5t3kJo8d7I3 \
        ./gems/bin/evt-pg-recreate-db
      ```

   2. Assign the message_store user a password:

      ```
      PGHOST=localhost \
        PGUSER=postgres \
        PGPASSWORD=NInAN5t3kJo8d7I3 \
        psql -c "alter role message_store with password 'NInAN5t3kJo8d7I3';"
      ```

### Configuring Postgres Credentials

The configuration is managed using the [rc module](https://www.npmjs.com/package/rc). Create a `.gearshaft_examplerc` file in the project root directory with the following fields to customize the Postgres connection settings:

```
{
  "postgres": {
    "host": "some-host-name",
    "user": "some-pg-user",
    "password": "some-pg-pass",
    "database": "some-pg-database"
  }
}
```
