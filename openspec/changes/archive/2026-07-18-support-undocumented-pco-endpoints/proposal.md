## Why

Planning Center exposes useful API operations that are absent from, or incompletely represented by, its published OpenAPI snapshots. Hand-editing vendor snapshots or generated nodes would lose provenance, be overwritten by refreshes, and make upstream drift difficult to detect, so the repository needs a maintainable supplementary contract source.

## What Changes

- Introduce repository-owned, per-operation OpenAPI 3.1 supplements alongside each product's dated vendor snapshot, with explicit add or override semantics.
- Validate supplements deterministically and fail generation when an addition begins colliding with an upstream operation or an override's fingerprint no longer matches its expected upstream contract.
- Preserve stable generated operation IDs when a locally maintained endpoint is later adopted from an official snapshot.
- Require unofficial operations to carry visible stability messaging, provenance metadata, and sanitized observed response evidence.
- Add directly executable REST Client `request.http` examples, documented ignored `.env` credentials, body-only `response.json` fixtures when responses have content, explicit metadata for bodyless responses, and a repository recommendation for `humao.rest-client`.
- Add first-class support for `GET /people/{person_id}/activities`, including optional typed `before` and `after` query controls.
- Add first-class support for `POST /batch_update` in the Webhooks product using its observed single-resource JSON:API request contract.
- Expand shared generation where needed so ordinary typed OpenAPI query parameters and reusable JSON:API object request shapes produce first-class n8n controls rather than endpoint-specific dispatch code.

## Capabilities

### New Capabilities

- `pco-api-supplements`: Defines repository-owned supplementary API contracts, strict merge and drift behavior, provenance and fixture requirements, executable REST Client examples, and the initial People activity and Webhooks batch-update contracts.

### Modified Capabilities

- `pco-openapi-node-generation`: Generated product nodes consume the validated combination of vendor snapshots and supplements, expose supported ordinary typed query parameters, mark unofficial operations, and retain stable operation IDs through upstream adoption.

## Impact

- Affects `openapi/<product>/`, generator configuration and parsing under `src/generator/`, committed generated People and Webhooks nodes, generator and metadata tests, `.gitignore`, VS Code workspace recommendations, and contributor documentation.
- Adds committed API contract and sanitized observed evidence but does not change live snapshot refresh inputs or require network access during generation.
- Does not add a product-specific runtime dispatcher; supported operations continue using the shared request, pagination, JSON:API normalization, retry, and Continue On Fail behavior.
