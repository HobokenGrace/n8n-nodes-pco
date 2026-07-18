## Context

The generator currently reads one dated vendor OpenAPI 3.1 snapshot per Planning Center product, dereferences it, converts every supported operation into a shared intermediate model, and renders committed product nodes. Snapshot refresh replaces the configured dated file, generated source is deterministic, and CI rejects generated drift. Neither vendor snapshots nor generated files are safe ownership boundaries for undocumented operations.

The first supplements exercise two different reusable shapes: a paginated People JSON:API collection with ordinary query parameters, and a Webhooks JSON:API mutation whose endpoint name suggests batching but whose observed request updates one webhook through one `data` object. The maintained contracts must remain offline, reviewable, visibly unofficial, executable by contributors, and compatible with saved n8n operation IDs.

## Goals / Non-Goals

**Goals:**

- Preserve dated vendor snapshots as unmodified upstream inputs.
- Maintain a growing, product-local catalog of additions and targeted corrections.
- Detect upstream adoption or drift instead of silently choosing local or vendor behavior.
- Feed supplements through the shared parser, lookup inference, renderer, and runtime.
- Make every unofficial contract traceable to a sanitized, reproducible observed exchange.
- Preserve stored n8n operation IDs when an endpoint moves from unofficial to official ownership.
- Add reusable first-class rendering for supported ordinary query parameters and JSON:API object bodies.

**Non-Goals:**

- Discover undocumented endpoints automatically or make live API calls during generation.
- Guarantee stability of Planning Center behavior that Planning Center does not document.
- Hand-write People- or Webhooks-specific execution dispatchers.
- Build a fully general OpenAPI renderer for arbitrary nested schemas, callbacks, or non-JSON payloads.
- Commit credentials, real Planning Center identifiers, or unsanitized personal data.
- Make VS Code or REST Client mandatory for building or contributing.

## Decisions

### Store one product-local package per HTTP operation

Supplement packages will use HTTP-oriented names and live beside the relevant product snapshot:

```text
openapi/<product>/supplements/<method>-<route-name>/
  metadata.json
  openapi.json | patch.json
  request.http
  response.json  # only when the observed response has a JSON body
```

The initial directories will be `get-person-activities` and `post-batch-update`. Product locality makes ownership discoverable while the `supplements` boundary prevents refresh code from treating repository-owned files as dated vendor snapshots. Multiple observed payload variants for one method and path remain named examples in one `request.http`; splitting them into packages would create ambiguous duplicate ownership. A flat global overlay was rejected because it would create broad, conflict-prone diffs as the catalog grows. Test-only fixtures were rejected because the observed exchange is part of the maintained API contract rather than incidental test setup.

### Use portable OpenAPI additions and operation-scoped override patches

An add-mode package will contain a complete OpenAPI 3.1 `openapi.json` document with exactly one path and method operation. It may define local components and references, and it will use the same snapshot-relative path convention as the product's vendor document. The supplement will be validated and dereferenced independently before its normalized path item and operation are introduced into the effective specification, avoiding component-name collisions with the vendor snapshot.

An override-mode package will contain `patch.json` as an RFC 7396-style JSON Merge Patch over one normalized OpenAPI operation contract. The normalized contract includes the dereferenced Operation Object and inherited path-level parameters. Arrays are replaced as units. Supporting arbitrary JSONPath actions or a full OpenAPI Overlay implementation was rejected because each package targets exactly one known method and path; the additional selector and dependency complexity would not improve this use case.

Exactly one supplement may own a method and path. An override targets the configured vendor operation, not another supplement; corrections to an add-mode contract are made directly in its `openapi.json`.

### Keep repository semantics in sidecar metadata

`metadata.json` will identify the mode, method, snapshot-relative path, stability, provenance, observed response status, content type or its absence, body presence, and, for overrides, the expected upstream fingerprint. Stable operation IDs remain in the OpenAPI operation because they are part of the generated interface. Repository-only ownership and lifecycle semantics remain outside the portable OpenAPI document.

Initial add-mode metadata will mark operations unofficial and record that their contracts were observed. If an endpoint becomes official, maintainers may retire the package when the official operation is interface-compatible or convert it to an official override that preserves the existing operation ID and any reviewed compatibility differences.

### Fail on additions that become official and overrides that drift

The loader will discover packages in deterministic lexical order and validate all packages before rendering output.

For add mode, the method and path must be absent from the configured vendor snapshot. A collision fails generation and instructs the maintainer to compare contracts. The vendor definition never wins silently, and the local definition never masks it silently.

For override mode, the loader will dereference and normalize the upstream operation, serialize it canonically by recursively sorting object keys while preserving array order, and compute SHA-256. A mismatch with the stored fingerprint fails before applying the patch. Hashing the dereferenced normalized operation catches changes in referenced schemas as well as inline fields. The strict hash may require review after harmless upstream changes, but this is preferable to applying a stale correction silently.

### Build one effective specification before shared generation

The source flow will become:

```text
dated vendor snapshot
        │
        ├── dereference and normalize
        │
supplement packages ── validate assertions and evidence
        │
        └── add operations or apply verified patches
                         │
                         ▼
             effective product specification
                         │
              existing shared operation parser
                         │
             lookup inference and node rendering
```

The parser should accept an already loaded effective document rather than assuming that its only input is a snapshot path. Snapshot refresh remains unchanged and continues writing only configured dated files. Generation checking uses the same effective-document loader as normal generation so supplements cannot bypass drift detection.

### Preserve operation IDs across ownership transitions

Every added operation will define an explicit operation ID rather than relying on a path-derived fallback. The loader will validate operation ID uniqueness within each effective product specification. When Planning Center later publishes the route under another operation ID, generation first fails due to the add collision. Reconciliation must retain the previously shipped ID, either by confirming the official ID already matches or by applying a fingerprinted override to the official operation. This protects saved n8n workflows from ownership changes that users cannot observe or control.

### Mark unofficial operations through generated descriptions

The supplement metadata stability value will be injected into the normalized operation description before shared parsing. Unofficial operations remain grouped with the same product resources and receive the same controls as official operations, but their n8n descriptions warn that Planning Center does not document the endpoint and may change it without notice. A separate experimental resource was rejected because it would make otherwise first-class operations harder to discover and could destabilize resource grouping.

### Generalize supported ordinary query parameters

The generated model will represent ordinary primitive query parameters in addition to existing specialized Filter, Order, and Include groups. Supported string, integer, number, boolean, enum, and `date-time` schemas will render as dedicated operation fields. Requiredness, defaults, descriptions, enum options, and original wire names will be preserved. Optional unset fields will be omitted, and Additional Query Parameters will retain override precedence.

This behavior will be shared rather than encoded as People-specific annotations. Existing snapshots must be audited through generated diffs because exposing previously ignored ordinary parameters can intentionally add controls to official operations. Unsupported arrays or object-valued query parameters remain available through Additional Query Parameters.

### Reuse JSON:API object body generation for batch update

The Webhooks contract will describe one JSON:API `data` object, not an array. Existing standard body generation will be extended only if the observed fixture reveals reusable scalar attribute or simple relationship shapes it cannot currently model. Raw JSON remains available as an advanced single-object escape hatch. Arbitrary recursive form generation is outside scope.

### Treat REST Client files as executable evidence

Each `request.http` will contain the complete product-version wire URL, use `{{$dotenv ...}}` variables for `PCO_API_URL`, `PCO_CLIENT_ID`, and `PCO_SECRET`, and use Basic authentication supported by `humao.rest-client`. Account-specific resource IDs will use prompt variables. Non-sensitive People activity dates will be editable file variables. Mutation requests will use REST Client's per-request confirmation note and an explicit live-account warning.

REST Client resolves dotenv variables from a `.env` beside the `.http` file, so each executable package uses an ignored local `.env`. Rather than duplicate `.env.example` files, contributor documentation will provide one template to copy into whichever endpoint directory is being investigated. `.vscode/extensions.json` will recommend `humao.rest-client`; no build or package dependency will be added.

When an observed response has a non-empty JSON body, `response.json` will contain only that sanitized body so REST Client's Save Response Body action can produce the initial file and tests can consume it directly. A bodyless response will omit `response.json`; metadata will preserve its observed status, absent content type, and bodyless shape without inventing a JSON payload. Saving a response is not equivalent to approving it: credentials, identifiers, and personal data must be sanitized before commit.

The observed Webhooks batch-update exchange contains two payload variants for the same `POST /batch_update` operation. A non-empty `names` array creates or updates subscriptions, while an empty `names` array removes them. Both return `204 No Content`, so the package keeps both requests in one `request.http` and has no `response.json`.

The sanitized People activity capture returns status `200` with content type `application/vnd.api+json` and a JSON:API collection of `PersonProfileChange` resources with `FieldDatum` section entries and an `editor_person` relationship. Pagination evidence consists of `meta.count`, `meta.total_count`, `meta.parent`, and `links.self`; the observed page has no next link. `before` and `after` are independently optional `date-time` queries. Testing found that the API ignores `app`, so the maintained contract omits that ineffective parameter rather than exposing a control that does not affect the response.

The sanitized Webhooks capture has no relationships and uses `data.attributes.url`, `data.attributes.names`, and, for the non-empty create/update variant, `data.attributes.old_url`. `url` and `names` occur in both successful variants; `old_url` is omitted by the successful deletion variant. Both observed variants return status `204`, no body, and no content type.

### Verify contracts and generated behavior at separate boundaries

Supplement tests will cover package validation, deterministic discovery, add collisions, override fingerprints, merge behavior, and malformed evidence. Generator tests will cover ordinary query rendering and serialization, unofficial descriptions, explicit stable IDs, People pagination, and the Webhooks single-object body. Sanitized fixture tests will verify that committed examples conform to the maintained OpenAPI contracts where practical. Existing generation drift, runtime, lint, build, and package inspection checks remain the final integration gates.

## Risks / Trade-offs

- [Undocumented behavior changes without notice] -> Mark operations unofficial, keep observed fixtures and verification dates, and allow normal runtime errors rather than claiming vendor stability.
- [Strict fingerprints fail after harmless upstream edits] -> Make the failure identify the route and require an explicit fingerprint review; safety is favored over silent patch application.
- [Generic query rendering causes broad generated diffs] -> Audit generated changes and add focused generator coverage before accepting newly exposed official parameters.
- [New list operations affect lookup inference] -> Test the effective lookup catalog and verify no unrelated ID field selects an incorrect activity lookup.
- [Captured responses expose secrets or personal data] -> Ignore local credentials, prompt for IDs, document sanitization, require committed JSON fixtures to contain only reviewed bodies, and represent bodyless outcomes only through metadata.
- [Per-endpoint `.env` files duplicate local configuration] -> Keep only three shared variables and document one template; avoid cross-platform symlink conventions.
- [OpenAPI cannot represent every observed UI preference] -> Keep presentation semantics generic where reusable and reserve sidecar metadata for ownership, provenance, and stability only.
- [Batch-update semantics are inferred incorrectly from its name] -> Treat the sanitized observed request as authoritative and model exactly one JSON:API object unless later evidence proves otherwise.

## Migration Plan

1. Create only the empty `get-person-activities` and `post-batch-update` supplement directories, then stop implementation and report their paths to the user.
2. Wait for the user to add each `request.http` and either a sanitized body-only `response.json` or an explicit bodyless-response observation, then explicitly confirm that capture is complete. No contracts, tests, generator changes, generated output, or documentation changes proceed before this checkpoint.
3. Review the user-provided captures for secrets and personal data, then record the observed request and response contracts before finalizing OpenAPI schemas.
4. Add failing validation and generator tests for supplement loading, collisions, fingerprints, query fields, stability descriptions, and both endpoint contracts.
5. Introduce the effective-specification loader without supplements and verify generated output remains unchanged.
6. Add the two supplement packages, regenerate People and Webhooks nodes, and review all generated differences including lookup catalogs.
7. Add REST Client recommendation, ignored environment patterns, and contributor guidance.
8. Run the repository CI sequence and package inspection.

Rollback consists of removing supplement loading from product configuration, removing the two supplement packages, and regenerating nodes from the unchanged dated vendor snapshots. Workflows using the new operation IDs would then lose those selections, so rollback after release requires an explicit compatibility decision rather than an unannounced package downgrade.
