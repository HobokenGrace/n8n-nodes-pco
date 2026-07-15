## 1. Update Shared Generator Metadata

- [x] 1.1 Update `src/generator/render.ts` so generated node subtitles resolve the selected operation ID to the operation's endpoint description.
- [x] 1.2 Keep generated operation option values and execution dispatch keyed by the existing stable operation IDs.
- [x] 1.3 Add or update a generator-level assertion that verifies generated node subtitles no longer use the raw `{{$parameter["operation"]}}` value directly.

## 2. Regenerate Generated Nodes

- [x] 2.1 Regenerate the generated Planning Center node files so subtitle metadata changes are applied across products.
- [x] 2.2 Verify representative generated nodes such as People and Registrations now render endpoint-based subtitles like `GET /people`.

## 3. Verify the Change

- [x] 3.1 Run `pnpm generate:check` and resolve any stale generated output.
- [x] 3.2 Run the relevant test suite and resolve failures.
- [x] 3.3 Run `pnpm build` and resolve any compile issues caused by the subtitle metadata change.
