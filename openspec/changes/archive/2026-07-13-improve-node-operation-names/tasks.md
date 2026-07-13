## 1. Label Derivation

- [x] 1.1 Add generator helpers to derive an operation action from HTTP method and collection-vs-item endpoint shape.
- [x] 1.2 Add generator helpers to derive the operation target from the final relevant static path segment while ignoring path parameters.
- [x] 1.3 Apply deterministic generic target cleanup for generated labels, including title-casing and best-effort singularization for non-list actions.
- [x] 1.4 Update `operationLabel()` to use OpenAPI metadata when available and fall back to the new action-and-target label otherwise.

## 2. Generated Metadata

- [x] 2.1 Regenerate Planning Center node files so operation dropdown labels and action text use the new naming strategy.
- [x] 2.2 Confirm generated operation IDs and runtime dispatch values remain unchanged.
- [x] 2.3 Confirm deprecated labels still include the existing deprecated cue.

## 3. Verification

- [x] 3.1 Add or update generator tests for representative list, get, create, update, delete, and nested endpoint labels.
- [x] 3.2 Run the generator test suite and metadata checks.
- [x] 3.3 Review generated diffs to confirm changes are limited to expected metadata label updates.
