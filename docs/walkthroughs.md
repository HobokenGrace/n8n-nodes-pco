# Workflow Walkthroughs

These examples use current, official, non-deprecated read operations from the
generated nodes. Complete [Getting Started](getting-started.md) first so the
package and `Planning Center PAT API` credential are available.

Use test or appropriately restricted Planning Center data when possible. Node
output can contain personal and financial information; do not paste it into
issues or other public channels.

## People: List People

Use this workflow to read a bounded set of People records.

1. Create a workflow and add **Planning Center People**.
2. Select your `Planning Center PAT API` credential.
3. Configure the node:

   | Field      | Value         |
   | ---------- | ------------- |
   | Resource   | `Person`      |
   | Operation  | `List People` |
   | Return All | Off           |
   | Limit      | `10`          |

4. Execute the node.

The operation calls `GET /people/v2/people` and returns at most 10 n8n items.
Each item represents one JSON:API People resource. Its `id`, `type`, and
available attributes are top-level fields; relationships, links, and metadata
remain available when Planning Center returns them.

To narrow the request, add supported options under **Filters**, **Order**, or
**Includes**. For example, **Search Name** maps to
`where[search_name]`. Keep the bounded limit while testing a new filter.

## Giving: List Donations

Use this workflow only where the credential's Planning Center user is permitted
to access Giving data.

1. Create a workflow and add **Planning Center Giving**.
2. Select your `Planning Center PAT API` credential.
3. Configure the node:

   | Field      | Value            |
   | ---------- | ---------------- |
   | Resource   | `Donation`       |
   | Operation  | `List Donations` |
   | Return All | Off              |
   | Limit      | `10`             |

4. Execute the node.

The operation calls `GET /giving/v2/donations` and returns at most 10 normalized
n8n items. Available donation attributes depend on Planning Center's response
and the requesting user's permissions. Treat all output as sensitive financial
and personal data.

The operation also exposes generated **Received At**, **Created At**, **Updated
At**, and **Completed At** filters, plus **Order** and **Includes**. Add only the
options required by the workflow and test with a small limit first.

## Planning Center API: List Personal Access Tokens

The **Planning Center API** node covers account-level developer resources. This
example reads PAT metadata, a need that belongs to the API node rather than a
product node such as People or Giving.

1. Create a workflow and add **Planning Center API**.
2. Select your `Planning Center PAT API` credential.
3. Configure the node:

   | Field      | Value                         |
   | ---------- | ----------------------------- |
   | Resource   | `Personal Access Token`       |
   | Operation  | `List Personal Access Tokens` |
   | Return All | Off                           |
   | Limit      | `10`                          |

4. Execute the node.

The operation calls `GET /api/v2/personal_access_tokens` and returns at most 10
normalized items. Do not share this output because it can contain credential
metadata or other sensitive fields.

Use this node only for the connected application, OAuth application, and PAT
resources shown in its **Resource** list. It does not accept an arbitrary path,
so use a product-specific generated node for product operations.

## Pagination and Result Limits

Every list operation in these walkthroughs provides the same controls:

- **Return All** off: the node requests and returns no more than **Limit** items.
  The default limit is 100; the walkthroughs lower it to 10 for safe testing.
- **Return All** on: the node follows Planning Center's JSON:API `links.next`
  value until there is no next page.
- Planning Center pages are requested with at most 100 records. A bounded request
  is sliced to the exact configured limit before output.

Avoid **Return All** until you understand the record count, data sensitivity,
workflow memory requirements, and Planning Center API usage.

## Errors

- `401 Unauthorized`: verify that the Application ID and Secret are from the
  same PAT and contain no extra whitespace.
- `403 Forbidden`: the PAT authenticated, but the user lacks access to the
  selected product or resource. Review Planning Center permissions.
- `404 Not Found`: confirm the selected generated operation and restore the
  credential Base URL to `https://api.planningcenteronline.com` unless an
  intentional compatible endpoint is in use.
- `429 Too Many Requests`: wait for the rate-limit window, reduce request volume,
  and avoid unnecessary **Return All** executions.

When **Continue On Fail** is enabled, the shared runtime returns an error item for
the failed input instead of stopping all remaining inputs. Inspect that item and
handle it explicitly; do not treat a continued workflow as a successful API
read.
