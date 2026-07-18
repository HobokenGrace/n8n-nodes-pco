# Planning Center API Supplements

Planning Center operations that are absent from, or need a reviewed correction
to, the configured vendor snapshot live under:

```text
openapi/<product>/supplements/<method>-<route-name>/
  metadata.json
  openapi.json | patch.json
  request.http
  response.json
```

Use one directory per HTTP method and snapshot-relative path. Multiple payload
variants for the same operation belong as named examples in one `request.http`.
Only include `response.json` when the observed response has a non-empty JSON
body.

## Execute An Observed Request

Install the recommended VS Code REST Client extension, then create an ignored
`.env` beside the selected `request.http`:

```dotenv
PCO_API_URL=https://api.planningcenteronline.com
PCO_CLIENT_ID=your-personal-access-token-application-id
PCO_SECRET=your-personal-access-token-secret
```

Open `request.http` and use REST Client's **Send Request** action. Prompt
variables collect account-specific resource IDs without writing them to disk.
Mutation examples use `# @note`; read the warning and confirm that the request
is safe for the configured Planning Center account before sending it.

For a successful response with a JSON body, use **Save Response Body**, keep
only the body in `response.json`, and sanitize it before committing. Replace all
real IDs, names, email addresses, phone numbers, URLs, and other personal or
account-specific values while preserving the response shape. Never commit the
local `.env`, authorization headers, credentials, or response headers.

For a successful response without a body, omit `response.json`. Record the
observed status, `null` content type, and `hasBody: false` in `metadata.json`.

## Add And Override Modes

An **add** package owns an operation missing from the vendor snapshot. Its
`openapi.json` is a complete OpenAPI 3.1 document containing exactly one method
and path. The operation must define an explicit stable `operationId`. Generation
fails when a later vendor snapshot adopts the same method and path; compare the
official and observed contracts before promoting or retiring the supplement.

An **override** package corrects an existing vendor operation. Its `patch.json`
is an RFC 7396 JSON Merge Patch applied only to the normalized operation. The
metadata stores the SHA-256 fingerprint of the expected dereferenced upstream
operation. Generation fails when that fingerprint changes so maintainers review
upstream drift before applying the patch again.

When an added endpoint becomes official, preserve the previously shipped
`operationId`, even if Planning Center publishes a different one. Saved n8n
workflows store this value; changing it is a breaking migration. Never resolve
an add collision by silently allowing either the vendor or local contract to
win.

## Verify Changes

After updating a supplement, regenerate and run the repository checks:

```sh
pnpm generate
pnpm generate:check
pnpm test
pnpm lint
pnpm build
pnpm package:inspect
```
