## 1. Generator Label Normalization

- [x] 1.1 Add or centralize a generator helper that normalizes whole identifier acronym tokens in display labels to `ID` and `IDs`.
- [x] 1.2 Apply the helper to all generated user-facing `displayName` values derived from OpenAPI field, parameter, relationship, and option names.
- [x] 1.3 Preserve internal `name` values, API parameter names, operation IDs, and payload keys while changing only display labels.

## 2. Tests and Generated Artifacts

- [x] 2.1 Update existing generator test expectations so identifier labels assert `ID` capitalization.
- [x] 2.2 Add regression coverage that fails if generated display labels contain mixed-case identifier acronym tokens.
- [x] 2.3 Regenerate Planning Center node files so generated `displayName` values use `ID` and `IDs` consistently.

## 3. Verification

- [x] 3.1 Run `pnpm test` and confirm the generator behavior passes.
- [x] 3.2 Run `pnpm generate:check` and confirm generated artifacts are up to date.
- [x] 3.3 Run relevant lint or build checks if touched files require them.
