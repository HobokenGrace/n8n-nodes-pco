## Why

Planning Center Online has too many endpoints to maintain as hand-written n8n operations. This change bootstraps a generator-first n8n community node package that is immediately useful with Planning Center Personal Access Token authentication and can add OAuth later without rewriting generated operations.

## What Changes

- Create a clean TypeScript n8n community node package named `@hobokengrace/n8n-nodes-pco`, using Node.js 20, pnpm, Vitest, MIT licensing, and check-only GitHub Actions CI.
- Add Planning Center PAT credentials with Application ID, Secret, and overrideable API-root Base URL fields; default Base URL is `https://api.planningcenteronline.com`, and the credential test calls `GET {baseUrl}/people/v2/me`.
- Keep auth, request, retry, pagination, Continue On Fail handling, and JSON:API normalization in shared runtime helpers under `src/runtime`.
- Build a project-owned OpenAPI-to-n8n generator under `src/generator`, using `@apidevtools/swagger-parser` for OpenAPI parsing and `$ref` resolution.
- Commit versioned Planning Center OpenAPI snapshots under `openapi/<product>/<date>.json` for every URL in `openapi-urls.txt`; normal generation uses committed snapshots, while snapshot refresh is a separate pnpm command.
- Generate and commit one product-specific node each for People, Groups, and Giving under `nodes/generated/<product>`, with the structure ready for later Planning Center products.
- Generate every safely mappable operation, including DELETE operations and deprecated operations marked as deprecated, and record exclusions with reasons.
- Generate n8n-friendly operation/resource labels, pagination controls defaulting to `Return All=false` and `Limit=100`, additional query parameters that override generated query fields on key conflict, standard create/update fields, raw JSON body fallback for complex request bodies, schema-detected relationship ID fields, and deterministic JSON:API output flattening.
- Ensure `pnpm build` compiles committed source without regenerating files; `generate:check`, tests, lint, and build enforce deterministic generated output with zero lint errors.
- Document PAT setup, generated-node behavior, snapshot refresh, generation workflow, local checks, and the OAuth-later boundary.

Out of scope: OAuth implementation, npm publishing automation, migration compatibility with existing repositories, and hand-curated workflow examples for every generated operation.

## Capabilities

### New Capabilities
- `n8n-community-package-bootstrap`: Defines the initial n8n community node package structure, tooling, validation, and generated-code boundaries.
- `pco-pat-authentication`: Defines Personal Access Token credential support and authenticated request behavior for Planning Center API calls.
- `pco-openapi-node-generation`: Defines how Planning Center OpenAPI specs are consumed to generate product-specific n8n nodes and expose API operations.

### Modified Capabilities

None.

## Impact

- Adds a new generated-first n8n community node package rather than continuing either cloned candidate repo.
- Introduces committed OpenAPI snapshots, committed generated node source, and CI drift checks as the generation contract.
- Introduces PAT credential support and shared Planning Center runtime helpers.
- Bakes the Planning Center OpenAPI source URLs from `openapi-urls.txt` into generator configuration for explicit snapshot refreshes.
- Keeps OAuth outside this bootstrap while preserving an auth boundary for a later OAuth credential.
