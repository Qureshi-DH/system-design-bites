# Databases

Storing data correctly first, then making it fast.

| Concept | In one line |
| --- | --- |
| [SQL vs NoSQL](sql-vs-nosql.md) | SQL databases store data in tables you can join and change together safely. NoSQL is a family of other shapes, each built to answer a few known questions fast at huge scale. |
| [ACID Transactions](acid-transactions.md) | A transaction groups several database changes so they all happen or none do. ACID is the four promises that make that true, even when users collide or the server loses power. |
| [Isolation Levels](isolation-levels.md) | Isolation levels decide how much transactions running at the same time can see of each other's work. Stricter levels prevent more strange bugs and cost you more waiting, retries, or both. |
| [MVCC](mvcc.md) | MVCC lets a database keep several versions of each row, so readers see a consistent snapshot while writers keep working. Readers and writers don't wait on each other, but old versions pile up and have to be cleaned away. |
| [Database Indexing](database-indexing.md) | An index is a sorted copy of one or more columns that points back to the full rows. It turns "read every row" into "jump straight there", and every index you add slows down writes. |
| [Query Optimization](query-optimization.md) | Query optimization is finding out why a query is slow and fixing it, usually by reading the plan the database made for it. Most slow queries read far more rows than they return. |
| [N+1 Queries](n-plus-one-queries.md) | An N+1 query happens when code fetches a list with one query, then runs one more query for every item in it. It looks harmless with 3 rows and buries your database with 3,000. |
| [Connection Pooling](connection-pooling.md) | A connection pool keeps a few database connections open and lends them to requests, instead of opening a fresh one each time. It saves time on every query and keeps the database from drowning in connections. |
| [Normalization vs Denormalization](normalization-vs-denormalization.md) | Normalization stores each fact in exactly one place and joins tables when you read. Denormalization copies facts to where they're read, trading extra writes and the risk of drift for faster queries. |
| [Materialized Views](materialized-views.md) | A materialized view saves the result of an expensive query as a real table. Reads become nearly instant, and the price is that the data is only as fresh as the last refresh. |
| [Database Migrations](database-migrations.md) | A database migration changes the schema of a live database: adding columns, renaming them, building indexes. Done carelessly, it locks a busy table or breaks the servers still running old code. |
| [Schema Versioning](schema-versioning.md) | Schema versioning tracks which shape of data each database holds and each piece of code expects. It lets you change tables and event formats without old readers choking on new data. |

[Back to all concepts](../../README.md)
