## 1. Model and Generation

- [x] 1.1 Add query option grouping metadata for Filter, Order, and Include in the generated operation model.
- [x] 1.2 Classify generated query options from source query parameter names (`where[...]`, `order`, `include`) during OpenAPI processing.
- [x] 1.3 Preserve original query parameter source names, operator mappings, and enum values for each grouped query option.

## 2. Rendered Node Parameters

- [x] 2.1 Replace the single generated `Options` fixed collection with separate generated parameter groups for available Filter, Order, and Include groups.
- [x] 2.2 Set group placeholders to `Filter by`, `Order by`, and `Include data`.
- [x] 2.3 Enable multiple selected entries for each generated Filter, Order, and Include group.
- [x] 2.4 Avoid rendering empty Filter, Order, or Include groups when an operation has no options for that group.

## 3. Runtime Serialization

- [x] 3.1 Update runtime query option collection to read all generated query option groups for the selected operation.
- [x] 3.2 Serialize selected filter, order, and include entries to the original Planning Center query parameter names and values.
- [x] 3.3 Preserve existing explicit-value behavior so unset grouped entries are omitted from requests.

## 4. Verification

- [x] 4.1 Add or update generator tests for separate Filter, Order, and Include parameter groups, placeholders, and multiple-entry support.
- [x] 4.2 Add or update execution tests for grouped query option serialization.
- [x] 4.3 Run the relevant test suite and OpenSpec validation for `improve-node-option-params`.
