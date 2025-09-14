# Web Security

The classic attacks on web apps and the defenses that stop them.

| Concept | In one line |
| --- | --- |
| [CORS](cors.md) | CORS is the browser rule that decides which other websites may read responses from your API. It protects your users' browsers, not your server, and that second part is what almost everyone gets wrong. |
| [CSRF](csrf.md) | Cross site request forgery tricks a logged in user's browser into sending a request they never meant to send. The browser attaches their cookies automatically, so your server sees a perfectly valid session. |
| [XSS](xss.md) | Cross site scripting is when an attacker gets their JavaScript to run on your page, inside your users' browsers. That script can do anything the user can do, which makes it one of the nastiest web bugs there is. |
| [SQL Injection](sql-injection.md) | SQL injection happens when user input gets pasted into a database query and the database runs it as code. Parameterized queries fix it, and they have been around for decades. |
| [SSRF](ssrf.md) | Server side request forgery tricks your server into fetching a URL the attacker picked, usually an internal one they could never reach themselves. Any feature that fetches a URL a user typed is a candidate. |
| [WAF](waf.md) | A web application firewall sits in front of your app and blocks requests that match known attack patterns. It buys you time and cuts the noise, but it never replaces fixing the actual bug. |
| [DDoS Protection](ddos-protection.md) | A distributed denial of service attack floods you from thousands of machines at once until real users can't get in. You can't outgrow one on your own servers, so you absorb it at the edge. |

[Back to all concepts](../../README.md)
