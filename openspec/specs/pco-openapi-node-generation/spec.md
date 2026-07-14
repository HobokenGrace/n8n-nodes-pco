# pco-openapi-node-generation Specification

## Purpose
TBD - created by archiving change bootstrap-pco-n8n-node. Update Purpose after archive.
## Requirements
### Requirement: Product-specific node generation
The system SHALL generate n8n node definitions from Planning Center OpenAPI specs using one product-specific node per Planning Center product included in the generation configuration.

#### Scenario: All OpenAPI-backed products are generated
- **WHEN** the generation command runs with Planning Center API, Calendar, Check-Ins, Current, Giving, Groups, People, Publishing, Registrations, Services, and Webhooks OpenAPI specs configured for generation
- **THEN** the package SHALL produce Planning Center API, Planning Center Calendar, Planning Center Check-Ins, Planning Center Current, Planning Center Giving, Planning Center Groups, Planning Center People, Planning Center Publishing, Planning Center Registrations, Planning Center Services, and Planning Center Webhooks nodes that expose operations derived from their respective specs

#### Scenario: Additional products are configured
- **WHEN** a contributor adds another Planning Center product spec to the generation configuration
- **THEN** the generation command SHALL produce a corresponding product-specific node without requiring a new hand-written dispatcher for that product

#### Scenario: Generated node contains execute path
- **WHEN** a product-specific node is generated
- **THEN** the node SHALL include generated `execute()` logic that dispatches selected operations through shared Planning Center helpers

### Requirement: Operation coverage tracks OpenAPI specs
The system SHALL expose generated operations for every technically mappable OpenAPI path and method, including DELETE and deprecated operations, unless an operation cannot be safely represented by the generator.

#### Scenario: Spec operation is supported
- **WHEN** a Planning Center OpenAPI path and method can be mapped to n8n node properties
- **THEN** the generated product node SHALL include a callable operation for that path and method

#### Scenario: Deprecated operation is technically mappable
- **WHEN** a deprecated OpenAPI operation can be mapped to n8n node properties
- **THEN** the generated product node SHALL include a callable operation for that path and method and mark the operation as deprecated in its generated label or description

#### Scenario: DELETE operation is technically mappable
- **WHEN** a DELETE OpenAPI operation can be mapped to n8n node properties
- **THEN** the generated product node SHALL include a callable operation with clear destructive labeling or description text

#### Scenario: Operation is excluded
- **WHEN** an OpenAPI operation is excluded because it cannot be safely represented by the generator
- **THEN** the exclusion SHALL be recorded in generation configuration or generator tests with the reason

#### Scenario: Operation has complex request body
- **WHEN** an OpenAPI create, update, or patch operation has a request body that cannot be modeled into standard generated fields but can be sent as JSON
- **THEN** the generated operation SHALL remain callable through advanced raw JSON body mode rather than being excluded solely because standard fields cannot represent the body

### Requirement: Generated operation usability
The system SHALL post-process generated properties enough to satisfy n8n community-node requirements and provide usable, distinguishable operation/resource labels.

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

#### Scenario: Nested relationship operation label includes context
- **WHEN** a fallback-labeled OpenAPI operation targets a nested relationship path such as `/people/{person_id}/workflow_cards/{workflow_card_id}/person/{person_id}`
- **THEN** the generated operation label SHALL append the nearest path-derived relationship context using the format `<Action> <Target> (via <Context>)`, such as `Get Person (via Workflow Card)`

#### Scenario: Direct operation label remains unsuffixed
- **WHEN** a fallback-labeled OpenAPI operation targets a direct route such as `/people/{person_id}`
- **THEN** the generated operation label SHALL remain an unsuffixed action-and-target label such as `Get Person`

#### Scenario: Self-nesting operation label uses path context
- **WHEN** a fallback-labeled OpenAPI operation targets a self-nesting relationship path such as `/folders/{folder_id}/folders/{folder_id}`
- **THEN** the generated operation label SHALL append the repeated path context, such as `Get Folder (via Folder)`

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

### Requirement: Generated product nodes are package-registered
The system SHALL register every generated Planning Center product node with the n8n package metadata and package entry point.

#### Scenario: Generated node appears in n8n package metadata
- **WHEN** a Planning Center product is included in generated product configuration
- **THEN** `package.json` SHALL include the built generated node path for that product in the n8n node registration list

#### Scenario: Generated node is exported from the package entry point
- **WHEN** a Planning Center product is included in generated product configuration
- **THEN** the package entry point SHALL export that product's generated node class

#### Scenario: Package metadata tracks generated products
- **WHEN** generated product configuration changes
- **THEN** tests SHALL fail if package metadata or entry-point exports omit any generated product node

### Requirement: Generated query option groups
The system SHALL render generated Filter, Order, and Include query controls as separate multi-selection parameter groups for each operation that exposes those query options.

#### Scenario: Operation has filter query options
- **WHEN** a generated operation exposes one or more supported `where[...]` query options
- **THEN** the generated node SHALL expose those options in a Filter parameter group with the placeholder `Filter by`
- **AND** the Filter group SHALL allow multiple selected filter entries

#### Scenario: Operation has order query options
- **WHEN** a generated operation exposes an `order` query option
- **THEN** the generated node SHALL expose ordering values in an Order parameter group with the placeholder `Order by`
- **AND** the Order group SHALL allow multiple selected order entries

#### Scenario: Operation has include query options
- **WHEN** a generated operation exposes an `include` query option
- **THEN** the generated node SHALL expose include values in an Include parameter group with the placeholder `Include data`
- **AND** the Include group SHALL allow multiple selected include entries

#### Scenario: Selected query option groups are executed
- **WHEN** a user runs a generated operation with selected Filter, Order, or Include entries
- **THEN** the generated node SHALL serialize those selections to the original Planning Center query parameter names and values

#### Scenario: Operation lacks a query option group
- **WHEN** a generated operation has no supported query options for a Filter, Order, or Include group
- **THEN** the generated node SHALL NOT render an empty parameter group for that missing query option type

