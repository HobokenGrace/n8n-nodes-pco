# n8n-community-package-bootstrap Specification

## Purpose
TBD - created by archiving change bootstrap-pco-n8n-node. Update Purpose after archive.
## Requirements
### Requirement: Community node package foundation
The system SHALL provide a TypeScript-based n8n community node package foundation with package metadata, n8n node metadata, credential metadata, source directories, generated-code directories, and ignored build outputs.

#### Scenario: Package metadata is present
- **WHEN** the project bootstrap is complete
- **THEN** the package SHALL contain valid npm metadata, MIT license metadata, and n8n community-node metadata for the generated Planning Center nodes and credentials

#### Scenario: n8n dependency compatibility is declared
- **WHEN** package dependencies are configured
- **THEN** `n8n-workflow` SHALL be declared as a wildcard peer/dev dependency rather than bundled as a runtime dependency

#### Scenario: Generated nodes have placeholder icon
- **WHEN** People, Groups, and Giving nodes are generated
- **THEN** each generated product node SHALL reference the same placeholder PCO icon asset until product-specific icons are added later

#### Scenario: Runtime baseline is configured
- **WHEN** the project bootstrap is complete
- **THEN** the package SHALL target Node.js 20 and use pnpm as the documented package manager with a pnpm lockfile

#### Scenario: Source boundaries are clear
- **WHEN** a contributor inspects the project structure
- **THEN** runtime helper source under `src/runtime`, generator source under `src/generator`, OpenAPI inputs, generated node outputs under `nodes/generated/<product>`, tests, and build artifacts SHALL be distinguishable by directory and naming

### Requirement: Development verification commands
The system SHALL provide repeatable commands for building, linting, formatting, generating nodes, and running tests.

#### Scenario: Build verification runs
- **WHEN** a contributor runs the package build command
- **THEN** TypeScript compilation and required asset copying SHALL compile committed generated source as-is without running generation automatically

#### Scenario: Lint verification runs
- **WHEN** a contributor runs the package lint command
- **THEN** n8n community-node lint rules SHALL run against hand-written and generated node package files and complete with zero lint errors

#### Scenario: Test verification runs
- **WHEN** a contributor runs the package test command
- **THEN** Vitest tests SHALL validate package metadata, credential behavior, request helper behavior, and generator output invariants

#### Scenario: CI verification runs
- **WHEN** GitHub Actions check CI runs for the bootstrap project
- **THEN** it SHALL install dependencies with pnpm, verify generated output is current from committed snapshots, run tests, run linting, and run the build without publishing the package or fetching remote OpenAPI specs

### Requirement: Bootstrap documentation
The system SHALL document PAT setup, the generated-node model, the OpenAPI snapshot refresh workflow, the node generation workflow, and the future OAuth direction.

#### Scenario: Contributor reads README
- **WHEN** a contributor reads the bootstrap README
- **THEN** they SHALL understand how to configure PAT credentials, refresh snapshots, regenerate nodes, run checks, and why OAuth is deferred

### Requirement: Generated artifacts are reproducible
The system SHALL make generated node files reproducible from committed generator code, committed generation configuration, and Planning Center OpenAPI spec inputs.

#### Scenario: Regeneration is deterministic
- **WHEN** a contributor runs the generation command with unchanged inputs
- **THEN** generated node outputs SHALL remain unchanged except for deterministic formatting

#### Scenario: Generated source is committed
- **WHEN** product nodes are generated
- **THEN** generated TypeScript node source files SHALL be committed to the repository and CI SHALL detect drift between committed generated source and regenerated output

#### Scenario: Generation uses committed snapshots
- **WHEN** the normal generation command runs
- **THEN** it SHALL use committed Planning Center OpenAPI snapshot files under `openapi/<product>/<date>.json` rather than fetching specs from the network

#### Scenario: Spec snapshots are refreshed
- **WHEN** a contributor runs the spec update command after official source URLs are configured
- **THEN** the command SHALL refresh committed versioned OpenAPI snapshots separately from normal generation so spec changes can be reviewed

#### Scenario: Bootstrap snapshots are seeded
- **WHEN** the project bootstrap is complete
- **THEN** committed OpenAPI snapshots SHALL exist for every Planning Center URL listed in `openapi-urls.txt`

#### Scenario: Refresh uses configured URLs
- **WHEN** a contributor runs the snapshot refresh command
- **THEN** the command SHALL fetch OpenAPI documents from all configured Planning Center source URLs and write them to their configured `openapi/<product>/<date>.json` snapshot paths

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

