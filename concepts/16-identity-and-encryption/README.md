# Identity and Encryption

Proving who someone is, deciding what they may do, and keeping data private.

| Concept | In one line |
| --- | --- |
| [Authentication vs Authorization](authentication-vs-authorization.md) | Authentication checks who you are, and authorization checks what you are allowed to do. Mixing them up is how a logged in user ends up reading someone else's data. |
| [Password Hashing](password-hashing.md) | Never store passwords. Store a slow, salted hash of each one, so that when your database leaks, attackers get a pile of values that are painfully expensive to turn back into passwords. |
| [OAuth](oauth.md) | OAuth lets one app use your data in another app without ever seeing your password. You approve a limited scope once, and the app gets a token that can only do what you approved. |
| [JWT Rotation](jwt-rotation.md) | A JWT is a signed token any service can check without calling the auth server. Rotation means swapping the signing key on a schedule without logging everyone out, and keeping tokens short lived because a JWT is hard to take back. |
| [Role Based Access Control](role-based-access-control.md) | Role based access control gives users roles, and gives roles permissions. Instead of deciding access person by person, you decide it once per job, like admin, editor, or viewer. |
| [IAM](iam.md) | IAM, short for identity and access management, is how a cloud decides who can do what. Every person and every program gets an identity, and policies spell out which actions each one may take on which resources. |
| [Secrets Management](secrets-management.md) | Secrets management keeps passwords, API keys, and signing keys out of your code and your git history. They live in one locked, audited place, get handed to apps at run time, and get rotated regularly. |
| [TLS](tls.md) | TLS is the protocol that puts the S in HTTPS. It encrypts traffic, catches tampering, and proves you are talking to the real server, which is why cafe wifi does not hand your bank login to the person at the next table. |
| [Encryption in Transit](encryption-in-transit.md) | Encryption in transit means every network hop carries encrypted data, not just the one from the user's browser to your edge. Calls between services, database connections, and cache traffic all count. |
| [Encryption at Rest](encryption-at-rest.md) | Encryption at rest scrambles data where it is stored: on disks, in databases, in backups. A stolen drive or leaked snapshot is useless without the key, but anyone who can query the live system still sees plain data. |
| [Zero Trust](zero-trust.md) | Zero trust drops the idea of a safe internal network. Every request, from a person or a service, has to prove who it is and gets only the access it needs, no matter where it comes from. |

[Back to all concepts](../../README.md)
