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

## Polling Triggers

Qualifying products also provide generated polling trigger nodes. Select the
emitted Resource and then a `Created` or `Created or Updated` Event. Nested
resources include their parent scope, such as `Form Submission (via Form)`.
`Created` follows
`created_at`; it does not detect an older resource that starts matching a filter
later. `Created or Updated` follows `updated_at`, so it observes creation and the
latest representation of later changes whose timestamp advances. Polling does
not detect deleted resources or every intermediate change between polls.

n8n supplies the native **Poll Times** schedule. The package does not add a
second interval or timer. Each Poll Time makes Planning Center API requests and
emits at most **Max Records Per Poll** records, defaulting to 100 and limited to
1,000. A larger backlog continues one capped batch at later Poll Times; the
package does not schedule immediate follow-up polls. Choose the Poll Times and
batch size with Planning Center API usage in mind.

Leave **Start Time** empty to baseline the newest currently matching records on
activation and emit only later changes. No existing resource is emitted by that
activation. A past or current RFC 3339 value starts inclusive historical
catch-up at the first Poll Time. A future value keeps the workflow active and
quiet until a matching resource reaches that time. Reactivation with unchanged
settings resumes the saved watermark and may immediately emit one capped batch
of downtime changes during n8n's activation poll, before the next configured
Poll Time. Changing
credentials, Resource/Event, path scope, Start Time, or a result filter applies
fresh activation semantics. With a configured Start Time that reset replays
inclusively and can re-emit previously delivered resources; stable expressions
preserve state, while expressions resolving to different result-affecting
values reset it. Poll Times, batch size, includes, and sparse output fields do
not reset the watermark.

Manual **Test workflow** execution is a non-stateful sample preview. It applies
scope, filters, includes, and sparse fields, ignores Start Time and production
state, and returns at most the newest matching normalized resource. It does not
predict activation output or the next catch-up batch. A scheduled configuration
reset may create a successful execution with zero items so n8n persists the new
state; this is an expected state-persistence execution, not a resource event or
trigger failure. An unchanged poll with no resources starts no execution.

Polling uses an inclusive timestamp watermark and retains every `(type, id)`
seen at the current timestamp without a package-defined limit. A late identity
at that timestamp can still emit, while the same identity at the same timestamp
is suppressed even if its representation changed. Concurrently reordered PCO
offset pages cannot provide a gap-free snapshot. Native polls may also overlap
or repeat before static state is persisted, so duplicate resources or batches
are possible. Use idempotent downstream processing where duplicates matter.

A batch successfully returned by the trigger advances its watermark before
downstream nodes finish. It is not replayed solely because a later node fails;
workflow authors are responsible for downstream retry and recovery. The
trigger provides neither exactly-once nor end-to-end at-least-once delivery and
does not guarantee gap-free concurrent pagination, deletion events, or every
intermediate resource version.

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
```

Publishing is performed only by `.github/workflows/publish.yml`; maintainers
must follow [`docs/publishing.md`](docs/publishing.md).

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
