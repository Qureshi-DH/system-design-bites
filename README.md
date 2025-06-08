# System Design Bites

System design concepts explained simply. One page per concept: the idea in one line, how it works, a real example, and a diagram.

Pages so far: 4

## All concepts

### 1. Performance

How fast your system feels, and how much work it can take before it slows down.

| Concept | In one line |
| --- | --- |
| [Latency](concepts/01-performance/latency.md) | Latency is how long one request takes, from the moment it leaves the client to the moment the answer lands. Users feel every millisecond of it, so it's the number they actually judge you on. |
| [Throughput](concepts/01-performance/throughput.md) | Throughput is how much work a system finishes per second, counted in requests, messages, or bytes. Latency is how long one job takes, and throughput is how many jobs get done. |
| [P99 Latency](concepts/01-performance/p99-latency.md) | P99 latency is the response time that 99 percent of requests beat. It shows how slow things get for the unlucky 1 in 100, which an average hides completely. |
| [Tail Latency](concepts/01-performance/tail-latency.md) | Tail latency is the slow end of your response times, the p99 and beyond. When one request fans out to many services, it waits for the slowest one, so rare slowness in each service becomes common slowness for users. |

## Contributing

Found a mistake, or a sentence that made you read it twice? Open an issue or a pull request. The page format and writing rules are in [CONTRIBUTING.md](CONTRIBUTING.md).
