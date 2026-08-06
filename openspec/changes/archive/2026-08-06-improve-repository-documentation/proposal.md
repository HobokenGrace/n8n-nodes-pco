## Why

The repository documentation is oriented toward generation and release work rather than the n8n workflow builders who need to install, authenticate, and use the package. It also contains stale claims about the credential-test endpoint and available nodes, so users and contributors cannot rely on it as an accurate entry point.

## What Changes

- Rewrite the README as a concise user-facing landing page with a self-hosted n8n quick start, verified compatibility statements, node-selection guidance, and links to focused guides.
- Add step-by-step self-hosted UI installation and Planning Center Personal Access Token setup guidance.
- Add written end-to-end walkthroughs for Planning Center People, Planning Center Giving, and the generic Planning Center API node.
- Add an overview catalog of every registered node without duplicating the generated operation surface.
- Consolidate practical contributor guidance for setup, repository structure, generation, validation, local Docker testing, and publishing handoff.
- Document bug-reporting, feature-request, support, credential-redaction, and personal-data-redaction expectations.
- Correct stale documentation about the credential-test endpoint and the package's registered nodes.
- Preserve `docs/publishing.md` as the detailed maintainer release guide and keep operation-level API reference generation out of scope.

## Capabilities

### New Capabilities

- `repository-documentation`: Defines the required user, contributor, compatibility, support, and maintenance documentation for the community-node package.

### Modified Capabilities

None.

## Impact

- Affects `README.md`, `.docker/README.md`, and new focused guides under `docs/`.
- Uses `package.json`, CI workflows, credential definitions, generated node registrations, and official n8n and Planning Center documentation as sources of truth.
- Does not change runtime behavior, public APIs, package dependencies, generated node source, authentication behavior, or release automation.
