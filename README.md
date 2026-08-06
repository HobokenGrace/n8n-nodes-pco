# n8n Nodes for Planning Center

`@hobokengrace/n8n-nodes-pco` provides n8n community nodes for working with
Planning Center APIs. It includes nodes for API, Calendar, Check-Ins, Current,
Giving, Groups, People, Publishing, Registrations, Services, and Webhooks, plus
polling triggers for supported products.

## Quick Start

This path is for self-hosted n8n instances that permit community nodes.

1. In n8n, open **Settings > Community Nodes** and select **Install**.
2. Enter `@hobokengrace/n8n-nodes-pco` as the npm package name and complete the
   installation.
3. In your [Planning Center developer account](https://api.planningcenteronline.com/oauth/applications),
   generate a Personal Access Token (PAT).
4. In n8n, create a `Planning Center PAT API` credential. Enter the Application
   ID and Secret from the same PAT, retain the default Base URL, and test it.
5. Add **Planning Center People**, choose **Person > List People**, set a small
   **Limit**, and execute the node.

See [Getting Started](docs/getting-started.md) for the complete installation,
credential, first-read, and troubleshooting procedure.

## Choose a Node

Prefer a product-specific generated node when it contains the resource and
operation you need. These nodes provide operation-specific fields, identifiers,
query options, pagination controls, and normalized JSON:API output.

Use **Planning Center API** for the account-level developer resources it exposes,
including connected applications, OAuth applications, and personal access
tokens. It is not an arbitrary HTTP request node and does not replace a product
node for an uncovered product endpoint.

- [Node Catalog](docs/nodes.md): what each registered node covers and how
  generated operations behave
- [Workflow Walkthroughs](docs/walkthroughs.md): complete People, Giving, and
  Planning Center API read examples

## Compatibility

- Installation guidance covers the self-hosted n8n Community Nodes UI. This
  repository does not claim n8n Cloud support.
- The package declares `n8n-workflow` as a peer dependency without a pinned n8n
  version. No n8n version support matrix is currently published.
- Repository development and CI use Node.js 22 or newer and pnpm 10.30.2.

## Documentation

- [Getting Started](docs/getting-started.md)
- [Workflow Walkthroughs](docs/walkthroughs.md)
- [Node Catalog](docs/nodes.md)
- [Contributing](docs/contributing.md)
- [Local Docker Testing](.docker/README.md)
- [Planning Center API Supplements](docs/api-supplements.md)
- [Publishing](docs/publishing.md)

## Support

Report package defects and request package features in
[GitHub Issues](https://github.com/HobokenGrace/n8n-nodes-pco/issues). A useful
bug report includes the n8n version, package version, deployment type,
node/resource/operation, reproduction steps, sanitized input and output, and the
complete error message.

Before sharing logs, screenshots, workflow data, or node output, remove the PAT
Application ID and Secret, authorization headers, and all Planning Center
personal data. For Planning Center account access, permissions, or API
availability, contact [Planning Center Support](https://www.planningcenter.com/support)
instead of opening a package issue.

## License

[MIT](LICENSE.md)
