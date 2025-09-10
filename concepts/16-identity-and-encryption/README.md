# Identity and Encryption

Proving who someone is, deciding what they may do, and keeping data private.

| Concept | In one line |
| --- | --- |
| [Authentication vs Authorization](authentication-vs-authorization.md) | Authentication checks who you are, and authorization checks what you are allowed to do. Mixing them up is how a logged in user ends up reading someone else's data. |
| [Password Hashing](password-hashing.md) | Never store passwords. Store a slow, salted hash of each one, so that when your database leaks, attackers get a pile of values that are painfully expensive to turn back into passwords. |
| [OAuth](oauth.md) | OAuth lets one app use your data in another app without ever seeing your password. You approve a limited scope once, and the app gets a token that can only do what you approved. |
| [JWT Rotation](jwt-rotation.md) | A JWT is a signed token any service can check without calling the auth server. Rotation means swapping the signing key on a schedule without logging everyone out, and keeping tokens short lived because a JWT is hard to take back. |

[Back to all concepts](../../README.md)
