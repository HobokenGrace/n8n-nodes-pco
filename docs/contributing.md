# Contributing

This guide covers repository setup, generated source, validation, local n8n
testing, and contribution expectations. User installation starts in
[Getting Started](getting-started.md); maintainers preparing a release must use
the separate [Publishing](publishing.md) checklist.

## Prerequisites

- Git
- Node.js 22 or newer, matching `.node-version` and CI
- pnpm 10.30.2, matching `package.json#packageManager` and CI
- Docker with Compose for optional local n8n testing

## Set Up the Repository

```sh
git clone https://github.com/HobokenGrace/n8n-nodes-pco.git
cd n8n-nodes-pco
pnpm install --frozen-lockfile
```

Use the committed lockfile. Do not update dependencies as an incidental part of
an unrelated contribution.

## Commands

| Command                | Purpose                                                                   |
| ---------------------- | ------------------------------------------------------------------------- |
| `pnpm generate`        | Regenerate committed nodes from active snapshots and generator source.    |
| `pnpm generate:check`  | Fail if committed generated output differs from deterministic generation. |
| `pnpm openapi:refresh` | Fetch and overwrite configured OpenAPI snapshots for explicit review.     |
| `pnpm test`            | Run the Vitest suite once.                                                |
| `pnpm lint`            | Run the repository ESLint configuration used by CI.                       |
| `pnpm lint:n8n`        | Run stricter community-node lint as an optional follow-up check.          |
| `pnpm build`           | Compile with `n8n-node build` and copy SVG assets into `dist`.            |
| `pnpm package:inspect` | Inspect the npm tarball and verify required package files.                |
| `pnpm format`          | Format repository files with Prettier.                                    |
| `pnpm dev`             | Start the `n8n-node` development workflow.                                |

`pnpm build` does not regenerate node source. Run generation explicitly when
generator inputs change.

## Repository Structure

| Path                         | Responsibility                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `openapi/<product>/`         | Committed Planning Center OpenAPI inputs used for offline generation.            |
| `src/generator/`             | Snapshot parsing, product configuration, and generated node rendering.           |
| `src/runtime/`               | Shared authentication, requests, retries, pagination, normalization, and errors. |
| `nodes/generated/<product>/` | Committed generated operation nodes, polling triggers, and copied icons.         |
| `nodes/assets/`              | Canonical product icons used by generation.                                      |
| `credentials/`               | Hand-written n8n credential definitions.                                         |
| `tests/`                     | Generator, runtime, metadata, and package behavior tests.                        |
| `.docker/`                   | Local container setup for testing the packed package in n8n.                     |
| `.github/workflows/`         | CI and release-triggered publishing automation.                                  |

`index.ts` exports credentials and generated nodes, while `package.json#n8n`
registers their compiled entrypoints. Metadata tests keep those package surfaces
aligned.

## Generated Files

Do not hand-edit TypeScript or copied SVG files under
`nodes/generated/<product>/`. A direct edit will be overwritten and causes
`pnpm generate:check` to fail.

Make the change at its source instead:

- Change generator behavior in `src/generator/`.
- Change the active product or snapshot selection in `src/generator/config.ts`.
- Change committed API input under `openapi/<product>/`.
- Change a canonical icon under `nodes/assets/`.

Then run:

```sh
pnpm generate
pnpm generate:check
```

Commit both the changed inputs and generated output. Run `pnpm openapi:refresh`
only for an intentional live snapshot update, review the snapshot diff first,
and regenerate after accepting it. Repository-owned endpoint additions and
corrections follow [Planning Center API Supplements](api-supplements.md).

## Validate a Change

Run the same checks and order used by CI:

```sh
pnpm generate:check
pnpm test
pnpm lint
pnpm build
pnpm package:inspect
```

For a focused test during development:

```sh
pnpm exec vitest run tests/runtime.test.ts
pnpm exec vitest run tests/generator.test.ts
pnpm exec vitest run tests/metadata.test.ts
```

Do not commit `dist/`; it is build output. Do commit generated source because it
is part of the reviewed package input.

## Test in Local n8n

After the repository checks pass, use the
[local Docker development guide](../.docker/README.md) to build, pack, install,
and exercise the package in an n8n container. Verify the specific node,
resource, operation, credentials, output, and error path affected by the change.

The Docker environment is for local development. It uses a named volume that can
contain workflows, credentials, execution data, and settings; follow the reset
instructions before sharing or disposing of that state.

## Pull Requests

Keep a pull request focused on one behavior or documentation change. Include:

- The problem and intended behavior
- Relevant generated inputs and output, when generation changes
- Tests or a reason automated coverage is not applicable
- The commands run and their results
- Local n8n verification for user-visible node behavior when practical
- Documentation updates for user-visible or contributor-visible changes

Never include PAT Application IDs, PAT Secrets, authorization headers, real
workflow credentials, or Planning Center personal or financial data in commits,
tests, fixtures, screenshots, logs, or pull request descriptions.

## Report a Bug

Open a [GitHub issue](https://github.com/HobokenGrace/n8n-nodes-pco/issues) with:

- n8n version and package version
- Deployment type and relevant community-node configuration
- Planning Center node, resource, and operation
- Minimal reproduction steps
- Sanitized node input and output
- Complete sanitized error text and HTTP status, when available
- Whether the issue reproduces with a bounded result limit

Remove the Application ID, Secret, Basic authorization data, cookies, webhook
secrets, names, email addresses, phone numbers, addresses, donation details, and
other identifying Planning Center data before submission. Replace sensitive
values with clear placeholders rather than partially masking a real credential.

## Request a Feature

Open a [GitHub issue](https://github.com/HobokenGrace/n8n-nodes-pco/issues) and
describe the Planning Center product, endpoint, workflow goal, expected inputs
and outputs, and why current generated operations do not cover the need. Link the
official Planning Center API documentation when available, but do not attach
private API responses or account data.

Repository issues cover this package's generated nodes, runtime, documentation,
and automation. For Planning Center account access, product permissions, or API
availability, contact [Planning Center Support](https://www.planningcenter.com/support).
For n8n platform behavior unrelated to this package, use n8n's support channels.

## Publishing Handoff

Do not publish normal releases locally. Once a change has passed review and CI,
maintainers must follow [Publishing](publishing.md). That guide is authoritative
for versioning, tags, GitHub Releases, npm Trusted Publishing, provenance, and
failure recovery.
