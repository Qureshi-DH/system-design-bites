# Distributed Systems

The rules of the game once your system runs on more than one computer.

| Concept | In one line |
| --- | --- |
| [Network Partitions](network-partitions.md) | A network partition is when some machines can't reach others, even though they're all still running. It happens far more often than people expect, and it's the root of most distributed systems headaches. |
| [CAP Theorem](cap-theorem.md) | When the network splits a distributed database in two, each side has to choose: keep answering and risk stale data, or stop answering until it can be sure. You cannot have both. |
| [Strong Consistency](strong-consistency.md) | Strong consistency means a system with many copies of the data behaves as if there's only one. Once a write succeeds, every later read, from any server, sees it. |
| [Eventual Consistency](eventual-consistency.md) | Eventual consistency means replicas can disagree for a while, but if writes stop, they all end up with the same data. You get speed and availability, and you accept reads that are briefly stale. |
| [Quorum](quorum.md) | A quorum is the minimum number of replicas that must respond before a read or write counts. Pick the numbers right and every read is guaranteed to include at least one copy of the latest write. |

[Back to all concepts](../../README.md)
