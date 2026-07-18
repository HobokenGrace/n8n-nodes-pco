## 1. Resolve Scheduling Gate

- [ ] 1.1 Inspect the installed n8n polling contracts and representative core polling nodes to determine whether native `pollTimes` can cleanly enforce a 2-minute default and integer minute range from 1 through 2,147,483,647
- [ ] 1.2 Add a minimal type-level or node-description test proving the supported native schedule shape and record the result in the design; if the preferred contract is unsupported, stop implementation and request the required product decision

## 2. Model Polling Eligibility

- [ ] 2.1 Add generator tests for collection eligibility requiring same-field `order` and `where[created_at][gte]` or `where[updated_at][gte]`, including non-collection and partial-contract exclusions
- [ ] 2.2 Extend the generated operation model and OpenAPI parser with deterministic polling metadata derived from qualifying list operations
- [ ] 2.3 Add tests for stable polling operation IDs and direct and `(via <Scope>)` Created and Created or Updated labels

## 3. Render Product Trigger Nodes

- [ ] 3.1 Add renderer tests proving one trigger node is emitted per qualifying product and no empty trigger node is emitted for an ineligible product
- [ ] 3.2 Render product trigger descriptions, resources, operations, credentials, icons, required path parameters, and shared resource locators from polling metadata
- [ ] 3.3 Reuse remaining filters, includes, and sparse fields while excluding the active cursor filters, order, offset, and page-size controls from trigger configuration
- [ ] 3.4 Add Poll Interval, Max Records Per Poll, and optional start-time controls with the validated native scheduling contract, positive-integer batch validation, default batch size 100, and no package-defined batch maximum

## 4. Implement Polling State And Lifecycle

- [ ] 4.1 Add runtime tests for versioned state and configuration fingerprints covering credentials, operation, scope, start time, result filters, output-only options, interval, and batch size
- [ ] 4.2 Implement persistent node polling state that resets for result-set changes, survives ordinary deactivation, and resumes the saved watermark on reactivation
- [ ] 4.3 Add tests for default newest-record baselining, equal-timestamp baseline IDs, empty-collection initialization, and explicit historical start times
- [ ] 4.4 Implement first-activation baselining without output and inclusive historical initialization when a start time is configured
- [ ] 4.5 Add tests and implementation for non-stateful manual execution returning only the newest matching normalized resource

## 5. Implement Cursor Polling And Batching

- [ ] 5.1 Add runtime tests for ascending inclusive polling, pagination, equal-timestamp IDs, late same-timestamp arrivals, and duplicate resources within a poll
- [ ] 5.2 Implement `gte` watermark requests, runtime-owned ordering and pagination, boundary-ID deduplication, and deterministic oldest-first output
- [ ] 5.3 Add tests for the default 100-record cap, custom positive batch sizes, multi-poll catch-up, and cursor advancement only through emitted resources
- [ ] 5.4 Implement configurable batch collection across PCO pages without applying a package-defined upper bound
- [ ] 5.5 Add tests proving cursor attributes remain available when sparse fields are selected and includes retain existing compound-document behavior
- [ ] 5.6 Route detected resources through shared JSON:API normalization and emit one n8n item per resource

## 6. Make Poll Failures Atomic

- [ ] 6.1 Add tests for first-page, later-page, invalid-cursor, and normalization failures proving no partial output and no watermark advancement
- [ ] 6.2 Validate the complete batch before state advancement and surface request, pagination, cursor, and normalization errors through n8n polling errors

## 7. Generate And Register Trigger Outputs

- [ ] 7.1 Extend generation output and drift checking to write qualifying product trigger source and copy the corresponding product assets
- [ ] 7.2 Extend package metadata and entry-point generation or alignment checks so every generated trigger is registered and exported exactly once
- [ ] 7.3 Run `pnpm generate` and review the committed trigger set, operation labels, scope fields, and absence of empty product triggers
- [ ] 7.4 Add metadata tests covering generated trigger node API version, trigger grouping, credentials, exports, and package registration

## 8. Document And Verify

- [ ] 8.1 Document polling trigger selection, Created versus Created or Updated semantics, default no-backlog behavior, optional start time, batching, reactivation catch-up, API usage, and the absence of delete or intermediate-change guarantees
- [ ] 8.2 Run `pnpm generate:check`
- [ ] 8.3 Run `pnpm test`
- [ ] 8.4 Run `pnpm lint`
- [ ] 8.5 Run `pnpm build`
- [ ] 8.6 Run `pnpm package:inspect`
