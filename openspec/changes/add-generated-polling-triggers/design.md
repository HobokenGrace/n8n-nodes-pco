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
- Deletion detection or reconstruction of every intermediate resource mutation.
- Polling collections that lack inclusive same-field filtering and ordering.
- A hand-maintained allowlist of trigger resources.
- A cross-product trigger node or a trigger node for products with no qualifying operation.
- A custom scheduler unless a later product decision explicitly approves one.

## Decisions

### Generate a separate trigger node per qualifying product

Each qualifying product receives a generated `<Product> Trigger` class beside its existing action class. This follows the current package's product boundaries, keeps resource and operation selectors manageable, and allows metadata generation to remain product-driven. A single cross-product trigger was rejected because People alone exposes many qualifying routes and would create an oversized selector.

### Derive trigger operations from a strict cursor contract

The OpenAPI parser will derive a polling operation only from a GET collection operation whose `order` values contain the cursor field and whose parameters contain `where[<cursor>][gte]` with date-time semantics. `created_at` produces `On <Resource> Created`; `updated_at` produces `On <Resource> Created or Updated` because PCO initializes `updated_at` on creation.

Eligibility is evaluated separately for both fields. All qualifying operations are generated. Requiring `gte` rather than accepting ordering alone or a strict `gt` filter provides one cursor algorithm for equal timestamps, retries, and late arrivals.

### Reuse action-operation presentation and request metadata

Polling metadata will reference or derive from the corresponding generated list operation rather than independently re-parsing labels and fields. Resource grouping, `(via <Scope>)` labels, path parameters, resource locators, filters, includes, fields, source paths, and query serialization remain shared.

The trigger renderer will replace the action verb with the agreed trigger labels. It will remove user control over the active cursor's range filters, order, pagination offset, and page size because the runtime owns them. Other result filters remain available. Include and field options remain available, with the runtime forcing the cursor attribute into sparse-field requests when needed for state validation.

### Store an inclusive timestamp boundary per node configuration

Node static data will store a versioned state containing at least:

```text
configuration fingerprint
cursor field
watermark timestamp
resource IDs observed at the watermark
initialized state
```

The fingerprint includes credential identity, trigger operation, required path values, explicit start time, and result-affecting filters. A changed fingerprint creates a fresh baseline. Poll interval, batch cap, includes, and sparse fields do not change result membership and therefore do not reset the cursor.

Ordinary workflow deactivation preserves state. Reactivation with the same fingerprint resumes from the saved watermark and catches up changes that occurred while inactive. A copied workflow or node without inherited static state initializes independently.

### Baseline existing data without emitting it

With the default start behavior, initialization requests the newest matching resource using descending cursor order and a one-record page. If a match exists, the runtime records its timestamp and obtains all matching IDs at that exact boundary timestamp so pre-existing ties are also ignored. If no match exists, it records the poll's current timestamp. Initialization emits no records.

An explicit start date bypasses newest-record baselining and initializes an inclusive watermark at that date with no seen IDs, causing matching history to be processed in oldest-first batches.

Manual testing is a separate non-stateful path: it requests the newest matching resource, emits at most that one normalized item, and never reads or writes production cursor state.

### Poll inclusively and advance only through emitted resources

Each production poll requests records with `where[<cursor>][gte]=<watermark>` and ascending cursor order. It paginates past already-seen boundary IDs until it either exhausts matching data or collects Max Records Per Poll unseen resources. Results are ordered by cursor and deduplicated by resource ID within the poll. The runtime emits the oldest matching resources first.

After a complete successful fetch and normalization, state advances to the greatest emitted cursor timestamp and stores all emitted or previously observed IDs at that timestamp. If no unseen resource is found, state remains valid without emitting an execution. If the batch cap is reached, the next scheduled poll resumes from the emitted boundary rather than skipping to the newest observed API record.

This algorithm detects a late resource with the same timestamp but a previously unseen ID. It cannot distinguish a same-ID mutation whose `updated_at` value does not advance, nor can it reproduce intermediate versions collapsed by the collection API.

### Treat each poll batch atomically

The runtime fetches, validates, deduplicates, orders, and normalizes the complete output batch before returning items or updating state. Any request, pagination, malformed cursor, or normalization failure throws with no output and no cursor advance. This favors visible retries over silent gaps.

Cursor persistence occurs at trigger polling time; downstream workflow failure cannot roll it back because the poller does not receive the later workflow outcome. This matches ordinary polling-trigger behavior and must be documented as a delivery limitation.

### Emit normalized resources without an event wrapper

Each detected Planning Center resource becomes one n8n item through the existing JSON:API normalization path. The configured node already identifies the trigger operation, so adding `{ event, detectedAt, resource }` would introduce a second package output shape without improving filtering. Requested included resources follow existing compound-document behavior.

### Bound catch-up per execution

Max Records Per Poll is a positive integer with default 100 and no package-defined upper bound. The PCO request page size remains runtime-owned and respects the API maximum. A configured cap larger than one page causes pagination; a cap smaller than one page truncates only after deterministic oldest-first collection. Large values remain the operator's responsibility.

### Gate scheduling on native n8n support

The desired control is an integer Poll Interval in minutes with default 2, minimum 1, and maximum 2,147,483,647. n8n polling nodes declare `polling: true` and use native `pollTimes` scheduling, so implementation must first prove that the native contract can cleanly represent the desired default and range.

If it can, generated triggers use the native mechanism with those constraints. If it cannot, implementation stops and asks for a product decision. It must not silently substitute n8n defaults, narrow the range, or implement an independent timer. This is the only unresolved product-dependent implementation gate.

## Risks / Trade-offs

- [Offset pagination can change while records are updating] -> Use inclusive overlap, ascending cursor order, boundary-ID deduplication, and advance only after a complete batch; test mutations at page boundaries.
- [Boundary ID state can grow when many resources share one timestamp] -> Retain IDs only for the current maximum timestamp and drop them when the watermark advances.
- [A large user-selected batch can consume substantial memory] -> Default to 100, document the lack of an upper bound, and fetch only until the configured output batch is complete.
- [Polling consumes API quota per active workflow] -> Preserve server-side path scopes and filters, default to a two-minute target interval, and avoid additional per-resource requests for included data.
- [Generated options can change when snapshots change] -> Derive stable IDs from source operation and cursor field, commit generated output, and enforce generation drift and metadata tests.
- [Polling is not an event log] -> Name updated events `Created or Updated`, exclude deletes, and document collapsed intermediate changes and downstream-failure replay limits.
- [Client time is used when an empty collection is initialized] -> Capture time at poll start and use inclusive comparison; add clock-boundary tests and prefer a server timestamp if the request layer exposes one cleanly.

## Migration Plan

1. Add polling metadata and runtime behavior without changing existing action operation IDs or output.
2. Verify the n8n scheduling compatibility gate before implementing trigger rendering.
3. Generate and commit trigger nodes only for products with qualifying operations.
4. Register and export the generated trigger set, then run generation drift, runtime, metadata, lint, build, and package inspection checks.
5. Release as an additive package capability. Rollback removes trigger registrations and generated trigger outputs while leaving action nodes unchanged; existing workflows using the new trigger nodes would require the trigger-capable package version.

## Open Questions

- Can the installed native n8n polling schedule cleanly enforce a two-minute default and integer minute range from 1 through 2,147,483,647? If not, implementation must pause for a product decision.
