## Context

Generated Planning Center nodes are built from OpenAPI snapshots in `src/generator/openapi.ts`. The current `operationLabel()` helper prefers `operationId` or `summary`, then falls back to raw `METHOD path` text. Some current snapshot operations do not provide either metadata field, so fallback operation labels are path-shaped instead of user-task-shaped.

## Goals / Non-Goals

**Goals:**

- Generate intuitive operation labels automatically without a hand-maintained operation-name map.
- Produce labels in the form `<Action> <Target>` from HTTP method, list-vs-item shape, and path segments.
- Keep generated operation IDs and runtime dispatch unchanged so existing execution behavior remains stable.
- Keep naming deterministic across regeneration.

**Non-Goals:**

- Introduce resource-specific manual overrides for Planning Center nouns.
- Reorganize the resource dropdown or change how operations are grouped.
- Rename internal operation IDs or persisted node parameter values.
- Add an external inflection dependency.

## Decisions

1. Derive fallback labels from method and target path segment.

   When OpenAPI metadata lacks both `operationId` and `summary`, the generator will identify the target from the final non-parameter path segment and combine it with an action derived from the HTTP method. For item paths ending in an ID parameter, the previous static segment becomes the target.

   Alternative considered: keep raw method/path labels and only clean punctuation. This is deterministic but still exposes API structure rather than user intent.

2. Use action verbs based on method and endpoint shape.

   `GET` collection endpoints will use `List`; `GET` item endpoints will use `Get`; `POST` will use `Create`; `PUT` and `PATCH` will use `Update`; `DELETE` will use `Delete`. This matches common n8n operation language while preserving enough specificity in the target.

   Alternative considered: use generic n8n operations such as `Get Many`, `Get`, `Create`, `Update`, and `Delete` while moving specificity into resources. That would require broader resource derivation changes and is larger than this usability fix.

3. Apply only generic target cleanup.

   Target labels will reuse existing title-casing behavior and apply limited generic singularization for non-list actions, such as `ies` to `y` and trailing `s` removal where safe. The generator will not maintain Planning Center-specific noun exceptions.

   Alternative considered: build a dictionary of perfect singular names. That would improve polish for edge cases but violates the goal of avoiding manual operation-name specification and would become maintenance-heavy as snapshots change.

4. Preserve existing metadata cues.

   Deprecated operations will continue to show `(Deprecated)`. DELETE operations will continue to rely on clear destructive action wording and descriptions.

   Alternative considered: add extra warning text to every DELETE label. That would make labels noisier and is unnecessary if labels already begin with `Delete` and descriptions remain available.

## Risks / Trade-offs

- Imperfect singularization for irregular nouns -> Accept deterministic best-effort labels rather than introducing manual mappings or dependencies.
- Duplicate labels under the same resource -> Keep operation `value` as the stable ID and rely on descriptions; add tests for representative nested endpoints.
- Snapshot regeneration changes many generated files -> Review generated diffs as metadata-only changes and keep runtime IDs unchanged.
