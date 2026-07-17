# Repository Guide

## Toolchain

- Use Node 22 (`.node-version`) and pnpm 10.30.2 (`packageManager` and CI). Install with `pnpm install --frozen-lockfile` when reproducing CI.
- `pnpm build` runs `n8n-node build` and copies SVG assets into `dist`; it does not regenerate node source.

## Source Boundaries

- `openapi/<product>/<date>.json` contains committed API inputs. Generation is offline and deterministic; `src/generator/config.ts` selects the active snapshot and generated products.
- `src/generator/` parses snapshots and renders nodes. Change this layer for generated behavior.
- `nodes/generated/<product>/` is committed output. Never hand-edit its `.ts` or copied `.svg` files; run `pnpm generate` after changing the generator, snapshots, config, or canonical icons in `nodes/assets/`.
- `src/runtime/` is shared hand-written execution code for authentication, requests/retries, pagination, JSON:API normalization, resource locators, and Continue On Fail behavior.
- `index.ts` exports credentials and every generated node; `package.json#n8n` separately lists the compiled credential and node entrypoints. Metadata tests keep these surfaces aligned.

## Generation

- `pnpm generate:check` detects drift without modifying tracked generated files.
- `pnpm openapi:refresh` makes live requests for every configured product and overwrites the configured snapshot paths. Review snapshot diffs before running `pnpm generate` and committing both inputs and outputs.

## Verification

- Match CI order: `pnpm generate:check`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm package:inspect`.
- Run one suite with `pnpm exec vitest run tests/runtime.test.ts` (or `tests/generator.test.ts` / `tests/metadata.test.ts`). Focus one test with `-t "test name"`.
- `pnpm lint` uses the repository config that understands generator and test sources. `pnpm lint:n8n` is a stricter community-node check and is useful follow-up validation, but is intentionally not part of CI.

## Publishing

- Do not publish normal releases locally. Follow `docs/publishing.md`; publishing is triggered by a GitHub Release whose `vX.Y.Z` tag must match `package.json` and uses npm Trusted Publishing.
