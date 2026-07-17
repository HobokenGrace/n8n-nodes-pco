## 1. Verify Documentation Sources

- [ ] 1.1 Reconcile README and Docker-guide claims with `package.json`, credential metadata, generated node source, package scripts, CI, and release automation
- [ ] 1.2 Verify self-hosted Community Nodes installation and PAT creation steps against current official n8n and Planning Center documentation
- [ ] 1.3 Select stable read operations for the People, Giving, and generic API walkthroughs and verify every documented field and expected behavior in current source

## 2. Build User Documentation

- [ ] 2.1 Rewrite `README.md` as a concise user-facing landing page with package purpose, self-hosted quick start, generated-node-first guidance, verified compatibility facts, and documentation navigation
- [ ] 2.2 Add `docs/getting-started.md` with self-hosted UI installation, step-by-step PAT setup, first safe read, and implementation-aligned troubleshooting
- [ ] 2.3 Add `docs/walkthroughs.md` with source-verified People, Giving, and generic API end-to-end workflows, expected output, pagination, and error guidance
- [ ] 2.4 Add `docs/nodes.md` with generated-versus-generic selection guidance and exactly one overview entry for each node registered in `package.json`

## 3. Build Contributor and Support Documentation

- [ ] 3.1 Add `docs/contributing.md` with verified prerequisites, commands, repository structure, generated-file policy, validation workflow, local Docker handoff, pull request expectations, and publishing handoff
- [ ] 3.2 Update `.docker/README.md` to link to the contributor guide and verify all currently registered Planning Center nodes load in local n8n
- [ ] 3.3 Add actionable bug-reporting, feature-request, support-boundary, credential-redaction, and personal-data-redaction guidance to the appropriate README and contributor sections

## 4. Validate Documentation

- [ ] 4.1 Verify every internal link, official external source, package name, endpoint, command, and file reference in the updated documentation
- [ ] 4.2 Compare the node catalog with `package.json` registrations and confirm every registered node appears exactly once
- [ ] 4.3 Run Prettier on changed Markdown and confirm `pnpm generate:check`, `pnpm test`, `pnpm lint`, `pnpm build`, and `pnpm package:inspect` pass
