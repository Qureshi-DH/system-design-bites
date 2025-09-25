# Disaster Recovery

Planning for the day a whole database or region disappears.

| Concept | In one line |
| --- | --- |
| [Backups](backups.md) | A backup is a copy of your data kept somewhere today's disaster cannot reach, so you can get it back after a bug, a breach, or a bad command. A backup you have never restored is a hope, not a backup. |
| [Disaster Recovery](disaster-recovery.md) | Disaster recovery is your plan for when something big is gone: a whole region, your main database, or your cloud account. It decides how fast you come back and how much data you lose on the way. |
| [RTO and RPO](rto-and-rpo.md) | RTO is how long you can afford to be down, and RPO is how much recent data you can afford to lose. Those two numbers decide your whole disaster recovery setup, and its bill. |
| [Failover](failover.md) | Failover is switching traffic from a broken primary to a standby that can take over. The hard parts are being sure the primary is really dead, and not bouncing back and forth when it is only slow. |
| [Active/Active vs Active/Passive](active-active-vs-active-passive.md) | Active/passive keeps a standby site waiting until the main one fails, while active/active has every site serving real traffic all the time. Active/active recovers faster, but two sites taking writes can disagree about the data. |
| [Multi Region Deployment](multi-region-deployment.md) | A multi region deployment runs your app in several parts of the world at once. Users get served from somewhere nearby, and losing one whole region does not take you offline. |

[Back to all concepts](../../README.md)
