## 1. Project Foundation

- [ ] 1.1 Configure the package as `@hobokengrace/n8n-nodes-pco`, target Node.js 20, and use pnpm for dependency management.
- [ ] 1.2 Create the TypeScript n8n community node package structure from scratch with MIT license, source, credential, node, generator, OpenAPI input, test, and asset directories.
- [ ] 1.3 Add package metadata, n8n community-node metadata, TypeScript configuration, ESLint configuration, Prettier configuration, a placeholder PCO icon asset reused by generated product nodes, and ignored build-output paths.
- [ ] 1.4 Add build, lint, format, generate, generate:check, test, and clean scripts to `package.json`, using Vitest for the test script and keeping build from running generation automatically.
- [ ] 1.5 Add a README documenting PAT setup, generated-node model, OpenAPI snapshot refresh workflow, node generation workflow, local checks, and OAuth-later direction.
- [ ] 1.6 Add a check-only GitHub Actions workflow that runs pnpm install, generation drift check, tests, lint, and build without publishing.

## 2. PAT Authentication

- [ ] 2.1 Implement the Planning Center PAT credential type with Application ID, Secret, Base URL fields, and a built-in credential test using a People current-user/me-style endpoint when available.
- [ ] 2.2 Implement a shared Planning Center request helper that authenticates requests with the PAT credential using Basic authentication and centralizes retry behavior for HTTP 429 and transient 5xx responses with up to five total attempts.
- [ ] 2.3 Implement shared Planning Center pagination helper source under `src/runtime` that supports `Return All` and `Limit` for generated list operations.
- [ ] 2.4 Implement shared Planning Center JSON:API response normalizer source under `src/runtime` that emits top-level `id`, `type`, flattened attributes, and preserved `relationships`, `links`, and `meta` keys.
- [ ] 2.5 Ensure request helper errors are actionable, respect n8n Continue On Fail behavior in generated execution, and do not expose credential secret values.
- [ ] 2.6 Add tests for credential metadata, auth header behavior, retry behavior, pagination controls, JSON:API output normalization, Continue On Fail handling, and secret-safe error handling.

## 3. OpenAPI Generation Pipeline

- [ ] 3.1 Add committed Planning Center OpenAPI snapshot storage under `openapi/<product>/<date>.json` and seed it with initial People, Groups, and Giving product spec snapshots.
- [ ] 3.2 Add generator configuration that bakes in the Planning Center OpenAPI URLs from `openapi-urls.txt`, maps product names to active committed snapshot inputs, records source dates, and maps products to generated node outputs.
- [ ] 3.3 Implement a working pnpm snapshot refresh command that fetches all configured OpenAPI URLs into versioned snapshot files under `openapi/<product>/<date>.json`.
- [ ] 3.4 Implement the initial project-owned OpenAPI-to-n8n generation source under `src/generator` for product-specific nodes with generated `execute()` dispatchers, using `@apidevtools/swagger-parser` for OpenAPI parsing/ref resolution while owning n8n-specific generation logic.
- [ ] 3.5 Add post-processing for generated node names, operation labels, optional fields, additional query parameter collections, generated attribute payload fields, advanced raw JSON body mode, credential binding, and n8n lint compatibility.
- [ ] 3.6 Generate the initial Planning Center People, Groups, and Giving nodes under `nodes/generated/<product>` from the configured OpenAPI spec snapshots.
- [ ] 3.7 Add generator metadata-summary tests or snapshots that verify generated People, Groups, and Giving resource counts, operation counts, key operation metadata, node descriptions, and recorded exclusions.

## 4. Package Integration

- [ ] 4.1 Wire generated nodes and PAT credentials into the package's n8n metadata.
- [ ] 4.2 Verify generated `execute()` operations call the shared request helper rather than embedding auth-specific behavior per endpoint.
- [ ] 4.3 Add a lightweight smoke test that imports generated node classes and validates required n8n node descriptions.
- [ ] 4.4 Add a deterministic regeneration check that fails when unchanged inputs produce unexpected generated diffs.
- [ ] 4.5 Commit generated TypeScript node source files and ensure the deterministic regeneration check detects drift from committed generated source.

## 5. Verification

- [ ] 5.1 Run the generation command and confirm generated outputs are reproducible.
- [ ] 5.2 Run the test command and confirm all credential, request-helper, metadata, and generator tests pass.
- [ ] 5.3 Run the lint command and confirm n8n community-node linting passes with zero lint errors.
- [ ] 5.4 Run the build command and confirm the package compiles with generated nodes and copied assets.
- [ ] 5.5 Review the bootstrap against the OpenSpec requirements and update tasks or specs if implementation uncovers scope gaps.
