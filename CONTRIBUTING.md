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

This project uses sensible ESLint rules. Please make sure that your code passes the lint when possible. **Any pull requests that error out in ESLint will not be accepted until the errors are handled.** Any linting errors should be dealt with either with code revision or a rule override (e.g. `eslint-disable-next-line`) if to rule violation cannot be avoided.

I will try to review Pull Requests as soon as possible, and may be able to provide feedback within 24 hours. However, should the implementation be accepted, it may not be implemented for some time, as this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html). So depending mostly on backward incompatibility, the time to implement the change may vary.

## Development

Fork and then clone the repo from GitHub into a location of your choosing. It's assumed that Node/NPM are already installed.

Install the dependencies.

```shell
pnpm install
```

After checking out a new branch, make any needed changes, and run all scripts defined in the `package.json`.

## Questions?

Feel free to include any questions you may have alongside your Issue or Pull Request. **Even if you feel you cannot 100% fit the Issue/PR to this guide, don't be afraid to submit it.** Thank you again in advance for your help on this project!
