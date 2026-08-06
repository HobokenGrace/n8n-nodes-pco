## ADDED Requirements

### Requirement: Generated product API versions match their source snapshots
Before rendering a product node, the system SHALL require `ProductConfig.snapshotDate` to be present in `YYYY-MM-DD` format and SHALL require it to equal the loaded OpenAPI document's `info.version` exactly. The system SHALL fail generation rather than emit a node when either condition is not satisfied.

#### Scenario: Configured version is valid and matches the snapshot
- **WHEN** a product's `snapshotDate` is in `YYYY-MM-DD` format and exactly equals the loaded OpenAPI document's `info.version`
- **THEN** generation SHALL use that `snapshotDate` as the product's API request version

#### Scenario: Configured version is missing or malformed
- **WHEN** a product's `snapshotDate` is missing or is not in `YYYY-MM-DD` format
- **THEN** generation SHALL fail before rendering that product's nodes and SHALL identify the affected product and invalid configured value

#### Scenario: Snapshot version is missing
- **WHEN** the loaded OpenAPI document does not contain a string-valued `info.version`
- **THEN** generation SHALL fail before rendering that product's nodes and SHALL identify the affected product and missing metadata

#### Scenario: Configured and snapshot versions differ
- **WHEN** a product's valid `snapshotDate` does not exactly equal the loaded OpenAPI document's `info.version`
- **THEN** generation SHALL fail before rendering that product's nodes and SHALL identify the affected product, configured value, and document value

### Requirement: Generated requests pin the product API version
The system SHALL include the generated product's validated `snapshotDate` as the `X-PCO-API-Version` header on every Planning Center API request originating from that product's action or trigger node. The pinned version SHALL be fixed by generated product metadata and SHALL NOT be configurable or replaceable by workflows, credentials, package-wide defaults, or additional caller headers.

#### Scenario: Generated action sends its configured version
- **WHEN** a user executes an action on a generated product node
- **THEN** every outbound request for that action SHALL include `X-PCO-API-Version` with that product's configured snapshot date

#### Scenario: Paginated action preserves its configured version
- **WHEN** a generated list action follows one or more pages of Planning Center results
- **THEN** the initial request and every subsequent page request SHALL include the same product-specific `X-PCO-API-Version` value

#### Scenario: Generated resource lookup sends its configured version
- **WHEN** a generated resource locator requests initial or filtered lookup results
- **THEN** every lookup request SHALL include `X-PCO-API-Version` with the generated product's configured snapshot date

#### Scenario: Generated polling trigger sends its configured version
- **WHEN** a generated polling trigger previews, establishes a baseline, or collects subsequent pages
- **THEN** every polling request SHALL include `X-PCO-API-Version` with the generated product's configured snapshot date

#### Scenario: Retried request preserves its configured version
- **WHEN** the shared request helper retries a generated action, lookup, pagination, or polling request
- **THEN** every attempt SHALL include the same product-specific `X-PCO-API-Version` value as the initial attempt

#### Scenario: Products use independent configured versions
- **WHEN** generated product nodes are built from snapshots with different configured dates
- **THEN** each product node SHALL send its own configured snapshot date rather than a package-wide default version

#### Scenario: Version is not exposed as workflow or credential configuration
- **WHEN** generated node properties and Planning Center credential properties are rendered
- **THEN** they SHALL NOT expose a field for selecting or overriding the API version

#### Scenario: Caller headers cannot replace or duplicate the generated version
- **WHEN** an internal request supplies an additional header whose name case-insensitively equals `X-PCO-API-Version`
- **THEN** the outbound request SHALL contain one effective `X-PCO-API-Version` header with the generated product's configured snapshot date
