## ADDED Requirements

### Requirement: Generated node subtitle shows the selected HTTP endpoint
The system SHALL render each generated Planning Center node's workflow-view subtitle/hint using the selected operation's HTTP method and relative endpoint path, such as `GET /people`, instead of the raw stored operation ID.

The subtitle/hint SHALL be derived from shared generated operation metadata so it stays synchronized with the generated operation catalog for every Planning Center product node.

#### Scenario: List operation shows endpoint hint
- **WHEN** a user selects the generated People operation `List People`
- **THEN** the workflow-view node subtitle/hint SHALL show `GET /people`
- **AND** it SHALL NOT show the raw operation ID `getPeople`

#### Scenario: Nested operation shows endpoint hint
- **WHEN** a user selects a generated nested operation such as `Get Person (via Connected Application)`
- **THEN** the workflow-view node subtitle/hint SHALL show the corresponding endpoint string such as `GET /connected_applications/{connected_application_id}/people/{person_id}`

#### Scenario: Operation selection remains ID-based
- **WHEN** a user saves or executes a generated Planning Center node after selecting an operation
- **THEN** the node SHALL continue storing and dispatching the selected operation by its stable internal operation ID
- **AND** the subtitle/hint change SHALL NOT require changing existing operation option values

#### Scenario: Subtitle behavior is shared across generated products
- **WHEN** the generator renders Planning Center product nodes from configured OpenAPI snapshots
- **THEN** every generated product node SHALL use the same shared subtitle/hint behavior rather than product-specific handwritten mappings
