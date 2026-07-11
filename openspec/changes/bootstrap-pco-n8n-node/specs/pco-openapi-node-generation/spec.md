## ADDED Requirements

### Requirement: Product-specific node generation
The system SHALL generate n8n node definitions from Planning Center OpenAPI specs using one product-specific node per Planning Center product included in the generation configuration.

#### Scenario: Bootstrap products are generated
- **WHEN** the generation command runs with the People, Groups, and Giving OpenAPI specs configured
- **THEN** the package SHALL produce Planning Center People, Planning Center Groups, and Planning Center Giving nodes that expose operations derived from their respective specs

#### Scenario: Additional products are configured
- **WHEN** a contributor adds another Planning Center product spec to the generation configuration
- **THEN** the generation command SHALL produce a corresponding product-specific node without requiring a new hand-written dispatcher for that product

#### Scenario: Generated node contains execute path
- **WHEN** a product-specific node is generated
- **THEN** the node SHALL include generated `execute()` logic that dispatches selected operations through shared Planning Center helpers

### Requirement: Operation coverage tracks OpenAPI specs
The system SHALL expose generated operations for every technically mappable OpenAPI path and method, including deprecated operations, unless an operation cannot be safely represented by the generator.

#### Scenario: Spec operation is supported
- **WHEN** a Planning Center OpenAPI path and method can be mapped to n8n node properties
- **THEN** the generated product node SHALL include a callable operation for that path and method

#### Scenario: Deprecated operation is technically mappable
- **WHEN** a deprecated OpenAPI operation can be mapped to n8n node properties
- **THEN** the generated product node SHALL include a callable operation for that path and method and mark the operation as deprecated in its generated label or description

#### Scenario: Operation is excluded
- **WHEN** an OpenAPI operation is excluded because it cannot be safely represented by the generator
- **THEN** the exclusion SHALL be recorded in generation configuration or generator tests with the reason

### Requirement: Generated operation usability
The system SHALL post-process generated properties enough to satisfy n8n community-node requirements and provide usable operation/resource labels.

#### Scenario: Generated resource uses OpenAPI tag
- **WHEN** an OpenAPI operation includes a usable tag
- **THEN** the generated operation SHALL be grouped under a resource derived from the OpenAPI tag

#### Scenario: Generated resource falls back to path
- **WHEN** an OpenAPI operation does not include a usable tag
- **THEN** the generated operation SHALL be grouped under a deterministic path-derived resource

#### Scenario: Generated operation has friendly label
- **WHEN** an OpenAPI operation includes an `operationId` or summary
- **THEN** the generated operation SHALL use a friendly action label derived from that value instead of exposing raw HTTP method and path text

#### Scenario: Generated operation falls back to HTTP path label
- **WHEN** an OpenAPI operation does not include enough information to derive a friendly action label
- **THEN** the generated operation SHALL use a deterministic HTTP method and path fallback label

#### Scenario: Generated node is linted
- **WHEN** generated node files are checked by n8n community-node linting
- **THEN** generated metadata and properties SHALL satisfy the project's lint rules or document intentional exceptions in configuration

#### Scenario: Generated fields include optional parameters
- **WHEN** an OpenAPI operation has optional query or body fields
- **THEN** generated node properties SHALL leave optional fields empty and omit them from requests unless the user explicitly sets values

#### Scenario: Generated operation includes extra query parameters
- **WHEN** a user needs to send query parameters not modeled by the OpenAPI snapshot
- **THEN** the generated operation SHALL provide an advanced key/value additional query parameters collection

#### Scenario: Generated update operation sends explicit fields only
- **WHEN** a generated update or PATCH operation is configured in standard mode
- **THEN** the request body SHALL include only attributes and relationships explicitly set by the user

#### Scenario: Generated write operation uses attribute fields
- **WHEN** a generated create or update operation is configured in standard mode
- **THEN** the operation SHALL expose generated user-facing fields for top-level JSON:API attributes and build the Planning Center request body internally

#### Scenario: Generated write operation enforces required fields
- **WHEN** an OpenAPI request schema marks a standard-mode field as required
- **THEN** the generated n8n field SHALL be marked required where n8n field types support it

#### Scenario: Generated write operation includes detectable relationship IDs
- **WHEN** a generated create or update operation has detectable JSON:API relationships in the OpenAPI schema
- **THEN** standard mode SHALL expose simple relationship ID fields and build the corresponding JSON:API relationships payload internally

#### Scenario: Generated write operation includes to-many relationship IDs
- **WHEN** a generated standard-mode relationship field represents a to-many JSON:API relationship
- **THEN** the field SHALL accept comma-separated IDs and build a JSON:API relationship array internally

#### Scenario: Read-only fields are excluded from write inputs
- **WHEN** an OpenAPI schema marks a field as `readOnly`
- **THEN** generated standard write inputs SHALL NOT expose that field as a writable request parameter

#### Scenario: Write-only fields are excluded from normal output
- **WHEN** an OpenAPI schema marks a field as `writeOnly`
- **THEN** generated output normalization SHALL NOT expose that field as a normal output field

#### Scenario: Generated write operation uses raw body mode
- **WHEN** a generated create or update operation is configured in advanced raw JSON mode
- **THEN** the operation SHALL send the user-provided JSON body through the shared request helper without requiring generated attribute fields for that payload

#### Scenario: Generated list operation supports pagination controls
- **WHEN** an OpenAPI operation represents a paginated list endpoint
- **THEN** the generated operation SHALL expose `Return All` and `Limit` controls, where `Return All` follows pagination and `Limit` caps returned records when `Return All` is disabled

#### Scenario: Generated operation normalizes JSON:API output
- **WHEN** a generated operation receives a Planning Center JSON:API resource response
- **THEN** the output SHALL contain one n8n item per resource with top-level `id`, `type`, flattened attribute fields, and preserved `relationships`, `links`, and `meta` keys

#### Scenario: Flattened attribute collides with reserved key
- **WHEN** a JSON:API resource attribute name collides with reserved output keys `id`, `type`, `relationships`, `links`, or `meta`
- **THEN** the reserved key SHALL be preserved and the colliding attribute SHALL be emitted as `attribute_<name>`
