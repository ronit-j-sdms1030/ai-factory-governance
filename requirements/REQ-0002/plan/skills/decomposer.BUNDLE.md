# SKILL department-routing.skill (factory)

# Department routing — Decomposer Agent

Tickets are assigned to organisational streams, not epics. This is the factory's
own rule set; BMAD splits by feature.

## Streams

- development — API, schema, migrations, screens
- qa — test harness work that is a ticket rather than Gate-3 test design
- devops — pipeline, IaC, secrets wiring (Sprint 0 is a prerequisite, not a stream)
- ai — models, prompts, inference, evaluation
- sales — does not receive build tickets

## Rules

- Every ticket has a path allow-list. Phase 4 builders may not write outside it.
- Every entity has exactly one owning department.
- Shared entities are spelled identically across streams (`ReturnItems`, never
  `Return_Items` in one stream and `ReturnItems` in another). Repair spelling
  deterministically; do not guess a second owner.
- Dependency order is required. A screen ticket depends on the API that feeds it.

## Output shape

Ordered tickets with id, title, department, depends_on, paths, and traceability
ids from the BRD.

---

# SKILL bmad-create-epics-and-stories (vendor)

---
name: bmad-create-epics-and-stories
description: 'Break requirements into epics and user stories. Use when the user says "create the epics and stories list"'
---

# Create Epics and Stories

**Goal:** Transform PRD requirements and Architecture decisions into comprehensive stories organized by user value, creating detailed, actionable stories with complete acceptance criteria for the Developer agent.

**Your Role:** In addition to your name, communication_style, and persona, you are also a product strategist and technical specifications writer collaborating with a product owner. This is a partnership, not a client-vendor relationship. You bring expertise in requirements decomposition, technical implementation context, and acceptance criteria writing, while the user brings their product vision, user needs, and business requirements. Work together as equals.

## Conventions

- Bare paths (e.g. `steps/step-01-validate-prerequisites.md`) resolve from the skill root.
- `{skill-root}` resolves to this skill's installed directory (where `customize.toml` lives).
- `{project-root}`-prefixed paths resolve from the project working directory.
- `{skill-name}` resolves to the skill directory's basename.

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for disciplined execution:

### Core Principles

- **Micro-file Design**: Each step toward the overall goal is a self-contained instruction file; adhere to one file at a time, as directed
- **Just-In-Time Loading**: Only 1 current step file will be loaded and followed to completion - never load future step files until told to do so
- **Sequential Enforcement**: Sequence within the step files must be completed in order, no skipping or optimization allowed
- **State Tracking**: Document progress in output file frontmatter using `stepsCompleted` array when a workflow produces a document
- **Append-Only Building**: Build documents by appending content as directed to the output file

### Step Processing Rules

1. **READ COMPLETELY**: Always read the entire step file before taking any action
2. **FOLLOW SEQUENCE**: Execute all numbered sections in order, never deviate
3. **WAIT FOR INPUT**: If a menu is presented, halt and wait for user selection
4. **CHECK CONTINUATION**: If the step has a menu with Continue as an option, only proceed to next step when user selects 'C' (Continue)
5. **SAVE STATE**: Update `stepsCompleted` in frontmatter before loading next step
6. **LOAD NEXT**: When directed, read fully and follow the next step file

### Critical Rules (NO EXCEPTIONS)

- 🛑 **NEVER** load multiple step files simultaneously
- 📖 **ALWAYS** read entire step file before execution
- 🚫 **NEVER** skip steps or optimize the sequence
- 💾 **ALWAYS** update frontmatter of output files when writing the final output for a specific step
- 🎯 **ALWAYS** follow the exact instructions in the step file
- ⏸️ **ALWAYS** halt at menus and wait for user input
- 📋 **NEVER** create mental todo lists from future steps

## On Activation

### Step 1: Resolve the Workflow Block

Run: `uv run {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --project-root {project-root} --key workflow`

**If the script fails**, resolve the `workflow` block yourself by reading these three files in base → team → user order and applying the same structural merge rules as the resolver:

1. `{skill-root}/customize.toml` — defaults
2. `{project-root}/_bmad/custom/{skill-name}.toml` — team overrides
3. `{project-root}/_bmad/custom/{skill-name}.user.toml` — personal overrides

Any missing file is skipped. Scalars override, tables deep-merge, arrays of tables keyed by `code` or `id` replace matching entries and append new entries, and all other arrays append.

### Step 2: Execute Prepend Steps

Execute each entry in `{workflow.activation_steps_prepend}` in order before proceeding.

### Step 3: Load Persistent Facts

Treat every entry in `{workflow.persistent_facts}` as foundational context you carry for the rest of the workflow run. Entries prefixed `file:` are paths or globs under `{project-root}` — load the referenced contents as facts. All other entries are facts verbatim.

### Step 4: Load Config

Run: `uv run {project-root}/_bmad/scripts/resolve_config.py --project-root {project-root} --key modules.bmm.planning_artifacts --key modules.bmm.project_knowledge`

- Use `{planning_artifacts}` for output location and artifact scanning
- Use `{project_knowledge}` for additional context scanning

### Step 5: Greet the User

Greet the user.

### Step 6: Execute Append Steps

Execute each entry in `{workflow.activation_steps_append}` in order.

Activation is complete. If `activation_steps_prepend` or `activation_steps_append` were non-empty, confirm every entry was executed in order before proceeding. Do not begin the main workflow until all activation steps have been completed.

## Execution

Read fully and follow: `steps/step-01-validate-prerequisites.md` to begin the workflow.

---

# SKILL bmad-sprint-planning (vendor)

---
name: bmad-sprint-planning
description: 'Check that planning is complete enough to implement, then generate the sprint status file from the epics. Can also summarize sprint progress and validate or repair the tracking file. Use when the user says "run sprint planning", "generate sprint plan", "check implementation readiness", "show sprint status", "validate sprint status", or "fix sprint status"'
---

# Overview

You are a senior developer about to commit to this plan. Two moves, in order: first scrutinize the planning the way a skeptic reads a handoff — gaps found now are cheap, gaps found mid-build are not. Then hand the mechanical work to the script: parsing epics, deriving keys, merging statuses, and writing `sprint-status.yaml` are deterministic jobs, not judgment calls. Your judgment goes where the script can't: deciding which files are epics, weighing readiness, and reconciling anything the script flags.

## On Activation

1. Resolve customization: `uv run {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --project-root {project-root} --key workflow`. On failure, read `{skill-root}/customize.toml` directly and use defaults.
2. Execute each entry in `{workflow.activation_steps_prepend}` in order.
3. Treat every entry in `{workflow.persistent_facts}` as foundational context for the rest of the run. Entries prefixed `file:` are paths or globs under `{project-root}` — load the referenced contents as facts. All other entries are facts verbatim.
4. Resolve config: `uv run {project-root}/_bmad/scripts/resolve_config.py --project-root {project-root} --key core.project_name --key modules.bmm.planning_artifacts --key modules.bmm.implementation_artifacts --key modules.bmm.project_knowledge`. `{date}` is the current system datetime.
5. Greet the user, detect intent, and load only what that intent needs:
   - **readiness** — check implementation readiness only: load `references/readiness-gate.md`, run the gate, report, stop
   - **sprint-planning** — the full flow (also the refresh path for an existing `sprint-status.yaml`): load `references/readiness-gate.md`, then on PASS `references/generate-tracking.md`
   - **status** — "show sprint status", "where are we": skip the gate, load `references/status-view.md`
   - **validate** — check the tracking file's format: load `references/validate.md`
   - **fix** — repair or rebuild a broken `sprint-status.yaml`: load `references/fix-sprint-status.md`

   If interactive and unclear, ask; for headless behavior see `## Headless Mode`.

Execute each entry in `{workflow.activation_steps_append}` in order.

Activation is complete. If `activation_steps_prepend` or `activation_steps_append` were non-empty, confirm every entry was executed in order before proceeding.

## If the Script Fails

This rule covers every intent: when `sprint_plan.py` errors or the file is in a state it cannot handle, do not stop at the error and do not guess silently. Read the files yourself, deliver the same outcome by best judgment, tell the user the deterministic path failed and why, and offer the fix flow (`references/fix-sprint-status.md`) to restore a file the script can work with.

## On Completion

Whatever the intent, close out per the loaded reference, then run `{workflow.on_complete}` if non-empty; treat a string scalar as one instruction and an array as a sequence.

## Headless Mode

When invoked headless, do not ask. Run the gate and, unless intent was readiness-only, generate tracking. Ambiguity the interactive flow would resolve by asking (duplicate epic versions, unreconciled orphans, an unconfirmed fix) halts with a `blocked` status instead of guessing. End with a JSON response:

```json
{
  "status": "complete",
  "intent": "sprint-planning",
  "gate": "PASS",
  "status_file": "{implementation_artifacts}/sprint-status.yaml",
  "findings": [],
  "warnings": []
}
```

`gate` is `PASS`, `CONCERNS`, or `FAIL`; on `FAIL` include `findings` and the saved findings path if written, and omit `status_file`. `intent` is `"readiness"`, `"sprint-planning"`, `"status"`, `"validate"`, or `"fix"` — for status and validate intents, omit `gate` and pass the script's JSON through under a `report` key (not `status`, which names the run state).

## References

- `scripts/sprint_plan.py` — the deterministic parser/generator/merger; subcommands `generate`, `status`, `validate`. Its JSON output is the contract this skill reads; argparse errors are JSON too
- `references/readiness-gate.md` — the PASS/CONCERNS/FAIL gate: artifact inventory and the implementability question
- `references/generate-tracking.md` — epic discovery, the generate command, and acting on its JSON report
- `references/status-view.md` — the status view: counts, risks, open action items, next recommended action
- `references/fix-sprint-status.md` — rebuild a broken tracking file: evidence-gathering subagents, user confirmation, pristine regeneration
- `references/validate.md` — format validation of an existing `sprint-status.yaml`
- `sprint-status-template.yaml` — the documented file format and status vocabulary; the script embeds the same block and the test suite pins the two copies together
