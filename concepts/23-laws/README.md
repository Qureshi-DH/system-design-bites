# Laws

Named laws and classic results that explain why systems, and the teams that build them, behave the way they do.

| Concept | In one line |
| --- | --- |
| [Amdahl's Law](amdahls-law.md) | Amdahl's Law says the part of a job that can't run in parallel caps your speedup. If 10% of the work must happen in order, a thousand machines still can't make it more than 10 times faster. |
| [Universal Scalability Law](universal-scalability-law.md) | The Universal Scalability Law predicts what happens to throughput as you add servers. Waiting on shared things flattens the curve, servers syncing with each other bends it down, and past the peak more servers get less done. |
| [Kingman's Formula](kingmans-formula.md) | Kingman's formula estimates how long work waits in a queue. Waiting grows like utilization over one minus utilization, so a worker that's 95% busy makes jobs wait about five times longer than one at 80%. |
| [Zipf's Law](zipfs-law.md) | Zipf's Law says popularity falls off with rank: the second most popular item gets about half the traffic of the first, the third about a third. That's why a small cache catches most requests, and why a few keys run hot. |
| [Pareto Principle](pareto-principle.md) | The Pareto principle is the rough pattern that most of an effect comes from a few causes, often quoted as 80/20. In systems work it means profile first, because a handful of endpoints or queries usually cause most of the slowness. |

[Back to all concepts](../../README.md)
