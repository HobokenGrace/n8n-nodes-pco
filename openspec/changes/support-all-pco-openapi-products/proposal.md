## Why

The package currently generates and publishes Planning Center nodes for People, Groups, and Giving while OpenAPI snapshots for the remaining Planning Center products already exist in the repository. Expanding generation to every configured OpenAPI-backed product makes the package cover the full available Planning Center API surface consistently.

## What Changes

- Generate Planning Center node classes for every product in `productConfigs` that has an OpenAPI snapshot and source URL.
- Publish and export the newly generated product nodes alongside the existing People, Groups, and Giving nodes.
- Update generator expectations and tests so generated product metadata, package registration, and exports cover all OpenAPI-backed products.
- Preserve the existing generated-node request execution and credential behavior; this change expands product coverage rather than adding handwritten product-specific behavior.
- Normalize generated operation ordering so read/list operations appear before mutating operations within a resource. This also changes operation ordering and the initial/default operation choice for existing generated People, Groups, and Giving nodes.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `pco-openapi-node-generation`: generated node coverage expands from the bootstrap products to all configured Planning Center products with OpenAPI snapshots.

## Impact

- Affected source: `src/generator/config.ts`, `src/generator/generate.ts`, `src/generator/checkGenerated.ts`, `index.ts`, and generated files under `nodes/generated/`.
- Affected package metadata: `package.json` n8n node registration and any build asset copying that depends on the generated node list.
- Affected tests: generator and metadata tests that currently assert only People, Groups, and Giving are generated.
- Affected existing generated nodes: People, Groups, and Giving may have reordered operation option lists and different default selected operations after regeneration because generated operations now sort read-first.
- No new runtime credential type, external dependency, or Planning Center API authentication model is expected.
