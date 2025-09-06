# Architecture

How to slice a system into pieces, and what each shape costs you.

| Concept | In one line |
| --- | --- |
| [Monolith vs Microservices](monolith-vs-microservices.md) | A monolith is one app you build and deploy as a single unit. Microservices split it into many small services that ship on their own, which buys team independence and costs you network calls, operations work, and data headaches. |
| [Service Discovery](service-discovery.md) | Service discovery is how one service finds the current addresses of another. When instances start, die, and move every few minutes, hard coded IP addresses stop working on day one. |
| [Service Mesh](service-mesh.md) | A service mesh puts a small proxy next to every service and sends all traffic through it. Retries, encryption, and traffic metrics happen in the proxy, so every team gets them without changing a line of code. |

[Back to all concepts](../../README.md)
