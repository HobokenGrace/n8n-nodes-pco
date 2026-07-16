## 1. Package Publication Readiness

- [x] 1.1 Review `package.json` for npm release metadata and add missing publication fields such as `repository`, `bugs`, `homepage`, and `publishConfig.access` for a public scoped package.
- [x] 1.2 Set the first publishable package version to `0.1.0`, replacing the current placeholder `0.0.0`.
- [x] 1.3 Verify the existing `files`, `main`, `types`, and `n8n` metadata point only to package contents that exist after `pnpm build`.
- [x] 1.4 Add a repeatable package inspection script that runs after `pnpm build`, uses `npm pack --json --dry-run`, and fails when required `dist` files or copied assets are missing.

## 2. GitHub Actions CI Workflow

- [x] 2.1 Create `.github/workflows/ci.yml` for pull requests and pushes to `main`.
- [x] 2.2 Configure CI to install pnpm dependencies using the committed lockfile and Node.js 20.
- [x] 2.3 Run `pnpm generate:check`, `pnpm test`, `pnpm lint`, `pnpm build`, and the scripted package inspection in CI.

## 3. GitHub Actions Publishing Workflow

- [x] 3.1 Create `.github/workflows/publish.yml` for deliberate npm publishing when a GitHub Release is published.
- [x] 3.2 Configure the workflow to install pnpm dependencies using the committed lockfile and Node.js 20.
- [x] 3.3 Run `pnpm generate:check`, `pnpm test`, `pnpm lint`, `pnpm build`, and the scripted package inspection before publishing.
- [x] 3.4 Fail before publishing unless the GitHub Release tag `vX.Y.Z` matches `package.json` version `X.Y.Z`.
- [x] 3.5 Configure the publish job with GitHub Environment `npm`, `id-token: write`, and `npm publish --provenance --access public` using npm Trusted Publishing.
- [x] 3.6 Publish the initial `0.1.0` release to npm's default `latest` dist-tag.

## 4. Publishing Documentation

- [x] 4.1 Add `docs/publishing.md` explaining the repository-side release checklist: metadata review, versioning, generation check, tests, lint, build, package inspection, release tag/version matching, and GitHub Release trigger.
- [x] 4.2 Add a README link to `docs/publishing.md` for maintainers.
- [x] 4.3 Document the npmjs.org setup checklist: sign in, confirm package or organization ownership for `@hobokengrace/n8n-nodes-pco`, ensure public package access, configure Trusted Publishing, and configure the GitHub Environment `npm`.
- [x] 4.4 Document the Trusted Publisher values npmjs.org needs: GitHub repository owner, repository name, workflow filename `publish.yml`, and environment `npm`.
- [x] 4.5 Document that n8n Creator Portal verification requires the npm package to be published from GitHub Actions with provenance before submission.

## 5. Manual GitHub and npmjs.org Account Setup

These steps require maintainer-owned GitHub and npmjs.org permissions and cannot be completed by repository code alone. Complete them before publishing `0.1.0`.

- [x] 5.1 Confirm npm account access for `@hobokengrace/n8n-nodes-pco`.
  - Sign in to npmjs.org with the npm account that will publish the package.
  - Confirm the account can publish under the `@hobokengrace` scope.
  - If `@hobokengrace` is an npm organization, confirm the npm account has publish/admin permission for that organization.
  - Confirm the package can be published publicly as `@hobokengrace/n8n-nodes-pco`; do not configure it as a private scoped package.
  - Record completion: npm account/organization checked: `@hobokengrace/n8n-nodes-pco@0.1.0` published publicly to npm, completed by: `ntcho`, date: `2026-07-16`.
- [x] 5.2 Create the GitHub Environment `npm`.
  - In GitHub, open `HobokenGrace/n8n-nodes-pco`.
  - Go to Settings -> Environments.
  - Create an environment named exactly `npm`.
  - Optionally configure required reviewers if maintainers want a final manual approval gate before `npm publish` runs.
  - Record completion: required reviewers configured: `none`, completed by: `ntcho`, date: `2026-07-16`.
- [x] 5.3 Configure npm Trusted Publishing for GitHub Actions.
  - In npmjs.org, open the package or organization publishing settings for `@hobokengrace/n8n-nodes-pco`.
  - Add a GitHub Actions Trusted Publisher.
  - Set repository owner to `HobokenGrace`.
  - Set repository name to `n8n-nodes-pco`.
  - Set workflow filename to `publish.yml`.
  - Set environment to `npm`.
  - Record completion: npm Trusted Publisher configured: GitHub Actions publisher for `HobokenGrace/n8n-nodes-pco`, workflow `publish.yml`, environment `npm`, allowed action `npm publish`, completed by: `ntcho`, date: `2026-07-16`.
- [x] 5.4 Confirm no long-lived npm token fallback is configured.
  - Do not create a GitHub Actions secret named `NPM_TOKEN` for this change.
  - If an existing `NPM_TOKEN` repository or environment secret exists, confirm the publish workflow does not reference it.
  - Record completion: `NPM_TOKEN` not configured or not used: `.github/workflows/publish.yml` only runs `npm publish --provenance --access public` and does not reference `NPM_TOKEN` or `NODE_AUTH_TOKEN`, completed by: `ntcho`, date: `2026-07-16`.
- [x] 5.5 Complete the first provenance release from GitHub after implementation is merged.
  - Confirm `package.json` version is `0.1.1` on the commit being released.
  - Create a GitHub Release from the released commit with tag `v0.1.1`.
  - Publish the GitHub Release to trigger `.github/workflows/publish.yml`.
  - If the `npm` environment requires approval, approve the deployment in GitHub Actions.
  - Verify npm publishes `@hobokengrace/n8n-nodes-pco@0.1.1` with provenance and the default `latest` dist-tag.
  - Record completion: GitHub Release URL: `https://github.com/HobokenGrace/n8n-nodes-pco/releases/tag/v0.1.1`, npm package URL: `https://www.npmjs.com/package/@hobokengrace/n8n-nodes-pco/v/0.1.1`, completed by: `ntcho`, date: `2026-07-16`.

## 6. Verification

- [x] 6.1 Run the full local release preflight documented for maintainers.
- [x] 6.2 Verify the scripted package inspection confirms compiled Planning Center node files, credential files, runtime helpers, declaration files, and copied assets are included in the tarball.
- [x] 6.3 Confirm CI runs the full non-publishing release preflight on pull requests and pushes to `main`.
- [x] 6.4 Confirm the publish workflow reaches the publish step only after generation checks, tests, linting, build, package inspection, and tag/version verification pass.
- [x] 6.5 After npmjs.org setup is complete, publish `0.1.1` from a GitHub Release tagged `v0.1.1` and verify npm shows provenance for the package.
