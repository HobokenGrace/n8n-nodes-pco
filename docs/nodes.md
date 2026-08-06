# Node Catalog

The package registers one operation node for each catalog entry below. Some
products also register a polling trigger, noted in the same entry. The catalog
is an orientation guide rather than an exhaustive operation reference; the
generated node UI is the source of truth for current resources and operations.

## Registered Nodes

| Node                          | Purpose                                                                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Planning Center API           | Manage connected applications, OAuth applications, and personal access tokens.                                                  |
| Planning Center Calendar      | Work with calendars, events, resources, rooms, bookings, and related records. Includes a polling trigger.                       |
| Planning Center Check-Ins     | Work with check-ins, events, event times, stations, labels, passes, and headcounts. Includes a polling trigger.                 |
| Planning Center Current       | Read the person record associated with the authenticated Planning Center user.                                                  |
| Planning Center Giving        | Work with donations, funds, batches, recurring donations, payment sources, and related records. Includes a polling trigger.     |
| Planning Center Groups        | Work with groups, group types, events, applications, tags, campuses, and people.                                                |
| Planning Center People        | Work with people, contact details, households, forms, lists, notes, workflows, and related records. Includes a polling trigger. |
| Planning Center Publishing    | Work with publishing channels, episodes, series, and speakers.                                                                  |
| Planning Center Registrations | Work with signups, registrations, attendees, categories, campuses, and people.                                                  |
| Planning Center Services      | Work with service types, teams, songs, media, folders, templates, and related planning records. Includes a polling trigger.     |
| Planning Center Webhooks      | List available webhook events and manage webhook subscriptions.                                                                 |

This list corresponds to the operation nodes registered in `package.json`. The
five trigger registrations belong to the Calendar, Check-Ins, Giving, People,
and Services entries rather than separate products.

## Generated Product Nodes

Choose a generated product node when its **Resource** and **Operation** lists
contain the API action you need. The selected operation controls the remaining
fields:

- The subtitle displays the HTTP method and endpoint template.
- Required identifiers appear as resource locators. Depending on the operation,
  they can accept a selected record or an ID.
- Generated **Filters**, **Order**, and **Includes** map to supported Planning
  Center query parameters.
- **Additional Query Parameters** allows another query name and value when the
  API supports a parameter not represented by a generated field.
- List operations provide **Return All** and **Limit**. The default bounded limit
  is 100.

Do not infer write support from a resource's presence. Select the resource and
inspect its current operation list before designing a workflow.

## Account-Level API Node

Use the account-level API node for the developer resources shown in its resource
list: connected applications, OAuth applications, and personal access tokens.
It does not accept arbitrary product paths. If a product endpoint is absent from
the corresponding generated node, confirm the package's current operation
surface before assuming another node can call it.

## Output

Responses using JSON:API are normalized into n8n items:

- Each resource in a list response becomes one item.
- `id` and `type` remain top-level fields.
- JSON:API attributes become top-level fields. Attribute names that would
  collide with reserved output keys receive an `attribute_` prefix.
- Relationships, links, and metadata are retained when present.
- Included resources are normalized and attached as `included`.

For examples of list limits, pagination, and expected output, see
[Workflow Walkthroughs](walkthroughs.md).

## Polling Triggers

Generated polling triggers use n8n's **Poll Times** schedule. Available trigger
resources can emit records based on creation or update timestamps. A configured
maximum caps each poll, and a larger backlog continues on later scheduled polls.

Treat trigger delivery as at-least-observable rather than exactly-once: API page
reordering, overlapping polls, and state persistence can produce duplicates or
gaps. Use stable expressions and idempotent downstream processing where duplicate
handling matters. Test execution is a non-stateful preview and does not predict
the next activation batch.
