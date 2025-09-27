# Authentication vs Authorization

> Authentication checks who you are, and authorization checks what you are allowed to do. Mixing them up is how a logged in user ends up reading someone else's data.

## How it works

Authentication, often shortened to authn, happens at the door. The user proves an identity with a password, a passkey, or "Sign in with Google", and gets back a session cookie or a token. Every later request carries it, so the server knows who is asking.

Authorization, or authz, happens on every request, for every resource. Priya is logged in. Fine. May she read this channel? Delete that message? Change the billing plan? The answers depend on her role, her team, and who owns the thing she is touching.

HTTP has a status code for each kind of failure:

- **401 Unauthorized.** The name is misleading. It really means unauthenticated: no token, or an expired one. Log in and try again.
- **403 Forbidden.** The server knows exactly who you are, and the answer is no. Logging in again will not help.
- **404 Not Found.** Sometimes sent instead of 403 so outsiders cannot even learn the thing exists. GitHub does this for private repositories.

The catch: checking that a user is logged in and stopping there. If `GET /invoices/1042` only checks for a valid token, any customer can change the number to 1043 and read a stranger's invoice. This bug is common enough to sit at number one on the OWASP API Security Top 10, the best known list of API security risks. Every handler that loads a record must also check that this user may see this record.

## Example

A chat app. Priya opens it on Monday with a token that expired over the weekend. The API returns 401, the app quietly uses its refresh token to get a new one, and she never notices.

Then she opens a link a coworker pasted, to the finance channel. Her token is valid, so authentication passes. The authorization check looks up the channel's member list, does not find her, and returns 403. The app shows "You are not a member of this channel" instead of sending her back to the login screen, because logging in again would change nothing.

```http
GET /channels/finance/messages
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...

HTTP/1.1 403 Forbidden
```

## Picture it

```mermaid
flowchart LR
    R["Request with token"] --> A{"Valid token?<br/>authentication"}
    A -->|"no"| E1["401 Unauthorized<br/>please log in"]
    A -->|"yes, this is Priya"| Z{"May Priya read<br/>this channel?<br/>authorization"}
    Z -->|"no"| E2["403 Forbidden"]
    Z -->|"yes"| OK["200 OK<br/>messages"]
```

Two gates, in order. The first asks who you are and fails with 401. The second asks what you may do with this exact resource and fails with 403.

## Related

[OAuth](oauth.md) · [Role Based Access Control](role-based-access-control.md) · [Password Hashing](password-hashing.md) · [JWT Rotation](jwt-rotation.md) · [CSRF](../17-web-security/csrf.md)

---

[← Cold Starts](../15-architecture/cold-starts.md) · [All concepts](../../README.md) · [Password Hashing →](password-hashing.md)
