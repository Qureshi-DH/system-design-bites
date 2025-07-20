# Storage and Search

What happens inside a database, plus special stores for files, text, and maps.

| Concept | In one line |
| --- | --- |
| [Storage Engines](storage-engines.md) | A storage engine is the part of a database that decides how bytes sit on disk. B trees favor fast reads, LSM trees favor fast writes, and that one choice shapes everything above it. |
| [Write Ahead Log](write-ahead-log.md) | A write ahead log is an append only file where a database records every change before applying it. If the server crashes, the database replays the log and every committed change comes back. |

[Back to all concepts](../../README.md)
