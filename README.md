# System Design Bites

System design concepts explained simply. One page per concept: the idea in one line, how it works, a real example, and a diagram.

Pages so far: 10

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

## Contributing

Found a mistake, or a sentence that made you read it twice? Open an issue or a pull request. The page format and writing rules are in [CONTRIBUTING.md](CONTRIBUTING.md).
