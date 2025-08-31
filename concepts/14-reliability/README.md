# Reliability

Patterns that stop one failure from turning into an outage.

| Concept | In one line |
| --- | --- |
| [Timeouts](timeouts.md) | A timeout is how long you are willing to wait for a reply before giving up. Without one, a single slow dependency can freeze every request that touches it. |
| [Retries](retries.md) | A retry sends a failed call again, betting the failure was a blip. Done right, it hides a flaky network, and done wrong, it turns a small outage into a big one. |
| [Exponential Backoff](exponential-backoff.md) | Exponential backoff makes each retry wait twice as long as the last. Add a little randomness, and a crowd of failing clients spreads out instead of stampeding a server the moment it comes back. |
| [Idempotency](idempotency.md) | An idempotent operation gives the same result whether it runs once or ten times. It is what makes retries safe, so a flaky network never charges a customer twice. |
| [Circuit Breakers](circuit-breakers.md) | A circuit breaker stops calling a dependency that keeps failing and fails fast instead. Your service stays quick, and the broken one gets room to recover. |
| [Bulkheads](bulkheads.md) | A bulkhead gives each dependency its own small pool of threads or connections. When one dependency gets slow, it can only drown its own pool, and everything else keeps working. |
| [Load Shedding](load-shedding.md) | Load shedding is a server dropping some requests on purpose when it gets more than it can handle. Rejecting a fifth of them fast beats serving all of them too slowly to matter. |

[Back to all concepts](../../README.md)
