## ADDED Requirements

### Requirement: User-facing documentation entry point

The repository SHALL provide a concise README that identifies the package, prioritizes n8n workflow builders, explains when to use generated product nodes versus the generic API node, and routes readers to focused user, contributor, support, and license information.

#### Scenario: Workflow builder opens the repository

- **WHEN** an n8n workflow builder opens the README on GitHub or npm
- **THEN** the builder can identify the package purpose, supported Planning Center product nodes, self-hosted quick-start path, and next guide without reading maintainer implementation details

#### Scenario: User chooses a node type

- **WHEN** a required endpoint is exposed by a generated product node
- **THEN** the documentation recommends that generated node and presents the generic Planning Center API node as the fallback for uncovered API-app or cross-product needs

### Requirement: Self-hosted installation and PAT setup

The documentation SHALL provide source-verified steps for installing `@hobokengrace/n8n-nodes-pco` through the self-hosted n8n Community Nodes UI and configuring the `Planning Center PAT API` credential with an Application ID, Secret, and Base URL.

#### Scenario: User installs through the n8n UI

- **WHEN** a user follows the getting-started guide on a self-hosted n8n instance that permits community nodes
- **THEN** the guide directs the user through **Settings > Community Nodes**, identifies the exact npm package name, and leads to the installed Planning Center nodes

#### Scenario: User configures Planning Center credentials

- **WHEN** a user has created a Planning Center personal access token
- **THEN** the guide explains how to enter the Application ID and Secret from the same token, retain the default Base URL unless intentionally overridden, and test the credential

#### Scenario: Credential test fails

- **WHEN** the credential test returns a documented 401, 403, 404, or 429 response
- **THEN** the guide provides troubleshooting consistent with the credential implementation and does not describe an obsolete test endpoint

### Requirement: First-use and end-to-end walkthroughs

The documentation SHALL provide durable written guidance for a first safe read and end-to-end walkthroughs using Planning Center People, Planning Center Giving, and Planning Center API.

#### Scenario: User completes a generated-node workflow

- **WHEN** a user follows the People or Giving walkthrough
- **THEN** every documented node, resource, operation, and parameter exists in the current generated source and the guide describes the expected output and bounded-result or pagination behavior

#### Scenario: User completes a generic API workflow

- **WHEN** a user follows the generic API walkthrough for a need not covered by the selected generated workflow
- **THEN** the guide explains the endpoint choice, required inputs, expected output, and why the generic node is appropriate

#### Scenario: n8n interface changes

- **WHEN** n8n changes visual styling or minor layout details
- **THEN** the walkthroughs remain usable because required instructions are expressed as text and configuration values rather than screenshots

### Requirement: Complete overview node catalog

The documentation SHALL include one overview entry for every node registered in `package.json` and SHALL avoid duplicating the complete generated operation reference.

#### Scenario: Registered nodes are compared with the catalog

- **WHEN** a maintainer compares `package.json` node registrations with the node catalog
- **THEN** API, Calendar, Check-Ins, Current, Giving, Groups, People, Publishing, Registrations, Services, and Webhooks each appear exactly once with a concise purpose

#### Scenario: User needs operation details

- **WHEN** a user needs to map a generated operation to Planning Center's API
- **THEN** the guide explains resources, operations, endpoint subtitles, identifiers, query parameters, and output conventions without maintaining a separate exhaustive operation list

### Requirement: Verified compatibility and behavior claims

Documentation SHALL limit compatibility, command, authentication, and package-surface claims to facts supported by package metadata, repository automation, implementation source, or official n8n and Planning Center documentation.

#### Scenario: Compatibility is documented

- **WHEN** the documentation states runtime or tool compatibility
- **THEN** it identifies Node.js 22 or newer from package metadata, identifies the versions exercised by CI where relevant, and does not claim support for untested n8n versions

#### Scenario: Package behavior changes

- **WHEN** credential behavior, node registrations, scripts, CI versions, or generated operations change
- **THEN** documentation review checks the affected claims against the new source of truth before the change is accepted

### Requirement: Practical contributor and maintainer navigation

The repository SHALL provide a contributor guide covering prerequisites, commands, repository structure, generated-file policy, validation, local Docker testing, and the handoff to existing maintainer publishing documentation.

#### Scenario: New contributor sets up the repository

- **WHEN** a contributor follows the contributor guide
- **THEN** the documented Node.js and pnpm prerequisites and install, generation-check, test, lint, build, package-inspection, and local-testing commands match `package.json`, CI, and `.docker/README.md`

#### Scenario: Contributor changes generated behavior

- **WHEN** a contributor needs to change a generated node
- **THEN** the guide directs the contributor to update generator inputs or code and regenerate rather than hand-editing `nodes/generated/`

#### Scenario: Maintainer prepares a release

- **WHEN** a maintainer needs release instructions
- **THEN** the contributor guide links to `docs/publishing.md` instead of duplicating the release checklist in the README

### Requirement: Actionable and safe support guidance

The documentation SHALL define how users report bugs and request features while protecting credentials and personal data.

#### Scenario: User reports a repository defect

- **WHEN** a user prepares a bug report
- **THEN** the guidance directs the user to the configured GitHub issue URL and requests n8n version, package version, deployment type, node/resource/operation, sanitized input and output, error details, and reproduction steps

#### Scenario: Report contains sensitive information

- **WHEN** a user prepares logs, screenshots, inputs, or outputs for an issue
- **THEN** the guidance requires removal of the Application ID, Secret, authorization data, and Planning Center personal data before submission

#### Scenario: Request concerns Planning Center account access

- **WHEN** a request requires changes to a Planning Center account, permissions, or API availability rather than this package
- **THEN** the support guidance distinguishes it from a repository issue and directs the user to the appropriate Planning Center support path
