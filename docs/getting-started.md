# Getting Started

Install the package on a self-hosted n8n instance, connect a Planning Center
Personal Access Token (PAT), and run a bounded People read.

## Before You Start

You need:

- A self-hosted n8n instance where community node installation is enabled
- Permission to manage community nodes and credentials in that instance
- A Planning Center user account with access to the data your workflow needs

Community nodes run code from npm inside your n8n instance. Review n8n's
[community node risks](https://docs.n8n.io/integrations/community-nodes/risks/)
and your organization's installation policy before proceeding.

## Install the Package

1. Sign in to your self-hosted n8n instance.
2. Open **Settings > Community Nodes**.
3. Select **Install**.
4. Enter `@hobokengrace/n8n-nodes-pco` in **Enter npm package name**.
5. Review the community package warning and complete the installation.
6. Open or create a workflow and confirm that searching for `Planning Center`
   shows the installed nodes.

These steps follow n8n's official
[GUI installation guide](https://docs.n8n.io/integrations/community-nodes/installation-and-management/gui-installation/).
This repository does not cover n8n Cloud or manual production installation.

## Create a Planning Center PAT

A PAT makes API requests as your Planning Center user and inherits that user's
permissions. Planning Center says PATs are for your own scripts or a server you
control; use OAuth rather than sharing a PAT or using one for multiple churches.

1. Sign in to Planning Center.
2. Open your [Planning Center developer account](https://api.planningcenteronline.com/oauth/applications).
3. Generate a new Personal Access Token.
4. Record its **Application ID** and **Secret** together. Both values must come
   from the same token.
5. Store the values in a password manager or secret store. Never put them in a
   workflow export, issue, screenshot, chat message, or source file.

See Planning Center's official
[authentication documentation](https://developer.planning.center/docs/#/overview/authentication/personal-access-token)
for PAT scope, security, and OAuth guidance.

## Configure the Credential

1. In n8n, open **Credentials** and create a new credential.
2. Search for and select `Planning Center PAT API`.
3. Enter the PAT's **Application ID**.
4. Enter the PAT's **Secret**.
5. Leave **Base URL** as `https://api.planningcenteronline.com` unless you are
   intentionally connecting through a compatible alternative endpoint.
6. Select **Save** or **Test** and confirm the credential succeeds.

The credential uses HTTP Basic authentication and tests
`GET /api/v2/personal_access_tokens`.

## Run a First Safe Read

1. Create a workflow and add **Planning Center People**.
2. Select the `Planning Center PAT API` credential.
3. Set **Resource** to **Person**.
4. Set **Operation** to **List People**.
5. Leave **Return All** disabled and set **Limit** to `1`.
6. Execute the node.

The node calls `GET /people/v2/people` and returns at most one n8n item. Each
returned JSON:API resource is normalized so `id` and `type` remain top-level,
resource attributes become top-level fields, and available relationships,
links, and metadata are retained. The exact attributes depend on Planning Center
and the requesting user's permissions.

Continue with the [workflow walkthroughs](walkthroughs.md) for People, Giving,
and account-level Planning Center API examples.

## Troubleshooting

### Community Nodes is unavailable

Confirm that the instance is self-hosted, that your account can manage community
nodes, and that the instance permits community packages. Ask the n8n instance
administrator to check its community package configuration when the setting is
missing or disabled.

### The package or nodes do not appear

Confirm the package name is exactly `@hobokengrace/n8n-nodes-pco` and that n8n
reports the installation as complete. Reload the editor before retrying. If the
installation failed, inspect the self-hosted n8n logs for npm, network, or package
loading errors.

### Credential test returns 401

Copy the Application ID and Secret again from the same PAT and remove any extra
whitespace. A PAT secret is not your normal Planning Center password.

### Credential test returns 403

The PAT authenticated, but its Planning Center user cannot access the API app
personal access token endpoint. Review that user's Planning Center access. For
account or permission changes, contact
[Planning Center Support](https://www.planningcenter.com/support).

### Credential test returns 404

Restore the Base URL to `https://api.planningcenteronline.com` unless an
intentional alternative endpoint provides the same API paths.

### Credential test returns 429

Planning Center rate-limited the request. Wait for the rate-limit window to
reset, then test again.

### A node request fails after the credential test succeeds

Credential success does not grant access to every product. Confirm the user's
permissions for the selected Planning Center product and check the node's error
for the requested path and status. When reporting a package defect, follow the
[safe reporting guidance](contributing.md#report-a-bug).
