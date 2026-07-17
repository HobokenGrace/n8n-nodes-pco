## Why

Generated standard-mode mutation bodies currently reuse a human-readable n8n resource label as the JSON:API `data.type`. Multiword resources therefore send values such as `Webhook Subscription` even when Planning Center's OpenAPI contract requires the canonical wire type `WebhookSubscription`, causing valid create and update operations to fail.

## What Changes

- Extract and retain each mutation's canonical JSON:API resource type from its OpenAPI request schema independently of its display resource label.
- Use the canonical resource type when generated standard-mode operations build JSON:API request bodies.
- Preserve current raw JSON behavior and deterministic generation.
- Add generator regression coverage for a multiword resource type and regenerate committed nodes.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `pco-openapi-node-generation`: Require standard-mode generated mutation bodies to preserve the canonical JSON:API `data.type` declared by the OpenAPI request schema.

## Impact

- Affects the OpenAPI parser and operation model in `src/generator/`, the generated request-body renderer, generator tests, and committed files under `nodes/generated/`.
- Corrects the request contract for Webhooks and any other generated multiword mutation resource whose display label differs from its JSON:API wire type.
- Does not change credential handling, endpoint paths, raw JSON body mode, runtime request transport, or response normalization.
