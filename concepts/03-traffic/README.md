# Traffic and Edge

Everything that stands between a user's request and your code.

| Concept | In one line |
| --- | --- |
| [Load Balancing](load-balancing.md) | A load balancer sits in front of a group of servers and spreads incoming requests across them. Users see one address, and no server gets buried while its neighbors sit idle. |
| [Reverse Proxies](reverse-proxies.md) | A reverse proxy is a server that sits in front of your app servers and takes every request first. It handles chores like TLS, compression, and caching, and the outside world never talks to your app directly. |
| [API Gateways](api-gateways.md) | An API gateway is one front door for many backend services. Clients call one address, and the gateway handles routing, login checks, rate limits, and request shaping so each service doesn't have to. |
| [Rate Limiting](rate-limiting.md) | Rate limiting caps how many requests a client can send in a window of time. One noisy client gets slowed down, and everyone else keeps a fast service. |
| [CDN](cdn.md) | A CDN, or content delivery network, keeps copies of your static files on servers spread around the world. Users download from a server a few miles away instead of one across an ocean. |
| [Edge Caching](edge-caching.md) | Edge caching is the rulebook a CDN follows: what to cache, for how long, and how to tell two requests apart. Get the rules right and even API responses can be served from the edge. |

[Back to all concepts](../../README.md)
