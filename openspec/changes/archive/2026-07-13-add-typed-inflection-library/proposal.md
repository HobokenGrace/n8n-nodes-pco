## Why

Fallback operation labels currently rely on a homegrown suffix-based singularizer, which turns some valid Planning Center nouns into broken labels such as `Get Campuse`. That makes generated operations look unreliable and is a good point to switch to a maintained inflection library with TypeScript types instead of extending fragile custom heuristics.

## What Changes

- Replace the generator's suffix-based singularization logic for fallback operation labels with a dependency-backed English singularization helper.
- Prefer an inflection library that ships TypeScript declarations so the generator stays typed without separate ambient typings.
- Keep the existing metadata-first label behavior: `operationId` or `summary` still win over fallback naming.
- Keep the existing action derivation and resource grouping behavior unchanged while improving singular item targets for fallback labels.
- Add regression coverage for nouns such as `campuses` and other plural forms that currently produce malformed singular labels.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `pco-openapi-node-generation`: fallback action-and-target labels should singularize English item targets accurately enough to avoid malformed user-facing operation names.

## Impact

- Affects `src/generator/openapi.ts` fallback label derivation.
- Affects `package.json` and the lockfile by adding a typed inflection dependency for the generator.
- Affects generator tests that assert fallback operation labels.
- May affect generated node metadata under `nodes/generated/**` after regeneration where current labels contain malformed singular nouns.
- Does not change generated operation IDs/values, request paths, HTTP methods, resource grouping, request construction, or runtime node execution behavior.
