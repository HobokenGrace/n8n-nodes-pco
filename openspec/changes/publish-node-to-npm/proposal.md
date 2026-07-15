## Why

This package currently requires users to clone the repository and build locally before n8n can install the Planning Center nodes. Publishing the package to npm will make it installable as a normal n8n community node package and prepare it for optional n8n Creator Portal verification.

## What Changes

- Add a release-ready npm publishing path for `@hobokengrace/n8n-nodes-pco` that builds the committed TypeScript sources into the package contents npm receives.
- Add GitHub Actions CI and GitHub Release-triggered npm publishing automation, including npm provenance support so the package can satisfy n8n Creator Portal verification requirements.
- Add repository documentation for maintainers that distinguishes required repository work from required npmjs.org account/package setup.
- Ensure package metadata, package contents, and verification commands are explicit enough for consumers to install the package from npm without building manually.
- Preserve the existing generated-node and PAT authentication behavior; this change is about packaging, publishing, and release documentation, not new Planning Center runtime behavior.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `n8n-community-package-bootstrap`: Adds the requirement that the community node package can be prepared, verified, and published to npm with a documented GitHub Actions provenance path and documented npmjs.org setup steps.

## Impact

- Affects `package.json`, package publication metadata, npm-packed file contents, release workflow configuration, and maintainer-facing documentation.
- Adds a GitHub Actions workflow for npm publishing and provenance rather than requiring local-machine publishing.
- Requires npmjs.org package ownership/setup outside the repository, including Trusted Publishing for the `publish.yml` workflow and GitHub Environment `npm`.
- Requires release verification to include generation drift checks, tests, linting, build output, scripted npm package inspection, and package-version/tag matching before publishing.
