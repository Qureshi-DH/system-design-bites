# Databases

Storing data correctly first, then making it fast.

| Concept | In one line |
| --- | --- |
| [SQL vs NoSQL](sql-vs-nosql.md) | SQL databases store data in tables you can join and change together safely. NoSQL is a family of other shapes, each built to answer a few known questions fast at huge scale. |
| [ACID Transactions](acid-transactions.md) | A transaction groups several database changes so they all happen or none do. ACID is the four promises that make that true, even when users collide or the server loses power. |
| [Isolation Levels](isolation-levels.md) | Isolation levels decide how much transactions running at the same time can see of each other's work. Stricter levels prevent more strange bugs and cost you more waiting, retries, or both. |
| [MVCC](mvcc.md) | MVCC lets a database keep several versions of each row, so readers see a consistent snapshot while writers keep working. Nobody waits on anybody, but old versions pile up and have to be cleaned away. |

[Back to all concepts](../../README.md)
