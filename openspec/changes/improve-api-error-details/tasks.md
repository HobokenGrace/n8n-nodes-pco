## 1. Runtime Regression Coverage

- [x] 1.1 Add a failing runtime test that carries a representative HTTP 422 JSON:API response through request handling and item error wrapping, asserting its message, formatted description, HTTP code, response data, and request context.
- [x] 1.2 Cover multiple JSON:API error entries, absent optional query/body values, successful requests, and circular diagnostic values.
- [x] 1.3 Verify nested application ID and secret values are redacted from diagnostics, headers are absent, and the HTTP helper receives the original outbound query and body.
- [x] 1.4 Cover array and primitive response bodies and response objects containing a `request` field.
- [x] 1.5 Add a serialization-boundary regression test for persisted description, messages, HTTP code, and structured context.

## 2. Shared Error Diagnostics

- [x] 2.1 Format Planning Center JSON:API error titles and details into an actionable description without replacing the original request-failure message.
- [x] 2.2 Implement a recursive diagnostic copier that redacts configured credential values and replaces circular references with a serializable marker.
- [x] 2.3 Attach sanitized response data and request method, path, query, and body to the shared `NodeApiError` context while excluding all request headers.
- [x] 2.4 Preserve the API error description, messages, HTTP code, structured context, and item index through `toNodeOperationError`.
- [x] 2.5 Store the original response body under a collision-safe `response` field alongside request diagnostics.
- [x] 2.6 Include Planning Center messages and HTTP code in the item-indexed error's serialized form.

## 3. Verification

- [x] 3.1 Run `pnpm generate:check`, `pnpm test`, `pnpm lint`, `pnpm build`, and `pnpm package:inspect` in CI order.
- [x] 3.2 Review the final diff to confirm no generated node files, OpenAPI snapshots, dependencies, or successful request behavior changed.
