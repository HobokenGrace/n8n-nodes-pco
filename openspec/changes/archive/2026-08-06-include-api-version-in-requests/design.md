## Context

Each generated product is built from a committed OpenAPI snapshot selected by `ProductConfig.snapshotDate`. That date is the product API contract used to generate paths, parameters, and payloads, but generated requests currently contain only the method, path, query, and body. The shared request helper therefore sends no `X-PCO-API-Version` header, allowing Planning Center to interpret the request using an API version that may not match the generated contract.

Requests originate from three generated-node paths: normal action execution, resource-locator lookups, and polling triggers. Pagination reuses the action request object, while retries reuse the shared helper's fully built transport options. The implementation must cover all three origins without adding user configuration or hand-editing committed generated files.

The API version is the configured snapshot date, which must match each snapshot's OpenAPI `info.version`. The separate vendor extension `info.x-pco-api-version` is tooling metadata and is not the date-valued Planning Center API version header.

## Goals / Non-Goals

**Goals:**

- Pin every request originating from every generated product node to that product's configured snapshot date.
- Fail generation if the configured version is missing, malformed, or inconsistent with the loaded snapshot.
- Keep header construction centralized in the shared request helper.
- Make missing version propagation detectable through TypeScript and regression tests.
- Preserve deterministic generation and regenerate all committed product nodes.

**Non-Goals:**

- Allow workflows, credentials, or internal caller headers to select or override an API version.
- Refresh snapshots or change any product's configured snapshot date.
- Change endpoint paths, authentication, retry behavior, pagination behavior, polling state, or response normalization.
- Add versioning behavior to code outside generated Planning Center product nodes.

## Decisions

### Require an explicit API version in shared request options

`PlanningCenterRequestOptions` will gain a required `apiVersion` string. `planningCenterApiRequest` will translate it to the `X-PCO-API-Version` transport header. Keeping the semantic value in request options instead of constructing a raw header at every caller provides one header spelling and lets the type checker identify any unversioned internal call.

Alternative considered: add a default API version in the shared helper. This was rejected because products use different snapshot dates and a fallback could silently send a request against the wrong contract.

Alternative considered: put the version in credentials. This was rejected because the version belongs to generated product metadata, not authentication, and exposing it would permit workflows to drift from the node definition that generated their fields.

### Treat the configured snapshot date as the request version

Generated source will embed `ProductConfig.snapshotDate` as its API version. Generation will require that value to be present in `YYYY-MM-DD` format and equal the loaded OpenAPI document's `info.version`. Missing or mismatched `info.version` metadata will also fail generation. This keeps request behavior coupled to the same repository-controlled value that selects the snapshot and prevents a node from being rendered from a contract different from the one it will request.

Alternative considered: trust `snapshotDate` without validating the document. This was rejected because a renamed or incorrect snapshot file could silently produce a node whose request version disagrees with its generated contract.

Alternative considered: derive the request value from `info.version` or `info.x-pco-api-version`. This was rejected because `snapshotDate` already selects the repository input and remains the canonical product configuration, while `info.x-pco-api-version` contains the OpenAPI tooling version rather than the date-valued product API contract.

### Propagate the version at each request origin

Generated action requests and generated lookup requests will include the embedded API version. Pagination will inherit it from the action request object. Generated triggers will pass the embedded version to the shared polling entry point, which will retain it in resolved polling configuration and include it in preview, baseline, and collection page requests. Retries will reuse the same versioned transport options rather than reconstructing an unversioned request.

Alternative considered: store the version on every generated operation record. This was rejected because the version is constant for an entire generated product and repeating it in every operation and polling record adds generated output without improving correctness.

### Make the pinned header authoritative

The request helper will remove any case-insensitive `X-PCO-API-Version` entry from optional caller headers, then set the canonical `X-PCO-API-Version` key from `options.apiVersion`. This avoids duplicate differently-cased keys and ensures generic caller headers cannot replace the generated product version. No workflow field or credential property will expose the version. Tests will assert the exact outgoing header and generated source propagation for actions, lookups, pagination, polling, and retries.

## Risks / Trade-offs

- [A configured snapshot date is no longer accepted by Planning Center] -> Keep versions sourced from committed, reviewable snapshots; updating the snapshot configuration and regenerating nodes advances the request version deliberately.
- [Snapshot metadata drifts from configuration] -> Stop generation before emitting nodes and report the product plus both conflicting values.
- [One request origin omits version propagation] -> Make `apiVersion` required in shared request options and cover direct action, lookup, paginated, and polling paths in focused tests.
- [Caller headers use different casing to compete with the pinned header] -> Remove case-insensitive matches before setting one canonical header key.
- [Regeneration creates a broad generated diff] -> Change the generator first, run `pnpm generate`, and validate deterministic output with `pnpm generate:check`.
- [Pinned behavior differs from Planning Center's current default] -> This is intentional: generated controls must match the snapshot contract rather than an unpinned moving default.

## Migration Plan

1. Add generator validation for version format and exact snapshot metadata agreement.
2. Add the required request option and authoritative header mapping with a focused runtime regression test.
3. Update generator rendering and polling propagation with generator and polling tests.
4. Regenerate all configured product nodes and verify there is no generation drift.
5. Run the repository CI command sequence before release.

Rollback consists of reverting the generator/runtime changes and regenerated output together. No persisted workflow or polling-state migration is required because the change only affects outbound headers.

## Open Questions

None.
