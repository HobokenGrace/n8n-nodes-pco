## Why

Planning Center validation failures currently surface only a generic HTTP status message in n8n, leaving `errorDetails` empty and forcing operators to reconstruct the rejected request. Shared runtime errors should retain the API's explanation and safe request context so failures across every generated node can be diagnosed from the execution record.

## What Changes

- Preserve Planning Center JSON:API error titles and details when request failures are wrapped as item execution errors.
- Expose the HTTP status and structured API response data through n8n's error details.
- Attach the failed request method, path, query, and body to the structured error data.
- Recursively redact Planning Center credential values from messages and structured diagnostics.
- Exclude authorization and other request headers from diagnostics.

## Capabilities

### New Capabilities

- `pco-api-error-diagnostics`: Defines consistent, actionable, and credential-safe diagnostics for failed Planning Center requests across generated nodes.

### Modified Capabilities

None.

## Impact

- Affects the shared request and item-execution error handling in `src/runtime/` and therefore every generated Planning Center node.
- Adds runtime regression coverage in `tests/runtime.test.ts`.
- Changes failed execution records to retain sanitized request bodies, which may contain Planning Center person data already present in the n8n execution input.
- Adds no dependencies and does not change successful request behavior or generated node metadata.
