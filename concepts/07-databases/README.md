# Databases

Storing data correctly first, then making it fast.

| Concept | In one line |
| --- | --- |
| [SQL vs NoSQL](sql-vs-nosql.md) | SQL databases store data in tables you can join and change together safely. NoSQL is a family of other shapes, each built to answer a few known questions fast at huge scale. |
| [ACID Transactions](acid-transactions.md) | A transaction groups several database changes so they all happen or none do. ACID is the four promises that make that true, even when users collide or the server loses power. |
| [Isolation Levels](isolation-levels.md) | Isolation levels decide how much transactions running at the same time can see of each other's work. Stricter levels prevent more strange bugs and cost you more waiting, retries, or both. |
| [MVCC](mvcc.md) | MVCC lets a database keep several versions of each row, so readers see a consistent snapshot while writers keep working. Nobody waits on anybody, but old versions pile up and have to be cleaned away. |
| [Database Indexing](database-indexing.md) | An index is a sorted copy of one or more columns that points back to the full rows. It turns "read every row" into "jump straight there", and every index you add slows down writes. |
| [Query Optimization](query-optimization.md) | Query optimization is finding out why a query is slow and fixing it, usually by reading the plan the database made for it. Most slow queries read far more rows than they return. |
| [N+1 Queries](n-plus-one-queries.md) | An N+1 query happens when code fetches a list with one query, then runs one more query for every item in it. It looks harmless with 3 rows and buries your database with 3,000. |

[Back to all concepts](../../README.md)
