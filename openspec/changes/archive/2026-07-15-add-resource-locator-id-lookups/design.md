## Context

The Planning Center nodes are generated from OpenAPI snapshots through `src/generator/openapi.ts` and `src/generator/render.ts`. Generated fields currently represent path parameters, query options, attributes, and relationship IDs as primitive n8n properties. This keeps execution simple, but it forces users to know and paste raw Planning Center IDs for common related resources such as Group Type, Group, Campus, Person, Event, Plan, or Song.

Simple dynamic dropdowns are not a good fit for most Planning Center resources because many lists can be large. n8n `resourceLocator` fields better match the desired UX: users can search/select a resource by label, paste an ID manually, or use an expression from an earlier workflow step.

## Goals / Non-Goals

**Goals:**

- Generate `resourceLocator` controls for all single-ID fields where the generator can infer a compatible lookup endpoint: path parameters, query filters including `where[id]`, writable attribute fields ending in `_id`, and JSON:API relationship fields whose `data` shape is a single resource object.
- Preserve manual ID and expression input for every lookup-enabled field.
- Limit initial lookup results to 25 records.
- Prefer server-side Planning Center search/name filters where the generator knows a safe filter for the lookup endpoint, using the fixed priority `search_name`, `name`, `search_name_or_email`, `search_name_or_email_or_phone_number`, `title`, `subject`, `label`.
- Support bounded split-name person lookup search when no combined safe search filter exists.
- Label lookup results as `<display name> (<id>)`, with `attributes.name` as the first display-name choice and safe person/display-name fallbacks when `name` is unavailable.
- Use shared generated lookup metadata and helpers rather than product-specific hand-written lookup code.

**Non-Goals:**

- Cascading parent/child lookup UX that adds extra parent selectors for lookup sources whose parent IDs are not already present on the same operation.
- Searchable multi-select UX for to-many relationship fields; existing comma-separated manual ID inputs remain for now.
- Changing Planning Center authentication or the shared request retry/error behavior.
- Adding hand-written lookup implementations for specific Planning Center products.

## Decisions

### Use resourceLocator for lookup-enabled single-ID fields

Generate n8n `resourceLocator` fields for inferable single-ID path parameters, query filters, writable single-ID attribute fields, and single-ID relationship fields.

The target package version is the `n8n-workflow@2.16.0` type surface currently resolved in `pnpm-lock.yaml`. Generated locator properties should use exactly two modes for this change:

- `list`: `type: 'list'`, `typeOptions.searchListMethod` set to a generated list-search method, and `typeOptions.searchable: true`.
- `id`: `type: 'string'` for manual Planning Center ID entry.

URL mode is intentionally out of scope because Planning Center app/API URL parsing varies by product and resource.

Rationale: `resourceLocator` is the closest n8n-native match for a field whose execution value is an ID but whose setup UX should support search/select, manual ID entry, and expressions. Dynamic `options` fields are simpler but bias the UX toward large dropdowns and make manual fallback less explicit.

Alternative considered: use `options` with `loadOptionsMethod`. This would be easier to render but is a weaker fit for large Planning Center datasets and for workflows that pass IDs dynamically.

### Infer lookups from generated operation metadata

Build a lookup catalog during generation by matching single-ID field targets to compatible list operations in the same product. A compatible lookup source is a generated list operation whose response resource target matches the single-ID field target and whose required path parameters can be satisfied by the operation that owns the field.

Root collection list endpoints with no path parameters are compatible whenever their target matches. Nested list endpoints are compatible only when every required lookup-source path parameter exists as a path parameter on the same generated operation that owns the lookup-enabled field. The generated list-search method must read those same-operation parent locator/manual values, extract IDs, and use them to build the nested lookup request path. If any required parent value is unavailable at lookup time, the method should return an empty result set rather than guessing or calling a broader endpoint.

Rationale: The project already treats generated output issues as shared generator issues. A catalog keeps lookup decisions deterministic and testable without hand-writing product-specific dispatchers.

Alternative considered: maintain a manual endpoint mapping table. That may improve coverage for edge cases, but it introduces drift and should only be added later if deterministic inference leaves important gaps.

### Treat self-ID filters and ID attributes as lookup candidates

Generated `where[id]` query filters should be lookup-enabled when the operation's own resource has a compatible lookup source. Generated writable attribute fields ending in `_id` should also be lookup-enabled when the singularized attribute target has a compatible lookup source. Attribute fields ending in `_ids` or otherwise representing multiple IDs remain primitive/manual in this change.

Rationale: Users need the same search/select UX for self-ID filters and assignable foreign-key-style attributes as they do for path parameters and JSON:API relationship IDs.

### Preserve execution as ID-based behavior

Generated execution should continue to build paths, query parameters, JSON:API attributes, and JSON:API relationships with ID strings. Shared helper logic should extract the selected ID from a resourceLocator value or accept a manual string/expression result.

Rationale: The lookup feature is a setup UX improvement, not a Planning Center API contract change. Existing request construction should remain conceptually unchanged.

Alternative considered: store richer selected-resource objects through execution. That adds complexity without changing what Planning Center endpoints require.

### Search server-side when a safe filter is known

Lookup search methods should apply known Planning Center query filters using this priority when available on the lookup endpoint: `where[search_name]`, `where[name]`, `where[search_name_or_email]`, `where[search_name_or_email_or_phone_number]`, `where[title]`, `where[subject]`, `where[label]`. If no safe search filter is known, the lookup returns the first 25 list results.

For person-like endpoints that expose `where[first_name]` and `where[last_name]` but no combined safe search filter, lookup search should use a bounded split-name strategy instead of falling back to unfiltered IDs. For a single-word search, issue at most one request for `where[first_name]` and one request for `where[last_name]`. For a multi-word search, use the first word for the first-name request and the last word for the last-name request. Merge results by Planning Center ID, preserve stable response order, and cap the final dropdown at 25 results.

Rationale: Large datasets need search, but generating unsafe or guessed filters would create broken lookups. First-page fallback preserves a usable initial browse experience without overpromising search coverage.

The split-name strategy is intentionally bounded to at most two lookup requests per user search event and applies only when both split-name filters are explicitly present. This improves Giving/Calendar-style person lookups without introducing unbounded fan-out or guessing across arbitrary filters.

Alternative considered: only generate lookups for endpoints with known search filters. That would be stricter but would skip useful stable lookups such as small administrative lists.

### Label lookup options with name and ID

Lookup results should format labels as `<display name> (<id>)`. Display-name selection should prefer `attributes.name`, then safe human-readable fields such as `full_name`, `display_name`, `search_name`, `path_name`, split-name combinations (`first_name` plus `last_name`, `given_name` plus `last_name`, `nickname` plus `last_name`), then other common label-like attributes such as `title`, `subject`, or `label`, then fall back to the resource ID.

Rationale: Users want readable setup fields while still being able to cross-reference IDs in Planning Center app URLs.

Fields such as timestamps, status values, amounts, and descriptions should not be promoted as generic primary labels even if they are present in many schemas; they are useful context in specific resources but produce confusing generic lookup labels.

Alternative considered: show only names. That is cleaner visually but loses the ID reference that users need when comparing workflow configuration to Planning Center URLs.

### Defer multi-ID lookup UX explicitly

To-many relationship fields should remain comma-separated manual ID fields in this change.

Rationale: Multi-select searchable lookup has separate UX and execution questions, and the current manual behavior is already specified. Keeping it unchanged reduces risk while leaving room for a future enhancement.

Alternative considered: include multi-ID lookup now. That expands scope beyond the core single-ID locator behavior and could delay the high-value path/query/single-relationship improvements.

## Risks / Trade-offs

- n8n `resourceLocator` API or typings may differ across supported n8n versions -> verify against the installed/target `n8n-workflow` types before implementation and keep generated code aligned with supported APIs.
- `package.json` currently declares the `n8n-workflow` peer dependency as `*`, so runtime compatibility may be broader than the locked `n8n-workflow@2.16.0` type contract verified by this change; this change documents the risk but does not narrow the peer range.
- Lookup inference may map an ID field to the wrong list endpoint -> restrict generated lookups to confident matches and keep manual ID fallback for all other fields.
- Some lookup endpoints may return large datasets without supported search filters -> cap initial results at 25 and only add server-side filters when known safe.
- Generated node files may grow substantially -> use shared lookup catalogs and helper functions to avoid per-field duplicated logic.
- Existing users may have saved workflows with primitive ID values -> preserve ID extraction/manual behavior so existing stored values remain usable where n8n allows compatible parameter migration.
- Nested lookup generation can create hidden dependencies on parent field values -> only generate nested lookup sources when parent values are same-operation fields and return no results if those values are not set during lookup.

## Migration Plan

1. Extend generator metadata to describe lookup sources, parent bindings, lookup-enabled single-ID fields, locator modes, label fields, search filters, and result limits.
2. Render resourceLocator properties and lookup/search methods from the shared catalog.
3. Update execution helpers so path/query/body construction receives the selected or manual ID string.
4. Regenerate generated nodes.
5. Verify with generator checks, tests, lint, and build.

Rollback is to revert the generator and regenerated node changes, restoring primitive ID fields.

## Open Questions

- None. The change targets the `n8n-workflow@2.16.0` locator/list-search contract currently resolved by the lockfile.
