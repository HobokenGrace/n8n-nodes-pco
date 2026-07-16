## ADDED Requirements

### Requirement: npm package is installable without local builds
The system SHALL publish npm package contents that include the compiled runtime files and n8n metadata required for installation as a community node without requiring consumers to clone the repository, run TypeScript compilation, or run the generator.

#### Scenario: Package metadata remains community-node compliant
- **WHEN** the package is prepared for npm publishing
- **THEN** `package.json` SHALL use a package name compatible with n8n community-node naming rules
- **AND** it SHALL include the `n8n-community-node-package` keyword
- **AND** it SHALL include built credential and node paths in the `n8n` attribute

#### Scenario: Published package includes built node files
- **WHEN** the npm package tarball is inspected before publishing
- **THEN** the tarball SHALL include compiled JavaScript and declaration files for the package entry point, credentials, generated Planning Center nodes, runtime helpers, and required copied assets
- **AND** it SHALL NOT require TypeScript source files or OpenAPI generator inputs to run in n8n

#### Scenario: Local package verification is repeatable
- **WHEN** a maintainer prepares a release locally
- **THEN** documented commands SHALL verify generated output is current, run tests, run linting, build `dist`, and run a scripted npm package contents check before the package is published

#### Scenario: CI verifies release candidates
- **WHEN** a pull request or push to `main` runs CI
- **THEN** CI SHALL install dependencies with pnpm, verify generated output, run tests, run linting, build `dist`, and run the scripted npm package contents check without publishing

### Requirement: npm publishing uses GitHub Actions provenance
The system SHALL provide a GitHub Actions npm publishing workflow that can publish `@hobokengrace/n8n-nodes-pco` with npm provenance from a reviewed repository commit.

#### Scenario: Publish workflow verifies before publishing
- **WHEN** the publish workflow runs for a published GitHub Release
- **THEN** it SHALL install dependencies with pnpm, verify generated output, run tests, run linting, build the package, run the scripted package contents check, and verify the release tag matches `package.json` version before invoking npm publish

#### Scenario: Publish workflow emits provenance
- **WHEN** the publish workflow publishes the package to npm
- **THEN** it SHALL publish with npm provenance enabled so npm can associate the package with the GitHub Actions workflow, repository, and commit that built it

#### Scenario: Scoped package is published publicly
- **WHEN** the publish workflow publishes `@hobokengrace/n8n-nodes-pco`
- **THEN** it SHALL publish the scoped package with public access rather than npm private-package access
- **AND** it SHALL publish the initial `0.1.0` release to npm's default `latest` dist-tag

#### Scenario: Trusted publishing is required
- **WHEN** npmjs.org has a trusted publisher configured for the repository, `publish.yml` workflow, and GitHub Environment `npm`
- **THEN** the publish workflow SHALL publish without a long-lived npm automation token

#### Scenario: Release tag matches package version
- **WHEN** the publish workflow runs for release tag `vX.Y.Z`
- **THEN** the workflow SHALL fail before publishing unless `package.json` version is `X.Y.Z`

### Requirement: Publishing documentation separates repository and npmjs.org work
The system SHALL document the steps maintainers must complete in the repository and on npmjs.org to make the community node installable from npm.

#### Scenario: Repository publishing checklist is documented
- **WHEN** a maintainer reads the publishing documentation
- **THEN** they SHALL see the repository-side tasks needed before release, including metadata review, release verification commands, build/package inspection, release tag/version matching, and triggering the publish workflow through a GitHub Release
- **AND** the README SHALL link to the publishing documentation

#### Scenario: npmjs.org setup checklist is documented
- **WHEN** a maintainer reads the publishing documentation
- **THEN** they SHALL see the npmjs.org-side tasks needed before first publish, including npm account or organization ownership, public access for the scoped package, trusted publisher setup for GitHub Actions, and the GitHub Environment `npm` value

#### Scenario: n8n verification path is documented
- **WHEN** a maintainer wants to submit the node for n8n Creator Portal verification
- **THEN** the documentation SHALL identify that the npm release must be published from GitHub Actions with provenance before Creator Portal submission
