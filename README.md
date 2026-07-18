# n8n-nodes-pco

Generated n8n community nodes for Planning Center Online.

## Authentication

Create a Planning Center Personal Access Token in Planning Center, then create
the `Planning Center PAT API` credential in n8n with:

- Application ID
- Secret
- Base URL, defaulting to `https://api.planningcenteronline.com`

The credential test calls `GET {baseUrl}/people/v2/me` to verify access. The
secret is only used for Basic authentication and is not included in node output
or package-created errors.

## Generated Nodes

This package generates one node per Planning Center product. The bootstrap
includes People, Groups, and Giving. Generated operations call shared runtime
helpers for authentication, retries, pagination, Continue On Fail handling, and
JSON:API output normalization.

Generated source lives under `nodes/generated/<product>` and should not be
hand-edited. Update the generator or OpenAPI snapshots, then regenerate.

## OpenAPI Snapshots

Committed OpenAPI inputs live at `openapi/<product>/<date>.json`. Normal
generation uses those files so local builds and CI are deterministic and do not
depend on Planning Center's OpenAPI endpoint availability.

Refresh snapshots explicitly with:

```sh
pnpm openapi:refresh
```

Review the snapshot diff before regenerating nodes.

Repository-owned operations and reviewed corrections are maintained separately
from vendor snapshots. See [Planning Center API Supplements](docs/api-supplements.md)
for the package contract, safe REST Client capture workflow, sanitization rules,
and add/override lifecycle.

## Generation

Regenerate committed node source from the active snapshots with:

```sh
pnpm generate
```

Check for generated-source drift without keeping changes with:

```sh
pnpm generate:check
```

## Local Checks

Run the same checks used by CI:

```sh
pnpm generate:check
pnpm test
pnpm lint
pnpm build
```

`pnpm build` compiles committed source and copies assets. It does not run
generation.

This package includes a prototype of the newer `@n8n/node-cli` workflow:

```sh
pnpm dev
pnpm lint:n8n
pnpm release
```

`pnpm build` already uses `n8n-node build`, followed by the package-specific
asset copy step. `pnpm lint` intentionally uses `eslint.config.repo.mjs` for the
current generated-node and generator/test layout. `pnpm lint:n8n` is stricter
and currently represents follow-up compliance work for n8n Cloud-style rules,
including generated-node `usableAsTool`, connection type constants,
Continue On Fail handling, themed icons, and keeping generator/test sources out
of the strict community-node lint surface.

## Publishing

Maintainers can follow the release checklist in [docs/publishing.md](docs/publishing.md)
to publish the package from GitHub Actions with npm provenance.

## OAuth Later

The bootstrap intentionally ships PAT authentication first. Generated operations
depend on shared Planning Center request helpers, so a future OAuth credential
can authenticate the same operation surface without endpoint-by-endpoint rewrites.
