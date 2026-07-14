## Context

Generated operation labels currently prefer OpenAPI `operationId` or summary metadata when present, then fall back to an action-and-target label derived from HTTP method and path. Planning Center snapshots often omit operation metadata, so relationship endpoints such as `/people/{person_id}/workflow_cards/{workflow_card_id}/person/{person_id}` collapse to the same label as direct endpoints, for example `Get Person`.

## Goals / Non-Goals

**Goals:**

- Make nested relationship operation labels distinguishable and easier to choose in n8n dropdowns.
- Use the format `<Action> <Target> (via <Context>)` for nested relationship labels.
- Keep direct route labels unsuffixed.
- Keep operation IDs, parameter names, sorting stability, and runtime dispatch behavior unchanged.

**Non-Goals:**

- Redesign resource grouping or operation ordering.
- Add hand-maintained Planning Center endpoint label overrides.
- Change request execution, saved operation values, authentication, pagination, or response normalization.

## Decisions

1. Add relationship context during fallback label generation.

   The generator will append `(via <Context>)` when a fallback operation label is derived from a nested relationship path. This keeps source metadata labels intact while making path-derived relationship labels more descriptive.

   Alternatives considered: only suffix duplicate labels, which minimizes churn but leaves nested operations inconsistently labeled; always use full breadcrumb labels, which is explicit but too noisy for the operation dropdown.

2. Keep direct route labels bare.

   Direct endpoints such as `/people/{person_id}` should remain `Get Person`. The context suffix is reserved for relationship traversal so the shortest, most common route stays easy to scan.

   Alternatives considered: suffix every route, such as `Get Person (via Person)`, which is mechanically uniform but less readable.

3. Derive context from the nearest relevant static path segment.

   For `/people/{person_id}/workflow_cards/{workflow_card_id}/person/{person_id}`, the context is `Workflow Card`. For self-nesting routes, the repeated path segment remains valid context, such as `Get Folder (via Folder)`.

   Alternatives considered: special-case self-nesting as `Parent Folder`, which is expressive but introduces terminology not present in the source path.

## Risks / Trade-offs

- Broader label churn for nested relationship operations -> Mitigation: cover representative generated labels in tests and review generated metadata diffs.
- Some path-derived context may be less natural than hand-written copy -> Mitigation: keep the rule deterministic and avoid endpoint-specific overrides until real user feedback justifies them.
- Longer operation labels can make dropdowns denser -> Mitigation: use only the nearest context segment instead of full breadcrumbs.
