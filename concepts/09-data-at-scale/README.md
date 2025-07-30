# Data at Scale

Copying and splitting data across many machines.

| Concept | In one line |
| --- | --- |
| [Replication](replication.md) | Replication keeps copies of the same data on several machines. If one dies, another already has everything, and you can spread reads across the copies. |
| [Read Replicas](read-replicas.md) | Read replicas are copies of your database that only serve reads. Most apps read far more than they write, so moving reads to replicas takes most of the load off the main database. |
| [Partitioning](partitioning.md) | Partitioning splits one big table into smaller pieces by a rule, like one piece per month. Queries only touch the pieces they need, and old data goes away in one cheap step. |
| [Sharding](sharding.md) | Sharding splits your data across several database servers, and each one holds a slice. It's how you grow past what one machine can store or write, and you pay for it in complexity forever. |
| [Consistent Hashing](consistent-hashing.md) | Consistent hashing puts servers and keys on the same circle, and each key belongs to the next server along it. Add or remove a server and only a small slice of keys moves, instead of nearly all of them. |
| [Hot Spots](hot-spots.md) | A hot spot is one key, shard, or server getting far more traffic than the rest. Spreading your data evenly doesn't help when everyone wants the same piece of it. |
| [Change Data Capture](change-data-capture.md) | Change data capture reads your database's own change log and turns every insert, update, and delete into an event. Search indexes, caches, and analytics stay in sync without your app writing to each one. |
| [Unique ID Generation](unique-id-generation.md) | Every order, message, and user needs an ID that never repeats. One database can just count, but once you have many servers, you need IDs that any machine can make without asking anyone else. |

[Back to all concepts](../../README.md)
