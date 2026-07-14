## 1. Expand Product Generation

- [x] 1.1 Enable generation for every configured Planning Center product with an OpenAPI snapshot in `src/generator/config.ts`.
- [x] 1.2 Run the generator and add generated node files for Planning Center API, Calendar, Check-Ins, Current, Publishing, Registrations, Services, and Webhooks.
- [x] 1.3 Fix shared generator issues or record justified exclusions if any newly generated product exposes an OpenAPI shape that cannot be safely represented.

## 2. Register Generated Nodes

- [x] 2.1 Add every generated product node's built file path to `package.json` n8n node registration.
- [x] 2.2 Export every generated product node class from `index.ts`.

## 3. Update Coverage Tests

- [x] 3.1 Update generator tests so generated product summaries include all configured OpenAPI-backed Planning Center products.
- [x] 3.2 Add or update metadata tests to fail when `package.json` n8n node registration omits a generated product node.
- [x] 3.3 Add or update metadata tests to fail when `index.ts` omits a generated product node export.

## 4. Verify

- [x] 4.1 Run `pnpm generate:check` and resolve any stale generated output.
- [x] 4.2 Run `pnpm test` and resolve failures.
- [x] 4.3 Run `pnpm lint` and resolve failures.
- [x] 4.4 Run `pnpm build` and resolve failures.
