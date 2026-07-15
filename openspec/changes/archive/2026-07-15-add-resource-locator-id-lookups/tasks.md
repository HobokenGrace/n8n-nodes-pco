## 1. Verify n8n Resource Locator Contract

- [x] 1.1 Confirm the generated code compiles against the locked `n8n-workflow@2.16.0` `resourceLocator`, `INodeParameterResourceLocator`, and `methods.listSearch` types.
- [x] 1.2 Add a generated-node fixture or test expectation that documents the required List and ID locator modes, including `typeOptions.searchListMethod` and `typeOptions.searchable: true`.
- [x] 1.3 Add an execution helper test for extracting IDs from `{ __rl: true, mode, value }`, manual strings, numbers, and expression-resolved primitive values.

## 2. Model Lookup Metadata

- [x] 2.1 Extend generator model types to represent lookup sources, parent path bindings, lookup-enabled single-ID fields, locator modes, label fields, search filters, and result limits.
- [x] 2.2 Build a deterministic lookup catalog from same-product OpenAPI list operations, including root list sources and nested list sources whose required path parameters can be bound from the lookup-owning operation.
- [x] 2.3 Add lookup inference for single-ID path parameters, query filters including `where[id]`, writable attribute fields ending in `_id`, and single-ID relationship fields when a compatible lookup source is found.
- [x] 2.4 Keep to-many relationship fields, array ID attributes, and attribute fields ending in `_ids` modeled as manual comma-separated ID inputs or their existing primitive type.

## 3. Render Lookup Properties and Methods

- [x] 3.1 Render lookup-enabled single-ID path parameters as resourceLocator properties with manual ID/expression support.
- [x] 3.2 Render lookup-enabled single-ID query filter values, including `where[id]`, as resourceLocator controls inside the existing query option groups.
- [x] 3.3 Render lookup-enabled writable `_id` attribute fields as resourceLocator properties in standard body mode.
- [x] 3.4 Render lookup-enabled single-ID relationship fields as resourceLocator properties in standard body mode.
- [x] 3.5 Generate shared list-search methods that return `INodeListSearchResult`, request at most 25 records per lookup response, and bind same-operation parent IDs for nested lookup sources.
- [x] 3.6 Generate lookup labels using `attributes.name` first, then other known label-like attributes, then ID fallback, formatted as `<display name> (<id>)`.
- [x] 3.7 Apply known safe server-side Planning Center search filters in the priority `search_name`, `name`, `search_name_or_email`, `search_name_or_email_or_phone_number`, `title`, `subject`, `label`, and fall back to first-page results when unavailable.

## 4. Preserve ID-Based Execution

- [x] 4.1 Add shared helper logic to extract an ID string from resourceLocator values, manual IDs, and expression-resolved values.
- [x] 4.2 Update generated path building to use extracted IDs for lookup-enabled path parameters.
- [x] 4.3 Update generated query option serialization to use extracted IDs for lookup-enabled query filters, including `where[id]` filters.
- [x] 4.4 Update generated attribute body construction to use extracted IDs for lookup-enabled writable `_id` attribute fields.
- [x] 4.5 Update generated relationship body construction to use extracted IDs for lookup-enabled single-ID relationship fields.

## 5. Regenerate and Verify

- [x] 5.1 Regenerate generated Planning Center node files.
- [x] 5.2 Add or update generator tests for Group Type path lookup, self-ID query filter lookup, related-resource query filter lookup, writable `_id` attribute lookup, single relationship lookup, nested lookup parent binding, 25-record limit, safe search-filter priority, label formatting, manual fallback, expression fallback, and multi-ID deferral.
- [x] 5.3 Run `pnpm generate:check` and resolve stale generated output.
- [x] 5.4 Run `pnpm test` and resolve failures.
- [x] 5.5 Run `pnpm lint` and resolve failures.
- [x] 5.6 Run `pnpm build` and resolve failures.
