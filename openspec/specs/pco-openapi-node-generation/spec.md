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

### Requirement: Generated single-ID fields use searchable resource locators
The system SHALL render generated single-ID path parameters, single-ID query filters, writable single-ID attribute fields, and single-ID relationship fields as search-capable n8n resource locator controls when a compatible Planning Center lookup endpoint can be inferred.

A compatible lookup endpoint SHALL be a same-product generated list operation whose response resource target matches the ID field target and whose required path parameters can be satisfied from the generated operation that owns the lookup-enabled field. Root list endpoints with no path parameters SHALL qualify when their target matches. Nested list endpoints SHALL qualify only when every required lookup-source path parameter exists on the same generated operation.

Generated resource locator controls SHALL provide exactly two modes for this change: a searchable List mode backed by a generated `methods.listSearch` method and a manual ID string mode. URL mode SHALL NOT be generated by this change.

#### Scenario: Group Type path parameter has lookup control
- **WHEN** the generator processes the Groups operation `GET /group_types/{group_type_id}/groups`
- **THEN** the generated `Group Type ID` field SHALL use a resource locator backed by the compatible `GET /group_types` lookup endpoint

#### Scenario: Single-ID query filter has lookup control
- **WHEN** a generated query filter represents a single resource ID and a compatible lookup endpoint can be inferred
- **THEN** the generated query filter value field SHALL use a resource locator for that resource ID

#### Scenario: Self-ID query filter has lookup control
- **WHEN** a generated query filter uses `where[id]` and the operation's own resource has a compatible lookup endpoint
- **THEN** the generated query filter value field SHALL use a resource locator for that resource ID

#### Scenario: Writable ID attribute has lookup control
- **WHEN** a generated standard-mode writable attribute field ends in `_id` and a compatible lookup endpoint can be inferred for the singularized attribute target
- **THEN** the generated attribute field SHALL use a resource locator for that attribute ID

#### Scenario: Single-ID relationship field has lookup control
- **WHEN** a generated standard-mode relationship field represents a single JSON:API relationship ID and a compatible lookup endpoint can be inferred
- **THEN** the generated relationship field SHALL use a resource locator for that related resource ID

#### Scenario: Lookup cannot be inferred
- **WHEN** a generated single-ID field does not have a confidently inferred compatible lookup endpoint
- **THEN** the generated node SHALL preserve manual ID or expression entry for that field without generating an incorrect lookup

#### Scenario: Nested lookup uses same-operation parent IDs
- **WHEN** a compatible nested lookup endpoint requires parent path parameters and those parent fields exist on the same generated operation as the lookup-enabled field
- **THEN** the generated lookup method SHALL extract those parent IDs from the same operation's current parameter values and use them to build the nested lookup request path

#### Scenario: Nested lookup parent value is unavailable
- **WHEN** a nested lookup source requires a parent ID and the same-operation parent value is not set at lookup time
- **THEN** the generated lookup method SHALL return no lookup results without guessing a broader endpoint

#### Scenario: Multi-ID attributes remain manual
- **WHEN** a generated writable attribute field ends in `_ids` or otherwise represents multiple IDs
- **THEN** the generated field SHALL remain manual or use its existing primitive representation and SHALL NOT be converted to a single-resource locator by this change

### Requirement: Generated resource locators preserve ID-based execution
The system SHALL execute lookup-enabled fields using the selected or manually provided Planning Center resource ID.

#### Scenario: Selected lookup value is used in path
- **WHEN** a user selects `Small Groups (12345)` for a lookup-enabled path parameter
- **THEN** the generated operation SHALL use `12345` as the encoded path parameter value

#### Scenario: Manual ID value is used in query
- **WHEN** a user enters a manual ID for a lookup-enabled query filter
- **THEN** the generated operation SHALL send that ID as the original Planning Center query parameter value

#### Scenario: Expression value is preserved
- **WHEN** a lookup-enabled field is configured with an n8n expression that resolves to an ID
- **THEN** the generated operation SHALL use the resolved ID value without requiring a dropdown selection

#### Scenario: Selected lookup value is used in attribute body
- **WHEN** a user selects a resource for a lookup-enabled writable `_id` attribute field in standard body mode
- **THEN** the generated operation SHALL build the JSON:API attributes payload with the selected resource ID

#### Scenario: Selected lookup value is used in relationship body
- **WHEN** a user selects a resource for a lookup-enabled single-ID relationship field in standard body mode
- **THEN** the generated operation SHALL build the JSON:API relationship payload with the selected resource ID

### Requirement: Generated lookup result lists are bounded and readable
The system SHALL limit generated lookup result lists to 25 records per request and SHALL label each lookup option with a display name plus its Planning Center ID.

#### Scenario: Initial lookup results are limited
- **WHEN** n8n requests initial options for a generated Planning Center resource locator
- **THEN** the generated lookup method SHALL request no more than 25 Planning Center records for that lookup response

#### Scenario: Server-side search is available
- **WHEN** n8n searches a generated Planning Center resource locator and the lookup endpoint exposes one or more safe server-side search filters
- **THEN** the generated lookup method SHALL send the search term using the first available filter in this priority order: `where[search_name]`, `where[name]`, `where[search_name_or_email]`, `where[search_name_or_email_or_phone_number]`, `where[title]`, `where[subject]`, `where[label]`, and limit the response to 25 records

#### Scenario: Split-name person search is available
- **WHEN** n8n searches a generated Planning Center resource locator for a person-like lookup endpoint that does not expose a combined safe search filter but does expose `where[first_name]` and `where[last_name]`
- **THEN** the generated lookup method SHALL issue at most one bounded first-name request and one bounded last-name request, deduplicate returned records by Planning Center ID, and return at most 25 merged lookup options

#### Scenario: Multi-word split-name search is available
- **WHEN** n8n searches a split-name person lookup with multiple words
- **THEN** the generated lookup method SHALL use the first word for the first-name request and the last word for the last-name request rather than sending the full search term to both filters

#### Scenario: Server-side search is unavailable
- **WHEN** n8n searches a generated Planning Center resource locator and no safe server-side search filter is known for that lookup endpoint
- **THEN** the generated lookup method SHALL return the first 25 list results without guessing unsupported Planning Center filters

#### Scenario: Lookup label includes ID
- **WHEN** a lookup result includes `id` and `attributes.name`
- **THEN** the generated lookup option label SHALL be formatted as `<attributes.name> (<id>)`

#### Scenario: Lookup label uses split person name
- **WHEN** a lookup result includes `id`, `attributes.first_name`, and `attributes.last_name` but does not include a higher-priority display-name attribute
- **THEN** the generated lookup option label SHALL be formatted as `<attributes.first_name> <attributes.last_name> (<id>)`

#### Scenario: Lookup label falls back when name is missing
- **WHEN** a lookup result does not include `attributes.name`
- **THEN** the generated lookup option label SHALL use another known safe human-readable label when available, including `full_name`, `display_name`, `search_name`, `path_name`, `first_name` plus `last_name`, `given_name` plus `last_name`, `nickname` plus `last_name`, `title`, `subject`, or `label`, and otherwise fall back to the resource ID

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

### Requirement: Generated to-many relationship ID fields remain manual for this change
The system SHALL keep generated to-many relationship ID fields as manual comma-separated ID inputs until a future multi-ID lookup UX is designed.

#### Scenario: To-many relationship field remains comma-separated
- **WHEN** a generated standard-mode relationship field represents an array of JSON:API relationship IDs
- **THEN** the generated field SHALL continue to accept comma-separated IDs and SHALL NOT be converted to a single-resource locator by this change

#### Scenario: Future multi-ID lookup is not blocked
- **WHEN** a future change designs searchable multi-ID selection
- **THEN** the current single-ID resource locator behavior SHALL NOT require removing manual comma-separated support before that enhancement can be added

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

