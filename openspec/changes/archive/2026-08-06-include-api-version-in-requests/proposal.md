## Why

Generated Planning Center nodes currently make requests without pinning the product API version represented by their OpenAPI snapshot. Planning Center can therefore route a request against a different API version, causing otherwise generated and supported endpoints to fail.

## What Changes

- Carry each generated product's configured snapshot date into every Planning Center API request.
- Send that date as an authoritative `X-PCO-API-Version` request header for generated actions, lookups, pagination, polling, and retries.
- Reject generation when the configured date is missing, is not in `YYYY-MM-DD` format, or differs from the loaded OpenAPI document's `info.version`.
- Keep the version fixed in generated product metadata with no workflow, credential, or caller-header override.
- Add regression coverage proving all generated product nodes use their validated product-specific API version without changing user-facing node configuration.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `pco-openapi-node-generation`: Require every request made by a generated product node to include a validated, fixed Planning Center API version matching its source snapshot.

## Impact

- Affects generator snapshot validation/configuration/rendering, shared request options, polling propagation, generated product node output, and generator/runtime tests.
- Changes outbound requests by adding the Planning Center `X-PCO-API-Version` header; node credentials and workflow parameters remain unchanged.
- Requires regenerating all committed product nodes from the deterministic snapshots.
- Snapshot refresh behavior and user-selectable API versions remain out of scope.
- Adds no dependencies and introduces no breaking user-facing changes.
