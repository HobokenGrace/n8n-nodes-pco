# Publishing

Use this checklist to publish `@hobokengrace/n8n-nodes-pco` from GitHub Actions with npm provenance. Do not publish normal releases from a local machine.

`0.1.0` was the bootstrap npm publish needed to create the npm package before npm Trusted Publishing could be configured. Starting with `0.1.1`, releases should go through the GitHub Release workflow below.

This checklist is only for stable releases. It publishes to npm's default `latest` dist-tag. Stop and update and review the automation before publishing a prerelease or alternate npm dist-tag.

## Repository Release Checklist

Before creating a GitHub Release:

Use one shell session for the checklist. If the process is interrupted, rerun the relevant assignment and verification blocks to reconstruct `PACKAGE`, `VERSION`, `TAG`, `SHA`, and workflow run IDs from the current repository and GitHub state. Never reuse values from another release.

1. Start from a clean, synchronized `main` branch:

```sh
test -z "$(git status --porcelain)"
```

Stop if the working tree is not clean. Then synchronize `main` and verify that it remains clean:

```sh
git fetch origin main --tags &&
  git switch main &&
  git pull --ff-only origin main
```

Stop if synchronization fails. Confirm the synchronized branch remains clean:

```sh
test -z "$(git status --porcelain)"
```

2. Review `package.json` metadata, including `name`, `version`, `description`, `keywords`, `repository`, `bugs`, `homepage`, `publishConfig.access`, `main`, `types`, `files`, and `n8n` paths.
3. Choose the next stable SemVer from the changes since the previous tag: use a patch version for backward-compatible fixes, a minor version for backward-compatible features, and a major version for breaking changes. Set it in `package.json`, then verify that neither npm nor Git already contains it:

```sh
VERSION=X.Y.Z
pnpm pkg set "version=$VERSION"
PACKAGE=$(node -p "require('./package.json').name")
TAG="v$VERSION"
test "$(node -p "require('./package.json').version")" = "$VERSION"

NPM_LOOKUP=$(npm view "$PACKAGE@$VERSION" version 2>&1)
NPM_STATUS=$?

if [ "$NPM_STATUS" -eq 0 ]; then
  echo "$PACKAGE@$VERSION is already published"
  exit 1
fi

case "$NPM_LOOKUP" in
  *E404*) ;;
  *)
    printf '%s\n' "$NPM_LOOKUP"
    exit "$NPM_STATUS"
    ;;
esac

if git rev-parse -q --verify "refs/tags/$TAG" >/dev/null; then
  echo "Local tag $TAG already exists"
  exit 1
fi

git ls-remote --exit-code --tags origin "refs/tags/$TAG" >/dev/null 2>&1
REMOTE_TAG_STATUS=$?

case "$REMOTE_TAG_STATUS" in
  0)
    echo "Remote tag $TAG already exists"
    exit 1
    ;;
  2) ;;
  *)
    echo "Unable to query remote tag $TAG"
    exit "$REMOTE_TAG_STATUS"
    ;;
esac
```

Confirm this changes only the `package.json` version line. The Git tag must exactly match `TAG`. 4. Run the full local release preflight:

```sh
pnpm generate:check
pnpm test
pnpm lint
pnpm build
pnpm package:inspect
```

If generation drift is detected, stop the release. Fix the generator, snapshot, config, or icon input; run `pnpm generate`; and land the inputs and generated output in a reviewed pull request before restarting release preflight. Do not run `pnpm openapi:refresh` as part of release preflight.

5. Confirm `pnpm package:inspect` verifies the npm tarball includes compiled runtime files, declaration files, credential files, generated Planning Center node files, and copied SVG assets.
6. Confirm the version bump is the only tracked change:

```sh
git status --short
git diff --check
git diff -- package.json
```

For a routine release, `git status --short` must show only ` M package.json`, and the diff must contain only the version-line change. If any other tracked change exists, stop and land it separately before continuing. Never commit `dist/`.

7. Land all release content except the version bump through reviewed pull requests first. After preflight, create and push the release commit:

```sh
git add package.json
git diff --staged --check
git diff --staged
```

Stop if the staged check fails or the staged diff contains anything except the version-line change. Then commit and inspect the resulting commit:

```sh
git commit -m "release: $TAG"
git diff --name-only HEAD^ HEAD
git diff HEAD^ HEAD -- package.json
```

Confirm the name-only output is exactly `package.json` and the commit diff contains only the version-line change. Only then push:

```sh
git push origin main
```

Wait for CI on that exact commit before tagging.

```sh
SHA=$(git rev-parse HEAD)
git fetch origin main
test "$SHA" = "$(git rev-parse origin/main)"
```

Stop if `HEAD` does not match `origin/main`. Then locate the CI run:

```sh
gh run list --workflow ci.yml --event push --commit "$SHA" --limit 1
RUN_ID=$(gh run list --workflow ci.yml --event push --commit "$SHA" --limit 1 --json databaseId --jq '.[0].databaseId')
test -n "$RUN_ID"
```

Wait for the run to appear if `RUN_ID` is initially empty. Only after confirming it is non-empty, watch the run:

```sh
gh run watch "$RUN_ID" --exit-status
```

Tagging may proceed only after the push-triggered CI run for `SHA` succeeds. 8. Create a lightweight tag on the CI-passed commit, push it, and verify the remote target:

```sh
git tag "$TAG" "$SHA" &&
  git push origin "refs/tags/$TAG"
```

Stop if tag creation or push fails. Then verify the remote target:

```sh
REMOTE_SHA=$(git ls-remote origin "refs/tags/$TAG" | cut -f1)
test "$REMOTE_SHA" = "$SHA"
```

Do not draft the release unless the comparison succeeds. Release tags must never be moved or reused. 9. Create a draft GitHub Release from the existing remote tag:

Run this only from clean, synchronized `main` after confirming that the `package.json` version, `HEAD`, `origin/main`, and the remote tag match `VERSION`, `SHA`, and `TAG` established above.

```sh
pnpm release:draft
```

The script runs `gh release create v<package-version> --draft --verify-tag --generate-notes`, so it requires the GitHub CLI to be authenticated and aborts if the remote tag does not already exist. It creates only the draft GitHub Release; it does not create or push the tag.

10. Review the draft in GitHub, then publish the GitHub Release:

```sh
gh release view "$TAG" --json tagName,name,isDraft,isPrerelease,targetCommitish,body,url
gh release view "$TAG" --web
```

Confirm `isDraft=true`, `isPrerelease=false`, the title, tag, tag target, package version, previous-version comparison, user-visible features and fixes, and any breaking changes. Generated notes are only a starting point; edit them before publishing if they are incomplete.

Use this fallback structure and omit empty sections:

```md
### Summary

<Brief user-facing description of the release.>

### Added

- <Feature>

### Fixed

- <Fix>

### Breaking Changes

- <Required migration or behavior change>

**Full Changelog**: https://github.com/HobokenGrace/n8n-nodes-pco/compare/<previous-tag>...vX.Y.Z
```

Publishing is the irreversible trigger for `.github/workflows/publish.yml` and may require approval from the `npm` GitHub environment:

```sh
gh release edit "$TAG" --draft=false
```

Wait for the release-triggered publish workflow and verify that it is running against the tagged commit:

```sh
gh run list --workflow publish.yml --event release --commit "$SHA" --limit 1
PUBLISH_RUN_ID=$(gh run list --workflow publish.yml --event release --commit "$SHA" --limit 1 --json databaseId --jq '.[0].databaseId')
test -n "$PUBLISH_RUN_ID" && test "$(gh run view "$PUBLISH_RUN_ID" --json headSha --jq '.headSha')" = "$SHA"
```

Wait for the run to appear if `PUBLISH_RUN_ID` is initially empty. Only after confirming that it targets `SHA`, watch the run:

```sh
gh run watch "$PUBLISH_RUN_ID" --exit-status
```

The release is not complete until this workflow succeeds.

The publish workflow fails before publishing unless the release tag `vX.Y.Z` matches `package.json` version `X.Y.Z`.

11. Verify the published npm version, default dist-tag, and provenance attestation:

```sh
test "$(npm view "$PACKAGE@$VERSION" version)" = "$VERSION" &&
  test "$(npm view "$PACKAGE@$VERSION" dist-tags.latest)" = "$VERSION" &&
test "$(npm view "$PACKAGE@$VERSION" dist.attestations.provenance.predicateType)" = "https://slsa.dev/provenance/v1"
```

Wait for npm registry propagation if the version is not immediately visible. Inspect the npm page for the published version and confirm its provenance identifies `HobokenGrace/n8n-nodes-pco`, `.github/workflows/publish.yml`, `refs/tags/vX.Y.Z`, and the tagged commit `SHA`.

## Script Reference

- `pnpm build` runs `n8n-node build` and then `node scripts/copy-assets.mjs` so compiled files and SVG assets are present under `dist`.
- `pnpm lint` runs the repository ESLint config with `eslint --config eslint.config.repo.mjs .`.
- `pnpm lint:n8n` runs the stricter `n8n-node lint` check. It is useful follow-up validation, but it is not currently part of CI or the publish workflow.
- `pnpm package:inspect` runs `npm pack --json --dry-run` and fails if required package files are missing or source/generator inputs would be published.
- `pnpm release` is CI-only in this repository. Do not run it locally or set `RELEASE_MODE` locally. `.github/workflows/publish.yml` invokes it after verification to publish with npm provenance enabled.
- `pnpm release:draft` creates a draft GitHub Release for `v<package-version>` from an existing remote tag.

## One-Time Publishing Infrastructure

These setup steps are already complete for this package. Keep them as the authoritative configuration for recovery or repository migration. For routine releases, verify that the existing configuration still matches the values below; do not recreate it.

1. Sign in to npmjs.org with the account that will publish the package.
2. Confirm the account can publish under the `@hobokengrace` scope. If `@hobokengrace` is an npm organization, confirm the account has publish or admin permission for that organization.
3. Confirm `@hobokengrace/n8n-nodes-pco` can be published publicly. Scoped npm packages default to private unless public access is selected or `--access public` is used.
4. Confirm the GitHub repository is public before publishing with provenance. npm rejects provenance for public packages built from private GitHub repositories.
5. In GitHub, create an environment named exactly `npm` in `HobokenGrace/n8n-nodes-pco` under Settings -> Environments. Add required reviewers if maintainers want an approval gate before publishing.
6. In npmjs.org, configure a GitHub Actions Trusted Publisher for this package. Historical note: the local `0.1.0` bootstrap publish was used only because npm required the package to exist before Trusted Publishing could be configured.
7. Do not create or rely on a long-lived `NPM_TOKEN` secret for this release path. The workflow uses npm Trusted Publishing through GitHub OIDC.

Use these Trusted Publisher values in npmjs.org:

| Field             | Value           |
| ----------------- | --------------- |
| Repository owner  | `HobokenGrace`  |
| Repository name   | `n8n-nodes-pco` |
| Workflow filename | `publish.yml`   |
| Environment       | `npm`           |

## Publish Workflow

`.github/workflows/publish.yml` runs when a GitHub Release is published. It installs npm 11 for npm Trusted Publishing support, installs dependencies with pnpm 10.30.2 and the committed lockfile on Node.js 22, runs generation drift checks, tests, linting, build, package inspection, verifies the release tag matches `package.json`, then runs:

```sh
pnpm release
```

Only pnpm is pinned to an exact version. The workflow otherwise resolves the current Node.js 22.x, npm 11.x, `ubuntu-latest` runner, and configured major versions of GitHub actions. Record the resolved Node.js and npm versions from the workflow log when investigating a release. Exact byte-for-byte toolchain reproduction would require separately pinning those workflow inputs.

In GitHub Actions, `n8n-node release` sets `NPM_CONFIG_PROVENANCE=true` before invoking `npm publish`. npm Trusted Publishing requires npm CLI 11.5.1 or newer and Node.js 22.14.0 or newer, so the workflow upgrades npm before publishing. npm provenance also requires the source GitHub repository to be public. Public scoped package access comes from `publishConfig.access` in `package.json`. Because no explicit npm dist-tag is supplied, npm publishes the release version to the default `latest` dist-tag.

## Failure Recovery

- If a transient environment or permission failure occurs before `npm publish`, correct the external configuration and rerun the unchanged workflow against the unchanged tag.
- If repository code or workflow changes are required, land the fix separately and issue a new patch release. Do not move or reuse the existing tag.
- Once `npm view "$PACKAGE@$VERSION" version` succeeds, never attempt to republish or retarget that version. npm versions and release tags are immutable.

Only after confirming that npm does not contain the version, rerun and watch the unchanged publish workflow:

```sh
NPM_LOOKUP=$(npm view "$PACKAGE@$VERSION" version 2>&1)
NPM_STATUS=$?

if [ "$NPM_STATUS" -eq 0 ]; then
  echo "$PACKAGE@$VERSION is already published; do not rerun"
  exit 1
fi

case "$NPM_LOOKUP" in
  *E404*) ;;
  *)
    printf '%s\n' "$NPM_LOOKUP"
    exit "$NPM_STATUS"
    ;;
esac

gh run rerun "$PUBLISH_RUN_ID"
gh run watch "$PUBLISH_RUN_ID" --exit-status
```

## n8n Creator Portal Verification

n8n Creator Portal verification requires the npm package to be published from GitHub Actions with npm provenance before submission. Complete checklist step 11 and confirm the npm page identifies the expected workflow, tag, and commit before submitting the package to the Creator Portal.
