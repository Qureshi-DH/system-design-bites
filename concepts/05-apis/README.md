# APIs

How apps and services talk to each other, and how to change that contract without breaking anyone.

| Concept | In one line |
| --- | --- |
| [REST](rest.md) | REST is the most common way to design a web API. Everything is a resource with its own URL, and you act on it with standard HTTP methods like GET, POST, and DELETE. |
| [GraphQL](graphql.md) | GraphQL lets the client ask for exactly the fields it needs, across related data, in one request. You trade simple URLs and easy caching for flexibility, plus a server that has to defend itself from expensive queries. |
| [gRPC](grpc.md) | gRPC lets one service call a function on another service as if it were local, sending compact binary messages over HTTP/2. It is fast, strictly typed, and a favorite for traffic between your own backend services. |
| [Webhooks](webhooks.md) | A webhook is an HTTP request another service sends to your server when something happens, like "payment succeeded". Instead of you asking over and over, they call you, so you have to verify, dedupe, and answer fast. |
| [Pagination](pagination.md) | Pagination splits a big list into pages so an API never returns a million rows at once. Offset pagination is simple but slows down and skips rows on big, changing tables, while cursor pagination stays fast and stable. |
| [API Versioning](api-versioning.md) | API versioning lets you change an API without breaking the apps already using it. Old clients keep the old behavior, new clients opt into the new one, and the old version retires on a schedule. |
| [Serialization Formats](serialization-formats.md) | Serialization turns the objects in your program into bytes you can send or store. JSON is readable and works everywhere, while binary formats like Protobuf and Avro are smaller, faster, and come with schemas that make change safer. |

[Back to all concepts](../../README.md)
