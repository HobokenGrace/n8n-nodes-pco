## ADDED Requirements

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
