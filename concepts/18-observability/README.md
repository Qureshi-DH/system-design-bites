# Observability

Knowing what your system is doing, and whether your users are happy.

| Concept | In one line |
| --- | --- |
| [Observability](observability.md) | Observability is how well you can answer new questions about your system using only what it already emits. With good observability, the next weird outage takes ten minutes to explain, not three days and a new deploy. |
| [Logging](logging.md) | Logs are the timestamped record of what your code did, one event per line. Done well, they let you rebuild exactly what happened to one request, at 3 AM, across ten services. |
| [Metrics](metrics.md) | Metrics are numbers your system records over time, like requests per second or memory in use. They're cheap to store and fast to graph, as long as you don't tag them with the wrong labels. |
| [Distributed Tracing](distributed-tracing.md) | Distributed tracing follows one request as it hops across all your services and records how long each hop took. When a request is slow, it shows you exactly where the time went. |

[Back to all concepts](../../README.md)
