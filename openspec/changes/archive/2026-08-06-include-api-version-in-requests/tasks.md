## 1. Validate Product Version Metadata

- [x] 1.1 Add generator tests for a valid matching version, a missing or malformed `snapshotDate`, a missing OpenAPI `info.version`, and an exact-value mismatch; assert failures identify the product and conflicting metadata.
- [x] 1.2 Validate `ProductConfig.snapshotDate` as `YYYY-MM-DD` and require exact equality with the loaded OpenAPI `info.version` before rendering any product node.

## 2. Enforce the Shared Request Contract

- [x] 2.1 Add runtime tests that assert the exact outbound `X-PCO-API-Version`, verify retries preserve it, and prove additional caller headers cannot replace or duplicate it under any casing; update existing direct helper calls to supply a version.
- [x] 2.2 Make `apiVersion` required in `PlanningCenterRequestOptions`, remove case-insensitive competing version headers, and set one authoritative canonical header in the shared request helper.

## 3. Propagate Product Versions Through Generated Requests

- [x] 3.1 Add generator tests proving a product's validated `snapshotDate` is embedded in normal action, paginated, and resource-locator lookup requests without adding node or credential parameters.
- [x] 3.2 Update node rendering so direct action requests, paginated request objects, and every lookup request pass the generated product API version to the shared request helper.
- [x] 3.3 Add polling tests and update generated triggers plus the shared polling runtime so manual previews, baselines, collection requests, and subsequent pages retain the product API version.
- [x] 3.4 Run `pnpm exec vitest run tests/generator.test.ts tests/polling.test.ts tests/runtime.test.ts` and resolve any unversioned request path identified by types or tests.

## 4. Regenerate and Verify

- [x] 4.1 Run `pnpm generate` to regenerate every committed product action and trigger node; review the diff to confirm each product uses only its own configured snapshot date and no version controls were added.
- [x] 4.2 Run `pnpm generate:check`, `pnpm test`, `pnpm lint`, `pnpm build`, and `pnpm package:inspect` in CI order and confirm all checks pass.
