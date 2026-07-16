# Publishing

Use this checklist to publish `@hobokengrace/n8n-nodes-pco` from GitHub Actions with npm provenance. Do not publish normal releases from a local machine.

`0.1.0` was the bootstrap npm publish needed to create the npm package before npm Trusted Publishing could be configured. Starting with `0.1.1`, releases should go through the GitHub Release workflow below.

## Repository Release Checklist

Before creating a GitHub Release:

1. Review `package.json` metadata, including `name`, `version`, `description`, `keywords`, `repository`, `bugs`, `homepage`, `publishConfig.access`, `main`, `types`, `files`, and `n8n` paths.
2. Confirm the version is the release version. For this release, `package.json` must be `0.1.1`.
3. Run the full local release preflight:

```sh
pnpm generate:check
pnpm test
pnpm lint
pnpm build
pnpm package:inspect
```

4. Confirm `pnpm package:inspect` verifies the npm tarball includes compiled runtime files, declaration files, credential files, generated Planning Center node files, and copied SVG assets.
5. Open and merge a reviewed pull request. CI runs the same non-publishing release preflight on pull requests and pushes to `main`.
6. Push a git tag that matches the package version, prefixed with `v`. For version `0.1.1`, use tag `v0.1.1`.
7. Create a draft GitHub Release from the existing remote tag:

```sh
pnpm release:draft
```

The script runs `gh release create v<package-version> --draft --verify-tag --generate-notes`, so it requires the GitHub CLI to be authenticated and aborts if the remote tag does not already exist.

8. Review the draft in GitHub, then publish the GitHub Release. Publishing the release triggers `.github/workflows/publish.yml`.

The publish workflow fails before publishing unless the release tag `vX.Y.Z` matches `package.json` version `X.Y.Z`.

## Script Reference

- `pnpm build` runs `n8n-node build` and then `node scripts/copy-assets.mjs` so compiled files and SVG assets are present under `dist`.
- `pnpm lint` runs the repository ESLint config with `eslint --config eslint.config.repo.mjs .`.
- `pnpm lint:n8n` runs the stricter `n8n-node lint` check. It is useful follow-up validation, but it is not currently part of CI or the publish workflow.
- `pnpm package:inspect` runs `npm pack --json --dry-run` and fails if required package files are missing or source/generator inputs would be published.
- `pnpm release` is the `@n8n/node-cli` release command. In GitHub Actions it runs lint, build, and `npm publish` with npm provenance enabled.
- `pnpm release:draft` creates a draft GitHub Release for `v<package-version>` from an existing remote tag.

## npmjs.org and GitHub Setup Checklist

Complete these setup steps before publishing with provenance from GitHub Actions:

1. Sign in to npmjs.org with the account that will publish the package.
2. Confirm the account can publish under the `@hobokengrace` scope. If `@hobokengrace` is an npm organization, confirm the account has publish or admin permission for that organization.
3. Confirm `@hobokengrace/n8n-nodes-pco` can be published publicly. Scoped npm packages default to private unless public access is selected or `--access public` is used.
4. In GitHub, create an environment named exactly `npm` in `HobokenGrace/n8n-nodes-pco` under Settings -> Environments. Add required reviewers if maintainers want an approval gate before publishing.
5. In npmjs.org, configure a GitHub Actions Trusted Publisher for this package. If npm does not allow this before the package exists, publish only the bootstrap package needed to create the npm package, then configure Trusted Publishing before the next release.
6. Do not create or rely on a long-lived `NPM_TOKEN` secret for this release path. The workflow uses npm Trusted Publishing through GitHub OIDC.

Use these Trusted Publisher values in npmjs.org:

| Field | Value |
| --- | --- |
| Repository owner | `HobokenGrace` |
| Repository name | `n8n-nodes-pco` |
| Workflow filename | `publish.yml` |
| Environment | `npm` |

## Publish Workflow

`.github/workflows/publish.yml` runs when a GitHub Release is published. It installs npm 11 for npm Trusted Publishing support, installs dependencies with pnpm 10.30.2 and the committed lockfile on Node.js 22, runs generation drift checks, tests, linting, build, package inspection, verifies the release tag matches `package.json`, then runs:

```sh
pnpm release
```

In GitHub Actions, `n8n-node release` sets `NPM_CONFIG_PROVENANCE=true` before invoking `npm publish`. npm Trusted Publishing requires npm CLI 11.5.1 or newer and Node.js 22.14.0 or newer, so the workflow upgrades npm before publishing. Public scoped package access comes from `publishConfig.access` in `package.json`. Because no explicit npm dist-tag is supplied, npm publishes the release version to the default `latest` dist-tag.

## n8n Creator Portal Verification

n8n Creator Portal verification requires the npm package to be published from GitHub Actions with npm provenance before submission. Complete the provenance-based GitHub Actions release first, verify npm shows provenance for `@hobokengrace/n8n-nodes-pco`, then submit the package to the Creator Portal.
