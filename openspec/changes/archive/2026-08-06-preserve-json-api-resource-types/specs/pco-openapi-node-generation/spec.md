## ADDED Requirements

### Requirement: Generated write operations preserve JSON:API resource types
The system SHALL build standard-mode JSON:API request bodies with the canonical `data.type` declared by the OpenAPI request schema, independently of user-facing resource labels.

#### Scenario: Canonical type differs from display label
- **WHEN** a generated create, update, or patch operation has a request schema whose `data.type` declares one canonical string value that differs from the formatted n8n resource label
- **THEN** the generated standard-mode request body SHALL send the exact schema value as `data.type`

#### Scenario: Resource label remains human-readable
- **WHEN** the generator preserves a canonical JSON:API request type for an operation
- **THEN** the generated n8n resource label SHALL remain human-readable and SHALL NOT be replaced by the wire-format type
