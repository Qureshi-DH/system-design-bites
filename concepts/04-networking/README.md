# Networking and Real Time

How bytes actually travel, and how servers push updates to users.

| Concept | In one line |
| --- | --- |
| [DNS](dns.md) | DNS is the internet's phone book. It turns a name like `shop.example.com` into an IP address your computer can connect to, and its caching is why a DNS change can take hours to reach everyone. |
| [Anycast](anycast.md) | Anycast puts the same IP address in many places at once, and internet routing sends each user to the closest one by network path. It powers DNS root servers, CDNs, and DDoS defense. |
| [TCP vs UDP](tcp-vs-udp.md) | TCP and UDP are the two main ways to move data across the internet. TCP guarantees every byte arrives, in order, while UDP fires packets and hopes, which makes it faster when late data is useless anyway. |
| [HTTP/2 and HTTP/3](http2-and-http3.md) | HTTP/2 and HTTP/3 let one connection carry many requests at the same time, instead of one after another. Pages with dozens of files load faster, and HTTP/3 also copes better with flaky mobile networks. |
| [Head of Line Blocking](head-of-line-blocking.md) | Head of line blocking is when one slow or lost item at the front of a line holds up everything behind it. On the web it shows up twice: once in HTTP/1.1, and again inside TCP. |
| [Long Polling](long-polling.md) | Long polling fakes server push with plain HTTP. The client asks "anything new?" and the server holds the request open until it has news or a timeout hits, then the client asks again. |
| [Server Sent Events](server-sent-events.md) | Server Sent Events keep one HTTP response open so the server can push a stream of text updates to the browser. It is the simplest way to send live updates one way, from server to client. |
| [WebSockets](websockets.md) | A WebSocket is one long lived connection where the client and the server can both send messages at any moment. It is the standard choice for chat, multiplayer games, and live collaboration. |

[Back to all concepts](../../README.md)
