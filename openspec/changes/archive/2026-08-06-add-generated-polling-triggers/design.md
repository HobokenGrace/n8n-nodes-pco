## Context

The package currently generates product-specific action nodes from committed Planning Center OpenAPI snapshots and dispatches them through shared request, pagination, resource locator, and JSON:API normalization helpers. It has no trigger nodes or durable polling state. Planning Center webhooks cover only selected broad event types and cannot necessarily scope delivery to a domain parent such as one form, while many collection APIs can efficiently filter and order by creation or update timestamps.

The design adds product-specific polling trigger nodes without changing existing action-node behavior:

```text
OpenAPI snapshot
      |
      +-- action operation model --> <Product> action node --> execute runtime
      |
      +-- polling eligibility -----> <Product> trigger node --> poll runtime
                                             |
                                             +--> durable node state
```

## Goals / Non-Goals

**Goals:**

- Derive trigger coverage mechanically from committed snapshots.
- Support narrowly scoped collection routes and their existing generated filters.
- Provide a uniform, loss-resistant timestamp watermark across products.
- Keep trigger output consistent with existing normalized action output.
- Bound each workflow execution while allowing deterministic backlog catch-up.
- Make lifecycle and failure behavior explicit and testable.

**Non-Goals:**

- Native Planning Center webhook subscriptions.
- Deletion detection or reconstruction of every intermediate resource mutation; disappearance is ambiguous with filter and permission changes and would require full-result snapshots.
- Polling collections that lack inclusive same-field filtering and ordering.
- A hand-maintained allowlist of trigger resources.
- A cross-product trigger node or a trigger node for products with no qualifying operation.
- A package-defined interval control or custom scheduler.

## Decisions

### Generate a separate trigger node per qualifying product

Each qualifying product receives a generated `<Product> Trigger` class beside its existing action class. This follows the current package's product boundaries, keeps resource and operation selectors manageable, and allows metadata generation to remain product-driven. A single cross-product trigger was rejected because People alone exposes many qualifying routes and would create an oversized selector.

### Derive trigger operations from a strict cursor contract

The OpenAPI parser will derive a polling operation only from a GET operation modeled as a collection whose `order` values contain the cursor field and whose parameters contain `where[<cursor>][gte]` with date-time semantics. The generated node uses separate Resource and Event controls. Resource names identify the emitted JSON:API type, and nested routes append `(via <Scope>)` to that Resource, such as `Form Submission (via Form)`. `created_at` produces a concise `Created` Event whose description explains that an older resource merely entering the filtered result set does not qualify. `updated_at` produces `Created or Updated` because PCO initializes `updated_at` on creation; its description explains that both initial creation and later timestamp-advancing changes qualify. n8n action metadata starts with `On` and places scope after the change, such as `On Form Submission created (via Form)`, so actions remain identifiable in the node-selection panel and follow trigger naming conventions. At runtime, every primary resource must provide a non-empty string JSON:API `type`, non-empty string `id`, and valid cursor value; response validation supplies the invariant when a snapshot does not model resource attributes precisely.

Eligibility is evaluated separately for both fields. All qualifying operations are generated. Requiring `gte` rather than accepting ordering alone or a strict `gt` filter provides one cursor algorithm for equal timestamps, retries, and late arrivals.

### Reuse action-operation presentation and request metadata

Polling metadata will reference or derive from the corresponding generated list operation rather than independently re-parsing labels and fields. Emitted resource types, path-derived `(via <Scope>)` labels, path parameters, resource locators, filters, includes, fields, source paths, and query serialization remain shared. Trigger subtitles reuse the source action operation's endpoint description and append the active cursor field, such as `GET /people updated_at`, so internal polling operation IDs are not shown on configured nodes.

The trigger renderer will group operations by emitted resource type plus any required parent scope and replace action operations with concise Event labels. It will remove user control over every exact or range predicate for the active cursor, plus order, pagination offset, and page size, because the runtime owns them. Other result filters remain available. Include and field options remain available, with the runtime forcing the cursor attribute into sparse-field requests when needed for state validation and removing that runtime-only attribute from normalized output when the user's sparse-field selection omitted it.

### Store an inclusive timestamp boundary per node configuration

Node static data will store a versioned state containing at least:

```text
configuration fingerprint
cursor field
watermark timestamp
JSON:API `(type, id)` identities observed at the watermark
initialized state
```

The boundary identity set has no package-defined maximum. Exact same-timestamp deduplication takes precedence over bounding static-data size, so a pathological number of resources sharing one timestamp can produce correspondingly large persisted state until the watermark advances.

Before comparing configuration fingerprints or making API requests, the runtime validates the complete persisted state shape and invariants: supported version, cursor field, canonical watermark, fingerprint, initialized flag, and unique boundary resource identities. Malformed, internally inconsistent, or unsupported-version state fails closed without requests or mutation. Its error tells the user to replace the trigger node for fresh state and optionally configure Start Time for historical catch-up. A permanent reset control was rejected because this is a rare recovery path and an easy source of accidental data loss. Older versions may be transformed only by an explicit, tested migration; unknown state is never silently re-baselined.

The fingerprint includes credential identity plus the canonical resolved values of the trigger operation, required path values, explicit start time, and result-affecting filters. On every production poll, the runtime resolves those parameters, serializes objects with recursively sorted keys while preserving array order, and compares the resulting fingerprint before making Planning Center requests. A changed fingerprint applies the same behavior as a fresh activation: an empty Start Time creates a new-changes-only baseline, while a configured Start Time restarts inclusively from that value and can re-emit records delivered under the previous configuration. This permits stable n8n expressions while making dynamic expressions reinitialize whenever their result changes. Native Poll Times configuration, batch cap, includes, and sparse fields do not change result membership and therefore do not reset the cursor. Manual testing may resolve the same controls but never persists a fingerprint or production state.

n8n persists polling static data after first activation or after a later poll returns a non-null response. A node without state initializes and persists its applicable boundary without returning resource items. A node with unchanged persisted state polls immediately when n8n invokes it, including the activation probe used during reactivation, because the community-node poll contract does not distinguish that probe from a durable scheduled occurrence. If a fingerprint change or other state-only transition produces no resource items, the poll returns one empty output branch (`[[]]`) so n8n persists the new state. This intentionally creates a successful visible workflow execution with zero items; downstream nodes receive nothing, and user documentation distinguishes it from both a resource event and a trigger failure. Returning `null` is reserved for polls that neither emit resources nor change durable state.

Ordinary workflow deactivation preserves state. Reactivation with the same fingerprint immediately resumes from the saved watermark and can return one capped batch of changes that occurred while inactive before the next configured Poll Time; later Poll Times continue any backlog. This state-driven lifecycle works both when n8n reuses one poll context and when its durable scheduler creates a fresh context per occurrence. A copied workflow or node without inherited static state initializes independently.

### Default to new changes only

An empty Start Time is presented as new changes only. Its user-facing description makes clear that existing matching records are not emitted. Initialization requests the newest matching resources using descending cursor order and an API-capped page. If a match exists, the runtime records its timestamp and obtains every matching `(type, id)` identity at that exact boundary timestamp so pre-existing ties are also ignored. An empty inclusive boundary page means the initial descending page already contained every newest-timestamp identity and completes initialization normally, even when older result pages exist. If no match exists, the runtime records `1970-01-01T00:00:00.000Z` with no seen identities. This fixed sentinel avoids worker-clock skew and delayed-visibility gaps; a pre-activation resource that becomes visible or starts matching only after initialization can therefore be emitted. Initialization emits no records.

Start Time uses n8n's native date-time control with an empty default and expression support, rather than requiring users to hand-format a string. The runtime accepts the local date-time string emitted by that control and interprets it in the workflow timezone; it also accepts expression-resolved RFC 3339 date-times with explicit offsets. Either form is canonicalized to UTC. The configured value bypasses newest-record baselining and initializes an inclusive watermark at that instant with no seen identities. First activation persists that boundary without resource output. If the start is at or before activation time, the next poll processes matching history in oldest-first batches capped by Max Records Per Poll; later polls continue any backlog. Future values are intentionally valid and are neither rejected nor clamped: the workflow remains active, but polls return no resource items until PCO exposes a matching record whose cursor is at or after that instant. The Start Time description explains this quiet waiting state.

Manual testing is a separate sample-data preview, not a simulation of the next production poll. It applies the configured scope, result filters, includes, and sparse fields, ignores Start Time and the production watermark, requests the newest matching resource, emits at most that one normalized item, and never reads or writes production cursor state. User-facing documentation calls out that the preview does not predict activation or catch-up output.

### Poll inclusively and advance only through emitted resources

Each production poll requests records with `where[<cursor>][gte]=<watermark>` and ascending cursor order. Cursor values must be RFC 3339 date-times with explicit offsets; the runtime compares instants and persists canonical UTC values so equivalent textual offsets share one boundary. After each page, traversal restarts from the greatest fully observed cursor boundary rather than blindly following a stale next offset; offset is used only as needed to traverse records tied at the current cursor timestamp. It continues until it either exhausts matching data or collects Max Records Per Poll unseen resources. Results are deduplicated by JSON:API `(type, id)` identity and ordered by cursor instant ascending, then `type` and `id` in ascending ordinal string order within the fetched batch. Equal-timestamp batch membership can still depend on PCO page ordering when a tie exceeds the remaining batch capacity.

After a complete successful fetch and normalization, state advances to the greatest emitted cursor timestamp and stores all emitted or previously observed identities at that timestamp. If no unseen resource is found and no durable state changed, state remains valid without emitting an execution. If the batch cap is reached, the next scheduled poll resumes from the emitted boundary rather than skipping to the newest observed API record.

This algorithm detects a late resource with the same timestamp but a previously unseen `(type, id)` identity. For deduplication, repeated representations of the same identity at the same cursor timestamp are treated as retries and are not re-emitted. A Created trigger observes the currently matching query by `created_at`; it does not detect a resource created outside the result set that starts matching only after its creation timestamp falls behind the watermark. The trigger also cannot distinguish a same-identity mutation whose `updated_at` value does not advance, reproduce intermediate versions collapsed by the collection API, or guarantee gap-free traversal when PCO concurrently reorders an offset-paginated result set. Cursor restarts and narrow offset use reduce that pagination race but cannot create snapshot or stable `(timestamp, type, id)` keyset semantics that the API does not provide.

### Treat each poll batch atomically

The runtime fetches, validates, deduplicates, orders, and normalizes the complete output batch before returning items or updating state. Any request, pagination, malformed cursor, or normalization failure throws with no output and no cursor advance. This favors visible retries over silent gaps.

Cursor persistence occurs when the poll successfully returns its batch. A later downstream workflow failure cannot roll it back because the poller does not receive the workflow outcome, so successfully returned items are not replayed solely for that failure. Conversely, n8n can overlap multiple Poll Times or redeliver a durable poll occurrence before static-data persistence is visible; those invocations can read the same watermark and return duplicate batches. A community node cannot atomically coordinate static data across all n8n processes. Every generated trigger therefore shows a concise pre-activation notice covering possible duplicates, downstream-failure replay limits, and unsupported deletes, with fuller documentation explaining that the trigger provides neither exactly-once nor end-to-end at-least-once delivery and that downstream retries and idempotency are the workflow author's responsibility.

### Emit normalized resources without an event wrapper

Each detected Planning Center resource becomes one n8n item through the existing JSON:API normalization path. The configured node already identifies the trigger operation, so adding a wrapper or synthetic polling fields such as `{ event, detectedAt, cursor, source, resource }` would introduce a second package output shape without providing reliable created-versus-updated classification. Requested included resources follow existing compound-document behavior.

### Bound catch-up per execution

Max Records Per Poll is an integer from 1 through 1,000 with default 100. The PCO request page size remains runtime-owned and respects the API maximum. A configured cap larger than one page causes pagination; a cap smaller than one page truncates only after deterministic oldest-first collection. Each Poll Time emits at most one capped batch; larger backlogs continue across later configured Poll Times without immediate package-scheduled follow-up polls. The control description makes this pacing explicit so users can choose a schedule and cap that fit their catch-up latency and API usage.

### Use native n8n polling schedules unchanged

Generated trigger descriptions declare `polling: true` and do not define a package-owned `pollTimes` property, interval control, or timer. n8n injects its native `Poll Times` fixed collection when loading polling nodes, so the running n8n version owns its UI, default, available schedule modes, validation, and execution semantics. In the inspected n8n contract, this means an Every Minute default plus the native recurring and custom schedule options rather than the originally proposed two-minute numeric interval.

Keeping scheduling host-owned avoids a duplicate control and custom activation lifecycle. Poll Times changes do not alter Planning Center result membership and therefore do not reset the polling watermark.

## Risks / Trade-offs

- [Offset pagination can change while records are updating] -> Restart traversal from the greatest fully observed cursor boundary, use offset only for equal-timestamp ties, retain inclusive boundary-identity overlap, and advance only after a complete batch; test page-boundary churn and document that the API cannot provide a no-gap guarantee.
- [Boundary identity state is unbounded when many resources share one timestamp] -> Preserve every observed `(type, id)` at the current maximum timestamp for exact deduplication and drop the set only when the watermark advances; document the static-data risk rather than silently close the boundary.
- [A large user-selected batch can consume substantial memory and API quota] -> Default to 100, enforce a 1,000-record maximum, and fetch only until the configured output batch is complete.
- [Polling consumes API quota per active workflow] -> Preserve server-side path scopes and filters, use n8n's native Poll Times unchanged, cap output batches at 1,000, and avoid additional per-resource requests for included data.
- [Generated options can change when snapshots change] -> Derive stable IDs from source operation and cursor field, commit generated output, and enforce generation drift and metadata tests.
- [Polling is not an event log] -> Name updated events `Created or Updated`, exclude deletes, and document collapsed intermediate changes and downstream-failure replay limits.
- [Created filters can change membership after creation] -> Keep Created tied to `created_at`, document that later filter-entry is not detected, and direct users to Created or Updated when available.
- [Native poll invocations can overlap or be redelivered] -> Keep serial watermark processing idempotent, accept that concurrent invocations can emit duplicate batches, and document downstream idempotency responsibility.
- [n8n does not persist scheduled poll state after a `null` response] -> Return `[[]]` only for scheduled state-only transitions, accepting a visible zero-item execution so re-baselines are durable without emitting a resource.
- [Corrupt or unsupported state cannot preserve delivery continuity] -> Validate state before fingerprint comparison or requests and fail with recovery guidance; permit only explicit, tested migrations and never silently reset.
- [An empty initial collection has no observed timestamp boundary] -> Persist the fixed Unix epoch sentinel with no seen identities so clock skew and delayed visibility cannot create a gap; document and test that a pre-activation resource can emit if it becomes visible or matching later.

## Migration Plan

1. Add polling metadata and runtime behavior without changing existing action operation IDs or output.
2. Generate and commit trigger nodes only for products with qualifying operations.
3. Register and export the generated trigger set, then run generation drift, runtime, metadata, lint, build, and package inspection checks.
4. Release as an additive package capability. Rollback removes trigger registrations and generated trigger outputs while leaving action nodes unchanged; existing workflows using the new trigger nodes would require the trigger-capable package version.

## Open Questions

None.
