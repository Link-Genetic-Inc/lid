# linkid-client – Java SDK

[![CI](https://github.com/Link-Genetic-Inc/lid/actions/workflows/ci.yml/badge.svg)](https://github.com/Link-Genetic-Inc/lid/actions/workflows/ci.yml)

Java client library for the [LinkID](https://linkgenetic.com) persistent identifier system.

## Publication status

The Maven artifact is publication-ready but is not yet published.

Add to your `pom.xml`:

```xml
<dependency>
    <groupId>com.linkgenetic</groupId>
    <artifactId>linkid-client</artifactId>
    <version>1.0.1</version>
</dependency>
```

## Quick Start

```java
LinkIdClient client = LinkIdClient.builder().build();
LinkIdClient.MetadataResolution result = (LinkIdClient.MetadataResolution)
    client.resolve("linkid:b1a93fdb-ab8a-49f8-a359-33ad79e19df3");
System.out.println(result.metadata().get("target_url").asText());
```

## Requirements

- JDK 17 or 21

## Development

```bash
mvn --batch-mode verify
```

## License

[Apache-2.0](LICENSE). This SDK currently supports public resolution only.
