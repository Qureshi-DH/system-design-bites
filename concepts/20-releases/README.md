# Releases

Shipping changes safely, and undoing them fast when something breaks.

| Concept | In one line |
| --- | --- |
| [Feature Flags](feature-flags.md) | A feature flag is an if statement you can flip without deploying. Ship the code turned off, turn it on for 1% of users, then everyone, and switch it off in seconds if it misbehaves. |
| [Rolling Deployments](rolling-deployments.md) | A rolling deployment swaps old servers for new ones a few at a time, so the service never goes down. The price is that both versions run side by side for a while. |
| [Blue Green Deployment](blue-green-deployment.md) | Blue green deployment runs two full copies of production. You deploy to the idle one, test it, then flip all traffic over at once, and flipping back is just as fast. |
| [Canary Releases](canary-releases.md) | A canary release sends a small slice of real traffic, like 5%, to the new version and compares its numbers with the old one. If the canary looks sick, you pull it before most users ever see it. |
| [Rollbacks](rollbacks.md) | A rollback puts the last good version back when a release goes wrong. Code is easy to roll back, but the data it already changed is not, and that's where rollbacks fail. |

[Back to all concepts](../../README.md)
