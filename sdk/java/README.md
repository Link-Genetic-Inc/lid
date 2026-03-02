# linkid-client – Java SDK

[![CI](https://github.com/Link-Genetic-Inc/lid/actions/workflows/ci.yml/badge.svg)](https://github.com/Link-Genetic-Inc/lid/actions/workflows/ci.yml)

Java client library for the [LinkID](https://linkgenetic.com) persistent identifier system.

## Installation (Maven)

Add to your `pom.xml`:

```xml
<dependency>
    <groupId>org.linkgenetic</groupId>
    <artifactId>linkid-client</artifactId>
    <version>1.0.0</version>
</dependency>
```

## Quick Start

```java
LinkIdClient client = new LinkIdClient("https://resolver.linkgenetic.com");
ResolutionResult result = client.resolve("linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24");
System.out.println(result.getTargetUri());
```

## Requirements

- JDK 17 or 21

## Development

```bash
mvn --batch-mode verify
```

## License

[LCL v1.0](../../LICENSE) – free for non-commercial use.
