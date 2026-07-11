## Why

Planning Center Online has broad product coverage and high endpoint volume, especially in People, making a hand-written n8n community node difficult to maintain. Recent improvements to Planning Center's OpenAPI specs create an opportunity to bootstrap a generator-first node package that delivers immediate value through Personal Access Token authentication while leaving room for OAuth support later.

## What Changes

- Create a new n8n community node project for Planning Center Online from a clean start rather than forking either existing repository directly.
- Publish/package the bootstrap under the npm package name `@hobokengrace/n8n-nodes-pco`.
- Use Node.js 20 and pnpm as the development, CI, and package-lock baseline.
- Use Vitest for unit, snapshot, and generator invariant tests.
- Add GitHub Actions CI for checks only: install, generation drift check, tests, lint, and build. Publishing automation is out of scope for the bootstrap.
- CI uses committed OpenAPI snapshots only and does not run remote snapshot refresh.
- Generator tests snapshot metadata summaries such as operation/resource counts, key operation metadata, exclusions, and node descriptions rather than full generated source files.
- Bootstrap targets zero lint errors for hand-written and generated code under n8n community-node rules.
- README scope includes PAT setup, generated-node model, snapshot refresh/generate workflow, and OAuth-later direction.
- Use the MIT license.
- Add a PAT-first authentication path so users can connect quickly with Planning Center API credentials.
- Present PAT credentials with Planning Center Application ID, Secret, and Base URL fields.
- Default the PAT credential Base URL to `https://api.planningcenteronline.com` while allowing overrides.
- Include a built-in n8n credential test using a low-impact People current-user/me-style endpoint when available from the People API spec.
- Establish an OpenAPI-driven generation workflow for Planning Center product nodes and actions, beginning with People, Groups, and Giving, and structured to expand across Services, Calendar, Check-Ins, Registrations, Publishing, and other products.
- Expose generated Planning Center functionality as one n8n node per Planning Center product rather than a single all-in-one node.
- Generate node `execute()` methods that call a shared Planning Center request helper instead of relying on n8n declarative routing metadata as the primary runtime path.
- For generated paginated list operations, expose a standard n8n-style `Return All` option with `Limit` fallback rather than always fetching every page or only returning the first page.
- Normalize Planning Center JSON:API responses into n8n-friendly items with top-level `id`, `type`, flattened `data.attributes`, and preserved `relationships`, `links`, and `meta` keys.
- If flattened attributes collide with reserved output keys, preserve the reserved key and emit the attribute as `attribute_<name>`.
- For generated create/update operations, support generated attribute fields for normal use plus an advanced raw JSON body mode for endpoints or payloads that need full JSON:API control.
- Add shared retry behavior for Planning Center HTTP 429 rate-limit responses and transient 5xx API failures, with up to five total attempts.
- Maintain the OpenAPI-to-n8n generator in the new repository so product configuration, generated output contracts, post-processing, auth binding, lint normalization, and exclusion tracking are project-owned.
- Commit Planning Center OpenAPI spec snapshots as the deterministic generation source using versioned files at `openapi/<product>/<date>.json`.
- Commit generated TypeScript node source files and use CI to detect generation drift.
- Store committed generated product node source under `nodes/generated/<product>`.
- Store committed Planning Center OpenAPI snapshots under `openapi/<product>/<date>.json` and track the active source URL/date per product in generator configuration.
- Implement a working pnpm snapshot refresh command that fetches configured OpenAPI URLs into versioned snapshot files, separate from normal node generation.
- The refresh command fetches all configured Planning Center product specs, while bootstrap node generation targets People, Groups, and Giving.
- `pnpm build` compiles committed generated source as-is; generation and generation drift checks run through separate commands.
- Generated execution respects n8n's Continue On Fail behavior for per-item errors.
- Generated optional fields are not prefilled from OpenAPI defaults/examples and are omitted from requests unless explicitly set.
- The generator respects OpenAPI `readOnly` and `writeOnly` schema flags when creating write inputs and output fields.
- Generated standard create/update mode includes simple relationship ID fields where JSON:API relationships are detectable, with raw JSON mode retained for complex relationship payloads.
- Generated to-many relationship fields use comma-separated ID input in standard mode.
- Generated update/PATCH operations send only explicitly set attributes and relationships in standard mode.
- Generated standard mode marks OpenAPI-required request fields as required in n8n where possible.
- Generated operations include an advanced key/value additional query parameters collection for API parameters not modeled by the OpenAPI spec.
- Maintain project-owned generator source under `src/generator`.
- Use a dedicated OpenAPI parser/ref resolver dependency while owning the Planning Center-to-n8n generation logic in this repository.
- Standardize on `@apidevtools/swagger-parser` for OpenAPI parsing and `$ref` resolution.
- Declare `n8n-workflow` as a wildcard peer/dev dependency for host flexibility.
- Keep hand-written request, pagination, retry, and JSON:API runtime helpers under `src/runtime`.
- Generate user-facing operation labels from OpenAPI `operationId` or summary, with HTTP method/path fallback only when friendly names cannot be derived.
- Group generated operations by OpenAPI tags first, with path-derived resource grouping as the fallback.
- Generate every technically mappable OpenAPI operation, including deprecated operations, and record exclusions only when an operation cannot be safely represented.
- Mark generated deprecated operations clearly in their n8n labels or descriptions.
- Use a single placeholder PCO icon for all generated product nodes so it can be replaced later.
- Add the baseline package, build, lint, test, and generated-artifact boundaries needed for maintainable development.
- Defer OAuth support to a later change while designing auth boundaries so OAuth can be added without rewriting generated operations.

## Capabilities

### New Capabilities
- `n8n-community-package-bootstrap`: Defines the initial n8n community node package structure, tooling, validation, and generated-code boundaries.
- `pco-pat-authentication`: Defines Personal Access Token credential support and authenticated request behavior for Planning Center API calls.
- `pco-openapi-node-generation`: Defines how Planning Center OpenAPI specs are consumed to generate product-specific n8n nodes and expose API operations.

### Modified Capabilities

None.

## Impact

- Adds a new project codebase rather than continuing either cloned candidate repo as-is.
- Establishes npm package metadata, TypeScript configuration, n8n community-node metadata, linting, tests, and build scripts.
- Introduces generator inputs and generated outputs for Planning Center OpenAPI specs.
- Stores OpenAPI spec snapshots in the repository so generation and CI do not depend on network availability.
- Bakes the Planning Center OpenAPI source URLs from `openapi-urls.txt` into generator configuration: API `2025-09-30`, Calendar `2022-07-07`, Check-Ins `2025-05-28`, Current `2018-08-01`, Giving `2019-10-18`, Groups `2023-07-10`, People `2025-11-10`, Publishing `2024-03-25`, Registrations `2025-05-01`, Services `2018-11-01`, and Webhooks `2022-10-20`.
- Introduces a project-owned generator pipeline rather than depending on an external generator as the long-term generation contract.
- Introduces credential and request-helper behavior for PAT-authenticated Planning Center API calls.
- Keeps OAuth outside the initial implementation scope but reserves a clean path for a future OAuth credential.
