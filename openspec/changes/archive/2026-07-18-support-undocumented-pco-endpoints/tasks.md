## 1. Capture And Confirm Observed Contracts

- [x] 1.1 Create only the empty `openapi/people/supplements/get-person-activities/` and `openapi/webhooks/supplements/post-batch-update/` directories, adding a temporary tracked placeholder only if Git requires one
- [x] 1.2 **STOP IMPLEMENTATION:** Report the two directory paths to the user and do not create `.http`, response, metadata, OpenAPI, test, generated, documentation, or implementation files until the user confirms that both observed exchanges have been added
- [x] 1.3 After user confirmation, verify each directory contains the user-provided `request.http` and either a sanitized body-only `response.json` or an explicit bodyless-response observation, and verify the captures contain no credentials, real identifiers, or personal data
- [x] 1.4 Record the observed People activity resource types, pagination shape, ineffective `app` behavior, query optionality, response status, and content type from the captured exchange
- [x] 1.5 Record the Webhooks batch-update request attributes and relationships, required fields, response status, response shape, and content type from the captured exchange

## 2. Specify Supplement Packages With Tests

- [x] 2.1 Add failing generator tests for deterministic supplement discovery, complete single-operation OpenAPI additions, sidecar metadata validation, and duplicate route or operation ID rejection
- [x] 2.2 Add failing tests proving add-mode operations merge only when absent upstream and fail with an actionable method-and-path collision when the vendor snapshot adopts them
- [x] 2.3 Add failing tests for canonical dereferenced-operation fingerprints, valid operation-scoped JSON Merge Patches, fingerprint drift, and malformed override packages
- [x] 2.4 Add failing fixture-validation tests that exercise committed JSON response bodies and bodyless response observations against their maintained OpenAPI response contracts

## 3. Build The Effective Specification Loader

- [x] 3.1 Define supplement metadata and normalized operation-contract types, including add and override mode invariants, provenance, stability, route identity, and expected fingerprints
- [x] 3.2 Implement product-local package discovery and validation in deterministic lexical order without changing live snapshot refresh behavior
- [x] 3.3 Implement independent OpenAPI addition validation and dereferencing, normalized operation extraction, route collision checks, and operation ID uniqueness checks
- [x] 3.4 Implement canonical serialization, SHA-256 fingerprinting, and RFC 7396-style merge patch application for normalized override targets
- [x] 3.5 Refactor OpenAPI parsing to consume an already loaded effective specification and integrate the loader into normal generation and generation drift checking
- [x] 3.6 Verify products without supplements generate byte-for-byte equivalent node source before adding the initial endpoint packages

## 4. Generate Ordinary Typed Query Controls

- [x] 4.1 Add failing generator tests for ordinary string, integer, number, boolean, enum, and `date-time` query parameter fields, including required and optional behavior
- [x] 4.2 Extend the shared generated-operation model and OpenAPI parser to retain supported ordinary query schemas, descriptions, defaults, enums, requiredness, and original wire names
- [x] 4.3 Extend shared rendering and request construction to display and serialize dedicated ordinary query fields while omitting unset optional values
- [x] 4.4 Verify explicit date-time offsets are retained and Additional Query Parameters continue overriding dedicated fields with the same wire name
- [x] 4.5 Review generated drift across all official product operations and add regression coverage for any newly exposed ordinary query controls

## 5. Add Initial Unofficial Operations

- [x] 5.1 Author add-mode `openapi.json` and `metadata.json` files for `GET /people/{person_id}/activities` from the sanitized observed contract, with an explicit stable operation ID and unofficial provenance
- [x] 5.2 Add generated-node tests for People activity path construction, dedicated optional `before` and `after` fields, omission of ineffective `app`, pagination, JSON:API normalization, unofficial messaging, and stable selection ID
- [x] 5.3 Author add-mode `openapi.json` and `metadata.json` files for Webhooks `POST /batch_update` from the sanitized observed contract, with an explicit stable operation ID, one JSON:API `data` object, and one bodyless `204` response
- [x] 5.4 Extend shared JSON:API object body modeling only for reusable observed fields that existing standard mode cannot represent, retaining single-object raw JSON mode
- [x] 5.5 Add generated-node tests for batch-update wire path, non-empty create/update names, empty deletion names, required fields, raw JSON mode, bodyless response handling, unofficial messaging, and stable selection ID
- [x] 5.6 Regenerate the committed People and Webhooks nodes and verify the new activity list does not introduce incorrect lookup sources for unrelated ID fields

## 6. Document Safe Interactive Requests

- [x] 6.1 Ignore `.env` files inside supplement endpoint directories without weakening existing tracked-file coverage
- [x] 6.2 Add `humao.rest-client` to `.vscode/extensions.json` recommendations without adding a package dependency
- [x] 6.3 Add contributor guidance for the supplement directory contract, one reusable `.env` template using `PCO_API_URL`, `PCO_CLIENT_ID`, and `PCO_SECRET`, request execution, response-body saving, and mandatory sanitization
- [x] 6.4 Document add-versus-override ownership, collision and fingerprint failures, upstream promotion, and stable operation ID requirements

## 7. Verify Repository Integration

- [x] 7.1 Run `pnpm generate:check` and confirm all supplement inputs deterministically reproduce committed generated output
- [x] 7.2 Run `pnpm test` with supplement, fixture, generic query, endpoint execution, runtime, and metadata coverage passing
- [x] 7.3 Run `pnpm lint` and resolve generator, test, JSON, documentation, and generated-source issues
- [x] 7.4 Run `pnpm build` and `pnpm package:inspect` to verify compiled nodes and package contents remain valid
- [x] 7.5 Run `pnpm lint:n8n` as follow-up validation and record any intentional non-CI findings

  Follow-up result: the non-CI command reports the repository's known strict community-node findings (287 problems: 276 errors and 11 warnings), including generated `Function` construction and `any` types, missing `usableAsTool`, literal connection types, themed-icon guidance, strict Continue On Fail detection, and generator/test-only Node.js imports. The new effective-specification loader is generator-only and adds no runtime package dependency; these findings remain outside the repository CI contract documented in `README.md`.
