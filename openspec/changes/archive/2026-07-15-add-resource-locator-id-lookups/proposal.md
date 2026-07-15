## Why

Generated Planning Center nodes currently expose most related-resource inputs as raw ID text fields, which makes node setup harder than n8n/Zapier-style workflows where users can search for a human-readable record and still pass the underlying ID. Many Planning Center datasets are too large for simple dropdowns, so generated ID fields need search-capable lookup controls that preserve manual ID and expression entry.

## What Changes

- Add generated `resourceLocator` controls for all single-ID path parameters, single-ID query filters including `where[id]`, writable single-ID attribute fields, and single-ID relationship fields when the generator can infer a compatible Planning Center lookup endpoint.
- Treat compatible lookup endpoints as same-product list endpoints whose required path parameters can be satisfied from the current generated operation; root list endpoints always qualify, and nested list endpoints qualify only when all required parent IDs exist on the same operation.
- Generate `resourceLocator` controls with searchable List mode plus manual ID mode, matching the target `n8n-workflow@2.16.0` contract.
- Limit initial lookup results to 25 records and prefer server-side Planning Center search/name filters using a fixed safe-filter priority when a safe filter is known.
- Support split-name person lookup search when no combined search filter exists by issuing bounded first-name and last-name lookup requests, deduplicating results by ID, and capping the merged dropdown at 25 results.
- Format lookup option labels as `<display name> (<id>)`, using `attributes.name` first when available, then other safe human-readable names including `full_name`, `display_name`, `search_name`, `path_name`, and first/last-name combinations, so users can cross-reference Planning Center app URLs.
- Preserve manual ID and expression entry for every lookup-enabled field.
- Generate shared lookup metadata and helper methods instead of hand-writing lookup behavior per product or endpoint.
- Defer cascading parent/child lookup UX that would add extra parent selectors and defer to-many relationship lookup UX; existing multi-ID fields remain manual comma-separated inputs for now.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `pco-openapi-node-generation`: Generated Planning Center nodes will expose search-capable ID lookup controls for inferable single-ID fields while preserving manual ID/expression behavior.

## Impact

- Affects the OpenAPI generator model and renderer under `src/generator/`.
- Affects generated node files under `nodes/generated/` after regeneration.
- May add shared runtime or generated-node helpers for lookup catalog resolution, result labeling, search query construction, and resourceLocator value extraction.
- Updates generator tests to cover lookup inference, generated resourceLocator properties and List/ID modes, nested lookup parent binding, 25-result limits, label formatting including split-name labels, bounded split-name search, manual fallback, self-ID query filters, ID attribute fields, and deferred multi-ID behavior.
