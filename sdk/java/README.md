# linkid-client – Java SDK

[![CI](https://github.com/Link-Genetic-Inc/lid/actions/workflows/ci.yml/badge.svg)](https://github.com/Link-Genetic-Inc/lid/actions/workflows/ci.yml)

Java client library for the [LinkID](https://linkgenetic.com) persistent identifier system.

## Installation (Maven)

Add to your pom.xml:

  groupId: org.linkgenetic
  artifactId: linkid-client
  version: 1.0.0

## Quick Start

LinkIdClient client = new LinkIdClient("https://resolver.linkgenetic.com");
ResolutionResult result = client.resolve("linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24");
System.out.println(result.getTargetUri());

## Requirements

- JDK 11, 17, or 21

## Development

mvn --batch-mode verify

## License

[LCL v1.0](../../LICENSE) – free for non-commercial use.
