# pco-pat-authentication Specification

## Purpose
TBD - created by archiving change bootstrap-pco-n8n-node. Update Purpose after archive.
## Requirements
### Requirement: Personal Access Token credential
The system SHALL provide a Planning Center Personal Access Token credential type for authenticating API requests with a Planning Center application ID, secret, and base URL.

#### Scenario: User configures PAT credentials
- **WHEN** a user creates Planning Center PAT credentials in n8n
- **THEN** the credential SHALL collect the application ID, secret, and base URL needed for Planning Center API Basic authentication

#### Scenario: Credential base URL defaults to official API
- **WHEN** a user creates Planning Center PAT credentials
- **THEN** the Base URL field SHALL default to the API root `https://api.planningcenteronline.com` and remain overrideable to another API root

#### Scenario: Generated request builds product URL from API root
- **WHEN** a generated operation sends a Planning Center API request
- **THEN** the request URL SHALL append the product/version path to the configured API-root Base URL

#### Scenario: Credential test validates PAT access
- **WHEN** a user runs the n8n credential test for Planning Center PAT credentials
- **THEN** the test SHALL call `GET {baseUrl}/people/v2/me` and report whether the configured credentials can authenticate successfully

#### Scenario: Credential secrets are protected
- **WHEN** credentials are displayed or errors are emitted
- **THEN** the application secret SHALL NOT be included in node output, logs, or error messages created by the node package

### Requirement: Authenticated Planning Center requests
The system SHALL authenticate generated Planning Center API operations using the configured PAT credential through a shared request helper.

#### Scenario: Generated operation sends request
- **WHEN** a generated operation executes with valid PAT credentials
- **THEN** the request SHALL be sent to the Planning Center API using Basic authentication derived from the configured application ID and secret

#### Scenario: Generated execute method uses request helper
- **WHEN** a generated node operation runs
- **THEN** its generated `execute()` path SHALL call the shared Planning Center request helper rather than embedding endpoint-specific authentication behavior

#### Scenario: API error is returned
- **WHEN** Planning Center returns an API error
- **THEN** the node SHALL surface an actionable n8n error without exposing credential secret values

#### Scenario: Continue On Fail is enabled
- **WHEN** a generated operation fails for an input item and n8n Continue On Fail is enabled
- **THEN** the node SHALL return an item-level error object instead of stopping execution

#### Scenario: Continue On Fail is disabled
- **WHEN** a generated operation fails for an input item and n8n Continue On Fail is disabled
- **THEN** the node SHALL throw an actionable n8n error and stop execution

#### Scenario: Rate limit response is retried
- **WHEN** Planning Center returns HTTP 429 for a generated operation request
- **THEN** the shared request helper SHALL retry the request with up to five total attempts and respect `Retry-After` when present

#### Scenario: Transient server error is retried
- **WHEN** Planning Center returns a transient 5xx response for a generated operation request
- **THEN** the shared request helper SHALL retry the request with up to five total attempts using exponential backoff

### Requirement: OAuth extension boundary
The system SHALL isolate request authentication from generated operation definitions so a future OAuth credential can authenticate the same generated operations.

#### Scenario: Auth implementation changes later
- **WHEN** OAuth support is added in a later change
- **THEN** generated operation definitions SHALL NOT need endpoint-by-endpoint rewrites solely to switch authentication strategy

