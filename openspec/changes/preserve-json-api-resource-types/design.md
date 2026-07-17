## Context

The generator dereferences each Planning Center OpenAPI snapshot, derives a human-readable `resource` label from the operation tag, and extracts writable attributes and relationships from the request schema. The generated operation model does not retain `data.type`, so the renderer currently uses the display label for the JSON:API wire value.

This coupling is invalid for multiword resources. For example, the Webhooks create-subscription operation is displayed as `Webhook Subscription`, while both the committed snapshot and Planning Center's current OpenAPI require `WebhookSubscription`. All 349 request-body mutation schemas in the committed snapshots currently declare one unambiguous `data.type` enum value; 49 action-style POST operations have no request-body schema.

Generated node files are committed artifacts and must be updated through `pnpm generate`, not edited directly.

## Goals / Non-Goals

**Goals:**

- Preserve the canonical JSON:API request resource type separately from user-facing labels.
- Send that canonical type in standard-mode create, update, and patch bodies.
- Cover the multiword-type case with a regression test and regenerate all affected nodes deterministically.

**Non-Goals:**

- Changing n8n resource or operation display labels.
- Changing raw JSON mode, request URLs, authentication, transport, retries, or response normalization.
- Changing behavior for action operations that do not declare a request-body schema.
- Correcting optional boolean omission or enriching API error details; those are separate issues discovered during diagnosis.

## Decisions

### Retain an explicit JSON:API type in generated operation metadata

Add an optional `jsonApiType` field to `GeneratedOperation`. During OpenAPI parsing, extract it from the dereferenced request schema at `data.type` when the schema declares exactly one string enum value. The committed OpenAPI inputs consistently use this representation, so the extraction is deterministic and does not require heuristics.

Alternative considered: derive the wire type from the operation tag or remove spaces from the display label. This was rejected because presentation formatting is not an API contract and can diverge from the request schema in other ways.

### Prefer the schema type while retaining behavior when none is declared

Standard-mode body rendering will use `operation.jsonApiType` when present and retain the existing resource-label fallback when no canonical request type is available. This fixes all body-bearing operations represented by current snapshots without broadening the change to bodyless action endpoints.

Alternative considered: fail generation when no canonical type is present. This was rejected because action-style POST operations intentionally have no request-body schema and are outside this change.

### Keep raw JSON mode authoritative

Raw JSON mode will continue to parse and send the user-provided body unchanged. Canonical type insertion applies only to generated standard-mode bodies, preserving the existing advanced escape hatch.

### Test observable request behavior with a multiword resource

Regression coverage will use a mutation whose OpenAPI type and display label differ, such as Webhooks `WebhookSubscription`. The test will assert that the generated standard body sends the exact schema type while the n8n resource label remains human-readable. Existing single-word coverage is insufficient because `Campus` masks the coupling.

## Risks / Trade-offs

- [Generated output changes across many products] -> Regenerate through the canonical command and require `pnpm generate:check` to prove deterministic committed output.
- [A future schema uses multiple or non-string type values] -> Extract only an unambiguous singleton string enum and retain the existing fallback otherwise; add support only when a concrete schema requires it.
- [A display label accidentally served as an undocumented wire type for a schema without `data.type`] -> Preserve the current fallback for those operations rather than changing behavior speculatively.

## Migration Plan

1. Extend the generator model and parser with the canonical request type.
2. Update standard body rendering and add regression coverage.
3. Run `pnpm generate` to refresh committed generated nodes.
4. Verify generation drift, tests, lint, build, and package metadata in CI order.

Rollback consists of reverting the generator, test, and generated-output changes together. No persisted data or user configuration migration is required.

## Open Questions

None. The current OpenAPI representation and expected Webhooks wire type are both explicit.
