## ADDED Requirements

### Requirement: User-facing identifier labels use ID capitalization
The generator SHALL render user-facing n8n labels with the identifier acronym capitalized as `ID` or `IDs` whenever the label contains an identifier term.

#### Scenario: Singular identifier label is rendered
- **WHEN** a generated display label is derived from an identifier field such as `person_id`
- **THEN** the label uses `Person ID`

#### Scenario: Plural identifier label is rendered
- **WHEN** a generated display label is derived from a plural identifier field such as `campus_ids`
- **THEN** the label uses `Campus IDs`

### Requirement: Machine-readable identifiers remain unchanged
The system MUST NOT change API field names, internal property names, operation IDs, or request/response payload keys when normalizing user-facing label capitalization.

#### Scenario: Identifier field has display and machine-readable names
- **WHEN** a generated field has a display label containing `ID`
- **THEN** its internal `name` value and API mapping remain unchanged

### Requirement: Generated artifacts avoid mixed-case identifier labels
Generated node description artifacts SHALL NOT contain user-facing display labels where a whole identifier acronym token uses mixed-case capitalization.

#### Scenario: Generated node files are inspected
- **WHEN** generated node files are produced from the Planning Center OpenAPI snapshots
- **THEN** display labels contain `ID` or `IDs` for identifier terms and do not contain mixed-case identifier acronym tokens
