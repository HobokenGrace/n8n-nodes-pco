## 1. Dependency Selection

- [x] 1.1 Choose and add an English inflection library that ships TypeScript declarations.
- [x] 1.2 Confirm the dependency can be used from the generator build without adding runtime execution changes.

## 2. Generator Update

- [x] 2.1 Replace the suffix-based singularization helper in `src/generator/openapi.ts` with a library-backed singularization step for non-list fallback targets.
- [x] 2.2 Preserve metadata-first labels, action derivation, deprecated cues, and stable generated operation IDs while updating only singular target handling.

## 3. Verification

- [x] 3.1 Add or update generator tests for fallback labels covering `campuses` and other representative plural nouns.
- [x] 3.2 Regenerate metadata and review diffs to confirm label changes are limited to expected singularization fixes.
- [x] 3.3 Run the relevant test, lint, and generated-output verification commands.
