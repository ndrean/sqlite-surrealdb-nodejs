# Comparison of SQLite and SurrealDB with Node.js

Stream a 6 MB (57.000 lines) CSV file from the web, insert into a DB, and run some queries (a count aggregation, and a single query)

## SQLite with Node.js

To test SQLite, just run:

```
node sqlite.mjs
```

## SurrealDB with Node.js

To run SurrealDB, run the server and use 2 terminals, one to upload from the web, and one to run the queries

Run a SurrealDB server:

```
surreal start  -u root -p root
```

Upload the data into a SurrealDB table:

```
node surreal.mjs
```

Run the queries:

```
node run.mjs
```
