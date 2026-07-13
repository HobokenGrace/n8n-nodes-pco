## MODIFIED Requirements

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
- **THEN** the generated operation SHALL use a title-cased label derived from that metadata value

#### Scenario: Generated operation falls back to method and target label
- **WHEN** an OpenAPI operation includes neither `operationId` nor summary
- **THEN** the generated operation SHALL use a deterministic action-and-target label derived from the HTTP method and path, without exposing raw path parameters in the label

#### Scenario: Generated list operation label
- **WHEN** a generated OpenAPI operation is a GET collection endpoint
- **THEN** the generated operation label SHALL use the `List` action with the collection target derived from the final static path segment

#### Scenario: Generated item operation label
- **WHEN** a generated OpenAPI operation targets a single resource item by path parameter
- **THEN** the generated operation label SHALL use `Get`, `Update`, or `Delete` with the singular item target derived from the related static path segment

#### Scenario: Generated item operation singularizes plural nouns cleanly
- **WHEN** a generated item operation derives its fallback target from a plural English noun such as `campuses`
- **THEN** the generated operation label SHALL use the correctly singularized noun, such as `Campus`, instead of emitting a truncated non-word

#### Scenario: Generated create operation label
- **WHEN** a generated OpenAPI operation creates a resource through a POST collection endpoint
- **THEN** the generated operation label SHALL use the `Create` action with the target derived from the collection path segment

#### Scenario: Generated node is linted
- **WHEN** generated node files are checked by n8n community-node linting
- **THEN** generated metadata and properties SHALL satisfy the project's lint rules with zero intentional lint exceptions

#### Scenario: Generated fields include optional parameters
- **WHEN** an OpenAPI operation has optional query or body fields
- **THEN** generated node properties SHALL leave optional fields empty and omit them from requests unless the user explicitly sets values

#### Scenario: Generated operation includes extra query parameters
- **WHEN** a user needs to send query parameters not modeled by the OpenAPI snapshot
- **THEN** the generated operation SHALL provide an advanced key/value additional query parameters collection

#### Scenario: Additional query parameter conflicts with generated field
- **WHEN** a generated operation has both a generated query field value and an advanced additional query parameter with the same key
- **THEN** the advanced additional query parameter value SHALL override the generated query field value

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
- **WHEN** a generated create or update operation has JSON:API relationships in the OpenAPI schema with `relationships.*.data` containing `type` and `id` object shapes
- **THEN** standard mode SHALL expose simple relationship ID fields and build the corresponding JSON:API relationships payload internally

#### Scenario: Generated write operation includes to-many relationship IDs
- **WHEN** a generated standard-mode relationship field represents a JSON:API relationship whose `relationships.*.data` schema is an array of `type` and `id` object shapes
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
- **THEN** the generated operation SHALL expose `Return All` and `Limit` controls, default `Return All` to `false`, default `Limit` to `100`, follow pagination when `Return All` is enabled, and cap returned records by `Limit` when `Return All` is disabled

#### Scenario: Generated operation normalizes JSON:API output
- **WHEN** a generated operation receives a Planning Center JSON:API resource response
- **THEN** the output SHALL contain one n8n item per resource with top-level `id`, `type`, flattened attribute fields, and preserved `relationships`, `links`, and `meta` keys

#### Scenario: Flattened attribute collides with reserved key
- **WHEN** a JSON:API resource attribute name collides with reserved output keys `id`, `type`, `relationships`, `links`, or `meta`
- **THEN** the reserved key SHALL be preserved and the colliding attribute SHALL be emitted as `attribute_<name>`
