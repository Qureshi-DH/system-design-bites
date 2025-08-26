# Laws

Named laws and classic results that explain why systems, and the teams that build them, behave the way they do.

| Concept | In one line |
| --- | --- |
| [Fallacies of Distributed Computing](fallacies-of-distributed-computing.md) | Eight things everyone assumes about the network the first time they build a distributed system. All eight are false, and each one breeds its own family of production bugs. |
| [PACELC](pacelc.md) | PACELC extends CAP to normal days: during a Partition, pick Availability or Consistency, Else pick Latency or Consistency. That second choice hits every single request, not just the rare outage. |
| [Two Generals Problem](two-generals-problem.md) | Two machines talking over a link that can lose messages can never both be sure they agree. Every confirmation needs its own confirmation, forever, so real systems stop chasing certainty and make retries safe instead. |
| [Byzantine Generals Problem](byzantine-generals-problem.md) | The Byzantine Generals Problem asks how honest servers can agree when some of them lie. To survive f liars you need at least 3f + 1 nodes, and the consensus inside most databases doesn't even try. |
| [FLP Impossibility](flp-impossibility.md) | FLP proves that when messages can take any amount of time, a group of servers can't be guaranteed to finish agreeing if even one of them might crash. Real systems get around it by trusting timeouts. |
| [Amdahl's Law](amdahls-law.md) | Amdahl's Law says the part of a job that can't run in parallel caps your speedup. If 10% of the work must happen in order, a thousand machines still can't make it more than 10 times faster. |
| [Universal Scalability Law](universal-scalability-law.md) | The Universal Scalability Law predicts what happens to throughput as you add servers. Waiting on shared things flattens the curve, servers syncing with each other bends it down, and past the peak more servers get less done. |
| [Kingman's Formula](kingmans-formula.md) | Kingman's formula estimates how long work waits in a queue. Waiting grows like utilization over one minus utilization, so a worker that's 95% busy makes jobs wait about five times longer than one at 80%. |
| [Zipf's Law](zipfs-law.md) | Zipf's Law says popularity falls off with rank: the second most popular item gets about half the traffic of the first, the third about a third. That's why a small cache catches most requests, and why a few keys run hot. |
| [Pareto Principle](pareto-principle.md) | The Pareto principle is the rough pattern that most of an effect comes from a few causes, often quoted as 80/20. In systems work it means profile first, because a handful of endpoints or queries usually cause most of the slowness. |
| [Conway's Law](conways-law.md) | Systems end up shaped like the teams that build them. Two teams that rarely talk build two parts with a thin, awkward seam between them, so if you want a certain architecture, arrange the teams first. |
| [Hyrum's Law](hyrums-law.md) | Once enough people use your API, every behavior they can see becomes part of the contract, documented or not. Someone depends on your error text, your response order, and your timing. |
| [Gall's Law](galls-law.md) | Every complex system that works grew out of a simple system that worked. Design the complex version from scratch and it won't work, and no amount of patching will fix it. |
| [Postel's Law](postels-law.md) | Be strict in what you send and forgiving in what you accept. It helped the early internet's mismatched machines talk to each other, and taken too far, it turns everyone's bugs into permanent features. |
| [Goodhart's Law](goodharts-law.md) | Turn a metric into a target and people will find ways to hit the number without doing the thing it was meant to measure. The dashboard turns green and stops telling you anything. |
| [Brooks's Law](brooks-law.md) | Throw more engineers at a late software project and it usually ships even later. Newcomers need weeks to become useful, and every extra person adds conversations, so the team slows down before it speeds up. |

[Back to all concepts](../../README.md)
