## Context

The repository is already structured as an n8n community-node package: `package.json` uses the scoped community-node name `@hobokengrace/n8n-nodes-pco`, includes the `n8n-community-node-package` keyword, declares built credential and node paths under the `n8n` attribute, targets Node.js 20, and uses pnpm. It has no existing GitHub Actions workflow under `.github/workflows/`.

n8n documents community nodes as npm packages hosted in the npm registry and requires package names to start with `n8n-nodes-` or `@<scope>/n8n-nodes-`, include `n8n-community-node-package`, include nodes and credentials in `package.json` under `n8n`, pass lint/local testing, and publish to npm. For Creator Portal verification, n8n requires GitHub Actions publishing with npm provenance from May 1st 2026. Source: https://docs.n8n.io/connect/create-nodes/deploy-your-node/submit-community-nodes.md

## Goals / Non-Goals

**Goals:**

- Make the package publishable to npm so n8n users can install it from the npm registry without cloning and building the repository manually.
- Add a repeatable repository release path that installs with pnpm, verifies generated output, runs tests, lints, builds, inspects the npm package contents, and publishes from GitHub Actions after a GitHub Release is published.
- Add PR/main CI that runs the same non-publishing release preflight before maintainers create a GitHub Release.
- Require npm provenance and npm Trusted Publishing so the same release path can satisfy n8n Creator Portal verification requirements without long-lived npm tokens.
- Document maintainer actions required in the repository and on npmjs.org before the first release in `docs/publishing.md`, linked from the README.

**Non-Goals:**

- Changing Planning Center node behavior, generated operation coverage, authentication, or credential behavior.
- Submitting the package to the n8n Creator Portal as part of this implementation.
- Automating npm account, organization, package-access, or trusted-publisher setup, because those require maintainer-owned npmjs.org permissions.
- Introducing release tooling that replaces pnpm, the existing generator, or the existing TypeScript build.
- Supporting `NPM_TOKEN` or other long-lived npm-token publishing fallback paths in this change.

## Decisions

### Publish from GitHub Actions, not from local machines

Use a `.github/workflows/publish.yml` workflow for npm publishing. The workflow should trigger only when a GitHub Release is published, install dependencies with pnpm, run the same verification commands maintainers use locally, build the package, inspect the packed artifact, verify the release tag matches `package.json` version, and run `npm publish --provenance --access public`. The first release should set `package.json` version to `0.1.0`, use release tag `v0.1.0`, and publish to npm's default `latest` dist-tag.

Rationale: n8n requires GitHub Actions with provenance for Creator Portal verification, and publishing from CI avoids differences between local machines. The n8n docs specifically direct maintainers to add a publish workflow at `.github/workflows/publish.yml` and configure npm Trusted Publishers with workflow name `publish.yml`.

Alternative considered: Publish on every `v*` tag. This is simpler but makes accidental publishing easier than a deliberate GitHub Release event, especially before the repository has release history.

### Require npm Trusted Publishing over long-lived npm tokens

Configure npmjs.org Trusted Publishers for the package so GitHub Actions can publish through OIDC without storing a long-lived token. The publish job should target GitHub Environment `npm`, and npmjs.org Trusted Publishing setup should use the repository owner, repository name, `publish.yml` workflow filename, and `npm` environment.

Rationale: n8n's publishing docs recommend configuring npm to trust the repository's GitHub Actions workflow and note that no long-lived token is required. Long-lived tokens increase secret rotation and leakage risk.

Alternative considered: Support an `NPM_TOKEN` fallback in the same workflow. This adds secret handling and fallback behavior that the maintainers do not want for this first release path.

### Add PR CI before release publishing

Create `.github/workflows/ci.yml` for pull requests and pushes to `main`. CI should install dependencies with pnpm using the committed lockfile and Node.js 20, then run `pnpm generate:check`, `pnpm test`, `pnpm lint`, `pnpm build`, and the scripted package inspection used by the publish workflow.

Rationale: The selected release model depends on a reviewed version-bump PR before a GitHub Release is created. CI makes that reviewable commit prove the same non-publishing release preflight before npm publication is possible.

Alternative considered: Run verification only in `publish.yml`. This catches errors too late, after a Release has already been published.

### Keep publication contents build-output only

Keep `files` focused on `dist` and ensure the workflows build before packing/publishing. Add a small scripted package inspection that runs after `pnpm build` and fails if `npm pack --json --dry-run` does not include the expected `dist` entry point, declarations, credential file, generated node files, runtime helpers, and copied assets.

Rationale: Consumers installing an n8n community node from npm should receive runnable package contents and should not need TypeScript, generator inputs, or a local build step. The existing `main`, `types`, `files`, and `n8n` paths already point at `dist`, so the smallest implementation is to verify and publish that built output rather than redesigning package layout.

Alternative considered: Run `npm pack --dry-run` only and rely on maintainers to inspect the output manually. This is weaker than a failing check and would allow missing files to pass CI unnoticed.

### Document repo setup and npmjs.org setup separately

Add maintainer documentation in `docs/publishing.md`, linked from the README, that explicitly lists repository changes/checks separately from npmjs.org steps: package access, package visibility for scoped public packages, trusted publisher configuration, GitHub Environment `npm` setup, and the GitHub Release trigger.

Rationale: npmjs.org setup cannot be validated entirely from code review, but maintainers need a clear checklist to complete the first release. Separating local/repo work from account setup prevents a workflow file from implying publishing will work before npm package permissions are configured.

Alternative considered: Put all instructions in workflow comments. Workflow comments are useful for implementation details but are not discoverable enough for first-release operators.

## Risks / Trade-offs

- [Risk] The scoped npm package may publish as private by default or fail without explicit access. -> Mitigation: publish with `--access public` and document package visibility/access setup on npmjs.org.
- [Risk] Trusted publishing will fail if npmjs.org is configured with the wrong repository owner, repository name, workflow filename, or environment. -> Mitigation: document the exact `publish.yml` filename and `npm` environment requirements and include a release preflight checklist.
- [Risk] The npm tarball may omit copied icons, declarations, or generated node files. -> Mitigation: include `pnpm build` and scripted npm package inspection in CI and the publish workflow.
- [Risk] A GitHub Release could point at a tag whose version does not match `package.json`. -> Mitigation: fail the publish workflow unless release tag `vX.Y.Z` matches package version `X.Y.Z`.
- [Risk] First release may require npm organization/package ownership decisions that are outside repository control. -> Mitigation: document npmjs.org owner/package prerequisites and leave actual account setup to the maintainer.
