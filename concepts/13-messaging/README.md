# Messaging and Events

Letting services talk without waiting on each other.

| Concept | In one line |
| --- | --- |
| [Message Queues](message-queues.md) | A message queue is a waiting line for jobs. Producers drop work in, workers take it out at their own pace, and a traffic spike becomes a longer line instead of an outage. |
| [Pub/Sub](pub-sub.md) | In pub/sub, a publisher sends a message to a topic, and every subscriber to that topic gets its own copy. The publisher has no idea who is listening, so you can add listeners without touching it. |
| [Event Streaming](event-streaming.md) | Event streaming keeps every event in a durable, append only log that many readers move through at their own pace. Unlike a queue, reading doesn't delete anything, so you can replay last week whenever you need to. |
| [Event Driven Architecture](event-driven-architecture.md) | In an event driven architecture, services announce what happened instead of telling each other what to do. Others react on their own, which keeps teams decoupled but makes the overall flow much harder to see. |
| [Delivery Guarantees](delivery-guarantees.md) | A delivery guarantee tells you how a messaging system fails: it may lose a message, or it may deliver one twice. Knowing which one you have decides whether you drop orders or charge people twice. |

[Back to all concepts](../../README.md)
