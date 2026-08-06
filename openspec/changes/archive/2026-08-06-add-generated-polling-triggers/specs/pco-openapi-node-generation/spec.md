## ADDED Requirements

### Requirement: Qualifying products receive generated polling trigger nodes
The generator SHALL produce a separate polling trigger node for each configured Planning Center product whose OpenAPI snapshot contains at least one collection operation that satisfies the polling trigger eligibility contract.

#### Scenario: Product has qualifying polling operations
- **WHEN** generation processes a product with one or more qualifying collection cursor fields
- **THEN** it SHALL produce a `<Product> Trigger` node in addition to the existing product action node
- **AND** the trigger implementation SHALL dispatch through shared generated metadata and shared polling runtime behavior

#### Scenario: Product has no qualifying polling operations
- **WHEN** generation processes a product with no qualifying collection cursor field
- **THEN** it SHALL NOT produce or register an empty trigger node for that product

#### Scenario: OpenAPI snapshot changes eligibility
- **WHEN** a committed OpenAPI snapshot adds or removes same-field ordering or inclusive range filtering
- **THEN** deterministic regeneration SHALL add or remove the corresponding trigger operation without a hand-written operation allowlist

### Requirement: Generated polling operations have stable product metadata
Generated polling trigger classes, internal operation IDs, display labels, icons, credentials, resource grouping, and source paths SHALL be derived deterministically from product configuration and the qualifying action operation metadata.

#### Scenario: Trigger operation ID is generated
- **WHEN** a collection qualifies for a cursor field
- **THEN** its trigger operation SHALL receive a stable internal ID that distinguishes the source collection and cursor field

#### Scenario: Trigger reuses product identity
- **WHEN** a polling trigger node is generated
- **THEN** it SHALL use the corresponding product's credentials and icon while using a distinct trigger class name and n8n node name

### Requirement: Generated polling trigger nodes are package-registered
Package metadata and entry-point exports SHALL include every generated product trigger node and SHALL exclude trigger paths for products without qualifying operations.

#### Scenario: Qualifying trigger appears in package metadata
- **WHEN** a product trigger is generated
- **THEN** `package.json` SHALL include its built node path in the n8n node registration list
- **AND** the package entry point SHALL export its generated trigger class

#### Scenario: Trigger generation set changes
- **WHEN** configured snapshots change which products have qualifying trigger operations
- **THEN** metadata tests SHALL fail until registration and exports match the generated trigger set

### Requirement: Generated polling output remains drift-checked
Generated trigger source and copied product assets SHALL be committed output governed by the same deterministic generation checks as action nodes.

#### Scenario: Generated trigger output is stale
- **WHEN** generator logic, product configuration, or an eligible OpenAPI snapshot changes without regenerating trigger output
- **THEN** the generation drift check SHALL fail
