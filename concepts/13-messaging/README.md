# Messaging and Events

Letting services talk without waiting on each other.

| Concept | In one line |
| --- | --- |
| [Message Queues](message-queues.md) | A message queue is a waiting line for jobs. Producers drop work in, workers take it out at their own pace, and a traffic spike becomes a longer line instead of an outage. |
| [Pub/Sub](pub-sub.md) | In pub/sub, a publisher sends a message to a topic, and every subscriber to that topic gets its own copy. The publisher has no idea who is listening, so you can add listeners without touching it. |
| [Event Streaming](event-streaming.md) | Event streaming keeps every event in a durable, append only log that many readers move through at their own pace. Unlike a queue, reading doesn't delete anything, so you can replay last week whenever you need to. |

[Back to all concepts](../../README.md)
