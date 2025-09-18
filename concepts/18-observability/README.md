# Observability

Knowing what your system is doing, and whether your users are happy.

| Concept | In one line |
| --- | --- |
| [Observability](observability.md) | Observability is how well you can answer new questions about your system using only what it already emits. With good observability, the next weird outage takes ten minutes to explain, not three days and a new deploy. |
| [Logging](logging.md) | Logs are the timestamped record of what your code did, one event per line. Done well, they let you rebuild exactly what happened to one request, at 3 AM, across ten services. |
| [Metrics](metrics.md) | Metrics are numbers your system records over time, like requests per second or memory in use. They're cheap to store and fast to graph, as long as you don't tag them with the wrong labels. |
| [Distributed Tracing](distributed-tracing.md) | Distributed tracing follows one request as it hops across all your services and records how long each hop took. When a request is slow, it shows you exactly where the time went. |
| [Monitoring](monitoring.md) | Monitoring is watching your system for the failures you already know can happen, using dashboards and automatic checks. It tells you something broke, fast, so you aren't the last to find out. |
| [Alerts](alerts.md) | An alert wakes a human when something needs fixing right now. Page on what users feel, make every page actionable, and keep the volume low enough that people still take each one seriously. |
| [SLIs](slis.md) | A service level indicator is a number that measures how your service feels to users, like the percent of requests answered successfully in under 300 ms. Every reliability target is built on one. |
| [SLOs](slos.md) | A service level objective is the target you set for an SLI over a time window, like 99.9 percent of checkouts succeeding over 30 days. It turns "are we reliable enough?" into a yes or no question. |
| [SLAs](slas.md) | A service level agreement is a contract that promises customers a level of service and spells out what you owe them if you miss it. It should always be looser than the target you hold yourself to internally. |
| [Error Budgets](error-budgets.md) | An error budget is the amount of failure your SLO allows: 100 percent minus the target. While budget is left you ship fast, and when it runs out, risky changes stop until reliability recovers. |

[Back to all concepts](../../README.md)
