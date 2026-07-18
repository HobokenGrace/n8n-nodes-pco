# pco-api-supplements Specification

## Purpose
TBD - created by archiving change support-undocumented-pco-endpoints. Update Purpose after archive.
## Requirements
### Requirement: Product-local supplementary contracts

The repository SHALL maintain each locally owned Planning Center API operation under `openapi/<product>/supplements/<http-oriented-name>/` without modifying the dated vendor snapshot.

#### Scenario: Missing operation is added

- **WHEN** a contributor defines an operation that is absent from a product's configured vendor snapshot
- **THEN** the endpoint directory SHALL contain a complete OpenAPI 3.1 `openapi.json` document with exactly one path and method operation
- **AND** its `metadata.json` SHALL declare add mode, unofficial stability, and observed provenance

#### Scenario: Official operation is corrected

- **WHEN** a contributor corrects an operation that exists in the configured vendor snapshot
- **THEN** the endpoint directory SHALL contain an operation-scoped `patch.json` and metadata declaring override mode and the expected upstream-operation fingerprint
- **AND** the patch SHALL be applied without replacing unrelated paths or methods

#### Scenario: Supplement generation is offline

- **WHEN** generation or generation drift checking runs
- **THEN** all supplement validation and merging SHALL use committed files without making live Planning Center requests

### Requirement: Strict supplement validation and drift detection

The generator SHALL validate supplement structure, ownership mode, route identity, and upstream assumptions before parsing the effective product specification.

#### Scenario: Addition remains absent upstream

- **WHEN** an add-mode supplement targets a path and method absent from the configured vendor snapshot
- **THEN** generation SHALL merge the operation into the effective product specification

#### Scenario: Addition collides with a future snapshot

- **WHEN** an add-mode supplement targets a path and method that now exists in the configured vendor snapshot
- **THEN** generation SHALL fail with an actionable collision error requiring explicit contract comparison and promotion

#### Scenario: Override matches expected upstream contract

- **WHEN** an override-mode supplement's stored fingerprint matches the canonical fingerprint of its dereferenced upstream operation
- **THEN** generation SHALL apply the operation-scoped patch

#### Scenario: Override target drifts upstream

- **WHEN** an override-mode supplement's stored fingerprint does not match the current dereferenced upstream operation
- **THEN** generation SHALL fail before writing generated files and identify the affected product, method, and path

#### Scenario: Invalid or ambiguous endpoint package

- **WHEN** a supplement is missing required metadata, contains multiple operations, declares incompatible add and override inputs, or targets a different route than its metadata
- **THEN** generation SHALL fail with an actionable validation error

### Requirement: Stable promotion to an official contract

The supplement lifecycle SHALL preserve n8n workflow compatibility when Planning Center later documents a locally maintained endpoint.

#### Scenario: Maintainer adopts a new official operation

- **WHEN** an add-mode supplement begins colliding with a new vendor operation
- **THEN** the maintainer SHALL compare the observed and official contracts before changing the supplement's ownership mode or retiring it

#### Scenario: Official operation uses a different identifier

- **WHEN** a promoted official operation has an `operationId` different from the value previously stored by generated n8n workflows
- **THEN** the effective specification SHALL retain the existing generated operation ID unless a separately identified breaking migration is approved

### Requirement: Observed contract evidence

Every unofficial endpoint supplement SHALL include a directly executable request and sanitized observed response evidence for its maintained contract.

#### Scenario: Maintainer executes an observed request

- **WHEN** a maintainer opens `request.http` with the VS Code REST Client extension
- **THEN** the request SHALL use `PCO_API_URL`, `PCO_CLIENT_ID`, and `PCO_SECRET` from an ignored same-directory `.env` file
- **AND** it SHALL use the real product-version wire URL rather than the snapshot-relative path

#### Scenario: Request contains a resource identifier

- **WHEN** an observed request requires a person, webhook, or other account-specific identifier
- **THEN** `request.http` SHALL prompt for the identifier at send time rather than committing a real identifier

#### Scenario: Read request contains reusable dates

- **WHEN** an observed request uses non-sensitive date range parameters
- **THEN** `request.http` SHALL define sanitized editable file variables for those dates

#### Scenario: Mutation request can change live data

- **WHEN** `request.http` sends a POST, PUT, PATCH, or DELETE operation that can change Planning Center data
- **THEN** it SHALL use REST Client's per-request confirmation note and visibly state that the request affects the configured Planning Center account

#### Scenario: One operation has multiple observed request variants

- **WHEN** the same method and path has multiple observed request variants
- **THEN** one `request.http` SHALL contain separately named examples within the operation's single supplement package

#### Scenario: Observed JSON response is committed

- **WHEN** a maintainer records a successful endpoint response with a non-empty JSON body
- **THEN** `response.json` SHALL contain only a valid, sanitized JSON response body with credentials and personal data removed

#### Scenario: Observed response has no body

- **WHEN** a successful observed endpoint response has no body
- **THEN** the endpoint package SHALL omit `response.json`
- **AND** `metadata.json` SHALL record the observed status, the absence of a content type, and that the response has no body

#### Scenario: Environment setup is documented once

- **WHEN** a contributor wants to execute any supplementary request
- **THEN** repository contributor documentation SHALL provide one reusable `.env` template and explain that it must be placed beside the selected `request.http`
- **AND** `.gitignore` SHALL exclude same-directory supplement `.env` files

### Requirement: REST Client workspace recommendation

The repository SHALL recommend the VS Code REST Client extension used by supplementary endpoint requests without making the editor extension a build dependency.

#### Scenario: Contributor opens the repository in VS Code

- **WHEN** VS Code evaluates repository extension recommendations
- **THEN** `.vscode/extensions.json` SHALL recommend `humao.rest-client`

#### Scenario: Contributor uses another editor

- **WHEN** a contributor does not install the recommended extension
- **THEN** generation, tests, linting, building, and packaging SHALL continue to work without it

### Requirement: People activity supplement

The People product SHALL expose the observed unofficial person activity collection through the same generated node and shared runtime behavior as documented People operations.

#### Scenario: Person activities are generated

- **WHEN** the effective People specification includes `GET /people/{person_id}/activities`
- **THEN** the generated People node SHALL expose a visibly unofficial list operation with a stable operation ID

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
- **THEN** the generated Webhooks node SHALL expose a visibly unofficial batch-update operation with a stable operation ID

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

