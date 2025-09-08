# Architecture

How to slice a system into pieces, and what each shape costs you.

| Concept | In one line |
| --- | --- |
| [Monolith vs Microservices](monolith-vs-microservices.md) | A monolith is one app you build and deploy as a single unit. Microservices split it into many small services that ship on their own, which buys team independence and costs you network calls, operations work, and data headaches. |
| [Domain Driven Design](domain-driven-design.md) | Domain driven design builds software around how the business actually talks and works. Its big idea, bounded contexts, splits a large system into areas with their own language and model, and those areas make good service boundaries. |
| [Service Discovery](service-discovery.md) | Service discovery is how one service finds the current addresses of another. When instances start, die, and move every few minutes, hard coded IP addresses stop working on day one. |
| [Service Mesh](service-mesh.md) | A service mesh puts a small proxy next to every service and sends all traffic through it. Retries, encryption, and traffic metrics happen in the proxy, so every team gets them without changing a line of code. |
| [Backend for Frontend](backend-for-frontend.md) | A backend for frontend gives each kind of client, like the mobile app and the web app, its own small backend that shapes data for its screens. The team that builds the client owns it. |
| [Strangler Fig](strangler-fig.md) | The strangler fig pattern replaces a legacy system one piece at a time. A routing layer sends each feature to the new code once it is ready, and the old system shrinks until you can switch it off. |
| [Multitenancy](multitenancy.md) | Multitenancy means many customers, called tenants, share the same app and infrastructure. It keeps costs low, and it makes two things your problem: one tenant slowing everyone down, and one tenant seeing another's data. |
| [Serverless Limits](serverless-limits.md) | Serverless functions run your code on demand and bill by the millisecond, with no servers to manage. The trade is a set of hard limits on run time, memory, payload size, and concurrency that you have to design around. |
| [Cold Starts](cold-starts.md) | A cold start is the extra wait when a serverless platform has to boot a fresh copy of your function before it can answer. It adds anywhere from under 100 milliseconds to several seconds, usually right when traffic spikes. |

[Back to all concepts](../../README.md)
