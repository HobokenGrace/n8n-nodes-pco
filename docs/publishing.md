# Publishing

Use this checklist to publish `@hobokengrace/n8n-nodes-pco` from GitHub Actions with npm provenance. Do not publish this package from a local machine.

## Repository Release Checklist

Before creating a GitHub Release:

1. Review `package.json` metadata, including `name`, `version`, `description`, `keywords`, `repository`, `bugs`, `homepage`, `publishConfig.access`, `main`, `types`, `files`, and `n8n` paths.
2. Confirm the version is the release version. The first publishable release is `0.1.0`.
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
6. Push a git tag that matches the package version, prefixed with `v`. For version `0.1.0`, use tag `v0.1.0`.
7. Create a draft GitHub Release from the existing remote tag:

```sh
pnpm release:draft
```

The script runs `gh release create v<package-version> --draft --verify-tag --generate-notes`, so it requires the GitHub CLI to be authenticated and aborts if the remote tag does not already exist.

8. Review the draft in GitHub, then publish the GitHub Release. Publishing the release triggers `.github/workflows/publish.yml`.

The publish workflow fails before publishing unless the release tag `vX.Y.Z` matches `package.json` version `X.Y.Z`.

## npmjs.org and GitHub Setup Checklist

Complete these setup steps before the first GitHub Release publish:

1. Sign in to npmjs.org with the account that will publish the package.
2. Confirm the account can publish under the `@hobokengrace` scope. If `@hobokengrace` is an npm organization, confirm the account has publish or admin permission for that organization.
3. Confirm `@hobokengrace/n8n-nodes-pco` can be published publicly. Scoped npm packages default to private unless public access is selected or `--access public` is used.
4. In GitHub, create an environment named exactly `npm` in `HobokenGrace/n8n-nodes-pco` under Settings -> Environments. Add required reviewers if maintainers want an approval gate before publishing.
5. In npmjs.org, configure a GitHub Actions Trusted Publisher for this package.
6. Do not create or rely on a long-lived `NPM_TOKEN` secret for this release path. The workflow uses npm Trusted Publishing through GitHub OIDC.

Use these Trusted Publisher values in npmjs.org:

| Field | Value |
| --- | --- |
| Repository owner | `HobokenGrace` |
| Repository name | `n8n-nodes-pco` |
| Workflow filename | `publish.yml` |
| Environment | `npm` |

## Publish Workflow

`.github/workflows/publish.yml` runs when a GitHub Release is published. It installs dependencies with pnpm and the committed lockfile on Node.js 20, runs generation drift checks, tests, linting, build, package inspection, verifies the release tag matches `package.json`, then runs:

```sh
npm publish --provenance --access public
```

Because no explicit npm dist-tag is supplied, npm publishes `0.1.0` to the default `latest` dist-tag.

## n8n Creator Portal Verification

n8n Creator Portal verification requires the npm package to be published from GitHub Actions with npm provenance before submission. Complete the provenance-based GitHub Actions release first, verify npm shows provenance for `@hobokengrace/n8n-nodes-pco`, then submit the package to the Creator Portal.
