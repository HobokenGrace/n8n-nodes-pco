## Why

Generated Planning Center list operations currently group filters, ordering, and includes under one generic `Options` fixed collection with an `Add Option` placeholder. This makes related query controls harder to discover and prevents users from selecting multiple filter/order/include entries in a single, clear control.

## What Changes

- Replace the single generated `Options` collection for query options with separate generated controls for Filter, Order, and Include option groups when those groups are available.
- Use group-specific placeholders: `Filter by`, `Order by`, and `Include data` instead of the generic `Add Option` label.
- Allow each Filter, Order, and Include group to accept multiple selected entries.
- Preserve generated request behavior so selected filter, order, and include values continue to serialize to the correct Planning Center query parameters.

## Capabilities

### New Capabilities


### Modified Capabilities

- `pco-openapi-node-generation`: Generated Planning Center node query options expose filter, order, and include controls as distinct multi-selection parameter groups with clearer placeholders.

## Impact

- Affects OpenAPI-to-n8n node generation for query option metadata and rendered node properties.
- Affects runtime query option collection from generated node parameters.
- Affects generator tests covering generated query option shape and rendered n8n properties.
- No external API dependency or credential behavior changes are expected.
