# Data at Scale

Copying and splitting data across many machines.

| Concept | In one line |
| --- | --- |
| [Replication](replication.md) | Replication keeps copies of the same data on several machines. If one dies, another already has everything, and you can spread reads across the copies. |
| [Read Replicas](read-replicas.md) | Read replicas are copies of your database that only serve reads. Most apps read far more than they write, so moving reads to replicas takes most of the load off the main database. |
| [Partitioning](partitioning.md) | Partitioning splits one big table into smaller pieces by a rule, like one piece per month. Queries only touch the pieces they need, and old data goes away in one cheap step. |
| [Sharding](sharding.md) | Sharding splits your data across several database servers, and each one holds a slice. It's how you grow past what one machine can store or write, and you pay for it in complexity forever. |

[Back to all concepts](../../README.md)
