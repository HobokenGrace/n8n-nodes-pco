## Context

Generated Planning Center nodes currently render OpenAPI-derived query options as a single fixed collection named `Options`. Individual entries inside that collection represent filter-style `where[...]` parameters, ordering, includes, and other query controls. The UI uses one generic `Add Option` placeholder, so users must inspect the collection entries to understand whether they are filtering, ordering, or including related data.

The generator already has enough metadata to identify common option groups from source query parameter names: filters from `where[...]`, ordering from `order`, and includes from `include`. The implementation should use that metadata to render clearer grouped controls while preserving request serialization to Planning Center query parameters.

## Goals / Non-Goals

**Goals:**

- Render Filter, Order, and Include query controls as separate generated node parameters when an operation supports them.
- Use group-specific placeholders: `Filter by`, `Order by`, and `Include data`.
- Allow users to select multiple entries within each Filter, Order, and Include group.
- Preserve existing generated request semantics for query parameter names and values.
- Keep generated output deterministic and covered by generator/runtime tests.

**Non-Goals:**

- Redesign all generated query parameters outside Filter, Order, and Include.
- Change Planning Center API request formats beyond serializing selected values from the new grouped controls.
- Introduce hand-written operation-specific UI definitions.
- Add new credentials, dependencies, or external API discovery at runtime.

## Decisions

1. Classify query options into presentation groups during generation.

   Rationale: The OpenAPI generator already normalizes query parameters and source names. Grouping at generation time keeps rendered node definitions simple and avoids duplicating classification logic in runtime execution.

   Alternative considered: Infer groups only in `render.ts` from option names. This is smaller initially but makes presentation behavior depend on naming conventions outside the model and is harder to test before rendering.

2. Render one fixed collection per available Filter, Order, and Include group with `typeOptions.multipleValues: true`.

   Rationale: n8n fixed collections support repeated selections and preserve the existing pattern where each selected entry carries its own value fields. Separate fixed collections allow each group to have a distinct display name and placeholder without inventing a new UI shape.

   Alternative considered: Use `multiOptions` dropdowns. This is a better fit for simple enum lists but does not handle operator/value filters cleanly, because filter entries can require both an operator and a value.

3. Keep query serialization source-driven.

   Rationale: Selected entries must continue to map back to the original Planning Center query parameter names, including operator-specific `where[...]` parameters and enum-backed `order` or `include` values. Runtime execution should read all generated query option groups and apply the same explicit-value checks used today.

   Alternative considered: Serialize directly from UI labels or grouped field names. That would be more fragile and could break query parameters when labels are adjusted.

## Risks / Trade-offs

- Existing workflows using saved generated node parameters may reference the previous single `<operation>_options` property. -> Mitigate by documenting this as generated-node UI behavior and by ensuring new generated code has deterministic property names; no persisted migration is planned unless a concrete compatibility requirement appears.
- Multiple ordering selections may not be accepted by every Planning Center endpoint. -> Mitigate by preserving source enum values and serializing according to the generated option metadata; tests should cover at least one operation with enum order values.
- Filters with operators need a richer shape than simple include/order enum selections. -> Mitigate by keeping fixed collection entries with nested operator/value fields for filters.
- The classification could miss unusual query parameters. -> Mitigate by only grouping recognized `where[...]`, `order`, and `include` parameters and leaving unrelated query controls in their current advanced/additional query parameter paths.
