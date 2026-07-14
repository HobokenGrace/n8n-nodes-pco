## Context

Planning Center node descriptions are generated from OpenAPI snapshots, with display labels derived from schema, path, query, body attribute, and relationship names. Some generation paths already normalize identifier acronyms to `ID` for body fields, while other paths still emit labels with inconsistent acronym casing in generated node files and tests.

## Goals / Non-Goals

**Goals:**
- Ensure every user-facing n8n label produced by the generator uses `ID` and `IDs` for identifier acronyms.
- Keep internal names, API parameter names, JSON keys, and operation IDs unchanged.
- Add regression coverage so generated labels cannot reintroduce mixed-case identifier acronym casing.
- Regenerate generated node files after the generator behavior changes.

**Non-Goals:**
- Renaming n8n property `name` values or Planning Center API fields.
- Changing descriptions, request payload structure, response parsing, or authentication behavior.
- Rewording unrelated labels that do not contain the identifier acronym.

## Decisions

- Centralize label normalization in the generator instead of patching generated files directly. Generated node files are derived artifacts, so editing them without changing generation logic would be overwritten by the next `pnpm generate` run.
- Apply normalization only to display labels. This preserves existing workflow compatibility because n8n property names and API request field names remain stable.
- Normalize whole acronym tokens after title-casing. This covers labels derived from snake_case values such as `person_id` and plural identifiers such as `campus_ids`, while avoiding accidental replacements inside unrelated words.
- Keep the existing body field behavior but route it through the same normalization helper. This avoids parallel capitalization rules and makes future generator paths easier to audit.

## Risks / Trade-offs

- [Risk] A label containing the letters `id` inside a normal word could be incorrectly changed. -> Mitigation: normalize only whole identifier acronym word tokens.
- [Risk] Generated files may remain stale after changing the generator. -> Mitigation: run the generator and generated-output check as part of implementation verification.
- [Risk] Tests may assert old mixed-case acronym labels. -> Mitigation: update expectations to assert `ID` and add a broad regression check across generated display names.

## Migration Plan

1. Add or reuse a generator display-label normalization helper.
2. Apply it to all generated user-facing display labels that can contain identifier terminology.
3. Update tests and regenerate node files.
4. Verify with `pnpm test`, `pnpm generate:check`, and any existing lint/build checks relevant to generated artifacts.

Rollback is straightforward: revert the generator, test, and generated-file changes together.

## Open Questions

- None.
