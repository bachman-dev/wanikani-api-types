# WaniKani API Types

[![Tests (Main)](https://github.com/bachman-dev/wanikani-api-types/actions/workflows/push.yml/badge.svg)](https://github.com/bachman-dev/wanikani-api-types/actions/workflows/push.yml)
[![codecov](https://codecov.io/gh/bachman-dev/wanikani-api-types/graph/badge.svg?token=CCVBE1UM9M)](https://codecov.io/gh/bachman-dev/wanikani-api-types)

> [!IMPORTANT]
> This is a third-party library that is not affiliated with WaniKani nor Tofugu LLC.

This repository contains the folowing packages. You can view their READMEs below:

- [`wanikani-api-types`](./packages/types) - Regularly updated type definitions for the WaniKani API

## Documentation

Available at https://wanikani-api-types.bachman.dev

## Package Versioning

This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html), with versions formatted as x.y.z.

A new Patch Version z includes backwards-compatible bug fixes, corrections to documentation, and other relatively insignificant changes.

A new Minor Version y includes new backwards-compatible library features, new backwards-compatible WaniKani API changes (e.g. new revision, new fields on a resource, etc.), widened TypeScript version support, and deprecatiung (but not removing) existing features to be removed in the next major version.

A new Major Version x includes backwards-incompatible changes such as removing previously deprecated items, backwards-incompatible WaniKani API changes (e.g. removing a field on a resource), or a [breaking change in TypeScript](https://github.com/microsoft/TypeScript/wiki/Breaking-Changes) that's introduced into the library (we'll try to avoid these as much as possible).

| Package Version | TypeScript Versions | WaniKani API Version | Latest API Revision |
| --------------- | ------------------- | -------------------- | ------------------- |
| 2.x             | 5.0 - 5.9           | 2                    | 20170710            |
| 1.x             | >= 4.5              | 2                    | 20170710            |

## Need Help? Want to Contribute?

If you have any questions or encounter any problems with this package, please feel free to open an Issue.

We welcome any contributions to help improve this library. Please see the following documents:

- [https://github.com/bachman-dev/wanikani-api-types/blob/main/CONTRIBUTING.md](CONTRIBUTING.md)
- [https://github.com/bachman-dev/wanikani-api-types/blob/main/CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

Thank you in advance for your contribution(s)!
