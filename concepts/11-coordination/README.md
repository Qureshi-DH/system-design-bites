# Coordination

Getting many machines to agree on who is in charge and what happened.

| Concept | In one line |
| --- | --- |
| [Leader Election](leader-election.md) | Leader election picks exactly one server out of several to do a job that must not run twice, and picks a new one fast when that server dies. |
| [Consensus](consensus.md) | Consensus lets a group of servers agree on the same ordered list of changes, even while some of them are down. A change counts once a majority has saved it. |
| [Split Brain](split-brain.md) | Split brain is when two servers both believe they are the leader and both accept writes. Your data forks into two histories, and someone has to stitch them back together by hand. |
| [Distributed Locks](distributed-locks.md) | A distributed lock makes sure only one process, across many machines, works on a thing at a time. The hard part isn't taking the lock, it's knowing you still hold it. |

[Back to all concepts](../../README.md)
