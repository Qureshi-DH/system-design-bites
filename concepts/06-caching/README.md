# Caching

Keeping answers close so you never fetch or compute the same thing twice.

| Concept | In one line |
| --- | --- |
| [Caching](caching.md) | A cache keeps a copy of data somewhere faster and closer than where it really lives. Reads that hit the copy skip the slow trip, which makes apps quicker and keeps databases from melting. |
| [Caching Strategies](caching-strategies.md) | A caching strategy is the rule for how reads and writes move between your cache and your database. Pick the wrong one and you serve stale data, lose writes, or fill the cache with junk. |
| [Cache Eviction](cache-eviction.md) | A cache has limited memory, so when it fills up, something has to go. The eviction policy decides what gets thrown out, and a good one keeps the data people actually ask for. |
| [Cache Invalidation](cache-invalidation.md) | Cache invalidation means removing a cached copy when the real data changes. Get it wrong and users keep seeing old prices, old names, or the plan they already paid to upgrade from. |
| [Cache Stampede](cache-stampede.md) | A cache stampede happens when a popular cached value expires and thousands of requests miss at the same moment, all rushing the database to rebuild it. The database falls over right when traffic is highest. |

[Back to all concepts](../../README.md)
