## ADDED Requirements

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
