## ADDED Requirements

### Requirement: Polling trigger eligibility is deterministic
The system SHALL derive polling trigger operations from committed Planning Center OpenAPI snapshots without a per-operation allowlist. A GET collection operation SHALL qualify for a cursor field only when its `order` parameter supports that field and it exposes `where[<field>][gte]` as a date-time filter.

#### Scenario: Collection supports created cursor
- **WHEN** a GET collection operation supports ordering by `created_at` and filtering by `where[created_at][gte]`
- **THEN** the generated product trigger SHALL include an `On <Resource> Created` operation for that collection

#### Scenario: Collection supports updated cursor
- **WHEN** a GET collection operation supports ordering by `updated_at` and filtering by `where[updated_at][gte]`
- **THEN** the generated product trigger SHALL include an `On <Resource> Created or Updated` operation for that collection

#### Scenario: Collection does not satisfy the cursor contract
- **WHEN** a collection lacks either same-field ordering or the inclusive same-field `gte` filter
- **THEN** the generator SHALL NOT produce a polling trigger operation for that cursor field

#### Scenario: Non-collection operation has timestamp parameters
- **WHEN** a non-collection GET operation exposes timestamp ordering and filtering
- **THEN** the generator SHALL NOT produce a polling trigger operation for it

### Requirement: Trigger operations preserve collection context
The system SHALL group polling operations by the same generated resource types as action operations and SHALL preserve nested collection scope in trigger labels and parameters.

#### Scenario: Direct collection trigger is generated
- **WHEN** a direct eligible collection returns a generated resource type
- **THEN** its trigger label SHALL use `On <Resource Type> Created` or `On <Resource Type> Created or Updated`

#### Scenario: Nested collection trigger is generated
- **WHEN** an eligible collection is reached through a generated scope such as Form
- **THEN** its trigger label SHALL use `On <Resource Type> (via <Scope>) Created` or `On <Resource Type> (via <Scope>) Created or Updated`
- **AND** the trigger SHALL expose the required scope path parameters using the corresponding action operation's generated controls

### Requirement: Trigger query controls preserve server-side selectivity
Generated polling triggers SHALL reuse the corresponding action operation's supported path parameters, result filters, includes, sparse fields, and resource locators while reserving cursor filtering, cursor ordering, pagination offset, and page size for the polling runtime.

#### Scenario: Eligible operation has additional filters
- **WHEN** an eligible collection exposes filters unrelated to the selected cursor field
- **THEN** the generated trigger SHALL expose those filters and send selected values to Planning Center

#### Scenario: Eligible operation has includes or sparse fields
- **WHEN** an eligible collection exposes includes or sparse field selections
- **THEN** the generated trigger SHALL expose those selections and preserve them in polling requests

#### Scenario: User configures polling-owned parameters
- **WHEN** the trigger renders controls for an eligible collection
- **THEN** it SHALL NOT expose the selected cursor field's range filters, order, offset, or per-page parameters as user-controlled query options

#### Scenario: Sparse fields omit the cursor attribute
- **WHEN** a user selects sparse fields that do not include the active cursor field
- **THEN** the polling request SHALL still request enough data to validate and advance the cursor

### Requirement: Polling schedule and batch controls are bounded by explicit contracts
The trigger SHALL expose a positive integer maximum-records setting with a default of 100 and no package-defined maximum. The preferred scheduling contract is a positive integer interval in minutes with a default of 2, a minimum of 1, and a maximum of 2,147,483,647.

#### Scenario: User does not configure a batch size
- **WHEN** a polling trigger uses its default settings
- **THEN** one poll SHALL emit at most 100 records

#### Scenario: User configures a larger batch size
- **WHEN** a user sets Max Records Per Poll to a positive integer greater than 100
- **THEN** the runtime SHALL accept that value without applying a package-defined upper bound

#### Scenario: User configures an invalid batch size
- **WHEN** Max Records Per Poll is zero, negative, fractional, or not numeric
- **THEN** the trigger SHALL reject the configuration

#### Scenario: Native n8n polling supports the preferred interval contract
- **WHEN** implementation verifies that native n8n polling can cleanly express the preferred default and range
- **THEN** the generated triggers SHALL use a default interval of 2 minutes and accept integer values from 1 through 2,147,483,647 minutes

#### Scenario: Native n8n polling cannot support the preferred interval contract
- **WHEN** implementation cannot cleanly express the preferred default or range through native n8n polling
- **THEN** implementation MUST stop and request a product decision
- **AND** it MUST NOT silently narrow the range, change the default, or introduce a custom scheduler

### Requirement: Initial polling state avoids an implicit historical replay
The trigger SHALL ignore existing matching records by default and SHALL allow a user to configure a specific start date and time to process a historical backlog intentionally.

#### Scenario: Trigger is activated without prior state
- **WHEN** a polling trigger is first activated with the default start behavior
- **THEN** it SHALL establish a boundary at the newest matching existing record without emitting existing records
- **AND** later polls SHALL emit matching records beyond that boundary

#### Scenario: No matching record exists during initial baseline
- **WHEN** a polling trigger establishes its initial boundary and the collection is empty after applying configured scope and filters
- **THEN** it SHALL establish a current-time boundary without emitting data

#### Scenario: User configures a specific start time
- **WHEN** a polling trigger first runs with a specific start date and time
- **THEN** it SHALL process matching records from that inclusive timestamp in oldest-first batches

### Requirement: Polling uses an inclusive durable watermark
The runtime SHALL poll with ascending cursor order and an inclusive `gte` watermark, deduplicate resources already observed at the watermark timestamp, and persist enough boundary state to avoid duplicate emission across normal polls and retries.

#### Scenario: Multiple resources share the watermark timestamp
- **WHEN** multiple matching resources have the same cursor timestamp across one or more pages
- **THEN** the runtime SHALL emit each resource ID at that timestamp once
- **AND** it SHALL retain the IDs already observed at that boundary until the watermark advances

#### Scenario: New resource arrives at the current watermark timestamp
- **WHEN** Planning Center later returns an unseen resource ID with the current watermark timestamp
- **THEN** the runtime SHALL emit that resource despite its timestamp equaling the watermark

#### Scenario: Poll returns fewer records than the batch cap
- **WHEN** the runtime exhausts all matching pages before reaching Max Records Per Poll
- **THEN** it SHALL advance the watermark to the greatest emitted cursor timestamp and persist the IDs emitted at that timestamp

#### Scenario: Poll reaches the batch cap
- **WHEN** more matching records exist than Max Records Per Poll
- **THEN** the runtime SHALL emit the oldest matching records up to the cap
- **AND** it SHALL advance state only through the emitted records so later polls continue catching up

### Requirement: Poll state follows workflow and configuration lifecycle
The runtime SHALL preserve a valid watermark across ordinary deactivation and reactivation, and SHALL reset the watermark when the credential identity, trigger operation, required path scope, start time, or result-affecting filter configuration changes.

#### Scenario: Workflow is reactivated without material configuration changes
- **WHEN** a previously active workflow is reactivated with the same polling result set
- **THEN** the trigger SHALL resume from its saved watermark and process matching changes that occurred while inactive

#### Scenario: Scope or result filter changes
- **WHEN** a required path parameter or result-affecting filter changes
- **THEN** the trigger SHALL treat the new result set as uninitialized
- **AND** it SHALL ignore existing matching records unless a specific start time requests backlog processing

#### Scenario: Credential identity changes
- **WHEN** the trigger is changed to credentials for a different Planning Center connection
- **THEN** it SHALL reset state rather than applying the prior connection's watermark

#### Scenario: Output-only or throughput setting changes
- **WHEN** includes, sparse fields, polling interval, or Max Records Per Poll changes without changing the result set
- **THEN** the trigger SHALL preserve its watermark

### Requirement: Poll completion is atomic with respect to cursor progress
The runtime SHALL validate and normalize the fetched batch before emitting records or advancing the watermark. A request, pagination, validation, or normalization failure SHALL emit no records and preserve the prior cursor state.

#### Scenario: Later page request fails
- **WHEN** a poll requires multiple pages and a later page request fails before the batch is complete
- **THEN** the trigger SHALL fail the poll, emit no partial batch, and preserve the prior watermark

#### Scenario: Resource lacks a valid cursor timestamp
- **WHEN** Planning Center returns a resource without a valid value for the selected cursor field
- **THEN** the trigger SHALL fail the poll, emit nothing, and preserve the prior watermark

### Requirement: Manual testing is non-stateful and useful
Manual test execution SHALL return the newest matching normalized resource without creating or advancing the production polling watermark.

#### Scenario: Matching test record exists
- **WHEN** a user tests a configured polling trigger manually and at least one matching resource exists
- **THEN** the trigger SHALL emit the newest matching resource as one n8n item
- **AND** it SHALL leave production polling state unchanged

#### Scenario: No matching test record exists
- **WHEN** a user tests a configured polling trigger and no matching resource exists
- **THEN** the trigger SHALL return no items and leave production polling state unchanged

### Requirement: Polling output matches action-node normalization
Each detected resource SHALL be emitted as one n8n item using the package's shared JSON:API normalization, including requested compound-document data according to existing normalization behavior.

#### Scenario: Poll detects multiple resources
- **WHEN** a successful poll detects multiple matching resources within the batch cap
- **THEN** it SHALL return one normalized n8n item per resource in ascending cursor order

#### Scenario: Poll uses generated includes
- **WHEN** a user selects supported include options
- **THEN** the polling request and normalized output SHALL preserve the same include behavior as the corresponding action operation

### Requirement: Polling events describe observed resource state
Polling triggers SHALL represent observed resource states rather than claim complete event-log semantics.

#### Scenario: Resource is created for an updated cursor trigger
- **WHEN** a newly created resource receives its initial `updated_at` value
- **THEN** an `On <Resource> Created or Updated` trigger SHALL treat it as matching

#### Scenario: Resource changes repeatedly between polls
- **WHEN** the same resource changes multiple times between polls
- **THEN** the trigger SHALL emit the latest representation observed by the collection API and SHALL NOT claim to emit every intermediate change

#### Scenario: Resource is deleted
- **WHEN** a resource disappears from the collection
- **THEN** the polling framework SHALL NOT infer or emit a deletion event
