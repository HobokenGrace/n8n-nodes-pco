## 1. Generator Label Behavior

- [x] 1.1 Add generator tests for nested relationship labels such as `Get Person (via Workflow Card)`.
- [x] 1.2 Add generator tests for direct route labels remaining unsuffixed, such as `Get Person`.
- [x] 1.3 Add generator tests for self-nesting path context, such as `Get Folder (via Folder)`.
- [x] 1.4 Update fallback operation label derivation to append nearest path-derived `via` context for nested relationship paths.

## 2. Generated Metadata

- [x] 2.1 Regenerate Planning Center node metadata.
- [x] 2.2 Review generated label diffs to confirm operation IDs, paths, and runtime dispatch values remain unchanged.

## 3. Verification

- [x] 3.1 Run the generator test suite.
- [x] 3.2 Run generated-output checks.
- [x] 3.3 Run project lint or build checks required by the repository.
