# Principles

Rules of thumb that keep designs simple, safe, and easy to change.

| Concept | In one line |
| --- | --- |
| [End to End Principle](end-to-end-principle.md) | Some guarantees, like "this file arrived intact", can only be checked by the two ends that care about the result. Lower layers can make them faster, but they can't make them correct. |
| [Principle of Least Privilege](principle-of-least-privilege.md) | Give every user, service, and process only the permissions it needs for its job, and nothing more. When something gets hacked or goes wrong, the damage stops at that small set. |
| [Defense in Depth](defense-in-depth.md) | Defense in depth stacks several independent security layers, so an attacker has to beat all of them. When one control fails, and one always does eventually, the next one is still standing. |
| [Kerckhoffs's Principle](kerckhoffs-principle.md) | A security system should stay safe even if attackers know everything about it except the key. Keep the secret small, so when it leaks you change a key instead of redesigning the whole system. |

[Back to all concepts](../../README.md)
