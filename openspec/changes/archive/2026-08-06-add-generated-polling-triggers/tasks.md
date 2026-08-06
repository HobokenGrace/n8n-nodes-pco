## 1. Lock Native Scheduling Contract

- [x] 1.1 Add a node-description test proving generated triggers declare `polling: true` and define no custom `pollTimes`, interval, or scheduler control

## 2. Model Polling Eligibility

- [x] 2.1 Add generator tests for modeled GET collection eligibility requiring same-field `order` and date-time `where[created_at][gte]` or `where[updated_at][gte]`, including non-collection, wrong-format, and partial-contract exclusions
- [x] 2.2 Extend the generated operation model and OpenAPI parser with deterministic polling metadata derived from qualifying list operations
- [x] 2.3 Add tests for stable polling operation IDs, separate Resource and Event controls, concise `Created` and `Created or Updated` labels and descriptions, emitted resource grouping with nested `(via <Scope>)` Resource suffixes, and the absence of generated Deleted operations

## 3. Render Product Trigger Nodes

- [x] 3.1 Add renderer tests proving one trigger node is emitted per qualifying product and no empty trigger node is emitted for an ineligible product
- [x] 3.2 Render product trigger descriptions, delivery-limitations notices, resources, operations, credentials, icons, required path parameters, and shared resource locators from polling metadata, with tests proving the notice is present on every generated trigger
- [x] 3.3 Reuse remaining filters, includes, and sparse fields while excluding every exact and range predicate for the active cursor plus order, offset, and page-size controls from trigger configuration
- [x] 3.4 Add Max Records Per Poll and optional native n8n date-time Start Time controls with integer batch validation from 1 through 1,000, default batch size 100, empty Start Time default and expression support, a batch description covering one capped batch per Poll Time and multi-interval backlog catch-up, and a Start Time description covering empty-value new-changes-only behavior, inclusive historical catch-up, and future-value waiting without resource output

## 4. Implement Polling State And Lifecycle

- [x] 4.1 Add runtime tests for versioned state validation and canonical resolved-value fingerprints covering recursively sorted object keys, preserved array order, stable and changing expressions, credentials, operation, scope, start time, result filters, output-only options, native Poll Times, batch size, empty-Start-Time re-baselining, and configured-Start-Time replay
- [x] 4.2 Implement persistent node polling state that validates before requests, fails closed for malformed or unsupported versions with node-replacement and optional-Start-Time catch-up guidance, exposes no permanent reset control, permits only explicit tested migrations, applies fresh-activation semantics after result-set changes, survives ordinary deactivation, and immediately resumes the saved watermark on unchanged reactivation
- [x] 4.3 Add tests for default newest-record baselining, equal-timestamp baseline IDs, the fixed Unix epoch empty-collection watermark, later visibility of an earlier record, RFC 3339 validation and UTC canonicalization, activation without resource output for every Start Time mode, first-scheduled-poll capped catch-up from inclusive historical start times, continued scheduled catch-up, and future start times that wait without resource output
- [x] 4.4 Implement activation-time boundary persistence without resource output, first-scheduled-poll catch-up for non-future explicit starts, and waiting behavior for future starts
- [x] 4.5 Add tests and implementation for non-stateful manual sample-data preview that applies scope and result controls, ignores Start Time and production watermark, returns only the newest matching normalized resource, reads and writes no production state, and is documented as distinct from activation and catch-up output
- [x] 4.6 Add tests proving first-activation baselines rely on activation persistence, state-only transitions return `[[]]`, unchanged empty polls return `null`, fresh durable-scheduler contexts continue persisted state, and successful zero-item executions deliver nothing downstream and are documented as expected state persistence

## 5. Implement Cursor Polling And Batching

- [x] 5.1 Add runtime tests for RFC 3339 cursor validation and UTC canonicalization, ascending inclusive polling, cursor-boundary page restarts, equal-timestamp offset traversal, concurrent page reordering, `(type, id)` identity, late same-timestamp arrivals, suppression of a previously observed identity whose timestamp does not advance, and duplicate resources within a poll
- [x] 5.2 Implement `gte` watermark requests, runtime-owned cursor ordering, ordinal `type` and `id` tie ordering within fetched batches, cursor-boundary page restarts, offset use limited to equal-timestamp traversal, boundary-identity deduplication, and oldest-cursor-first output
- [x] 5.3 Add tests for the default 100-record cap, valid custom batch sizes, rejection below 1 and above 1,000, exactly one capped batch per Poll Time, multi-poll catch-up without package-scheduled follow-ups, unbounded boundary-identity retention across capped batches, and cursor advancement only through emitted resources
- [x] 5.4 Implement configurable batch collection across PCO pages up to the 1,000-record maximum, returning after one batch so later native Poll Times continue any backlog
- [x] 5.5 Add tests proving runtime-forced cursor attributes remain available for state validation but do not widen sparse-field output, and includes retain existing compound-document behavior
- [x] 5.6 Route detected resources through shared JSON:API normalization, emit one n8n item per resource, and add tests proving the output has neither a wrapper nor synthetic polling metadata

## 6. Make Poll Failures Atomic

- [x] 6.1 Add tests for first-page, later-page, missing or invalid JSON:API identity, invalid cursor, and normalization failures proving no partial output and no watermark advancement
- [x] 6.2 Validate the complete batch before state advancement and surface request, pagination, cursor, and normalization errors through n8n polling errors

## 7. Generate And Register Trigger Outputs

- [x] 7.1 Extend generation output and drift checking to write qualifying product trigger source and copy the corresponding product assets
- [x] 7.2 Extend package metadata and entry-point generation or alignment checks so every generated trigger is registered and exported exactly once
- [x] 7.3 Run `pnpm generate` and review the committed trigger set, operation labels, scope fields, and absence of empty product triggers
- [x] 7.4 Add metadata tests covering generated trigger node API version, trigger grouping, credentials, exports, and package registration

## 8. Document And Verify

- [x] 8.1 Document polling trigger selection, native Poll Times scheduling, zero-item executions used to persist scheduled state-only transitions, manual testing as a newest-record sample preview rather than production-batch simulation, possible duplicate delivery from overlapping or repeated native polls, downstream idempotency, dynamic-expression re-baselining, Created versus Created or Updated semantics, Created filter-membership limitations, default no-backlog behavior, optional Start Time, configured-Start-Time replay after result-set changes, batching, unbounded equal-timestamp boundary state, reactivation catch-up, API usage, downstream retry responsibility after a poll succeeds, same-ID same-timestamp suppression, and the absence of exactly-once, end-to-end at-least-once, gap-free concurrent pagination, delete, or intermediate-change guarantees
- [x] 8.2 Run `pnpm generate:check`
- [x] 8.3 Run `pnpm test`
- [x] 8.4 Run `pnpm lint`
- [x] 8.5 Run `pnpm build`
- [x] 8.6 Run `pnpm package:inspect`

## 9. Correct Trigger Action Labels

- [x] 9.1 Add regression coverage and include each resource name in generated n8n trigger action labels while preserving concise Event selector labels
- [x] 9.2 Prefix every generated n8n trigger action label with `On` to match trigger naming conventions

## 10. Resolve Review Findings

- [x] 10.1 Treat an empty inclusive boundary page as successful baseline exhaustion and cover collections whose descending page links to older records
- [x] 10.2 Replace process-local poll-context activation detection with state-driven initialization and cover scheduled polling through a fresh context
- [x] 10.3 Group nested trigger operations by emitted resource plus parent scope and keep Event labels limited to `Created` or `Created or Updated`
- [x] 10.4 Add an n8n UI acceptance test plan for generated polling triggers

## 11. Show Polling Endpoint Subtitles

- [x] 11.1 Add regression coverage and render each configured trigger subtitle as the source action endpoint description followed by the active snake_case cursor field

## 12. Accept Native Start Time Values

- [x] 12.1 Add regression coverage for native n8n local date-time values and invalid calendar dates
- [x] 12.2 Interpret native Start Time values in the workflow timezone while preserving explicit-offset RFC 3339 support and UTC state canonicalization
