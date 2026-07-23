## Why

Unofficial Planning Center endpoint warnings are currently embedded directly in generated operation descriptions. In n8n, those descriptions appear in the workflow subtitle and operation help text, making routine workflow configuration visually noisy.

## What Changes

- Preserve unofficial endpoint stability as structured generated metadata instead of prepending the full warning to user-facing descriptions.
- Keep generated operation labels, dropdown descriptions, and workflow subtitles focused on the operation purpose or endpoint path.
- Retain a way for generated code and tests to identify unofficial supplemented operations for future UI or documentation use.
- Do not change runtime request behavior, operation IDs, resource grouping, supplement validation, or generated endpoint coverage.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `pco-openapi-node-generation`: Generated operations distinguish endpoint stability metadata from user-facing operation descriptions.
- `pco-api-supplements`: Supplement stability remains the source of unofficial endpoint metadata without requiring the full warning to be injected into descriptions.

## Impact

- Affected generator code: `src/generator/effectiveOpenApi.ts`, `src/generator/openapi.ts`, `src/generator/model.ts`, and `src/generator/render.ts`.
- Affected tests: generator and effective OpenAPI tests that currently assert the warning is included in operation descriptions.
- Affected generated output: generated People and Webhooks nodes after `pnpm generate`.
- No new dependencies, runtime API changes, credential changes, or package registration changes.
