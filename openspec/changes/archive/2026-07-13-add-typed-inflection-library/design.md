## Context

The current fallback operation-label generator in `src/generator/openapi.ts` singularizes non-list targets with a few suffix rules. That worked for simple nouns but fails on cases such as `campuses`, which becomes `campuse`. The last change intentionally avoided a dependency, but this bug shows that continuing to expand handwritten English plural logic is likely to produce more edge cases than value.

## Goals / Non-Goals

**Goals:**

- Eliminate malformed fallback singular labels such as `Get Campuse`.
- Adopt a singularization library that includes TypeScript declarations so the generator remains typed with minimal integration friction.
- Preserve current metadata-first label selection, action derivation, deprecated cues, and stable operation IDs.
- Limit behavior changes to fallback item-target singularization and the generated metadata it influences.

**Non-Goals:**

- Introduce hand-maintained Planning Center noun overrides.
- Rework action derivation, resource grouping, or operation ordering beyond label changes caused by improved singularization.
- Add a runtime dependency to node execution code.

## Decisions

1. Use a typed inflection library instead of extending suffix heuristics.

   The generator will call a library singularization helper for the final label word instead of maintaining additional local regex rules. A library that ships TypeScript declarations is preferred so the repository does not need separate `@types/*` wiring or local declaration shims.

   Alternatives considered: keep extending local suffix heuristics, which stays dependency-free but continues to accumulate English-language edge cases; use a small explicit override map, which solves known cases but leaves the general singularization problem unsolved.

2. Keep the library scoped to generator behavior.

   The dependency will be used only while generating metadata and while running generator tests. It should not alter request execution, persisted node parameter values, or runtime dispatch logic.

   Alternatives considered: pushing the library into shared runtime helpers, which would increase the surface area of the change without improving user-visible label behavior.

3. Preserve existing label assembly around the singularization step.

   The generator will continue to prefer `operationId` and `summary`, derive actions from method and endpoint shape, and singularize only the final target word for non-list fallback labels. This keeps the change focused on noun handling rather than revisiting the whole label strategy.

   Alternatives considered: switching label generation to a broader library-driven humanization pipeline, which would make the change harder to reason about and review.

## Risks / Trade-offs

- Broader noun inflection may change more generated labels than the immediate bug report -> Mitigation: add targeted regression tests and review regenerated metadata diffs carefully.
- A new dependency can introduce package maintenance overhead -> Mitigation: choose a small MIT-licensed package with bundled TypeScript declarations and keep it generator-scoped.
- Library behavior may still not perfectly match every Planning Center noun -> Mitigation: keep tests for representative edge cases and revisit overrides only if real API nouns still render poorly.
