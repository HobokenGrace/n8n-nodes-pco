## Context

The generator already has `ProductConfig` entries and OpenAPI snapshots for Planning Center API, Calendar, Check-Ins, Current, Giving, Groups, People, Publishing, Registrations, Services, and Webhooks. Only People, Groups, and Giving currently have `generate: true`, package registration entries, exports, generated node files, and tests that expect generation.

This change expands support to every configured OpenAPI-backed Planning Center product by using the existing generator and runtime helpers. It does not introduce handwritten product-specific node implementations.

## Goals / Non-Goals

**Goals:**

- Generate product-specific node classes for all configured Planning Center OpenAPI products.
- Register all generated nodes in package metadata so n8n can load them from the built package.
- Export all generated node classes from the package entry point.
- Update generator and metadata tests to assert full product coverage.
- Keep generation deterministic so `pnpm generate:check` continues to catch stale generated files.

**Non-Goals:**

- Adding support for Planning Center products that do not have OpenAPI snapshots in this repository.
- Adding handwritten product-specific n8n nodes or custom dispatchers.
- Changing the existing Planning Center PAT credential model or request helper behavior.
- Refreshing OpenAPI snapshots unless implementation reveals a snapshot-specific generation failure that requires it.

## Decisions

### Generate every OpenAPI-backed product through configuration

Set the existing snapshot-backed products to participate in generation through `productConfigs` rather than adding a second product list.

Rationale: `generatedProductConfigs` already drives generation and generated-file checks, so expanding that source of truth keeps behavior simple and avoids drift.

Alternative considered: add a separate allowlist for publishable nodes. That would reduce the generated diff surface but would preserve the same class of product-list drift that exists today.

### Keep package registration explicit

Update `package.json` n8n node entries and `index.ts` exports to include each generated product node.

Rationale: n8n package discovery uses the built node entry list, and the current package already declares those paths explicitly. Keeping this explicit matches the existing packaging model and makes review straightforward.

Alternative considered: generate package metadata or exports from `productConfigs`. That may be useful later, but it expands the implementation surface beyond the requested product coverage change.

### Treat generated output issues as generator issues

If additional products expose OpenAPI shapes that fail generation, fix the shared generator or record a justified exclusion rather than adding product-specific hand-written code.

Rationale: the existing capability requires product-specific nodes without hand-written dispatchers. Maintaining that contract keeps support consistent across products.

Alternative considered: skip problematic products until later. That would not satisfy all OpenAPI-backed product support.

### Prefer read operations in generated operation ordering

Sort generated operations within each resource so list/read-style operations appear before create, update, and delete operations.

Rationale: read-first ordering gives newly generated product nodes a safer and more predictable initial/default operation, and it keeps operation lists easier to scan across products.

Consequence: because ordering is generated globally, regenerating existing People, Groups, and Giving nodes may reorder their operation options and change the initial/default operation selected by n8n for those nodes. Request execution, credentials, and operation dispatch behavior remain unchanged.

## Risks / Trade-offs

- Additional OpenAPI products may produce a large generated diff -> mitigate by keeping implementation changes limited to configuration, package registration, generated files, and tests.
- Some OpenAPI operations may expose unmapped request or response shapes -> mitigate through shared generator improvements or documented exclusions consistent with the existing spec.
- More generated nodes increase lint and build time -> mitigate by preserving deterministic generation and running `pnpm generate:check`, `pnpm test`, `pnpm lint`, and `pnpm build`.
- Explicit package entries can drift from generation config -> mitigate with metadata tests that compare generated product configs to package node paths and entry-point exports.
- Existing generated People, Groups, and Giving nodes may show reordered operations and different default selected operations -> mitigate by documenting the user-visible ordering change while keeping request execution behavior unchanged.

## Migration Plan

1. Enable generation for every configured product with an OpenAPI snapshot.
2. Run the generator to create additional product node files.
3. Register and export all generated nodes.
4. Update tests to assert full generated product coverage and package metadata alignment.
5. Verify with generation check, tests, lint, and build.

Rollback is to revert the change, which restores generation and package registration to People, Groups, and Giving only.

## Open Questions

- None. The current assumption is that "no n8n nodes" means no handwritten product-specific nodes; support will be generated through the existing OpenAPI generator.
