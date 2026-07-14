## MODIFIED Requirements

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

## ADDED Requirements

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
