## Context

Every generated Planning Center node sends requests through `planningCenterApiRequest` and wraps item failures through `executeItemWithContinueOnFail`. The request helper creates an n8n `NodeApiError`, but the item wrapper currently converts that error to a message string and thereby drops its description, HTTP status, and structured context. n8n's node error view derives `errorDetails` from the error's messages, HTTP code, and `context.data`, so useful diagnostics must survive both runtime layers.

The request body can contain Planning Center person data, while credentials are sent in an authorization header. Diagnostics must improve operability without copying authentication material into execution records.

## Goals / Non-Goals

**Goals:**

- Produce actionable error descriptions from Planning Center JSON:API errors.
- Preserve HTTP and structured error context through item-level error wrapping.
- Include enough sanitized request context to reproduce invalid requests across all generated nodes.
- Keep the successful request path, retries, and Continue On Fail behavior unchanged.

**Non-Goals:**

- Add console or container logging.
- Add endpoint-specific validation or status-specific remediation advice.
- Include request headers, credentials, or a complete transport-level request dump.
- Change generated node source, OpenAPI snapshots, or node parameters.

## Decisions

### Store diagnostics in n8n error context

The request helper will attach the original response body under `response` and request diagnostics under `request` in the `NodeApiError` context. This preserves object, array, and primitive response bodies without allowing response fields to collide with request diagnostics. The request object contains method, path, and only the query and body values that were present. The item wrapper will preserve this context, description, messages, and HTTP code when creating the item-indexed error.

The item-indexed error will also include its messages and HTTP code in its serialized form. n8n persists execution data through a serializer that invokes the error's `toJSON` method, while the base error serializer omits those `NodeError` fields.

This uses n8n's established error serialization and UI rendering instead of introducing logging. Console logging was rejected because it is harder to correlate with an input item, bypasses execution-level access controls, and creates a second retention surface for person data.

### Format Planning Center JSON:API errors explicitly

JSON:API error entries with both `title` and `detail` will be formatted as `title: detail`; multiple entries will be joined without discarding any entry. n8n's generic error parser was rejected because wrapping currently loses its result and generic key traversal does not communicate the intended Planning Center format as clearly.

### Sanitize a copied diagnostic structure

The runtime will recursively copy response and request diagnostics while replacing every occurrence of the configured application ID or secret in strings. Circular references will be represented by a marker so diagnostics remain serializable. The outbound request object will not be modified.

Only method, path, query, and body are eligible for request diagnostics. Headers are excluded by construction rather than filtered after capture, preventing the Basic authorization value from entering the error context.

### Implement once in shared runtime code

The behavior belongs in `src/runtime/request.ts` and the existing item error wrapper. Generated nodes will not be edited or regenerated because they already use these shared functions. A runtime regression test will exercise a representative 422 response through both layers and verify structured details, credential redaction, and an unchanged outbound request.

## Risks / Trade-offs

- [Request bodies can contain person data] -> Retain them only in the existing n8n execution error record, exclude headers, document the behavior, and rely on n8n execution retention and access controls.
- [Credential values could appear in nested response or request fields] -> Recursively redact both configured credential values before attaching diagnostics.
- [Unusual request values could be circular] -> Replace cycles with a serializable marker in the diagnostic copy.
- [Large request bodies increase execution record size] -> Accept this for generated JSON:API mutation bodies, which are bounded by node parameters; payload truncation remains a possible follow-up if larger body types are introduced.
- [n8n error internals can change between versions] -> Test the public error properties consumed by the supported n8n UI and keep the integration isolated in the shared wrapper.

## Migration Plan

Ship the runtime and test changes in a normal package release, then reinstall or update the community node package in n8n. No workflow, credential, snapshot, or generated-node migration is required. Rollback consists of reinstalling the preceding package version; existing historical execution records remain unchanged.

## Open Questions

None.
