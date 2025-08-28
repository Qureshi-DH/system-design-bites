# System Design Bites

System design concepts explained simply. One page per concept: the idea in one line, how it works, a real example, and a diagram.

Pages so far: 122

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

### 14. Laws

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

## Contributing

Found a mistake, or a sentence that made you read it twice? Open an issue or a pull request. The page format and writing rules are in [CONTRIBUTING.md](CONTRIBUTING.md).
