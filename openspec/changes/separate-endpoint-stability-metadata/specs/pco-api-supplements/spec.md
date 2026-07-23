## MODIFIED Requirements

### Requirement: People activity supplement

The People product SHALL expose the observed unofficial person activity collection through the same generated node and shared runtime behavior as documented People operations.

#### Scenario: Person activities are generated

- **WHEN** the effective People specification includes `GET /people/{person_id}/activities`
- **THEN** the generated People node SHALL expose a list operation with unofficial stability metadata and a stable operation ID
- **AND** the operation description SHALL NOT require the full unofficial endpoint warning sentence

#### Scenario: Person activity request is configured

- **WHEN** a user configures the person activity operation
- **THEN** the node SHALL require the person ID and expose dedicated optional controls for `before` and `after`
- **AND** the date controls SHALL represent OpenAPI `date-time` values
- **AND** it SHALL NOT expose the ineffective `app` query parameter

#### Scenario: Person activities are returned

- **WHEN** Planning Center returns the observed JSON:API activity collection
- **THEN** the operation SHALL use shared list pagination and JSON:API normalization behavior

### Requirement: Webhooks batch-update supplement

The Webhooks product SHALL expose the observed unofficial batch-update route as a single-resource JSON:API mutation through the generated Webhooks node.

#### Scenario: Batch update is generated

- **WHEN** the effective Webhooks specification includes `POST /batch_update`
- **THEN** the generated Webhooks node SHALL expose a batch-update operation with unofficial stability metadata and a stable operation ID
- **AND** the operation description SHALL NOT require the full unofficial endpoint warning sentence

#### Scenario: Batch update body is configured

- **WHEN** a user configures the batch-update operation in standard body mode
- **THEN** the node SHALL build one JSON:API `data` object from the contract's supported fields
- **AND** it SHALL NOT require or synthesize an array of resource objects

#### Scenario: Batch update creates or removes subscriptions

- **WHEN** the batch-update request contains a non-empty `names` array
- **THEN** the same operation SHALL create or update the named subscriptions for `url`
- **WHEN** the request contains an empty `names` array
- **THEN** the same operation SHALL remove the subscriptions for `url`
- **AND** both variants SHALL remain examples of one `POST /batch_update` operation rather than separate generated operations

#### Scenario: Batch update uses raw JSON

- **WHEN** a user selects advanced raw JSON body mode
- **THEN** the operation SHALL send the provided single-object JSON body through the shared request helper
