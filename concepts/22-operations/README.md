# Operations

What happens when things break at 3 AM, and how teams learn from it.

| Concept | In one line |
| --- | --- |
| [Production Incidents](production-incidents.md) | A production incident is anything that hurts users right now and needs a coordinated response. The playbook is short: name a leader, stop the bleeding first, and keep users informed while you fix it. |
| [On Call](on-call.md) | On call means one engineer at a time answers when production breaks, day or night. Done well, it is a fair rotation with rare pages, and done badly, it burns out your best people. |
| [Runbooks](runbooks.md) | A runbook is a step by step guide for handling one specific alert or task. It is written so a tired person at 3 AM, who has never seen this problem before, can follow it without thinking hard. |
| [Load Testing](load-testing.md) | Load testing sends realistic fake traffic at your system to find its limits before real users do. Done right, it tells you how much traffic you can take and which part breaks first. |
| [Capacity Planning](capacity-planning.md) | Capacity planning works out how much infrastructure you'll need for future peak traffic, and gets it in place before you need it. It turns a forecast and a load test into a server count with room to spare. |
| [Postmortems](postmortems.md) | A postmortem is a write up after an incident that explains what happened, why, and what will change so it does not happen again. It blames systems, not people, because blame teaches people to hide what they know. |
| [Cost Optimization](cost-optimization.md) | Cost optimization means paying for the cloud capacity you use, not the capacity you once guessed you might need. The usual waste is oversized servers, idle environments, and data nobody reads. |

[Back to all concepts](../../README.md)
