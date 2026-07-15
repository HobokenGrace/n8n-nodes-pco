## Why

Generated Planning Center nodes currently show the raw operation ID such as `getPeople` in the workflow-view node hint because the node subtitle is bound directly to the stored `operation` parameter value. The generator already knows the human-meaningful HTTP endpoint string for each operation, so the workflow view should show `GET /people`-style hints instead of internal method names.

## What Changes

- Update generated Planning Center node metadata so the workflow-view subtitle/hint resolves to the selected operation's HTTP method and relative endpoint path, such as `GET /people`.
- Keep the operation picker labels and stored operation IDs unchanged so existing execution behavior and saved workflow selections remain stable.
- Reuse the generated operation metadata that already includes endpoint descriptions instead of introducing product-specific hint mappings.
- Regenerate generated node files and add coverage for subtitle/hint rendering.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `pco-openapi-node-generation`: Generated Planning Center nodes will show the selected operation's HTTP endpoint in the workflow-view subtitle/hint instead of the raw operation ID.

## Impact

- Affects the shared node renderer in `src/generator/render.ts`.
- Affects regenerated node files under `nodes/generated/`.
- Affects generator verification or tests that assert rendered node description metadata.
