# Contributing

Thank you for your desire to contribute!

Any contributions that fall within the **LICENSE** and **CODE_OF_CONDUCT** of the Project are welcome. To help streamline the process, please adhere to the guidelines below.

## Bug Reporting

Bugs can be reported via GitHub Issue **(preferred)** or [in this library's thread on the WaniKani Community](https://community.wanikani.com/t/typescript-wanikani-api-types/59064).

I will do my best to at least acknowledge the issue within 24 hours of receipt, but it may take up to and including the weekend for it to be addressed depending on severity. Thank you in advance for your patience and for reporting any bugs you may encounter.

## Feature Requests

Features can be requested via GitHub issues as well. Much like Bug Reports, your issue title should be concise and form the gist of your request.

Please include in your description not only a detailed summary of the requested feature, but if possible, how we may go about implementing such a feature. **No code needed**, but anything that can supplement the suggestion is welcome.

## Feature Implementations

Open a Pull Request either as a completely new implementation for your own feature request, or to satisfy an existing Issue. Within the thread, please include an explanation of the improvement, and do your best to document any new or changed code.

This project uses [oxlint](https://oxc.rs/docs/guide/usage/linter) and [oxfmt](https://oxc.rs/docs/guide/usage/formatter) for linting and formatting. Please make sure that your code passes `pnpm lint` and `pnpm format:check`. **Any pull requests that error out in the linter will not be accepted until the errors are handled.** Any linting errors should be dealt with either with code revision or a rule override (e.g. `oxlint-disable-next-line`) if the rule violation cannot be avoided.

I will try to review Pull Requests as soon as possible, and may be able to provide feedback within 24 hours. However, should the implementation be accepted, it may not be implemented for some time, as this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html). So depending mostly on backward incompatibility, the time to implement the change may vary.

## Pull Request Labels

Each package in this repository is released on its own, with its own version number and release notes. To keep track of which changes belong to which release, pull requests are labeled in two ways:

- **Package labels** name the package(s) a pull request changes, and match the package's folder under `packages/`:
  - `types` for `@bachman-dev/wanikani-api-types`
  - `requests` for `@bachman-dev/wanikani-api-requests`
  - `utils` for `@bachman-dev/wanikani-api-utils`
  - `valibot` for `@bachman-dev/wanikani-api-valibot`

  A pull request that changes more than one package gets each of those packages' labels. Changes that don't affect a published package (e.g. GitHub Actions or repository tooling) don't need one.

- **Change-type labels** decide which section of the release notes a pull request is listed under: `breaking change`, `enhancement`, `bug`, `documentation`, `typescript`, or `dependencies`. Anything else is listed under "Other Changes".

A package's release notes only include pull requests with that package's label, so a pull request without one won't appear in any package's release notes. If you're unable to add labels yourself, mention which package(s) your pull request affects in its description, and a maintainer will label it.

## Development

Fork and then clone the repo from GitHub into a location of your choosing. It's assumed that Node/NPM are already installed.

Install the dependencies.

```shell
pnpm install
```

After checking out a new branch, make any needed changes, and run all scripts defined in the `package.json`.

## Releasing

Only maintainers publish releases; the steps below are for their reference.

Each package is released separately, from a GitHub release whose tag names the package's folder and the version being released: `<package folder>@<version>`, e.g. `types@3.0.0` or `requests@1.0.0-beta.1`.

1. In a pull request, update the `version` in the package's `package.json` (e.g. `packages/requests/package.json`), then merge it.
2. [Draft a new release](https://github.com/bachman-dev/wanikani-api-types/releases/new) on GitHub:
   - **Tag:** create a new tag named `<package folder>@<version>`, matching the version from step 1, targeting the branch being released.
   - **Title:** the package and version, e.g. `wanikani-api-requests 1.0.0-beta.1`.
   - **Pre-release:** check this for versions with a pre-release suffix (e.g. `-alpha.0`, `-rc.1`). These are published under the `next` dist-tag; all other versions are published as `latest`.
   - **Release notes:** leave them empty to have them generated for you, or write your own. Avoid the **Generate release notes** button, as it includes pull requests for every package.
3. Publish the release. The Release workflow then:
   - checks that the tag names a package under `packages/`, that its version matches the package's `package.json`, and that pre-release versions are marked as a pre-release;
   - lints, tests, and builds the package, along with any packages it depends on;
   - stages the package for publishing to npm;
   - fills in empty release notes with the pull requests labeled for that package since its previous release.
4. On the npm website, approve the package's new version under **Staged Packages** so it becomes available to install.

A package that depends on another package in this repository (e.g. `requests` on `types`) is published depending on that package's version as of the tagged commit. If a release relies on unreleased changes to another package, release that package first.

If the workflow fails before the package is staged, fix the problem, then delete the release and its tag and create them again.

## Questions?

Feel free to include any questions you may have alongside your Issue or Pull Request. **Even if you feel you cannot 100% fit the Issue/PR to this guide, don't be afraid to submit it.** Thank you again in advance for your help on this project!
