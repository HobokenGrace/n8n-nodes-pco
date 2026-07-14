## Why

Some user-facing labels render the identifier acronym with inconsistent capitalization, which is inconsistent with common product terminology and looks unpolished in n8n node fields. Standardizing these labels to `ID` improves clarity and keeps generated and hand-authored node UI text consistent.

## What Changes

- Update user-facing labels so any occurrence of the identifier acronym is capitalized as `ID`.
- Preserve internal property names, API field names, and machine-readable identifiers unless they are explicitly user-facing labels.
- Ensure future generated labels follow the same `ID` capitalization rule.

## Capabilities

### New Capabilities
- `id-label-capitalization`: Covers consistent capitalization of identifier acronyms in user-facing labels.

### Modified Capabilities

## Impact

- Affected code: generated node descriptions, field label generation utilities, and any hand-authored n8n UI labels that display identifier terminology.
- APIs and dependencies: no API contract or dependency changes expected.
- Systems: n8n editor UI labels for Planning Center node resources and operations.
