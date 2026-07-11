## Context

Two existing Planning Center n8n community node repositories were reviewed. `n8n-nodes-pco` demonstrates that OpenAPI-generated People coverage can expose hundreds of endpoints, but it is People-only, Basic-auth-only, lint-failing, and carries template/package-manager inconsistencies. `n8n-nodes-planning-center` has a cleaner OAuth-oriented credential and product scaffold, but its operations are hand-written and currently cover only People and Publishing.

The new project will start from scratch to avoid inheriting either repository's structural constraints. The initial implementation will prioritize immediate local automation value with Personal Access Token authentication and use OpenAPI generation as the primary way to scale across Planning Center products.

The target npm package name is `@hobokengrace/n8n-nodes-pco`. The project will target Node.js 20, use pnpm for dependency management, and use the MIT license.

## Goals / Non-Goals

**Goals:**

- Bootstrap a valid n8n community node package with TypeScript, package metadata, build, lint, and test commands.
- Establish an OpenAPI generation pipeline where Planning Center product specs are source inputs and generated node files are disposable outputs.
- Generate initial product node coverage for People, Groups, and Giving, while keeping the structure product-agnostic for later Services, Calendar, Check-Ins, Registrations, Publishing, and other products.
- Support Planning Center Personal Access Token credentials first.
- Keep authentication and request execution decoupled from generated operation definitions so OAuth can be added later.

**Non-Goals:**

- OAuth credential implementation in the bootstrap change.
- npm publish automation in the bootstrap change.
- Hand-curated friendly operations for every common Planning Center workflow.
- Full end-user workflow examples for People, Groups, and Giving.
- Full production polish for every generated operation label, description, and field grouping.
- Migration compatibility with either existing cloned repository.

## Decisions

1. Start from a clean project instead of forking either existing repo.

   Rationale: A clean start avoids `n8n-nodes-pco`'s People-only and lint issues and avoids `n8n-nodes-planning-center`'s hand-written dispatcher architecture. The implementation can still reuse validated ideas from both repos without carrying their constraints.

   Alternatives considered: Fork `n8n-nodes-pco` for its OpenAPI generator proof; fork `n8n-nodes-planning-center` for its OAuth scaffold. Both would require significant restructuring before all-product support.

2. Treat OpenAPI generation as the default operation surface.

   Rationale: Planning Center products contain too many endpoints to maintain by hand. Generated nodes allow broad API coverage and repeatable updates as Planning Center specs improve. The generator will generate every technically mappable operation, including deprecated operations, and exclude only operations that cannot be safely represented. Deprecated operations will be clearly marked in generated labels or descriptions.

   Alternatives considered: Hand-write product clients and operations, which gives better initial UX but does not scale to People plus every other product; conservative allowlists, which reduce risk but undermine the goal of broad OpenAPI coverage.

3. Expose one generated n8n node per Planning Center product.

   Rationale: Separate product nodes keep large operation lists manageable, map directly to Planning Center product specs, and make future product-specific scopes, docs, and exclusions easier to reason about. Bootstrap nodes will use a single placeholder PCO icon duplicated across generated product nodes so product-specific assets can be replaced later.

   Alternatives considered: A single all-in-one Planning Center node. That reduces palette entries but creates a very large product/resource/operation UX and makes generated routing harder to maintain.

4. Maintain the OpenAPI-to-n8n generator in this repository.

   Rationale: `@devlikeapro/n8n-openapi-node` is useful proof that OpenAPI generation can work for Planning Center People, but it is a property builder rather than a complete generation pipeline. This project needs to own product configuration, generated artifact contracts, post-processing, auth binding, lint normalization, deterministic regeneration, and exclusion tracking. Generator source will live under `src/generator` as first-class TypeScript code. The generator will use `@apidevtools/swagger-parser` for OpenAPI parsing and `$ref` resolution, while n8n node generation remains project-owned.

   Alternatives considered: Depend directly on `@devlikeapro/n8n-openapi-node` as the long-term generation layer, which would speed up initial bootstrap but leave core behavior controlled by an external `0.x` package; implement all OpenAPI parsing with plain TypeScript, which avoids dependencies but increases `$ref` and schema edge-case risk.

   Generated operation labels will be derived from OpenAPI `operationId` or summary and normalized into friendly action labels such as `Get Person` or `Create Donation`. HTTP method/path labels are reserved as a fallback when friendly names cannot be derived.

   Generated resource dropdowns will use OpenAPI tags as the primary grouping mechanism, with path-derived group names as the fallback when tags are missing or too generic.

   Generated operations will include an advanced key/value additional query parameters collection so workflows can pass API parameters not modeled by the current OpenAPI snapshot.

5. Keep generated code disposable and post-processable.

   Rationale: Generated files should be reproducible from spec inputs plus generator code. Any n8n-specific cleanup, naming, grouping, or lint normalization should live in generator/post-processing scripts rather than manual edits to generated files. Generated TypeScript node source files will be committed under `nodes/generated/<product>` so generated changes are reviewable, package source remains visible, and generated nodes are clearly separated from hand-written helpers; CI will check for drift.

   Alternatives considered: Generate source only during build, which keeps git smaller but makes generated changes harder to review; place generated files directly under `nodes/<product>`, which matches typical n8n layout but weakens generated-code boundaries; hand-edit generated nodes after each run, which creates drift and makes future spec refreshes risky.

   `pnpm build` will compile committed generated source as-is. Regeneration and drift checks are handled by separate commands so builds do not mutate source or hide generated diffs.

6. Use versioned committed OpenAPI snapshots as the generation source, with source URLs baked into generator configuration.

   Rationale: Snapshot-first generation keeps builds deterministic, enables offline development, and prevents CI from depending on Planning Center docs availability. Snapshots will live at `openapi/<product>/<date>.json`. Generator configuration will track each product's active source URL and date so spec refreshes are explicit and reviewable. A working pnpm refresh command will fetch all configured URLs into versioned snapshot files, separate from normal node generation. Bootstrap node generation uses only People, Groups, and Giving snapshots.

   Initial source URL registry:

   - API: `https://api.planningcenteronline.com/api/v2/open_api/2025-09-30`
   - Calendar: `https://api.planningcenteronline.com/calendar/v2/open_api/2022-07-07`
   - Check-Ins: `https://api.planningcenteronline.com/check-ins/v2/open_api/2025-05-28`
   - Current: `https://api.planningcenteronline.com/current/v2/open_api/2018-08-01`
   - Giving: `https://api.planningcenteronline.com/giving/v2/open_api/2019-10-18`
   - Groups: `https://api.planningcenteronline.com/groups/v2/open_api/2023-07-10`
   - People: `https://api.planningcenteronline.com/people/v2/open_api/2025-11-10`
   - Publishing: `https://api.planningcenteronline.com/publishing/v2/open_api/2024-03-25`
   - Registrations: `https://api.planningcenteronline.com/registrations/v2/open_api/2025-05-01`
   - Services: `https://api.planningcenteronline.com/services/v2/open_api/2018-11-01`
   - Webhooks: `https://api.planningcenteronline.com/webhooks/v2/open_api/2022-10-20`

   Alternatives considered: Fetch official specs during every generation/build. That maximizes freshness but makes local builds and CI depend on network availability and remote schema stability. Store snapshots as `openapi/<product>.json`, which is simpler but loses the source spec date in the file path.

7. Ship PAT authentication first.

   Rationale: PAT setup is simpler for church-internal automations and does not require users to create an OAuth app or configure redirect URLs. It provides the fastest path to a usable node package. The credential UI will collect Planning Center Application ID, Secret, and Base URL so normal users can use Planning Center API credentials while advanced users can target alternate/proxied API bases when needed. Base URL defaults to `https://api.planningcenteronline.com`.

   Alternatives considered: OAuth first. OAuth is better for scoped authorization and polished user consent, but it adds setup complexity and can be added later if request authentication is isolated.

   The credential will include a built-in n8n credential test using a low-impact People current-user/me-style endpoint when available from the People API spec.

8. Design auth as a pluggable credential boundary.

   Rationale: Generated operations should call shared request helpers rather than embedding auth details. This lets a future OAuth credential authenticate the same operation surface without regeneration or operation rewrites.

   Alternatives considered: Bake PAT directly into generated operation code. This is simpler initially but creates avoidable rework when OAuth is added.

9. Generate `execute()` methods that call a shared Planning Center request helper.

   Rationale: Generated execute methods give the project explicit control over authentication, pagination, JSON:API payload shaping, retries, errors, and future OAuth support. This is more code than declarative routing, but it keeps Planning Center-specific behavior centralized and testable. Hand-written request, pagination, retry, and JSON:API helpers will live under `src/runtime`.

   Alternatives considered: Generate n8n declarative routing metadata. That is simpler for straightforward endpoints, but it is harder to centralize pagination, retry behavior, JSON:API normalization, and auth strategy selection.

   Generated execute paths will respect n8n's Continue On Fail behavior: item-level errors are returned as error items when enabled; otherwise execution throws and stops.

10. Use `Return All` plus `Limit` for generated paginated list operations.

   Rationale: This matches common n8n node UX and gives users control over large Planning Center datasets. `Return All` follows Planning Center pagination; when disabled, `Limit` caps the number of returned records.

   Alternatives considered: Always fetch only the first page, which is simple but poor automation UX; always auto-paginate, which is convenient but risky for large People, Groups, and Giving datasets.

11. Flatten JSON:API `data.attributes` in generated operation output.

   Rationale: n8n users generally expect fields to be easy to reference in expressions. Flattening resource attributes into each output item improves workflow ergonomics while preserving top-level `id`, `type`, `relationships`, `links`, and `meta` keys for advanced use. If an attribute name collides with a reserved output key, the reserved JSON:API key is preserved and the attribute is emitted as `attribute_<name>`.

   Alternatives considered: Return raw JSON:API responses exactly as received. This is faithful and simpler, but it forces users to reference `data.attributes.*` throughout workflows. Offering both raw and simplified modes is flexible but adds generated UI and testing complexity.

12. Support both generated attribute fields and advanced raw JSON body mode for create/update operations.

   Rationale: Generated fields provide a friendly default for common JSON:API attribute payloads, while raw JSON body mode gives advanced users full control for complex relationships, nested structures, or endpoints that the generator cannot model cleanly. Optional generated fields will not be prefilled from OpenAPI defaults/examples and will be omitted from requests unless explicitly set. Required request fields from OpenAPI will be marked required in n8n where possible. The generator will respect OpenAPI `readOnly` and `writeOnly` flags by excluding `readOnly` fields from standard write inputs and avoiding normal output exposure for `writeOnly` fields. Standard write mode will generate simple relationship ID fields where JSON:API relationships are detectable; to-many relationship fields will accept comma-separated IDs; update/PATCH requests will send only explicitly set attributes and relationships; raw JSON mode remains available for complex relationship payloads.

   Alternatives considered: Generated fields only, which improves UX but may block complex payloads; raw JSON only, which is flexible but weak UX and easier to misconfigure.

13. Use `@hobokengrace/n8n-nodes-pco` as the initial npm package name.

   Rationale: The scoped package avoids colliding with existing unscoped community packages while keeping the PCO abbreviation concise and recognizable.

   Alternatives considered: `n8n-nodes-pco`, which may conflict with existing naming/ownership; `n8n-nodes-planning-center`, which is clear but already used by the ZoneMix package.

14. Retry rate-limit and transient server failures in the shared request helper.

   Rationale: Generated list and write operations may encounter Planning Center rate limits or temporary API failures. Centralizing retry behavior in the request helper gives every generated operation consistent resilience without embedding retry logic in generated endpoint code. The bootstrap retry policy uses up to five total attempts, respects `Retry-After` for HTTP 429 when present, and uses exponential backoff for transient 5xx responses.

   Alternatives considered: Retry only HTTP 429 responses, which is simpler but less resilient; no automatic retry, which is easiest to implement but creates poor UX for larger automations.

15. Use Node.js 20 and pnpm for development, CI, and lockfile management.

   Rationale: Node.js 20 is a stable modern baseline for n8n community node development, and pnpm gives reproducible dependency installs with a single package-manager story from the start.

   Alternatives considered: Node.js 20 with npm, which is simpler for some contributors but less strict; Node.js 22 with npm, which is newer but may be ahead of some self-hosted n8n environments.

   The package will declare `n8n-workflow` as a wildcard peer/dev dependency to match flexible community-node host compatibility expectations.

   The package will use the MIT license, matching both reviewed existing repositories and common n8n community node expectations.

16. Use Vitest for unit, snapshot, and generator invariant tests.

   Rationale: Vitest fits a new TypeScript project well, has fast local feedback, and supports snapshot-style assertions for generated node output without the heavier Jest setup used by older community-node examples. Generator tests will snapshot metadata summaries such as operation/resource counts, key operation metadata, exclusions, and node descriptions rather than full generated source files.

   Alternatives considered: Jest, which is common in older n8n node examples but heavier for modern TypeScript; Node's built-in test runner, which has fewer conveniences for generator snapshot testing; full generated-source snapshots, which catch every change but are large and noisy for hundreds of endpoints.

17. Add check-only GitHub Actions CI.

   Rationale: Generated code drift and lint/build failures should be caught before implementation continues. A check-only workflow gives guardrails without requiring npm publishing credentials or OIDC setup during bootstrap. CI will use committed OpenAPI snapshots only and will not run remote snapshot refresh.

   Alternatives considered: Add publishing automation immediately, which is more complete but requires package publishing decisions; run remote OpenAPI refresh in CI, which improves freshness but makes CI depend on network/API availability; skip CI, which is simpler but weakens generated-code reproducibility guarantees.

## Risks / Trade-offs

- Generated UX may be noisy or awkward for non-technical users → Mitigation: accept broad raw coverage first, then add curated common operations in later changes where high-value workflows need better ergonomics.
- Planning Center OpenAPI specs may contain inconsistencies or unsupported schemas → Mitigation: commit reviewed spec snapshots and keep generator tests around generated node metadata so spec changes fail visibly during explicit refreshes.
- n8n linter rules may reject generated output → Mitigation: make lint compliance part of generation/post-processing and run lint in verification.
- n8n linter rules may reject generated output → Mitigation: make lint compliance part of generation/post-processing and require zero lint errors for hand-written and generated code.
- Committed generated source can create large diffs after spec updates → Mitigation: keep generation deterministic and require CI drift checks so generated diffs are intentional and reviewable.
- PAT credentials are long-lived secrets → Mitigation: document secure storage expectations, rely on n8n credentials storage, and avoid logging credential values or full authenticated request details.
- OAuth added later may require credential selection UX changes → Mitigation: keep credential-specific code behind a shared request/auth boundary from the bootstrap.
- Generated execute code may be more complex than declarative routing → Mitigation: generate thin operation dispatchers and keep shared request, pagination, error, and payload behavior in hand-written helpers.
- Paginated endpoints can return large datasets → Mitigation: generated list operations expose `Return All` and `Limit`, and the shared pagination helper respects the configured cap.
- Flattened output could hide raw JSON:API structure details → Mitigation: preserve `relationships`, `links`, and `meta` under explicit top-level keys so advanced workflows can still access non-attribute response data.
- Supporting generated attributes, relationship IDs, and raw body mode increases generated UI complexity → Mitigation: generate only simple detectable relationship ID fields in standard mode, keep raw JSON mode for complex relationships, and avoid prefilled optional values that could be sent unintentionally.
- Automatic retries can hide slow or failing workflows → Mitigation: bound retry attempts to five total attempts and keep retry behavior centralized and test-covered.

## Migration Plan

No existing production package is migrated in this change. Implementation will create a new project structure in the current workspace. If the bootstrap proves unsuitable, rollback is deleting the new generated project files and OpenSpec change before publishing.

## Open Questions

None.
