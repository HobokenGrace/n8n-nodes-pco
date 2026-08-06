## 1. Regression Contract

- [x] 1.1 Add a failing generator test using a multiword resource such as Webhooks `WebhookSubscription`, asserting that its human-readable resource label and canonical JSON:API request type remain distinct.
- [x] 1.2 Extend mutation-body coverage to assert that standard mode sends the canonical schema value as `data.type` while raw JSON mode remains unchanged.

## 2. Generator Implementation

- [x] 2.1 Extend `GeneratedOperation` and OpenAPI parsing to retain an unambiguous singleton string value from the request schema's `data.type` enum.
- [x] 2.2 Update standard mutation-body rendering to prefer the retained canonical type while preserving existing fallback behavior when the schema does not declare one.

## 3. Generated Outputs

- [x] 3.1 Run `pnpm generate` and review the committed generated-node diff to confirm canonical request types are emitted without changing user-facing resource labels.

## 4. Verification

- [x] 4.1 Run the focused generator test suite and `pnpm generate:check`.
- [x] 4.2 Run the remaining CI checks in repository order: `pnpm test`, `pnpm lint`, `pnpm build`, and `pnpm package:inspect`.
