## Why

Generated Planning Center node operation dropdowns currently expose raw HTTP method and path text when OpenAPI snapshots do not provide `operationId` or `summary` metadata for a label. That makes the dropdown harder to scan because users see API implementation details instead of task-oriented operation names.

## What Changes

- Keep the existing metadata-first behavior: when an operation has `operationId` or `summary`, derive the label from that metadata.
- When both metadata fields are absent, generate a deterministic fallback label in the form `<Action> <Target>`.
- Derive the fallback action from HTTP method and endpoint shape: `GET` collection -> `List`, `GET` item -> `Get`, `POST` -> `Create`, `PUT`/`PATCH` -> `Update`, and `DELETE` -> `Delete`.
- Derive the fallback target from the final non-parameter path segment, title-case it, and apply best-effort singularization for non-list actions.
- Example fallback labels include `List Form Submissions`, `Get Form Submission`, `Create Channel Default Time`, `Update Channel`, and `Delete Channel`.
- Preserve deprecated cues by keeping `(Deprecated)` on generated labels when OpenAPI marks an operation deprecated.
- Limit generated output changes to user-facing operation dropdown label/action text. Generated operation option ordering may change because options are sorted by label.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `pco-openapi-node-generation`: generated operations without `operationId` or `summary` metadata should receive deterministic action-and-target labels derived from method and path instead of raw HTTP path labels.

## Impact

- Affects `src/generator/openapi.ts` operation label derivation.
- Affects generated node metadata under `nodes/generated/**` after regeneration.
- Affects generator and metadata tests that assert operation labels or snapshots.
- Does not change generated operation IDs/values, request paths, HTTP methods, resources, generated field names, credentials, runtime request building, pagination, response normalization, or persisted node parameter values.
- Does not add runtime dependencies, generator dependencies, or external API changes.
