## Why

Planning Center exposes many useful resource changes through queryable collection endpoints but provides incomplete and overly broad webhook coverage. Generated polling triggers can start workflows from narrowly scoped Planning Center changes, such as submissions for one form, without receiving organization-wide webhook traffic.

## What Changes

- Generate one polling trigger node per Planning Center product that has at least one qualifying collection operation.
- Generate `Created` and `Created or Updated` events under a separate Resource selector when the collection supports an inclusive timestamp filter and ordering on the corresponding cursor field.
- Reuse generated path parameters, filters, includes, fields, resource locators, labels, and JSON:API normalization while reserving cursor, ordering, and pagination controls for the polling runtime.
- Add shared polling state, inclusive watermark deduplication, bounded catch-up batches, first-activation baselining, reactivation catch-up, configuration-change resets, and non-stateful manual testing.
- Use n8n's native injected `Poll Times` control and scheduling semantics without defining a package-specific interval control or scheduler.
- Register and export generated trigger nodes alongside the existing product action nodes.

## Capabilities

### New Capabilities

- `pco-polling-triggers`: Defines generated polling trigger eligibility, user-visible events, scheduling, cursor state, batching, lifecycle behavior, failures, testing, and normalized output.

### Modified Capabilities

- `pco-openapi-node-generation`: Extends deterministic product generation and package registration to qualifying polling trigger nodes and their trigger operations.

## Impact

- Affects the OpenAPI model/parser, generator configuration and rendering, generated node metadata, package exports and n8n registration, and generation drift checks.
- Adds a shared polling runtime using existing Planning Center request, pagination, resource locator, and JSON:API normalization helpers.
- Adds generated trigger source files for currently qualifying products without changing existing action-node operation behavior.
- Adds generator, runtime, metadata, and generated-output tests for eligibility, lifecycle state, cursor boundaries, batching, errors, and package registration.
