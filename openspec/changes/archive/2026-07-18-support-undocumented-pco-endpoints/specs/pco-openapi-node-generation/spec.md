## ADDED Requirements

### Requirement: Generation uses validated effective product specifications

The generator SHALL derive product operations from the deterministic combination of each configured vendor snapshot and its validated repository-owned supplements.

#### Scenario: Product has no supplements

- **WHEN** a configured product has no supplementary endpoint directories
- **THEN** its effective specification and generated operations SHALL remain equivalent to those derived from the vendor snapshot alone

#### Scenario: Product has valid supplements

- **WHEN** a configured product has supplements whose add and override assertions are valid
- **THEN** the generator SHALL merge them before operation parsing, lookup inference, rendering, and generation drift checking

#### Scenario: Supplement is unofficial

- **WHEN** a generated operation comes from an unofficial supplement
- **THEN** its n8n operation description SHALL visibly warn that Planning Center does not document the endpoint and may change it without notice

### Requirement: Ordinary typed query parameters produce generated fields

The generator SHALL expose supported primitive OpenAPI query parameters as dedicated n8n controls while retaining advanced additional query parameters as an escape hatch.

#### Scenario: Operation has a primitive query parameter

- **WHEN** an effective OpenAPI operation defines a string, integer, number, or boolean query parameter outside the specialized Filter, Order, and Include groups
- **THEN** the generated operation SHALL expose a dedicated field using the original wire parameter name during request serialization

#### Scenario: Query parameter has date-time format

- **WHEN** a string query parameter uses OpenAPI format `date-time`
- **THEN** the generated field SHALL accept a date-time value and serialize it without discarding its explicit UTC offset

#### Scenario: Query parameter defines allowed values

- **WHEN** a supported primitive query parameter defines an OpenAPI enum
- **THEN** the generated field SHALL expose the allowed values as options

#### Scenario: Query parameter is optional

- **WHEN** a dedicated ordinary query parameter is not required and the user leaves it unset
- **THEN** the generated request SHALL omit that query parameter

#### Scenario: Advanced value conflicts with dedicated field

- **WHEN** an advanced additional query parameter uses the same wire name as a dedicated ordinary query field
- **THEN** the advanced value SHALL continue to override the dedicated value

### Requirement: Supplement operation IDs remain workflow-stable

Generated operation selection SHALL continue using stable internal IDs independently of supplement ownership or visible unofficial status.

#### Scenario: Supplement is regenerated

- **WHEN** unchanged supplement contracts are regenerated
- **THEN** the generated operation option values SHALL remain unchanged

#### Scenario: Supplement is promoted

- **WHEN** a supplement is reconciled with a newly official operation
- **THEN** existing workflows SHALL continue selecting and dispatching the operation by the previously generated internal ID

## MODIFIED Requirements

### Requirement: Generated lookup behavior remains shared and deterministic

Lookup-enabled fields and source endpoints SHALL be inferred from validated effective product specifications through shared generator behavior.

#### Scenario: Lookup catalog is generated from effective OpenAPI data

- **WHEN** the generation command runs
- **THEN** lookup-enabled fields and lookup source endpoints SHALL be derived deterministically from the configured Planning Center vendor snapshots after validated supplements are applied

#### Scenario: Product-specific lookup code is not handwritten

- **WHEN** a Planning Center product node has lookup-enabled fields
- **THEN** the lookup behavior SHALL be produced by the shared generator and shared helpers without a hand-written dispatcher for that product

#### Scenario: Resource locator shape targets n8n workflow 2.16

- **WHEN** generated lookup-enabled fields are rendered
- **THEN** the generated properties and list-search methods SHALL compile against the `n8n-workflow@2.16.0` `resourceLocator`, `INodeParameterResourceLocator`, and `methods.listSearch` type contracts
