## Context

The current README primarily explains OpenAPI snapshots, generated source, local checks, and publishing. It lacks an installation path and first-use workflow for n8n users, while some statements no longer match the credential implementation or the eleven nodes registered in `package.json`. Local Docker and publishing guides contain useful maintainer material, but there is no unified contributor entry point or support guidance.

The documentation must serve n8n workflow builders first, remain concise and technical, and limit compatibility claims to facts demonstrated by repository metadata, automation, or official product documentation.

## Goals / Non-Goals

**Goals:**

- Give a self-hosted n8n user a direct path from package installation to a successful Planning Center read operation.
- Explain PAT setup, generated-node selection, the generic API fallback, and common failure modes.
- Provide maintainable written walkthroughs for People, Giving, and the generic API node.
- Give contributors one practical guide to setup, generation, validation, local Docker testing, and maintainer references.
- Prevent stale endpoint, node inventory, command, and compatibility claims by tying documentation to explicit sources of truth.

**Non-Goals:**

- Document every generated resource and operation.
- Add screenshots or importable workflow JSON.
- Claim support for n8n versions not exercised by repository automation.
- Cover n8n Cloud or manual npm/Docker production installation.
- Change runtime behavior, authentication, generated nodes, dependencies, CI, or release automation.
- Replace the existing detailed publishing guide.

## Decisions

### Use the README as a landing page

`README.md` will contain package purpose, a short self-hosted quick start, generated-node-first guidance, a verified compatibility summary, and links to focused guides. Detailed procedures will live in `docs/`.

This is preferred over a comprehensive README because user, contributor, and maintainer procedures change at different rates and need distinct navigation. A docs-only landing page was rejected because npm and GitHub users encounter the README first.

### Organize focused guides by user task

The documentation set will add:

- `docs/getting-started.md` for self-hosted GUI installation, PAT setup, first execution, and installation or credential troubleshooting.
- `docs/walkthroughs.md` for People, Giving, and generic API end-to-end examples.
- `docs/nodes.md` for generated-versus-generic selection and an overview of all registered nodes.
- `docs/contributing.md` for prerequisites, commands, architecture orientation, generated-file policy, validation, local Docker testing, and contribution expectations.

`docs/publishing.md` remains the release authority, and `.docker/README.md` remains the detailed local container procedure. The contributor guide links to both rather than duplicating them.

### Prefer generated nodes and document the API node as a fallback

User guidance will recommend a product-specific generated node when it exposes the required Planning Center endpoint. The generic Planning Center API node will be documented for API-app and cross-product gaps.

Presenting both approaches without a recommendation was rejected because it makes the first-use decision harder and underuses the generated node experience this package is built around.

### Use written, source-verified examples

Walkthroughs will use text, configuration tables, and expected output descriptions. Each selected resource and operation must exist in the current generated source when the guide is written.

Screenshots were rejected because n8n UI changes make them expensive to maintain. Importable workflow JSON was rejected for this change because it adds versioned executable artifacts and validation requirements beyond the requested documentation pass.

### Define a source-of-truth hierarchy

Documentation claims will be checked against these sources in order:

1. Runtime and package behavior in credential definitions, node registrations, generated source, and `package.json`.
2. Repository automation in CI, scripts, local Docker configuration, and release workflows.
3. Official n8n and Planning Center documentation for product procedures and policy.

The docs will not copy transient version numbers or broad compatibility statements when the repository does not verify them. The registered-node overview must match `package.json`, and command documentation must match scripts and CI.

### Keep support guidance actionable and privacy-aware

The README and contributor guide will direct bugs and feature requests to the configured GitHub issue URL. Reports will request n8n version, package version, deployment type, node/resource/operation, sanitized inputs and outputs, and reproduction steps. Guidance will require removal of credentials and personal data and distinguish repository defects from Planning Center account or API-access support.

## Risks / Trade-offs

- [Written node inventory can drift from `package.json`] -> Verify all registered nodes during implementation and include the inventory in documentation review checks.
- [Walkthrough operations can change after OpenAPI regeneration] -> Choose stable read operations and validate operation labels against generated source before merging documentation changes.
- [Official product documentation can move] -> Link to authoritative pages and check external links during implementation without copying volatile policy text.
- [A concise README can omit useful detail] -> Provide clear task-oriented links and keep detailed procedures in focused guides.
- [No n8n support matrix may feel incomplete] -> State only verified Node.js and CI facts and defer a matrix until named n8n versions are tested.

## Migration Plan

1. Correct stale claims while restructuring the README.
2. Add focused guides and cross-link them from the README.
3. Consolidate contributor material without removing the Docker or publishing guides.
4. Validate internal links, external authoritative links, formatting, registered-node coverage, documented commands, and repository checks.

Rollback is a documentation-only revert; no data or runtime migration is required.

## Open Questions

None. The interview established audience, scope, format, walkthrough topics, compatibility policy, environment coverage, credential depth, and support expectations.
