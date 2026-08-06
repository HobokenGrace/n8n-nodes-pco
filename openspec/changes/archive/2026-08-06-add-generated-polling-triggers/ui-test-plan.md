# n8n UI Test Plan

Use a non-production Planning Center account and a disposable local n8n instance.

## Setup

From the repository root:

```sh
pnpm install
pnpm build
cp .docker/.env.example .docker/.env
cd .docker
docker compose up -d
```

Open `http://localhost:5678`, create a `Planning Center PAT API` credential, and use the package built from this worktree. After source changes, run `pnpm build` and `docker compose restart n8n`. Recreate the container if package metadata does not reload.

Use an Every Minute Poll Time while testing, then restore a conservative production schedule to limit Planning Center API usage.

## 1. Node Discovery And Editor Contract

1. Create a workflow and open the node picker.
2. Find Planning Center Calendar Trigger, Check-Ins Trigger, Giving Trigger, People Trigger, and Services Trigger.
3. Add Planning Center People Trigger and inspect its controls.

Expected:

- All five nodes are present and appear as triggers.
- There is exactly one native Poll Times control.
- Delivery Limitations, Resource, Event, Start Time, and Max Records Per Poll are visible.
- Start Time is a date-time control and defaults empty.
- Max Records Per Poll defaults to 100 and accepts integers from 1 through 1,000.
- Event and filter controls do not expose `order`, `offset`, `per_page`, or the active cursor's `where[...][gte]` parameter.

## 2. Manual Preview Is Non-Stateful

1. Configure People Trigger with Resource `Person`, Event `Created or Updated`, and Filter ID set to a known test person.
2. Set Start Time to a future date.
3. Click Test workflow twice without changing the configuration.

Expected:

- Each test returns at most the newest matching Person.
- Output is flattened into `id`, `type`, and person attributes rather than an event wrapper.
- Future Start Time does not suppress manual preview.
- Repeating the preview can return the same sample because it does not consume production state.

## 3. Default Baseline And Update Detection

1. Configure Person, Created or Updated, a test Person ID filter, empty Start Time, and Every Minute.
2. Add an Edit Fields node after the trigger so executions are easy to inspect.
3. Activate the workflow and wait through one Poll Time without changing the person.
4. Change a harmless field on that person in Planning Center.
5. Wait through the next Poll Time, then leave the person unchanged for one more Poll Time.

Expected:

- First activation emits no existing Person.
- The unchanged poll creates no workflow execution.
- The update creates one execution containing the selected Person ID.
- The next unchanged poll creates no execution.

## 4. Baseline With More Than 100 Existing Records

1. Use an organization with more than 100 People.
2. Configure Person, Created or Updated, no filter, and empty Start Time.
3. Activate the workflow.

Expected:

- Activation succeeds without `Planning Center pagination made no progress while baselining`.
- Existing People are not emitted.
- A later Person update is emitted normally.

## 5. Historical Catch-Up And Batch Pacing

1. Select a Resource and Event with at least two known changes after a chosen timestamp. A Person ID filter is safest.
2. Set Start Time before those changes and Max Records Per Poll to 1.
3. Activate with Every Minute polling.

Expected:

- First activation initializes Start Time without resource output.
- The first later poll emits the oldest matching resource at or after Start Time.
- The following poll emits the next resource instead of both appearing in one batch.
- Once caught up, unchanged polls create no execution.

The API exposes latest resource representations, so repeated changes to one resource between polls may collapse into one observed item.

## 6. Sparse Fields Preserve Cursor Tracking

1. Configure Person, Created or Updated, and a test Person ID filter.
2. Under Sparse Fields, select only First Name and omit Updated At.
3. Activate, change the selected field, and wait for a poll.

Expected:

- The trigger detects the update even though Updated At was not selected.
- Output contains the selected sparse fields.
- The runtime-added `updated_at` cursor field is absent from output when it was not requested.

## 7. Nested Resource Scope And Locator

1. Add People Trigger.
2. Select Resource `Form Submission (via Form)` and Event `Created`.
3. Use the Form ID resource locator to select a form.
4. Test the workflow once, then activate it and submit that form.

Expected:

- The Form locator returns readable options and stores the selected ID.
- The Resource and Event clearly describe a Form Submission created through one Form.
- The new submission emits one item scoped to the selected form.
- Output JSON:API `type` identifies a form submission.

## 8. Filter Isolation

1. Configure Person, Created or Updated, with Filter ID set to Person A.
2. Activate and update Person B.
3. Wait for a poll, then update Person A and wait again.

Expected:

- Updating Person B emits nothing.
- Updating Person A emits exactly one item.
- The filter is sent to Planning Center rather than applied after fetching all People.

## 9. Immediate Reactivation Catch-Up

1. Complete test 3 and note the last emitted update.
2. Deactivate the workflow and update the matching Person while it is inactive.
3. Reactivate without changing credentials, Resource, Event, scope, filter, or Start Time.

Expected:

- Reactivation preserves the saved watermark.
- n8n's activation poll may immediately create one execution containing the downtime update, before the next configured Poll Time.
- Any backlog larger than Max Records Per Poll continues at later Poll Times.
- Previously emitted updates are not replayed.

Repeat after restarting the n8n container to verify persisted state rather than only in-memory state.

## 10. Durable Scheduler Delivery

1. Run current n8n with `N8N_SCHEDULER_ENABLED=true`. In the local compose setup, temporarily add it to the n8n service environment and recreate the container; do not commit that local edit.
2. Configure Person, Created or Updated, a test Person ID filter, empty Start Time, and Every Minute.
3. Activate, update the matching Person, and wait through two Poll Times.

Expected:

- A scheduled occurrence using a fresh poll context still resumes persisted state.
- Exactly one execution contains the updated Person.
- Later unchanged occurrences create no execution.

## 11. Error Visibility And Retry Boundary

1. Activate a working filtered trigger.
2. Temporarily make its Planning Center credential invalid and wait for one Poll Time.
3. Restore the credential and wait for the next Poll Time.

Expected:

- The failed poll is visible as a trigger error with no partial resource output.
- Restoring credentials retries the same cursor window.
- Failed requests do not advance state or skip the matching update.

## Acceptance Gate

The implementation is ready for use when all eleven tests pass on the target n8n version. Tests 4 and 10 specifically guard the reviewed baseline-pagination and fresh-context scheduler regressions.
