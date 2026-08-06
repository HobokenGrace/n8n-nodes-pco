# pco-polling-triggers Specification

## Purpose
TBD - created by archiving change add-generated-polling-triggers. Update Purpose after archive.
## Requirements
### Requirement: Polling trigger eligibility is deterministic

The system SHALL derive polling trigger operations from committed Planning Center OpenAPI snapshots without a per-operation allowlist. A GET operation modeled as returning a collection SHALL qualify for a cursor field only when its `order` parameter supports that field and it exposes `where[<field>][gte]` with `format: date-time`.

#### Scenario: Collection supports created cursor

- **WHEN** a GET collection operation supports ordering by `created_at` and filtering by `where[created_at][gte]`
- **THEN** the generated product trigger SHALL include that collection's resource under Resource with a `Created` Event

#### Scenario: Collection supports updated cursor

- **WHEN** a GET collection operation supports ordering by `updated_at` and filtering by `where[updated_at][gte]`
- **THEN** the generated product trigger SHALL include that collection's resource under Resource with a `Created or Updated` Event

#### Scenario: Collection does not satisfy the cursor contract

- **WHEN** a collection lacks same-field ordering, the inclusive same-field `gte` filter, or date-time format metadata for that filter
- **THEN** the generator SHALL NOT produce a polling trigger operation for that cursor field

#### Scenario: Non-collection operation has timestamp parameters

- **WHEN** a non-collection GET operation exposes timestamp ordering and filtering
- **THEN** the generator SHALL NOT produce a polling trigger operation for it

### Requirement: Trigger operations preserve collection context

Each generated product trigger SHALL expose separate Resource and Event controls. The Resource control SHALL group polling operations by their emitted JSON:API resource type and append `(via <Scope>)` for nested collection routes, adding deeper path context only when needed to keep Resource and Event combinations unique. Event labels SHALL remain `Created` or `Created or Updated`. The corresponding n8n action labels SHALL start with `On`, include the emitted resource name, and place any `(via <Scope>)` suffix after the event so operations remain identifiable outside the configured node. The configured node subtitle SHALL reuse the corresponding action operation's endpoint description and append the active snake_case cursor field. Each `Created` option SHALL describe that it follows creation time and does not fire when an older resource merely starts matching. Each `Created or Updated` option SHALL describe that it includes initial creation and later changes whose update timestamp advances.

#### Scenario: Direct collection trigger is generated

- **WHEN** a direct eligible collection returns a generated resource type
- **THEN** the Resource control SHALL contain `<Resource Type>`
- **AND** its Event control SHALL use `Created` or `Created or Updated`
- **AND** its n8n action label SHALL use `On <Resource Type> created` or `On <Resource Type> created or updated`
- **AND** its configured node subtitle SHALL use `<METHOD> <endpoint> created_at` or `<METHOD> <endpoint> updated_at` for the selected Event
- **AND** each Event option SHALL include the corresponding creation-time or update-time description

#### Scenario: Nested collection trigger is generated

- **WHEN** an eligible collection is reached through a generated scope such as Form
- **THEN** the Resource control SHALL contain `<Resource Type> (via <Scope>)`
- **AND** its Event control SHALL use `Created` or `Created or Updated`
- **AND** its n8n action label SHALL use `On <Resource Type> created (via <Scope>)` or `On <Resource Type> created or updated (via <Scope>)`
- **AND** the trigger SHALL expose the required scope path parameters using the corresponding action operation's generated controls

### Requirement: Trigger query controls preserve server-side selectivity

Generated polling triggers SHALL reuse the corresponding action operation's supported path parameters, result filters, includes, sparse fields, and resource locators while reserving every exact and range predicate for the active cursor, cursor ordering, pagination offset, and page size for the polling runtime.

#### Scenario: Eligible operation has additional filters

- **WHEN** an eligible collection exposes filters unrelated to the selected cursor field
- **THEN** the generated trigger SHALL expose those filters and send selected values to Planning Center

#### Scenario: Eligible operation has includes or sparse fields

- **WHEN** an eligible collection exposes includes or sparse field selections
- **THEN** the generated trigger SHALL expose those selections and preserve them in polling requests

#### Scenario: User configures polling-owned parameters

- **WHEN** the trigger renders controls for an eligible collection
- **THEN** it SHALL NOT expose `where[<cursor>]` or any operator variant for the selected cursor field, order, offset, or per-page parameters as user-controlled query options

#### Scenario: Sparse fields omit the cursor attribute

- **WHEN** a user selects sparse fields that do not include the active cursor field
- **THEN** the polling request SHALL still request enough data to validate and advance the cursor
- **AND** the runtime-forced cursor attribute SHALL NOT appear in normalized output solely because the runtime requested it

### Requirement: Polling schedules are native and batch controls are explicit

The generated trigger SHALL declare itself as an n8n polling node and SHALL rely on the running n8n version to inject and execute its native `Poll Times` control. The package SHALL NOT define a second schedule property, alter the native schedule options or defaults, or implement an independent timer. The trigger SHALL expose a Max Records Per Poll integer setting with a default of 100, a minimum of 1, and a maximum of 1,000. Its description SHALL state that each Poll Time emits at most one capped batch and that a larger backlog continues over later Poll Times.

#### Scenario: n8n loads a generated trigger

- **WHEN** n8n loads a generated polling trigger node
- **THEN** the node SHALL expose the native `Poll Times` control supplied by that n8n version
- **AND** the generated node description SHALL NOT define its own `pollTimes` property or package-specific interval control

#### Scenario: Poll Times configuration changes

- **WHEN** a user changes only the native Poll Times configuration
- **THEN** n8n SHALL schedule polls according to its native behavior
- **AND** the polling runtime SHALL preserve its Planning Center watermark

#### Scenario: User does not configure a batch size

- **WHEN** a polling trigger uses its default settings
- **THEN** one poll SHALL emit at most 100 records

#### Scenario: User configures a larger valid batch size

- **WHEN** a user sets Max Records Per Poll to an integer from 101 through 1,000
- **THEN** the runtime SHALL accept that value
- **AND** one poll SHALL emit no more than the configured number of records

#### Scenario: Backlog exceeds the configured batch size

- **WHEN** more matching unseen records exist than Max Records Per Poll
- **THEN** the current Poll Time SHALL emit at most one capped batch
- **AND** the trigger SHALL continue the remaining backlog at later configured Poll Times
- **AND** it SHALL NOT drain the remaining backlog through package-scheduled follow-up polls

#### Scenario: User configures an invalid batch size

- **WHEN** Max Records Per Poll is less than 1, greater than 1,000, fractional, or not numeric
- **THEN** the trigger SHALL reject the configuration

### Requirement: Initial polling state avoids an implicit historical replay

The trigger SHALL expose Start Time as an optional native n8n date-time control with an empty default and expression support. It SHALL default to new changes only when the resolved value is empty. The Start Time description SHALL state that leaving it empty does not emit existing matching records, a past or current value starts inclusive historical catch-up after initialization, and a future value keeps the trigger active without emitting resource items until that time. A configured or expression-resolved value SHALL be either the native n8n local date-time format or a valid RFC 3339 date-time with an explicit offset. The runtime SHALL interpret a native local value in the workflow timezone, canonicalize either accepted form to UTC, and use it as an inclusive watermark. The value MAY be in the past or future. A node without persisted state SHALL initialize and persist the applicable boundary without returning resource items. A node with valid persisted state SHALL poll immediately whenever n8n invokes it, including during reactivation.

#### Scenario: User configures Start Time in the editor

- **WHEN** n8n renders a generated polling trigger
- **THEN** Start Time SHALL use the native date-time input rather than a plain string or date-only control
- **AND** its default SHALL be empty
- **AND** it SHALL accept an n8n expression whose resolved value is validated at runtime
- **AND** a value selected in the editor SHALL be interpreted in the workflow timezone

#### Scenario: Trigger is activated without prior state

- **WHEN** a polling trigger is first activated with Start Time empty
- **THEN** it SHALL establish a boundary at the newest matching existing record without emitting existing records
- **AND** the activation SHALL return no resource items
- **AND** later polls SHALL emit matching records beyond that boundary

#### Scenario: No matching record exists during initial baseline

- **WHEN** a polling trigger establishes its initial boundary and the collection is empty after applying configured scope and filters
- **THEN** it SHALL persist `1970-01-01T00:00:00.000Z` as the watermark with no seen boundary identities
- **AND** it SHALL emit no data during initialization

#### Scenario: Pre-activation record becomes visible after an empty baseline

- **WHEN** initialization persisted the empty-collection watermark
- **AND** a resource with an earlier cursor timestamp becomes visible or starts matching the configured query on a later poll
- **THEN** the trigger SHALL treat that resource as unseen and eligible for emission

#### Scenario: User configures a specific start time

- **WHEN** a polling trigger is activated with a specific start date and time at or before activation time
- **THEN** activation SHALL persist that inclusive boundary and return no resource items
- **AND** the next poll SHALL return matching records from that boundary in oldest-first order
- **AND** it SHALL apply Max Records Per Poll to that first batch
- **AND** later polls SHALL continue any remaining backlog from the persisted boundary

#### Scenario: User configures a future start time

- **WHEN** the canonical start time is later than the current poll time
- **THEN** the trigger SHALL preserve that future watermark
- **AND** it SHALL return no resource items until PCO exposes a matching record at or after that timestamp
- **AND** it SHALL NOT treat the future value as invalid or clamp it to activation time

#### Scenario: User configures an invalid start time

- **WHEN** the start time is neither the native n8n local date-time format nor a valid RFC 3339 date-time with an explicit offset
- **THEN** the trigger SHALL reject the configuration without making a Planning Center request or changing state

### Requirement: Polling uses an inclusive durable watermark

The runtime SHALL require each primary resource to have a non-empty string JSON:API `type`, non-empty string `id`, and RFC 3339 cursor date-time with an explicit offset. It SHALL compare cursor instants, persist cursor values in canonical UTC form, and use `(type, id)` as resource identity. It SHALL poll with ascending cursor order and an inclusive `gte` watermark, deduplicate identities already observed at the watermark timestamp, and persist every observed identity at the current watermark to avoid duplicate emission across serial normal polls. The package SHALL NOT impose a maximum on that boundary identity set, and SHALL discard it only when the watermark advances. Between pages it SHALL restart from the greatest fully observed cursor boundary and SHALL use offset only as needed to traverse resources tied at that timestamp, rather than relying exclusively on a previously returned next offset.

#### Scenario: Multiple resources share the watermark timestamp

- **WHEN** multiple matching resources have the same cursor timestamp across one or more pages
- **THEN** the runtime SHALL emit each `(type, id)` identity at that timestamp once
- **AND** it SHALL retain the identities already observed at that boundary until the watermark advances

#### Scenario: Boundary contains more identities than one poll can emit

- **WHEN** resources sharing one cursor timestamp span multiple capped poll batches
- **THEN** the runtime SHALL retain every observed `(type, id)` at that timestamp across polls without applying a package-defined identity limit
- **AND** it SHALL release that boundary identity set only after the watermark advances to a later timestamp

#### Scenario: New resource arrives at the current watermark timestamp

- **WHEN** Planning Center later returns an unseen `(type, id)` identity with the current watermark timestamp
- **THEN** the runtime SHALL emit that resource despite its timestamp equaling the watermark

#### Scenario: Same resource changes without advancing its cursor

- **WHEN** Planning Center returns a previously observed `(type, id)` identity at the current watermark timestamp
- **THEN** the runtime SHALL treat that representation as already observed and SHALL NOT emit it again
- **AND** the trigger SHALL NOT claim to detect a same-resource mutation whose cursor timestamp does not advance

#### Scenario: Equivalent cursor offsets represent one instant

- **WHEN** resources or persisted state express the same cursor instant with different valid RFC 3339 offsets
- **THEN** the runtime SHALL compare them as one instant and use one canonical UTC watermark boundary

#### Scenario: Poll returns fewer records than the batch cap

- **WHEN** the runtime exhausts all matching pages before reaching Max Records Per Poll
- **THEN** it SHALL advance the watermark to the greatest emitted cursor timestamp and persist the identities emitted at that timestamp

#### Scenario: Poll reaches the batch cap

- **WHEN** more matching records exist than Max Records Per Poll
- **THEN** the runtime SHALL emit the oldest matching records up to the cap
- **AND** it SHALL advance state only through the emitted records so later polls continue catching up

#### Scenario: Records change while a multi-page poll is running

- **WHEN** PCO reorders matching resources between page requests
- **THEN** the runtime SHALL apply cursor-boundary restarts, inclusive overlap, and boundary-identity deduplication
- **AND** the trigger SHALL NOT claim gap-free delivery because PCO provides neither a result snapshot nor stable `(timestamp, type, id)` keyset pagination

### Requirement: Poll state follows workflow and configuration lifecycle

The runtime SHALL preserve a valid watermark across ordinary deactivation and reactivation. Before each production poll, it SHALL fingerprint the credential identity and canonical resolved values of the trigger operation, required path scope, start time, and result-affecting filters. When that fingerprint changes, it SHALL discard the prior watermark and apply fresh-activation semantics using the current Start Time: an empty value establishes a new-changes-only baseline, while a configured value restarts inclusively from that time and MAY re-emit records delivered under the prior configuration. The user documentation SHALL state this replay consequence. Canonical serialization SHALL recursively sort object keys and preserve array order.

Before fingerprint comparison or any Planning Center request, the runtime SHALL validate the complete persisted state version, shape, and invariants. Malformed, internally inconsistent, or unsupported-version state SHALL fail without requests or mutation. The error SHALL tell the user to replace the trigger node to create fresh state and to configure Start Time if historical catch-up is required. The runtime SHALL migrate older state only when that source version has an explicit, tested migration and SHALL NOT silently treat unknown state as uninitialized or expose a permanent state-reset control.

#### Scenario: Persisted state is malformed or internally inconsistent

- **WHEN** state has an invalid shape, cursor field, canonical watermark, fingerprint, initialized flag, or duplicate or malformed boundary resource identity
- **THEN** the poll SHALL fail with guidance to replace the trigger node and optionally configure Start Time for catch-up
- **AND** it SHALL make no Planning Center request and preserve the stored state unchanged

#### Scenario: Persisted state version is unsupported

- **WHEN** state uses a version for which no explicit migration exists
- **THEN** the poll SHALL fail without re-baselining or mutating that state
- **AND** it SHALL provide the same node-replacement and optional-catch-up guidance

#### Scenario: Persisted state version has a migration

- **WHEN** state uses an older version with an explicit migration covered by tests
- **THEN** the runtime SHALL migrate it deterministically before normal polling

#### Scenario: Workflow is reactivated without material configuration changes

- **WHEN** a previously active workflow is reactivated with the same polling result set
- **THEN** reactivation SHALL preserve the saved watermark and immediately poll from it
- **AND** it MAY return one capped batch of matching changes that occurred while inactive before the next configured Poll Time
- **AND** later configured Poll Times SHALL continue any remaining backlog one capped batch per Poll Time

#### Scenario: Scope or result filter changes

- **WHEN** the resolved value of a required path parameter or result-affecting filter changes
- **THEN** the trigger SHALL treat the new result set as uninitialized
- **AND** with Start Time empty it SHALL baseline the new result set without emitting existing matches
- **AND** with Start Time configured it SHALL restart inclusively from that time, even when this re-emits a previously delivered resource

#### Scenario: Expression continues resolving to the same value

- **WHEN** a result-affecting control uses an expression
- **AND** its canonical resolved value is unchanged from the persisted fingerprint
- **THEN** the trigger SHALL preserve its watermark

#### Scenario: Expression resolves to a different value

- **WHEN** a result-affecting control uses an expression
- **AND** its canonical resolved value differs from the persisted fingerprint
- **THEN** the trigger SHALL treat the result set as uninitialized under the normal configuration-change behavior

#### Scenario: Scheduled re-baseline has no resource items

- **WHEN** a scheduled poll changes its persisted fingerprint or other durable state
- **AND** the resulting poll has no Planning Center resource items to return
- **THEN** it SHALL return one empty output branch so n8n persists the new static data
- **AND** n8n SHALL record a successful workflow execution with zero input items for downstream nodes
- **AND** user-facing documentation SHALL explain that this zero-item execution is an expected state-persistence event rather than a resource event or trigger failure

#### Scenario: Scheduled poll has no resources and no state change

- **WHEN** a scheduled poll finds no unseen resources
- **AND** it does not change durable polling state
- **THEN** it SHALL return `null` and SHALL NOT start a workflow execution

#### Scenario: Credential identity changes

- **WHEN** the trigger is changed to credentials for a different Planning Center connection
- **THEN** it SHALL reset state rather than applying the prior connection's watermark
- **AND** it SHALL apply fresh-activation semantics using the current Start Time

#### Scenario: Output-only or throughput setting changes

- **WHEN** includes, sparse fields, native Poll Times, or Max Records Per Poll changes without changing the result set
- **THEN** the trigger SHALL preserve its watermark

### Requirement: Poll completion is atomic with respect to cursor progress

The runtime SHALL validate and normalize the fetched batch before returning records or advancing the watermark. A request, pagination, validation, or normalization failure SHALL return no records and preserve the prior cursor state. After a poll successfully returns its batch and advances the watermark, the trigger SHALL NOT replay that batch solely because later downstream workflow processing fails.

#### Scenario: Later page request fails

- **WHEN** a poll requires multiple pages and a later page request fails before the batch is complete
- **THEN** the trigger SHALL fail the poll, emit no partial batch, and preserve the prior watermark

#### Scenario: Resource lacks a valid cursor timestamp

- **WHEN** Planning Center returns a resource without a valid value for the selected cursor field
- **THEN** the trigger SHALL fail the poll, emit nothing, and preserve the prior watermark

#### Scenario: Resource lacks a valid JSON:API identity

- **WHEN** Planning Center returns a primary resource without a non-empty string `type` or non-empty string `id`
- **THEN** the trigger SHALL fail the poll, emit nothing, and preserve the prior watermark

#### Scenario: Downstream workflow processing fails

- **WHEN** a poll successfully returns a batch and advances its watermark
- **AND** a later node in that workflow execution fails
- **THEN** the polling trigger SHALL retain the advanced watermark
- **AND** it SHALL NOT replay the returned batch solely because of that downstream failure
- **AND** workflow authors SHALL be responsible for any required downstream retry or recovery behavior

#### Scenario: Native poll invocations overlap or repeat

- **WHEN** multiple Poll Times overlap or n8n repeats a durable poll occurrence before static-data persistence is visible
- **AND** the invocations read the same prior watermark
- **THEN** the trigger MAY return duplicate resources or batches
- **AND** the trigger SHALL NOT claim exactly-once delivery
- **AND** workflow authors SHALL be responsible for downstream idempotency where duplicates matter

### Requirement: Delivery limitations are visible before activation

Every generated trigger SHALL include a concise informational notice in the n8n node editor stating that polling may deliver duplicates, a successfully returned batch is not replayed solely because a downstream node fails, and deleted resources are not detected. The notice SHALL direct users to fuller documentation covering idempotency, retry, and polling limitations.

#### Scenario: User configures a generated trigger

- **WHEN** the generated trigger parameters are displayed in the n8n node editor
- **THEN** the delivery-limitations notice SHALL be visible without requiring workflow activation
- **AND** the notice SHALL NOT claim exactly-once, end-to-end at-least-once, deletion, or gap-free delivery

### Requirement: Manual testing is non-stateful and useful

Manual test execution SHALL be a sample-data preview rather than a simulation of the next production poll. It SHALL apply configured scope, result filters, includes, and sparse fields but SHALL ignore the configured Start Time and production watermark. It SHALL return at most the newest matching normalized resource without reading, creating, or advancing production polling state. User-facing documentation SHALL state that manual output does not predict the first activation or catch-up batch.

#### Scenario: Matching test record exists

- **WHEN** a user tests a configured polling trigger manually and at least one matching resource exists
- **THEN** the trigger SHALL emit the newest matching resource as one n8n item
- **AND** it SHALL do so regardless of whether Start Time is empty, historical, or future
- **AND** it SHALL leave production polling state unchanged

#### Scenario: No matching test record exists

- **WHEN** a user tests a configured polling trigger and no matching resource exists
- **THEN** the trigger SHALL return no items and leave production polling state unchanged

#### Scenario: Manual test resolves dynamic controls

- **WHEN** manual execution evaluates expressions in result-affecting controls
- **THEN** it SHALL NOT persist the resolved fingerprint or alter production polling state

### Requirement: Polling output matches action-node normalization

Each detected resource SHALL be emitted directly as one n8n item using the package's shared JSON:API normalization, including requested compound-document data according to existing normalization behavior. The trigger SHALL NOT wrap the resource or add synthetic polling event, detection-time, cursor, or source fields to the normalized resource.

#### Scenario: Trigger emits one resource

- **WHEN** a successful poll detects one matching resource
- **THEN** the item shape SHALL match the corresponding action operation's normalized resource shape
- **AND** it SHALL contain no trigger-specific wrapper or synthetic polling metadata

#### Scenario: Poll detects multiple resources

- **WHEN** a successful poll detects multiple matching resources within the batch cap
- **THEN** it SHALL return one normalized n8n item per resource in ascending cursor-instant order
- **AND** resources tied at one cursor instant within the fetched batch SHALL be ordered by `type` and then `id` in ascending ordinal string order

#### Scenario: Poll uses generated includes

- **WHEN** a user selects supported include options
- **THEN** the polling request and normalized output SHALL preserve the same include behavior as the corresponding action operation

### Requirement: Polling events describe observed resource state

Polling triggers SHALL represent observed resource states rather than claim complete event-log or gap-free change-stream semantics. The generator SHALL expose only qualifying Created and Created or Updated operations and SHALL NOT generate a Deleted polling operation. User-facing documentation SHALL state that polling does not detect deleted resources.

#### Scenario: Resource is created for an updated cursor trigger

- **WHEN** a newly created resource receives its initial `updated_at` value
- **THEN** a `Created or Updated` Event SHALL treat it as matching

#### Scenario: Existing resource starts matching a Created trigger later

- **WHEN** a resource was created outside the configured result set
- **AND** it starts matching only after its `created_at` value is behind the persisted watermark
- **THEN** the `Created` Event SHALL NOT emit it as a filter-membership transition
- **AND** the trigger SHALL document that Created or Updated is required to observe a later qualifying update when that operation is available

#### Scenario: Resource changes repeatedly between polls

- **WHEN** the same resource changes multiple times between polls
- **THEN** the trigger SHALL emit the latest representation observed by the collection API and SHALL NOT claim to emit every intermediate change

#### Scenario: Resource changes without timestamp precision advancing

- **WHEN** a resource changes after its `(type, id)` identity was observed at the current watermark
- **AND** Planning Center leaves its cursor timestamp unchanged
- **THEN** the trigger SHALL NOT emit that resource again solely because its representation changed

#### Scenario: Resource is deleted

- **WHEN** a resource disappears from the collection
- **THEN** the polling framework SHALL NOT infer or emit a deletion event
- **AND** no generated polling operation SHALL imply deletion support

