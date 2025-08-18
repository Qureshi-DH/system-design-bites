# Concurrency and Runtime

Bugs that only appear when two things happen at once, and how memory behaves in long running services.

| Concept | In one line |
| --- | --- |
| [Race Conditions](race-conditions.md) | A race condition is a bug where the result depends on which of two operations gets there first. It hides in testing and shows up under real traffic, usually as lost money or a double booking. |
| [Thread Safety](thread-safety.md) | Code is thread safe when it still works with many threads calling it at the same moment. The danger is always the same thing: data that is both shared and changing. |
| [Event Loop](event-loop.md) | An event loop is one thread that runs short callbacks, one after another, while the waiting on networks and disks happens in the background. It juggles thousands of connections cheaply, until one slow callback stalls them all. |
| [Deadlocks](deadlocks.md) | A deadlock is two workers each holding a lock the other one needs, so both wait forever. Nothing crashes, things just stop. |
| [Optimistic Locking](optimistic-locking.md) | Optimistic locking lets everyone read and edit freely, then rejects a save if someone else changed the data first. Nobody waits, and conflicts get caught instead of silently overwritten. |
| [Pessimistic Locking](pessimistic-locking.md) | Pessimistic locking grabs a lock on the data before changing it, so anyone else who wants the same row waits their turn. It's the safe choice when many people fight over the same thing. |
| [Memory Leaks](memory-leaks.md) | A memory leak is memory your service keeps holding but will never use again. In a long running service it piles up for hours, until the process gets killed for running out of memory. |
| [Garbage Collection](garbage-collection.md) | Garbage collection (GC) frees memory your program no longer uses, so you never have to free it by hand. The price is that the collector sometimes pauses your app, and those pauses land on your slowest requests. |

[Back to all concepts](../../README.md)
