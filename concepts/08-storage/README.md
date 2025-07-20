# Storage and Search

What happens inside a database, plus special stores for files, text, and maps.

| Concept | In one line |
| --- | --- |
| [Storage Engines](storage-engines.md) | A storage engine is the part of a database that decides how bytes sit on disk. B trees favor fast reads, LSM trees favor fast writes, and that one choice shapes everything above it. |
| [Write Ahead Log](write-ahead-log.md) | A write ahead log is an append only file where a database records every change before applying it. If the server crashes, the database replays the log and every committed change comes back. |
| [Object Storage](object-storage.md) | Object storage, like Amazon S3, keeps files of any size under a key inside a bucket. It's cheap, practically bottomless, and very durable, but it is not a disk you can edit in place. |
| [Full Text Search](full-text-search.md) | Full text search finds documents by the words inside them and ranks the best matches first. It builds an inverted index ahead of time, so a search never has to scan every row. |

[Back to all concepts](../../README.md)
