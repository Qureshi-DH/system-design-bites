# Principles

Rules of thumb that keep designs simple, safe, and easy to change.

| Concept | In one line |
| --- | --- |
| [End to End Principle](end-to-end-principle.md) | Some guarantees, like "this file arrived intact", can only be checked by the two ends that care about the result. Lower layers can make them faster, but they can't make them correct. |
| [Principle of Least Privilege](principle-of-least-privilege.md) | Give every user, service, and process only the permissions it needs for its job, and nothing more. When something gets hacked or goes wrong, the damage stops at that small set. |
| [Defense in Depth](defense-in-depth.md) | Defense in depth stacks several independent security layers, so an attacker has to beat all of them. When one control fails, and one always does eventually, the next one is still standing. |
| [Kerckhoffs's Principle](kerckhoffs-principle.md) | A security system should stay safe even if attackers know everything about it except the key. Keep the secret small, so when it leaks you change a key instead of redesigning the whole system. |
| [KISS](kiss.md) | KISS stands for "keep it simple, stupid". Pick the simplest design that meets the real need, because every extra moving part is one more thing to build, learn, watch, and fix at 3 a.m. |
| [YAGNI](yagni.md) | YAGNI, short for "you aren't gonna need it", says don't build features or infrastructure for needs you only imagine. Build for the load and requirements you have today, and change the design when a real need shows up. |
| [DRY](dry.md) | DRY, short for "don't repeat yourself", says every piece of knowledge in a system should live in exactly one place. It is about rules and facts, not about code that merely looks alike. |
| [Separation of Concerns](separation-of-concerns.md) | Separation of concerns means splitting a system so each part handles one kind of problem, like storage, business rules, or display. Then you can understand, change, and scale each part without dragging the others along. |
| [Single Responsibility Principle](single-responsibility-principle.md) | A module, class, or service should have only one reason to change, which in practice means it answers to one group of people. Then a change one team asks for can't quietly break another team's feature. |
| [Coupling and Cohesion](coupling-and-cohesion.md) | Coupling is how much one part of a system depends on the others, and cohesion is how well the things inside one part belong together. Aim for loose coupling and high cohesion, so most changes stay inside one box. |
| [Premature Optimization](premature-optimization.md) | Premature optimization is tuning code for speed before you know it is slow, which costs time and clarity and usually speeds up the wrong thing. Measure first, then fix the part that actually matters. |
| [Fail Fast](fail-fast.md) | Fail fast means stopping with a loud, clear error the moment something is wrong, instead of limping along on bad data. A crash at startup is cheap, while a quiet wrong answer in production is expensive. |
| [Twelve Factor App](twelve-factor-app.md) | The Twelve Factor App is a checklist of 12 rules for building web services that deploy cleanly to any cloud and scale by running more copies. It reads like a description of how containers and Kubernetes expect your app to behave. |

[Back to all concepts](../../README.md)
