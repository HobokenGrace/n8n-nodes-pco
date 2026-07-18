## 1. Generator Metadata Flow

- [x] 1.1 Replace unofficial warning description injection in `src/generator/effectiveOpenApi.ts` with a Planning Center stability extension on supplemented operations.
- [x] 1.2 Add operation stability to the generated operation model in `src/generator/model.ts`, defaulting non-supplemented operations to official stability.
- [x] 1.3 Read the stability extension in `src/generator/openapi.ts` when building `GeneratedOperation` objects.

## 2. Rendering Behavior

- [x] 2.1 Ensure operation subtitles continue to render from clean operation descriptions without the full unofficial endpoint warning sentence.
- [x] 2.2 Ensure operation dropdown option descriptions use clean operation descriptions or route fallbacks without prepended stability warning text.
- [x] 2.3 Include machine-readable stability metadata in generated operation output where useful for tests and future presentation logic.

## 3. Tests And Generated Output

- [x] 3.1 Update effective OpenAPI tests to assert unofficial supplemented operations receive stability metadata instead of warning-injected descriptions.
- [x] 3.2 Update generator tests to assert unofficial generated operations have stability metadata and clean user-facing descriptions/subtitles.
- [x] 3.3 Run `pnpm generate` to refresh committed generated nodes.

## 4. Verification

- [x] 4.1 Run focused tests covering effective OpenAPI supplements and generated node descriptions.
- [x] 4.2 Run `pnpm generate:check` to confirm generated output is deterministic.
- [x] 4.3 Run any additional relevant CI checks if the implementation touches broader generator behavior.
