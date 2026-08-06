## Context

Supplemented Planning Center operations already carry `metadata.stability` in their supplement package. The generator currently turns unofficial stability into user-facing copy by prepending a full warning sentence to the OpenAPI operation description. n8n then renders that same description in the operation dropdown and selected node subtitle, so an internal stability warning becomes prominent workflow-view text.

Generated node source under `nodes/generated/` is committed but should remain derived output. The durable change belongs in the generator and tests, followed by regeneration.

## Goals / Non-Goals

**Goals:**

- Preserve endpoint stability as machine-readable generated metadata.
- Stop injecting the full unofficial endpoint warning into generated operation descriptions.
- Keep workflow subtitles and operation dropdown descriptions focused on the endpoint purpose or route.
- Keep unofficial endpoint stability testable for supplemented operations.

**Non-Goals:**

- Changing request execution, pagination, JSON:API normalization, credentials, or operation IDs.
- Removing supplement validation or observed evidence requirements.
- Designing a new n8n UI component for warning badges.
- Hand-editing generated node files.

## Decisions

1. Use an OpenAPI vendor extension for stability metadata.

   The effective OpenAPI merge step should add a Planning Center-specific extension such as `x-pco-stability` to supplemented operations. `src/generator/openapi.ts` can then read that extension while deriving `GeneratedOperation` objects. This keeps metadata attached to the operation contract and avoids introducing a parallel supplement side channel through the generator.

   Alternative considered: add an external route-to-stability map returned beside the effective OpenAPI document. That would avoid vendor extensions but would require changing more function signatures and keeping operation identity synchronized across modules.

2. Add stability to the generated operation model.

   `GeneratedOperation` should carry `stability: 'official' | 'unofficial'`, defaulting to `official` when no extension is present. Rendered runtime operation metadata may include this value so generated files and tests can identify unofficial operations without parsing descriptions.

   Alternative considered: only use the extension inside tests and omit it from generated output. That would reduce generated file diff size but would make future UI/documentation handling harder.

3. Keep descriptions semantically clean.

   Operation descriptions should continue to come from `operation.description`, `operation.summary`, or the fallback route string. The generator should not prepend the full unofficial warning sentence to that value. Existing operation subtitle and dropdown rendering can continue using `operation.description` once it is clean.

   Alternative considered: replace the long warning with `Unofficial endpoint.` in descriptions. That is smaller, but it still mixes stability metadata with descriptive copy and can still appear as workflow-view text.

## Risks / Trade-offs

- Existing tests expect the warning sentence in descriptions -> Update tests to assert stability metadata and clean descriptions instead.
- Vendor extension names can become informal API within the generator -> Keep the extension scoped with a Planning Center prefix and centralize the constant.
- Generated runtime metadata grows slightly -> Accept the small output increase because it preserves useful machine-readable provenance for future presentation decisions.
- Users may no longer see an unofficial indicator in the workflow subtitle -> This is intentional for this change; stability remains available for future intentional display outside the description field.

## Migration Plan

1. Update the effective OpenAPI supplement merge to attach stability metadata instead of warning text.
2. Update generation models and rendering to carry stability metadata through generated output.
3. Update tests to assert unofficial operations have metadata and clean user-facing descriptions.
4. Run `pnpm generate` to refresh committed generated nodes.
5. Verify with `pnpm generate:check` and focused tests.

Rollback is straightforward: revert the generator/test/generated-file changes. No persisted workflow data or external API contracts are migrated.

## Open Questions

None.
