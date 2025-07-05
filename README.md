# System Design Bites

System design concepts explained simply. One page per concept: the idea in one line, how it works, a real example, and a diagram.

Pages so far: 36

## All concepts

### 1. Performance

How fast your system feels, and how much work it can take before it slows down.

| Concept | In one line |
| --- | --- |
| [Latency](concepts/01-performance/latency.md) | Latency is how long one request takes, from the moment it leaves the client to the moment the answer lands. Users feel every millisecond of it, so it's the number they actually judge you on. |
| [Throughput](concepts/01-performance/throughput.md) | Throughput is how much work a system finishes per second, counted in requests, messages, or bytes. Latency is how long one job takes, and throughput is how many jobs get done. |
| [P99 Latency](concepts/01-performance/p99-latency.md) | P99 latency is the response time that 99 percent of requests beat. It shows how slow things get for the unlucky 1 in 100, which an average hides completely. |
| [Tail Latency](concepts/01-performance/tail-latency.md) | Tail latency is the slow end of your response times, the p99 and beyond. When one request fans out to many services, it waits for the slowest one, so rare slowness in each service becomes common slowness for users. |
| [Little's Law](concepts/01-performance/littles-law.md) | Little's Law says the number of requests in flight equals the arrival rate times how long each one stays. Know any two and you get the third, which is how you size thread pools, connection pools, and queues. |
| [Back of the Envelope Math](concepts/01-performance/back-of-the-envelope-math.md) | Back of the envelope math is estimating traffic, storage, and bandwidth in a few minutes with round numbers. Landing within a factor of 10 of the truth is enough to pick the right design. |

### 2. Scaling

Growing from one server to many without falling over.

| Concept | In one line |
| --- | --- |
| [Vertical Scaling](concepts/02-scaling/vertical-scaling.md) | Vertical scaling means making one machine bigger: more CPU, more memory, faster disks. It's the simplest way to handle more load, right up until you hit the biggest machine you can buy. |
| [Horizontal Scaling](concepts/02-scaling/horizontal-scaling.md) | Horizontal scaling means adding more machines instead of bigger ones. Ten small servers behind a load balancer can take ten times the traffic, and losing one of them is a shrug, not an outage. |
| [Stateless Services](concepts/02-scaling/stateless-services.md) | A stateless service keeps nothing about users in its own memory between requests. Any server can handle any request, so you can add, remove, or restart servers and nobody notices. |
| [Sticky Sessions](concepts/02-scaling/sticky-sessions.md) | Sticky sessions make a load balancer send every request from the same user to the same server. They're a quick fix for servers that keep state in memory, and they quietly undo much of what the load balancer was for. |
| [Autoscaling](concepts/02-scaling/autoscaling.md) | Autoscaling adds servers when load rises and removes them when it falls, based on a metric you pick. You pay for the traffic you have, not the traffic you're afraid of. |
| [Single Point of Failure](concepts/02-scaling/single-point-of-failure.md) | A single point of failure is one part whose failure takes the whole system down with it. Every system starts with a few, so the job is to find them before they find you. |
| [High Availability](concepts/02-scaling/high-availability.md) | High availability means a system keeps serving through the failures that will happen anyway: dead servers, bad disks, a lost data center. It's measured in nines, and each extra nine costs far more than the last. |

### 3. Traffic and Edge

Everything that stands between a user's request and your code.

| Concept | In one line |
| --- | --- |
| [Load Balancing](concepts/03-traffic/load-balancing.md) | A load balancer sits in front of a group of servers and spreads incoming requests across them. Users see one address, and no server gets buried while its neighbors sit idle. |
| [Reverse Proxies](concepts/03-traffic/reverse-proxies.md) | A reverse proxy is a server that sits in front of your app servers and takes every request first. It handles chores like TLS, compression, and caching, and the outside world never talks to your app directly. |
| [API Gateways](concepts/03-traffic/api-gateways.md) | An API gateway is one front door for many backend services. Clients call one address, and the gateway handles routing, login checks, rate limits, and request shaping so each service doesn't have to. |
| [Rate Limiting](concepts/03-traffic/rate-limiting.md) | Rate limiting caps how many requests a client can send in a window of time. One noisy client gets slowed down, and everyone else keeps a fast service. |
| [CDN](concepts/03-traffic/cdn.md) | A CDN, or content delivery network, keeps copies of your static files on servers spread around the world. Users download from a server a few miles away instead of one across an ocean. |
| [Edge Caching](concepts/03-traffic/edge-caching.md) | Edge caching is the rulebook a CDN follows: what to cache, for how long, and how to tell two requests apart. Get the rules right and even API responses can be served from the edge. |

### 4. Networking and Real Time

How bytes actually travel, and how servers push updates to users.

| Concept | In one line |
| --- | --- |
| [DNS](concepts/04-networking/dns.md) | DNS is the internet's phone book. It turns a name like `shop.example.com` into an IP address your computer can connect to, and its caching is why a DNS change can take hours to reach everyone. |
| [Anycast](concepts/04-networking/anycast.md) | Anycast puts the same IP address in many places at once, and internet routing sends each user to the closest one by network path. It powers DNS root servers, CDNs, and DDoS defense. |
| [TCP vs UDP](concepts/04-networking/tcp-vs-udp.md) | TCP and UDP are the two main ways to move data across the internet. TCP guarantees every byte arrives, in order, while UDP fires packets and hopes, which makes it faster when late data is useless anyway. |
| [HTTP/2 and HTTP/3](concepts/04-networking/http2-and-http3.md) | HTTP/2 and HTTP/3 let one connection carry many requests at the same time, instead of one after another. Pages with dozens of files load faster, and HTTP/3 also copes better with flaky mobile networks. |
| [Head of Line Blocking](concepts/04-networking/head-of-line-blocking.md) | Head of line blocking is when one slow or lost item at the front of a line holds up everything behind it. On the web it shows up twice: once in HTTP/1.1, and again inside TCP. |
| [Long Polling](concepts/04-networking/long-polling.md) | Long polling fakes server push with plain HTTP. The client asks "anything new?" and the server holds the request open until it has news or a timeout hits, then the client asks again. |
| [Server Sent Events](concepts/04-networking/server-sent-events.md) | Server Sent Events keep one HTTP response open so the server can push a stream of text updates to the browser. It is the simplest way to send live updates one way, from server to client. |
| [WebSockets](concepts/04-networking/websockets.md) | A WebSocket is one long lived connection where the client and the server can both send messages at any moment. It is the standard choice for chat, multiplayer games, and live collaboration. |

### 5. APIs

How apps and services talk to each other, and how to change that contract without breaking anyone.

| Concept | In one line |
| --- | --- |
| [REST](concepts/05-apis/rest.md) | REST is the most common way to design a web API. Everything is a resource with its own URL, and you act on it with standard HTTP methods like GET, POST, and DELETE. |
| [GraphQL](concepts/05-apis/graphql.md) | GraphQL lets the client ask for exactly the fields it needs, across related data, in one request. You trade simple URLs and easy caching for flexibility, plus a server that has to defend itself from expensive queries. |
| [gRPC](concepts/05-apis/grpc.md) | gRPC lets one service call a function on another service as if it were local, sending compact binary messages over HTTP/2. It is fast, strictly typed, and a favorite for traffic between your own backend services. |
| [Webhooks](concepts/05-apis/webhooks.md) | A webhook is an HTTP request another service sends to your server when something happens, like "payment succeeded". Instead of you asking over and over, they call you, so you have to verify, dedupe, and answer fast. |
| [Pagination](concepts/05-apis/pagination.md) | Pagination splits a big list into pages so an API never returns a million rows at once. Offset pagination is simple but slows down and skips rows on big, changing tables, while cursor pagination stays fast and stable. |
| [API Versioning](concepts/05-apis/api-versioning.md) | API versioning lets you change an API without breaking the apps already using it. Old clients keep the old behavior, new clients opt into the new one, and the old version retires on a schedule. |
| [Serialization Formats](concepts/05-apis/serialization-formats.md) | Serialization turns the objects in your program into bytes you can send or store. JSON is readable and works everywhere, while binary formats like Protobuf and Avro are smaller, faster, and come with schemas that make change safer. |

### 6. Caching

Keeping answers close so you never fetch or compute the same thing twice.

| Concept | In one line |
| --- | --- |
| [Caching](concepts/06-caching/caching.md) | A cache keeps a copy of data somewhere faster and closer than where it really lives. Reads that hit the copy skip the slow trip, which makes apps quicker and keeps databases from melting. |
| [Caching Strategies](concepts/06-caching/caching-strategies.md) | A caching strategy is the rule for how reads and writes move between your cache and your database. Pick the wrong one and you serve stale data, lose writes, or fill the cache with junk. |

## Contributing

Found a mistake, or a sentence that made you read it twice? Open an issue or a pull request. The page format and writing rules are in [CONTRIBUTING.md](CONTRIBUTING.md).
