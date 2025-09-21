# System Design Bites

System design concepts explained simply. One page per concept: the idea in one line, how it works, a real example, and a diagram.

Pages so far: 193

## Start here

New to all of this? Read these in order. Together they tell the story of how most web systems grow up.

1. [Latency](concepts/01-performance/latency.md): how slow is slow
2. [Horizontal Scaling](concepts/02-scaling/horizontal-scaling.md): growing past one server
3. [Load Balancing](concepts/03-traffic/load-balancing.md): spreading the traffic
4. [Caching](concepts/06-caching/caching.md): the cheapest speedup there is
5. [Database Indexing](concepts/07-databases/database-indexing.md): making queries fast
6. [Replication](concepts/09-data-at-scale/replication.md): never keeping one copy
7. [Sharding](concepts/09-data-at-scale/sharding.md): when one database is not enough
8. [CAP Theorem](concepts/10-distributed-systems/cap-theorem.md): the tradeoff behind every distributed database
9. [Message Queues](concepts/13-messaging/message-queues.md): doing work later
10. [Idempotency](concepts/14-reliability/idempotency.md): making retries safe
11. [Observability](concepts/18-observability/observability.md): seeing what is going on

After that, jump to any section below. Every page links to its neighbors, so it is easy to wander.

## All concepts

### 1. Performance

How fast your system feels, and how much work it can take before it slows down. [Open section](concepts/01-performance/README.md)

| Concept | In one line |
| --- | --- |
| [Latency](concepts/01-performance/latency.md) | Latency is how long one request takes, from the moment it leaves the client to the moment the answer lands. Users feel every millisecond of it, so it's the number they actually judge you on. |
| [Throughput](concepts/01-performance/throughput.md) | Throughput is how much work a system finishes per second, counted in requests, messages, or bytes. Latency is how long one job takes, and throughput is how many jobs get done. |
| [P99 Latency](concepts/01-performance/p99-latency.md) | P99 latency is the response time that 99 percent of requests beat. It shows how slow things get for the unlucky 1 in 100, which an average hides completely. |
| [Tail Latency](concepts/01-performance/tail-latency.md) | Tail latency is the slow end of your response times, the p99 and beyond. When one request fans out to many services, it waits for the slowest one, so rare slowness in each service becomes common slowness for users. |
| [Little's Law](concepts/01-performance/littles-law.md) | Little's Law says the number of requests in flight equals the arrival rate times how long each one stays. Know any two and you get the third, which is how you size thread pools, connection pools, and queues. |
| [Back of the Envelope Math](concepts/01-performance/back-of-the-envelope-math.md) | Back of the envelope math is estimating traffic, storage, and bandwidth in a few minutes with round numbers. Landing within a factor of 10 of the truth is enough to pick the right design. |

### 2. Scaling

Growing from one server to many without falling over. [Open section](concepts/02-scaling/README.md)

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

Everything that stands between a user's request and your code. [Open section](concepts/03-traffic/README.md)

| Concept | In one line |
| --- | --- |
| [Load Balancing](concepts/03-traffic/load-balancing.md) | A load balancer sits in front of a group of servers and spreads incoming requests across them. Users see one address, and no server gets buried while its neighbors sit idle. |
| [Reverse Proxies](concepts/03-traffic/reverse-proxies.md) | A reverse proxy is a server that sits in front of your app servers and takes every request first. It handles chores like TLS, compression, and caching, and the outside world never talks to your app directly. |
| [API Gateways](concepts/03-traffic/api-gateways.md) | An API gateway is one front door for many backend services. Clients call one address, and the gateway handles routing, login checks, rate limits, and request shaping so each service doesn't have to. |
| [Rate Limiting](concepts/03-traffic/rate-limiting.md) | Rate limiting caps how many requests a client can send in a window of time. One noisy client gets slowed down, and everyone else keeps a fast service. |
| [CDN](concepts/03-traffic/cdn.md) | A CDN, or content delivery network, keeps copies of your static files on servers spread around the world. Users download from a server a few miles away instead of one across an ocean. |
| [Edge Caching](concepts/03-traffic/edge-caching.md) | Edge caching is the rulebook a CDN follows: what to cache, for how long, and how to tell two requests apart. Get the rules right and even API responses can be served from the edge. |

### 4. Networking and Real Time

How bytes actually travel, and how servers push updates to users. [Open section](concepts/04-networking/README.md)

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

How apps and services talk to each other, and how to change that contract without breaking anyone. [Open section](concepts/05-apis/README.md)

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

Keeping answers close so you never fetch or compute the same thing twice. [Open section](concepts/06-caching/README.md)

| Concept | In one line |
| --- | --- |
| [Caching](concepts/06-caching/caching.md) | A cache keeps a copy of data somewhere faster and closer than where it really lives. Reads that hit the copy skip the slow trip, which makes apps quicker and keeps databases from melting. |
| [Caching Strategies](concepts/06-caching/caching-strategies.md) | A caching strategy is the rule for how reads and writes move between your cache and your database. Pick the wrong one and you serve stale data, lose writes, or fill the cache with junk. |
| [Cache Eviction](concepts/06-caching/cache-eviction.md) | A cache has limited memory, so when it fills up, something has to go. The eviction policy decides what gets thrown out, and a good one keeps the data people actually ask for. |
| [Cache Invalidation](concepts/06-caching/cache-invalidation.md) | Cache invalidation means removing a cached copy when the real data changes. Get it wrong and users keep seeing old prices, old names, or the plan they already paid to upgrade from. |
| [Cache Stampede](concepts/06-caching/cache-stampede.md) | A cache stampede happens when a popular cached value expires and thousands of requests miss at the same moment, all rushing the database to rebuild it. The database falls over right when traffic is highest. |

### 7. Databases

Storing data correctly first, then making it fast. [Open section](concepts/07-databases/README.md)

| Concept | In one line |
| --- | --- |
| [SQL vs NoSQL](concepts/07-databases/sql-vs-nosql.md) | SQL databases store data in tables you can join and change together safely. NoSQL is a family of other shapes, each built to answer a few known questions fast at huge scale. |
| [ACID Transactions](concepts/07-databases/acid-transactions.md) | A transaction groups several database changes so they all happen or none do. ACID is the four promises that make that true, even when users collide or the server loses power. |
| [Isolation Levels](concepts/07-databases/isolation-levels.md) | Isolation levels decide how much transactions running at the same time can see of each other's work. Stricter levels prevent more strange bugs and cost you more waiting, retries, or both. |
| [MVCC](concepts/07-databases/mvcc.md) | MVCC lets a database keep several versions of each row, so readers see a consistent snapshot while writers keep working. Nobody waits on anybody, but old versions pile up and have to be cleaned away. |
| [Database Indexing](concepts/07-databases/database-indexing.md) | An index is a sorted copy of one or more columns that points back to the full rows. It turns "read every row" into "jump straight there", and every index you add slows down writes. |
| [Query Optimization](concepts/07-databases/query-optimization.md) | Query optimization is finding out why a query is slow and fixing it, usually by reading the plan the database made for it. Most slow queries read far more rows than they return. |
| [N+1 Queries](concepts/07-databases/n-plus-one-queries.md) | An N+1 query happens when code fetches a list with one query, then runs one more query for every item in it. It looks harmless with 3 rows and buries your database with 3,000. |
| [Connection Pooling](concepts/07-databases/connection-pooling.md) | A connection pool keeps a few database connections open and lends them to requests, instead of opening a fresh one each time. It saves time on every query and keeps the database from drowning in connections. |
| [Normalization vs Denormalization](concepts/07-databases/normalization-vs-denormalization.md) | Normalization stores each fact in exactly one place and joins tables when you read. Denormalization copies facts to where they're read, trading extra writes and the risk of drift for faster queries. |
| [Materialized Views](concepts/07-databases/materialized-views.md) | A materialized view saves the result of an expensive query as a real table. Reads become nearly instant, and the price is that the data is only as fresh as the last refresh. |
| [Database Migrations](concepts/07-databases/database-migrations.md) | A database migration changes the schema of a live database: adding columns, renaming them, building indexes. Done carelessly, it locks a busy table or breaks the servers still running old code. |
| [Schema Versioning](concepts/07-databases/schema-versioning.md) | Schema versioning tracks which shape of data each database holds and each piece of code expects. It lets you change tables and event formats without old readers choking on new data. |

### 8. Storage and Search

What happens inside a database, plus special stores for files, text, and maps. [Open section](concepts/08-storage/README.md)

| Concept | In one line |
| --- | --- |
| [Storage Engines](concepts/08-storage/storage-engines.md) | A storage engine is the part of a database that decides how bytes sit on disk. B trees favor fast reads, LSM trees favor fast writes, and that one choice shapes everything above it. |
| [Write Ahead Log](concepts/08-storage/write-ahead-log.md) | A write ahead log is an append only file where a database records every change before applying it. If the server crashes, the database replays the log and every committed change comes back. |
| [Object Storage](concepts/08-storage/object-storage.md) | Object storage, like Amazon S3, keeps files of any size under a key inside a bucket. It's cheap, practically bottomless, and very durable, but it is not a disk you can edit in place. |
| [Full Text Search](concepts/08-storage/full-text-search.md) | Full text search finds documents by the words inside them and ranks the best matches first. It builds an inverted index ahead of time, so a search never has to scan every row. |
| [Vector Search](concepts/08-storage/vector-search.md) | Vector search finds things by meaning instead of keywords. It turns text or images into lists of numbers and looks for the closest ones, usually with an approximate index that trades a little accuracy for a lot of speed. |
| [Bloom Filters](concepts/08-storage/bloom-filters.md) | A Bloom filter is a tiny bit array that answers "is this item in the set?" with either "definitely not" or "maybe yes". Systems use it to skip expensive lookups for things that aren't there. |
| [HyperLogLog](concepts/08-storage/hyperloglog.md) | HyperLogLog estimates how many unique things you've seen, like daily visitors, in a few kilobytes of memory no matter how many there are. You give up an exact answer and get one that's typically off by less than 1 percent. |
| [Geospatial Indexing](concepts/08-storage/geospatial-indexing.md) | A geospatial index splits the map into cells, so a database can answer "what's near this point?" by checking a few nearby cells instead of measuring the distance to everything. |
| [OLTP vs OLAP](concepts/08-storage/oltp-vs-olap.md) | OLTP is the day job of your database, millions of tiny reads and writes for live users. OLAP is analytics, a few huge queries over years of history, and it wants a different kind of database. |

### 9. Data at Scale

Copying and splitting data across many machines. [Open section](concepts/09-data-at-scale/README.md)

| Concept | In one line |
| --- | --- |
| [Replication](concepts/09-data-at-scale/replication.md) | Replication keeps copies of the same data on several machines. If one dies, another already has everything, and you can spread reads across the copies. |
| [Read Replicas](concepts/09-data-at-scale/read-replicas.md) | Read replicas are copies of your database that only serve reads. Most apps read far more than they write, so moving reads to replicas takes most of the load off the main database. |
| [Merkle Trees](concepts/09-data-at-scale/merkle-trees.md) | A Merkle tree is a tree of hashes where each parent is the hash of its children, so one root hash stands for all the data. Two machines compare roots, then walk down only where they differ. |
| [Partitioning](concepts/09-data-at-scale/partitioning.md) | Partitioning splits one big table into smaller pieces by a rule, like one piece per month. Queries only touch the pieces they need, and old data goes away in one cheap step. |
| [Sharding](concepts/09-data-at-scale/sharding.md) | Sharding splits your data across several database servers, and each one holds a slice. It's how you grow past what one machine can store or write, and you pay for it in complexity forever. |
| [Consistent Hashing](concepts/09-data-at-scale/consistent-hashing.md) | Consistent hashing puts servers and keys on the same circle, and each key belongs to the next server along it. Add or remove a server and only a small slice of keys moves, instead of nearly all of them. |
| [Hot Spots](concepts/09-data-at-scale/hot-spots.md) | A hot spot is one key, shard, or server getting far more traffic than the rest. Spreading your data evenly doesn't help when everyone wants the same piece of it. |
| [Change Data Capture](concepts/09-data-at-scale/change-data-capture.md) | Change data capture reads your database's own change log and turns every insert, update, and delete into an event. Search indexes, caches, and analytics stay in sync without your app writing to each one. |
| [Unique ID Generation](concepts/09-data-at-scale/unique-id-generation.md) | Every order, message, and user needs an ID that never repeats. One database can just count, but once you have many servers, you need IDs that any machine can make without asking anyone else. |

### 10. Distributed Systems

The rules of the game once your system runs on more than one computer. [Open section](concepts/10-distributed-systems/README.md)

| Concept | In one line |
| --- | --- |
| [Network Partitions](concepts/10-distributed-systems/network-partitions.md) | A network partition is when some machines can't reach others, even though they're all still running. It happens far more often than people expect, and it's the root of most distributed systems headaches. |
| [CAP Theorem](concepts/10-distributed-systems/cap-theorem.md) | When the network splits a distributed database in two, each side has to choose: keep answering and risk stale data, or stop answering until it can be sure. You cannot have both. |
| [Strong Consistency](concepts/10-distributed-systems/strong-consistency.md) | Strong consistency means a system with many copies of the data behaves as if there's only one. Once a write succeeds, every later read, from any server, sees it. |
| [Eventual Consistency](concepts/10-distributed-systems/eventual-consistency.md) | Eventual consistency means replicas can disagree for a while, but if writes stop, they all end up with the same data. You get speed and availability, and you accept reads that are briefly stale. |
| [Quorum](concepts/10-distributed-systems/quorum.md) | A quorum is the minimum number of replicas that must respond before a read or write counts. Pick the numbers right and every read is guaranteed to include at least one copy of the latest write. |
| [Clock Skew](concepts/10-distributed-systems/clock-skew.md) | Every server has its own clock, and no two of them agree exactly. That gap is clock skew, and it means timestamps from different machines can put events in the wrong order. |
| [Logical Clocks](concepts/10-distributed-systems/logical-clocks.md) | Logical clocks order events with counters instead of wall clock time. They tell you what happened before what, even when every server's clock is wrong. |
| [Heartbeats](concepts/10-distributed-systems/heartbeats.md) | A heartbeat is a tiny "I'm alive" message a server sends every few seconds. When the heartbeats stop, the rest of the system assumes it's dead and moves its work elsewhere. |
| [Gossip Protocol](concepts/10-distributed-systems/gossip-protocol.md) | In a gossip protocol, every node regularly swaps news with a few random peers. Like a rumor at a party, an update reaches the whole cluster in a handful of rounds, with no central server in charge. |

### 11. Coordination

Getting many machines to agree on who is in charge and what happened. [Open section](concepts/11-coordination/README.md)

| Concept | In one line |
| --- | --- |
| [Leader Election](concepts/11-coordination/leader-election.md) | Leader election picks exactly one server out of several to do a job that must not run twice, and picks a new one fast when that server dies. |
| [Consensus](concepts/11-coordination/consensus.md) | Consensus lets a group of servers agree on the same ordered list of changes, even while some of them are down. A change counts once a majority has saved it. |
| [Split Brain](concepts/11-coordination/split-brain.md) | Split brain is when two servers both believe they are the leader and both accept writes. Your data forks into two histories, and someone has to stitch them back together by hand. |
| [Distributed Locks](concepts/11-coordination/distributed-locks.md) | A distributed lock makes sure only one process, across many machines, works on a thing at a time. The hard part isn't taking the lock, it's knowing you still hold it. |
| [Distributed Transactions](concepts/11-coordination/distributed-transactions.md) | A distributed transaction changes data in several services or databases as one unit: every change happens, or none does. One database gives you that for free, but across three you have to build it. |
| [Two Phase Commit](concepts/11-coordination/two-phase-commit.md) | Two phase commit makes several databases commit a change together or not at all. A coordinator asks everyone to promise first, then tells everyone to go. |
| [Saga Pattern](concepts/11-coordination/saga-pattern.md) | A saga splits one big transaction across services into a chain of small local ones. If a step fails, it runs compensating actions to undo the steps that already happened. |

### 12. Concurrency and Runtime

Bugs that only appear when two things happen at once, and how memory behaves in long running services. [Open section](concepts/12-concurrency/README.md)

| Concept | In one line |
| --- | --- |
| [Race Conditions](concepts/12-concurrency/race-conditions.md) | A race condition is a bug where the result depends on which of two operations gets there first. It hides in testing and shows up under real traffic, usually as lost money or a double booking. |
| [Thread Safety](concepts/12-concurrency/thread-safety.md) | Code is thread safe when it still works with many threads calling it at the same moment. The danger is always the same thing: data that is both shared and changing. |
| [Event Loop](concepts/12-concurrency/event-loop.md) | An event loop is one thread that runs short callbacks, one after another, while the waiting on networks and disks happens in the background. It juggles thousands of connections cheaply, until one slow callback stalls them all. |
| [Deadlocks](concepts/12-concurrency/deadlocks.md) | A deadlock is two workers each holding a lock the other one needs, so both wait forever. Nothing crashes, things just stop. |
| [Optimistic Locking](concepts/12-concurrency/optimistic-locking.md) | Optimistic locking lets everyone read and edit freely, then rejects a save if someone else changed the data first. Nobody waits, and conflicts get caught instead of silently overwritten. |
| [Pessimistic Locking](concepts/12-concurrency/pessimistic-locking.md) | Pessimistic locking grabs a lock on the data before changing it, so anyone else who wants the same row waits their turn. It's the safe choice when many people fight over the same thing. |
| [Memory Leaks](concepts/12-concurrency/memory-leaks.md) | A memory leak is memory your service keeps holding but will never use again. In a long running service it piles up for hours, until the process gets killed for running out of memory. |
| [Garbage Collection](concepts/12-concurrency/garbage-collection.md) | Garbage collection (GC) frees memory your program no longer uses, so you never have to free it by hand. The price is that the collector sometimes pauses your app, and those pauses land on your slowest requests. |

### 13. Messaging and Events

Letting services talk without waiting on each other. [Open section](concepts/13-messaging/README.md)

| Concept | In one line |
| --- | --- |
| [Message Queues](concepts/13-messaging/message-queues.md) | A message queue is a waiting line for jobs. Producers drop work in, workers take it out at their own pace, and a traffic spike becomes a longer line instead of an outage. |
| [Pub/Sub](concepts/13-messaging/pub-sub.md) | In pub/sub, a publisher sends a message to a topic, and every subscriber to that topic gets its own copy. The publisher has no idea who is listening, so you can add listeners without touching it. |
| [Event Streaming](concepts/13-messaging/event-streaming.md) | Event streaming keeps every event in a durable, append only log that many readers move through at their own pace. Unlike a queue, reading doesn't delete anything, so you can replay last week whenever you need to. |
| [Event Driven Architecture](concepts/13-messaging/event-driven-architecture.md) | In an event driven architecture, services announce what happened instead of telling each other what to do. Others react on their own, which keeps teams decoupled but makes the overall flow much harder to see. |
| [Delivery Guarantees](concepts/13-messaging/delivery-guarantees.md) | A delivery guarantee tells you how a messaging system fails: it may lose a message, or it may deliver one twice. Knowing which one you have decides whether you drop orders or charge people twice. |
| [Dead Letter Queues](concepts/13-messaging/dead-letter-queues.md) | A dead letter queue is where messages go after failing too many times. It keeps one broken message from tying up your workers forever, and parks it somewhere a human can look at it. |
| [Backpressure](concepts/13-messaging/backpressure.md) | Backpressure is how a slow consumer tells a fast producer to ease off. Without it, the gap piles up in memory somewhere until that process crashes and takes all the buffered work with it. |
| [Fan Out](concepts/13-messaging/fan-out.md) | Fan out is what happens when one write has to reach many readers, like one post landing in a million feeds. You pay for it either when the post is written or every time a feed is read. |
| [Outbox Pattern](concepts/13-messaging/outbox-pattern.md) | The outbox pattern saves an event in the same database transaction as the change that caused it, and a separate relay publishes it later. They commit together, so you never lose an event or send one for a change that never happened. |
| [Event Sourcing](concepts/13-messaging/event-sourcing.md) | Event sourcing stores every change as an event in a log that never gets edited, instead of overwriting the current state. You get the current state by replaying the events, so the full history comes for free. |
| [CQRS](concepts/13-messaging/cqrs.md) | CQRS, short for Command Query Responsibility Segregation, splits your data model in two: one shaped for writes and one shaped for reads. Each side gets fast at its own job, and reads can lag a little behind. |
| [Batch vs Stream Processing](concepts/13-messaging/batch-vs-stream-processing.md) | Batch processing crunches a big pile of data on a schedule, while stream processing handles each event the moment it arrives. Batch is simpler and cheaper, stream gives answers in seconds instead of hours. |
| [Cron Jobs](concepts/13-messaging/cron-jobs.md) | A cron job is a task that runs on a schedule, like "every day at 2 AM". Easy to set up, and easy to get wrong once your app runs on more than one server. |

### 14. Reliability

Patterns that stop one failure from turning into an outage. [Open section](concepts/14-reliability/README.md)

| Concept | In one line |
| --- | --- |
| [Timeouts](concepts/14-reliability/timeouts.md) | A timeout is how long you are willing to wait for a reply before giving up. Without one, a single slow dependency can freeze every request that touches it. |
| [Retries](concepts/14-reliability/retries.md) | A retry sends a failed call again, betting the failure was a blip. Done right, it hides a flaky network, and done wrong, it turns a small outage into a big one. |
| [Exponential Backoff](concepts/14-reliability/exponential-backoff.md) | Exponential backoff makes each retry wait twice as long as the last. Add a little randomness, and a crowd of failing clients spreads out instead of stampeding a server the moment it comes back. |
| [Idempotency](concepts/14-reliability/idempotency.md) | An idempotent operation gives the same result whether it runs once or ten times. It is what makes retries safe, so a flaky network never charges a customer twice. |
| [Circuit Breakers](concepts/14-reliability/circuit-breakers.md) | A circuit breaker stops calling a dependency that keeps failing and fails fast instead. Your service stays quick, and the broken one gets room to recover. |
| [Bulkheads](concepts/14-reliability/bulkheads.md) | A bulkhead gives each dependency its own small pool of threads or connections. When one dependency gets slow, it can only drown its own pool, and everything else keeps working. |
| [Load Shedding](concepts/14-reliability/load-shedding.md) | Load shedding is a server dropping some requests on purpose when it gets more than it can handle. Rejecting a fifth of them fast beats serving all of them too slowly to matter. |
| [Graceful Degradation](concepts/14-reliability/graceful-degradation.md) | Graceful degradation means that when one piece of your system breaks, users get a smaller version of the product instead of an error page. Lose the recommendations, keep the video playing. |
| [Health Checks](concepts/14-reliability/health-checks.md) | A health check is a tiny endpoint, like `/health`, that the load balancer calls every few seconds. If a server stops passing it, the load balancer stops sending that server traffic. |
| [Liveness and Readiness Probes](concepts/14-reliability/liveness-and-readiness-probes.md) | Kubernetes asks every container two different questions: are you stuck, and can you take traffic right now? Failing liveness gets the container restarted, while failing readiness just takes it out of rotation. |
| [Graceful Shutdown](concepts/14-reliability/graceful-shutdown.md) | Graceful shutdown means a server that's told to stop first finishes the requests it already started, then exits. Without it, every deploy cuts off whatever was in flight. |
| [Chaos Engineering](concepts/14-reliability/chaos-engineering.md) | Chaos engineering means breaking parts of your system on purpose, while you're watching, to find the weak spots before a real outage finds them for you. |

### 15. Architecture

How to slice a system into pieces, and what each shape costs you. [Open section](concepts/15-architecture/README.md)

| Concept | In one line |
| --- | --- |
| [Monolith vs Microservices](concepts/15-architecture/monolith-vs-microservices.md) | A monolith is one app you build and deploy as a single unit. Microservices split it into many small services that ship on their own, which buys team independence and costs you network calls, operations work, and data headaches. |
| [Domain Driven Design](concepts/15-architecture/domain-driven-design.md) | Domain driven design builds software around how the business actually talks and works. Its big idea, bounded contexts, splits a large system into areas with their own language and model, and those areas make good service boundaries. |
| [Service Discovery](concepts/15-architecture/service-discovery.md) | Service discovery is how one service finds the current addresses of another. When instances start, die, and move every few minutes, hard coded IP addresses stop working on day one. |
| [Service Mesh](concepts/15-architecture/service-mesh.md) | A service mesh puts a small proxy next to every service and sends all traffic through it. Retries, encryption, and traffic metrics happen in the proxy, so every team gets them without changing a line of code. |
| [Backend for Frontend](concepts/15-architecture/backend-for-frontend.md) | A backend for frontend gives each kind of client, like the mobile app and the web app, its own small backend that shapes data for its screens. The team that builds the client owns it. |
| [Strangler Fig](concepts/15-architecture/strangler-fig.md) | The strangler fig pattern replaces a legacy system one piece at a time. A routing layer sends each feature to the new code once it is ready, and the old system shrinks until you can switch it off. |
| [Multitenancy](concepts/15-architecture/multitenancy.md) | Multitenancy means many customers, called tenants, share the same app and infrastructure. It keeps costs low, and it makes two things your problem: one tenant slowing everyone down, and one tenant seeing another's data. |
| [Serverless Limits](concepts/15-architecture/serverless-limits.md) | Serverless functions run your code on demand and bill by the millisecond, with no servers to manage. The trade is a set of hard limits on run time, memory, payload size, and concurrency that you have to design around. |
| [Cold Starts](concepts/15-architecture/cold-starts.md) | A cold start is the extra wait when a serverless platform has to boot a fresh copy of your function before it can answer. It adds anywhere from under 100 milliseconds to several seconds, usually right when traffic spikes. |

### 16. Identity and Encryption

Proving who someone is, deciding what they may do, and keeping data private. [Open section](concepts/16-identity-and-encryption/README.md)

| Concept | In one line |
| --- | --- |
| [Authentication vs Authorization](concepts/16-identity-and-encryption/authentication-vs-authorization.md) | Authentication checks who you are, and authorization checks what you are allowed to do. Mixing them up is how a logged in user ends up reading someone else's data. |
| [Password Hashing](concepts/16-identity-and-encryption/password-hashing.md) | Never store passwords. Store a slow, salted hash of each one, so that when your database leaks, attackers get a pile of values that are painfully expensive to turn back into passwords. |
| [OAuth](concepts/16-identity-and-encryption/oauth.md) | OAuth lets one app use your data in another app without ever seeing your password. You approve a limited scope once, and the app gets a token that can only do what you approved. |
| [JWT Rotation](concepts/16-identity-and-encryption/jwt-rotation.md) | A JWT is a signed token any service can check without calling the auth server. Rotation means swapping the signing key on a schedule without logging everyone out, and keeping tokens short lived because a JWT is hard to take back. |
| [Role Based Access Control](concepts/16-identity-and-encryption/role-based-access-control.md) | Role based access control gives users roles, and gives roles permissions. Instead of deciding access person by person, you decide it once per job, like admin, editor, or viewer. |
| [IAM](concepts/16-identity-and-encryption/iam.md) | IAM, short for identity and access management, is how a cloud decides who can do what. Every person and every program gets an identity, and policies spell out which actions each one may take on which resources. |
| [Secrets Management](concepts/16-identity-and-encryption/secrets-management.md) | Secrets management keeps passwords, API keys, and signing keys out of your code and your git history. They live in one locked, audited place, get handed to apps at run time, and get rotated regularly. |
| [TLS](concepts/16-identity-and-encryption/tls.md) | TLS is the protocol that puts the S in HTTPS. It encrypts traffic, catches tampering, and proves you are talking to the real server, which is why cafe wifi does not hand your bank login to the person at the next table. |
| [Encryption in Transit](concepts/16-identity-and-encryption/encryption-in-transit.md) | Encryption in transit means every network hop carries encrypted data, not just the one from the user's browser to your edge. Calls between services, database connections, and cache traffic all count. |
| [Encryption at Rest](concepts/16-identity-and-encryption/encryption-at-rest.md) | Encryption at rest scrambles data where it is stored: on disks, in databases, in backups. A stolen drive or leaked snapshot is useless without the key, but anyone who can query the live system still sees plain data. |
| [Zero Trust](concepts/16-identity-and-encryption/zero-trust.md) | Zero trust drops the idea of a safe internal network. Every request, from a person or a service, has to prove who it is and gets only the access it needs, no matter where it comes from. |

### 17. Web Security

The classic attacks on web apps and the defenses that stop them. [Open section](concepts/17-web-security/README.md)

| Concept | In one line |
| --- | --- |
| [CORS](concepts/17-web-security/cors.md) | CORS is the browser rule that decides which other websites may read responses from your API. It protects your users' browsers, not your server, and that second part is what almost everyone gets wrong. |
| [CSRF](concepts/17-web-security/csrf.md) | Cross site request forgery tricks a logged in user's browser into sending a request they never meant to send. The browser attaches their cookies automatically, so your server sees a perfectly valid session. |
| [XSS](concepts/17-web-security/xss.md) | Cross site scripting is when an attacker gets their JavaScript to run on your page, inside your users' browsers. That script can do anything the user can do, which makes it one of the nastiest web bugs there is. |
| [SQL Injection](concepts/17-web-security/sql-injection.md) | SQL injection happens when user input gets pasted into a database query and the database runs it as code. Parameterized queries fix it, and they have been around for decades. |
| [SSRF](concepts/17-web-security/ssrf.md) | Server side request forgery tricks your server into fetching a URL the attacker picked, usually an internal one they could never reach themselves. Any feature that fetches a URL a user typed is a candidate. |
| [WAF](concepts/17-web-security/waf.md) | A web application firewall sits in front of your app and blocks requests that match known attack patterns. It buys you time and cuts the noise, but it never replaces fixing the actual bug. |
| [DDoS Protection](concepts/17-web-security/ddos-protection.md) | A distributed denial of service attack floods you from thousands of machines at once until real users can't get in. You can't outgrow one on your own servers, so you absorb it at the edge. |

### 18. Observability

Knowing what your system is doing, and whether your users are happy. [Open section](concepts/18-observability/README.md)

| Concept | In one line |
| --- | --- |
| [Observability](concepts/18-observability/observability.md) | Observability is how well you can answer new questions about your system using only what it already emits. With good observability, the next weird outage takes ten minutes to explain, not three days and a new deploy. |
| [Logging](concepts/18-observability/logging.md) | Logs are the timestamped record of what your code did, one event per line. Done well, they let you rebuild exactly what happened to one request, at 3 AM, across ten services. |
| [Metrics](concepts/18-observability/metrics.md) | Metrics are numbers your system records over time, like requests per second or memory in use. They're cheap to store and fast to graph, as long as you don't tag them with the wrong labels. |
| [Distributed Tracing](concepts/18-observability/distributed-tracing.md) | Distributed tracing follows one request as it hops across all your services and records how long each hop took. When a request is slow, it shows you exactly where the time went. |
| [Monitoring](concepts/18-observability/monitoring.md) | Monitoring is watching your system for the failures you already know can happen, using dashboards and automatic checks. It tells you something broke, fast, so you aren't the last to find out. |
| [Alerts](concepts/18-observability/alerts.md) | An alert wakes a human when something needs fixing right now. Page on what users feel, make every page actionable, and keep the volume low enough that people still take each one seriously. |
| [SLIs](concepts/18-observability/slis.md) | A service level indicator is a number that measures how your service feels to users, like the percent of requests answered successfully in under 300 ms. Every reliability target is built on one. |
| [SLOs](concepts/18-observability/slos.md) | A service level objective is the target you set for an SLI over a time window, like 99.9 percent of checkouts succeeding over 30 days. It turns "are we reliable enough?" into a yes or no question. |
| [SLAs](concepts/18-observability/slas.md) | A service level agreement is a contract that promises customers a level of service and spells out what you owe them if you miss it. It should always be looser than the target you hold yourself to internally. |
| [Error Budgets](concepts/18-observability/error-budgets.md) | An error budget is the amount of failure your SLO allows: 100 percent minus the target. While budget is left you ship fast, and when it runs out, risky changes stop until reliability recovers. |

### 19. Build and Infrastructure

Turning code into running software, the same way every time. [Open section](concepts/19-build-and-infra/README.md)

| Concept | In one line |
| --- | --- |
| [CI/CD](concepts/19-build-and-infra/ci-cd.md) | CI/CD is a pipeline that builds and tests every change the moment you push it, then ships the ones that pass. Small changes go out many times a day instead of one scary release a month. |
| [Build Caching](concepts/19-build-and-infra/build-caching.md) | Build caching skips every step whose inputs did not change and reuses the saved output. It turns a 10 minute build into a 90 second one, as long as you order the steps so the cache can actually hit. |
| [Dependency Hell](concepts/19-build-and-infra/dependency-hell.md) | Dependency hell is when the libraries you use need different, incompatible versions of the same library underneath. Your own code is fine, but the app will not install, will not build, or breaks in places you never touched. |
| [Semantic Versioning](concepts/19-build-and-infra/semantic-versioning.md) | Semantic versioning packs a promise into a version number: MAJOR.MINOR.PATCH. Which number moved tells everyone downstream whether upgrading is safe or will break their code. |
| [Docker](concepts/19-build-and-infra/docker.md) | Docker packs your app, its runtime, and every library it needs into one image that runs the same on your laptop, in CI, and in production. It is the fix for "works on my machine". |
| [Kubernetes](concepts/19-build-and-infra/kubernetes.md) | Kubernetes runs your containers across a fleet of machines. You write down what you want, like "6 copies of this service, always", and it keeps working until reality matches, even when machines die. |
| [Helm Charts](concepts/19-build-and-infra/helm-charts.md) | A Helm chart is a package of Kubernetes YAML with blanks to fill in. You write the manifests once, then install the same chart in dev, staging, and production with different values for each. |
| [Infrastructure as Code](concepts/19-build-and-infra/infrastructure-as-code.md) | Infrastructure as code means your servers, networks, and databases are described in text files that live in git. You change infrastructure by changing code, and anyone can rebuild the whole setup from scratch. |
| [Terraform](concepts/19-build-and-infra/terraform.md) | Terraform is a widely used tool for infrastructure as code. You describe cloud resources in config files, it shows you a plan of exactly what will change, and only then does it make the change. |
| [GitOps](concepts/19-build-and-infra/gitops.md) | GitOps makes a git repo the single source of truth for what runs in production. An agent inside the cluster keeps pulling that repo and making the cluster match, so deploying is a merge and rolling back is a revert. |

### 20. Laws

Named laws and classic results that explain why systems, and the teams that build them, behave the way they do. [Open section](concepts/23-laws/README.md)

| Concept | In one line |
| --- | --- |
| [Fallacies of Distributed Computing](concepts/23-laws/fallacies-of-distributed-computing.md) | Eight things everyone assumes about the network the first time they build a distributed system. All eight are false, and each one breeds its own family of production bugs. |
| [PACELC](concepts/23-laws/pacelc.md) | PACELC extends CAP to normal days: during a Partition, pick Availability or Consistency, Else pick Latency or Consistency. That second choice hits every single request, not just the rare outage. |
| [Two Generals Problem](concepts/23-laws/two-generals-problem.md) | Two machines talking over a link that can lose messages can never both be sure they agree. Every confirmation needs its own confirmation, forever, so real systems stop chasing certainty and make retries safe instead. |
| [Byzantine Generals Problem](concepts/23-laws/byzantine-generals-problem.md) | The Byzantine Generals Problem asks how honest servers can agree when some of them lie. To survive f liars you need at least 3f + 1 nodes, and the consensus inside most databases doesn't even try. |
| [FLP Impossibility](concepts/23-laws/flp-impossibility.md) | FLP proves that when messages can take any amount of time, a group of servers can't be guaranteed to finish agreeing if even one of them might crash. Real systems get around it by trusting timeouts. |
| [Amdahl's Law](concepts/23-laws/amdahls-law.md) | Amdahl's Law says the part of a job that can't run in parallel caps your speedup. If 10% of the work must happen in order, a thousand machines still can't make it more than 10 times faster. |
| [Universal Scalability Law](concepts/23-laws/universal-scalability-law.md) | The Universal Scalability Law predicts what happens to throughput as you add servers. Waiting on shared things flattens the curve, servers syncing with each other bends it down, and past the peak more servers get less done. |
| [Kingman's Formula](concepts/23-laws/kingmans-formula.md) | Kingman's formula estimates how long work waits in a queue. Waiting grows like utilization over one minus utilization, so a worker that's 95% busy makes jobs wait about five times longer than one at 80%. |
| [Zipf's Law](concepts/23-laws/zipfs-law.md) | Zipf's Law says popularity falls off with rank: the second most popular item gets about half the traffic of the first, the third about a third. That's why a small cache catches most requests, and why a few keys run hot. |
| [Pareto Principle](concepts/23-laws/pareto-principle.md) | The Pareto principle is the rough pattern that most of an effect comes from a few causes, often quoted as 80/20. In systems work it means profile first, because a handful of endpoints or queries usually cause most of the slowness. |
| [Conway's Law](concepts/23-laws/conways-law.md) | Systems end up shaped like the teams that build them. Two teams that rarely talk build two parts with a thin, awkward seam between them, so if you want a certain architecture, arrange the teams first. |
| [Hyrum's Law](concepts/23-laws/hyrums-law.md) | Once enough people use your API, every behavior they can see becomes part of the contract, documented or not. Someone depends on your error text, your response order, and your timing. |
| [Gall's Law](concepts/23-laws/galls-law.md) | Every complex system that works grew out of a simple system that worked. Design the complex version from scratch and it won't work, and no amount of patching will fix it. |
| [Postel's Law](concepts/23-laws/postels-law.md) | Be strict in what you send and forgiving in what you accept. It helped the early internet's mismatched machines talk to each other, and taken too far, it turns everyone's bugs into permanent features. |
| [Goodhart's Law](concepts/23-laws/goodharts-law.md) | Turn a metric into a target and people will find ways to hit the number without doing the thing it was meant to measure. The dashboard turns green and stops telling you anything. |
| [Brooks's Law](concepts/23-laws/brooks-law.md) | Throw more engineers at a late software project and it usually ships even later. Newcomers need weeks to become useful, and every extra person adds conversations, so the team slows down before it speeds up. |
| [Law of Leaky Abstractions](concepts/23-laws/law-of-leaky-abstractions.md) | Every useful abstraction hides messy details, and sooner or later those details leak through. When they do, you need to understand the layer underneath, the one the abstraction promised you could ignore. |
| [Chesterton's Fence](concepts/23-laws/chestertons-fence.md) | Before you remove something that looks pointless, find out why it was put there. The odd retry, sleep, or cron job is often the scar from an old outage, and deleting it brings the outage back. |

### 21. Principles

Rules of thumb that keep designs simple, safe, and easy to change. [Open section](concepts/24-principles/README.md)

| Concept | In one line |
| --- | --- |
| [End to End Principle](concepts/24-principles/end-to-end-principle.md) | Some guarantees, like "this file arrived intact", can only be checked by the two ends that care about the result. Lower layers can make them faster, but they can't make them correct. |
| [Principle of Least Privilege](concepts/24-principles/principle-of-least-privilege.md) | Give every user, service, and process only the permissions it needs for its job, and nothing more. When something gets hacked or goes wrong, the damage stops at that small set. |
| [Defense in Depth](concepts/24-principles/defense-in-depth.md) | Defense in depth stacks several independent security layers, so an attacker has to beat all of them. When one control fails, and one always does eventually, the next one is still standing. |
| [Kerckhoffs's Principle](concepts/24-principles/kerckhoffs-principle.md) | A security system should stay safe even if attackers know everything about it except the key. Keep the secret small, so when it leaks you change a key instead of redesigning the whole system. |
| [KISS](concepts/24-principles/kiss.md) | KISS stands for "keep it simple, stupid". Pick the simplest design that meets the real need, because every extra moving part is one more thing to build, learn, watch, and fix at 3 a.m. |
| [YAGNI](concepts/24-principles/yagni.md) | YAGNI, short for "you aren't gonna need it", says don't build features or infrastructure for needs you only imagine. Build for the load and requirements you have today, and change the design when a real need shows up. |
| [DRY](concepts/24-principles/dry.md) | DRY, short for "don't repeat yourself", says every piece of knowledge in a system should live in exactly one place. It is about rules and facts, not about code that merely looks alike. |
| [Separation of Concerns](concepts/24-principles/separation-of-concerns.md) | Separation of concerns means splitting a system so each part handles one kind of problem, like storage, business rules, or display. Then you can understand, change, and scale each part without dragging the others along. |
| [Single Responsibility Principle](concepts/24-principles/single-responsibility-principle.md) | A module, class, or service should have only one reason to change, which in practice means it answers to one group of people. Then a change one team asks for can't quietly break another team's feature. |
| [Coupling and Cohesion](concepts/24-principles/coupling-and-cohesion.md) | Coupling is how much one part of a system depends on the others, and cohesion is how well the things inside one part belong together. Aim for loose coupling and high cohesion, so most changes stay inside one box. |

## Contributing

Found a mistake, or a sentence that made you read it twice? Open an issue or a pull request. The page format and writing rules are in [CONTRIBUTING.md](CONTRIBUTING.md).
