## ADDED Requirements

### Requirement: Planning Center API errors retain actionable response details
When a Planning Center request ultimately fails, the runtime SHALL expose the HTTP status and Planning Center response data through the n8n node error. For a JSON:API `errors` array, the runtime SHALL create a description from each available error title and detail without replacing the original request-failure message.

#### Scenario: JSON:API validation failure
- **WHEN** Planning Center rejects a request with HTTP 422 and an error containing a title and detail
- **THEN** the node error contains HTTP code `422`, retains the response error data under `response`, and describes the failure as `<title>: <detail>`

#### Scenario: Multiple JSON:API errors
- **WHEN** a failed Planning Center response contains multiple JSON:API error entries
- **THEN** the node error description includes every entry that has a title or detail

#### Scenario: Response body shape and field collisions
- **WHEN** a failed response body is an array, a primitive, or an object containing a `request` field
- **THEN** the complete sanitized response body remains available under `response` and the request diagnostics remain separately available under `request`

#### Scenario: Error survives item wrapping
- **WHEN** a Planning Center API error is converted to an item-indexed n8n operation error
- **THEN** its description, HTTP code, raw messages, and structured error context remain available on the resulting error

#### Scenario: Error survives execution persistence serialization
- **WHEN** an item-indexed Planning Center API error is serialized for an n8n execution record
- **THEN** its description, HTTP code, raw messages, and structured error context remain available in the serialized error

### Requirement: Failed requests include structured reproduction context
The runtime SHALL attach the failed request method and path to structured n8n error data. It SHALL also attach the request query and body when those values were present, and SHALL apply this behavior through the shared runtime used by all generated Planning Center nodes.

#### Scenario: Mutation request fails
- **WHEN** a generated node sends a mutation request that Planning Center rejects
- **THEN** the node error data contains the request method, path, query, and body needed to inspect the rejected payload

#### Scenario: Optional request values are absent
- **WHEN** a failed request has no query or body
- **THEN** the request diagnostics contain method and path without adding query or body fields

#### Scenario: Successful request
- **WHEN** Planning Center accepts a request
- **THEN** the runtime returns the response without creating or attaching error diagnostics

### Requirement: Error diagnostics protect Planning Center credentials
The runtime MUST recursively redact the configured Planning Center application ID and secret from error messages, response data, query values, and body values before storing diagnostics. It MUST NOT include request headers in the diagnostic context, and sanitization MUST NOT alter the outbound request.

#### Scenario: Credentials appear in nested diagnostic values
- **WHEN** a failed request or response contains the application ID or secret in a nested string
- **THEN** every occurrence in the stored diagnostics is replaced with `[redacted]`

#### Scenario: Authorization header is excluded
- **WHEN** an authenticated Planning Center request fails
- **THEN** the structured request diagnostics do not contain the Authorization header or any other request header

#### Scenario: Outbound payload is unchanged
- **WHEN** credential redaction is applied to diagnostics after a failed request
- **THEN** the HTTP helper received the original unsanitized query and body values

### Requirement: Error diagnostics remain serializable
The runtime SHALL create a diagnostic copy rather than attach potentially circular transport objects directly, and SHALL represent circular references with a serializable marker.

#### Scenario: Circular diagnostic value
- **WHEN** request or response diagnostic data contains a circular object reference
- **THEN** the node error can still be serialized and the circular reference is represented by a marker
