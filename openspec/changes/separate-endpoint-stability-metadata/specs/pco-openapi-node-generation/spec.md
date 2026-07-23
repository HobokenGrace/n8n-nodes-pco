## ADDED Requirements

### Requirement: Generated operation stability metadata
The system SHALL represent endpoint stability separately from generated operation descriptions.

#### Scenario: Unofficial operation is generated
- **WHEN** a generated operation comes from an unofficial Planning Center supplement
- **THEN** the generated operation SHALL carry machine-readable unofficial stability metadata
- **AND** its generated user-facing description SHALL NOT include the full unofficial endpoint warning sentence

#### Scenario: Official operation is generated
- **WHEN** a generated operation has no unofficial supplement stability metadata
- **THEN** the generated operation SHALL carry official stability metadata or an equivalent official default
- **AND** its generated user-facing description SHALL continue to come from the OpenAPI description, summary, or route fallback

#### Scenario: Operation subtitle is rendered
- **WHEN** n8n renders the selected operation subtitle for an unofficial generated operation
- **THEN** the subtitle SHALL use the generated operation description without the full unofficial endpoint warning sentence

#### Scenario: Operation dropdown option is rendered
- **WHEN** n8n renders an unofficial generated operation in the operation dropdown
- **THEN** the option description SHALL remain focused on the operation description or route
- **AND** it SHALL NOT prepend the full unofficial endpoint warning sentence
