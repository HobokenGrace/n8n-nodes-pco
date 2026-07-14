## Why

Generated Planning Center operation labels can repeat within the same n8n resource dropdown when multiple relationship paths end at the same target, such as several Person routes all rendering as `Get Person`. This makes operation selection confusing even though each operation maps to a distinct endpoint.

## What Changes

- Add relationship context to generated labels for nested relationship operations using the format `<Action> <Target> (via <Context>)`, for example `Get Person (via Workflow Card)`.
- Keep direct route labels unsuffixed, for example `Get Person` for `/people/{person_id}`.
- Use path-derived context for self-nesting routes, for example `Get Folder (via Folder)`.
- Preserve stable operation IDs, runtime dispatch behavior, resource grouping, and request execution.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `pco-openapi-node-generation`: Generated operation labels must include relationship context for nested relationship operations so same-resource dropdowns are easier to distinguish.

## Impact

- Affected code: generator label derivation in `src/generator/openapi.ts`, generated node metadata under `nodes/generated/**`, and generator tests.
- Affected behavior: user-facing n8n operation labels change for nested relationship operations.
- Not affected: operation IDs, saved parameter values, request paths, authentication, pagination, JSON:API normalization, and runtime execution helpers.
