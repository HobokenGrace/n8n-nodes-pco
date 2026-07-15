## Context

Generated Planning Center nodes already include two different pieces of metadata for each operation: a stable internal ID such as `getPeople` and a human-readable endpoint description such as `GET /people`. Today the shared renderer sets each node's `subtitle` to `={{$parameter["operation"]}}`, so the workflow canvas shows the raw operation ID instead of the endpoint hint users actually care about.

This is a shared generator concern in `src/generator/render.ts`, not a product-specific node issue. Any change should apply consistently across all generated products and should not change how operations are stored or executed.

## Goals / Non-Goals

**Goals:**

- Show the selected operation's HTTP method and relative endpoint path in the generated node subtitle/hint.
- Keep the operation option labels, stored operation IDs, and execution dispatch unchanged.
- Source the subtitle from generated operation metadata so the hint stays in sync with regenerated nodes.

**Non-Goals:**

- Renaming operation IDs or changing how saved workflows persist the selected operation.
- Changing the operation dropdown labels from user-facing names like `List People` to endpoint strings.
- Changing request execution, routing, authentication, or generated field behavior.

## Decisions

### Reuse generated operation descriptions for node subtitles

The generator should use each operation's existing `description` metadata, which already contains the desired `METHOD /path` string, as the workflow-view subtitle source.

Rationale: this is the exact user-visible string already carried through generation, so reusing it is the smallest correct change and avoids inventing a second endpoint-label format.

Alternative considered: derive the subtitle from `method` and `path` at render time. That would duplicate formatting rules and risks showing product-version prefixes such as `/people/v2/...` instead of the shorter endpoint string already captured in `description`.

### Keep operation parameter values stable and add a generated subtitle lookup

The `operation` parameter should continue storing stable operation IDs such as `getPeople`, while the generated node description should resolve that ID to the human-readable endpoint string for the subtitle/hint.

Rationale: saved workflows and execution logic already depend on operation IDs. A generated lookup preserves backward compatibility while improving the visible hint.

Alternative considered: change option values to endpoint strings. That would make the subtitle trivial but would break execution dispatch and saved workflow compatibility.

### Apply the change in shared renderer output

The subtitle behavior should be emitted by the shared renderer so every regenerated Planning Center node gets the same hint behavior.

Rationale: this is generator-owned presentation metadata and should not be patched by hand in generated node files.

## Risks / Trade-offs

- Generated subtitle expressions depend on operation descriptions remaining present -> use the shared generated operation metadata that already ships with every node.
- Subtitle logic becomes slightly more complex than the current direct parameter expression -> keep it limited to a simple ID-to-description lookup instead of broader node-description refactors.
- Existing workflow nodes will display a different subtitle after regeneration -> this is the intended UX improvement and does not change execution behavior.

## Migration Plan

1. Update the shared generator renderer to emit subtitle metadata that resolves the selected operation ID to the operation description string.
2. Regenerate generated node files.
3. Update generator tests or fixtures that assert node description metadata.
4. Verify regeneration output and tests.

Rollback is to revert the renderer and regenerated node updates, restoring the current raw operation-ID subtitle.

## Open Questions

- None.
