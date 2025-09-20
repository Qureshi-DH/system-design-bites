# Build and Infrastructure

Turning code into running software, the same way every time.

| Concept | In one line |
| --- | --- |
| [CI/CD](ci-cd.md) | CI/CD is a pipeline that builds and tests every change the moment you push it, then ships the ones that pass. Small changes go out many times a day instead of one scary release a month. |
| [Build Caching](build-caching.md) | Build caching skips every step whose inputs did not change and reuses the saved output. It turns a 10 minute build into a 90 second one, as long as you order the steps so the cache can actually hit. |
| [Dependency Hell](dependency-hell.md) | Dependency hell is when the libraries you use need different, incompatible versions of the same library underneath. Your own code is fine, but the app will not install, will not build, or breaks in places you never touched. |
| [Semantic Versioning](semantic-versioning.md) | Semantic versioning packs a promise into a version number: MAJOR.MINOR.PATCH. Which number moved tells everyone downstream whether upgrading is safe or will break their code. |
| [Docker](docker.md) | Docker packs your app, its runtime, and every library it needs into one image that runs the same on your laptop, in CI, and in production. It is the fix for "works on my machine". |
| [Kubernetes](kubernetes.md) | Kubernetes runs your containers across a fleet of machines. You write down what you want, like "6 copies of this service, always", and it keeps working until reality matches, even when machines die. |
| [Helm Charts](helm-charts.md) | A Helm chart is a package of Kubernetes YAML with blanks to fill in. You write the manifests once, then install the same chart in dev, staging, and production with different values for each. |

[Back to all concepts](../../README.md)
