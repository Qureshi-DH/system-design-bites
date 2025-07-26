# Data at Scale

Copying and splitting data across many machines.

| Concept | In one line |
| --- | --- |
| [Replication](replication.md) | Replication keeps copies of the same data on several machines. If one dies, another already has everything, and you can spread reads across the copies. |
| [Read Replicas](read-replicas.md) | Read replicas are copies of your database that only serve reads. Most apps read far more than they write, so moving reads to replicas takes most of the load off the main database. |

[Back to all concepts](../../README.md)
