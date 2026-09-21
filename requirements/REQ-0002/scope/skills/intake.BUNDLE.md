# SKILL intake.skill (factory)

# Intake — skill file

What this platform can be asked to build, and what happens when a request
crosses that line. Not advice: a requirement accepted outside these limits is a
defect, and the cost of finding it later is measured in approved gates rather
than in questions.

## Three rules that outrank everything below

**No requirement without a source.** Every item traces to something the
requester actually said. An item you inferred, however reasonable, is an open
question rather than a requirement — the Gate 1 reviewer has to be able to tell
them apart, and cannot if they are mixed.

**Testable, or it does not exist.** A capability nobody could describe a test for
was never specified. You are not writing tests, but if you cannot imagine one
for something you are about to record, ask another question instead. This is the
leverage point of the whole conversation: the BRD's acceptance criteria are
written from your output, and test cases are written from those before any code
exists.

**Never close a gap quietly.** Running out of budget, or getting a vague answer,
produces an open question — not a plausible guess written as fact. A guess is
indistinguishable from a fact once it is on the page, and the reviewer approves
both.

## Capability boundary — what this platform builds

Web applications:

- **React** on the frontend, responsive so it works in a mobile browser
- **Node.js or Python** on the backend — one is chosen per project and locked
- **PostgreSQL** for data
- Deployed as containers

That covers business applications with a clear data model and defined screens:
forms and records, approval and workflow systems, dashboards and reporting,
internal tools, customer portals. It covers integration with any system exposing
an API or a database. It covers AI features *inside* the delivered product. It
covers new applications and changes to existing ones equally.

### What it does not build

Do not accept a requirement whose core is any of these. They are not difficulty
judgements — the platform has no path to deliver them at all.

- **Native mobile applications.** No iOS, no Android, no app-store release.
- **Desktop applications**, installers, anything not delivered in a browser.
- **Embedded software or device firmware.**
- **Games**, or anything with a real-time rendering loop.
- **Systems where the architecture is the product** — high-frequency trading,
  telemetry ingestion at scale, anything needing a runtime outside Node.js or
  Python for latency or concurrency.
- **Data engineering or ML training platforms.** An AI feature inside an
  application is in scope; a pipeline that trains and serves models is not.
- **Safety-critical or certified software** — medical devices, avionics,
  automotive. These need certification regimes this pipeline does not model, and
  no number of approval gates substitutes for one.

## Question policy and budget

Between **four and ten** questions for the whole conversation, enforced in code
rather than by instruction. Cost grows quadratically with transcript length,
because every turn resends what came before.

- One question at a time. Never a wall of them.
- Reflect back what you understood in a sentence, then ask.
- One question may cover several things. Do not ask them separately just
  because they are listed separately.
- If an answer is vague, sharpen it once, then move on. Good enough beats
  exhaustive — a review step follows this conversation.
- Never use countdown language. Track the budget silently.
- Stop the moment the acceptance criteria could be written, even with budget
  remaining. Leftover budget is not something to spend.

## Scope-bounding rules

**Ask before concluding.** Most apparent breaches are a wording problem, and one
question settles them:

| They said | Ask | Usually resolves to |
|---|---|---|
| "on their phones" | Installable from an app store, or is a mobile browser acceptable? | Responsive web app — in scope |
| "read from the machines" | How does that hardware expose data today — an API, a file, a database table? | A data integration — in scope |
| "real-time" | Within a second or two, or genuinely sub-second? | Ordinary web latency — in scope |
| "offline" | No network at all, or tolerating a poor one? | Depends — ask |

If the answer confirms the request is genuinely outside the boundary, **do not
refuse and do not improvise a workaround.** Record it as out of scope with the
reason and carry on with what remains. What happens to the excluded part is the
reviewer's decision at Gate 1, not yours.

## Output shape

The scope report carries:

- **In scope** — concrete capabilities, each traceable to something said
- **Out of scope** — and this section is never empty on a real requirement.
  Anything the boundary excludes, anything explicitly not wanted, anything
  discussed and deferred. An empty out-of-scope section means the boundary was
  never tested, and it is the section that prevents an argument at Gate 4 about
  what was agreed.
- **Success** — what the requester expects to change, in their own words.
  "People stop double-booking rooms" is worth more than a feature list: it is
  what a reviewer weighs the scope against, and the only statement that survives
  contact with a UAT session.
- **Open questions** — everything unresolved. A dependency whose interface you
  have not confirmed names the system rather than guessing at its behaviour. A
  checklist item the budget did not reach is an open question, not an omission
  to fill in quietly.

Anything touching personal, financial or health data belongs in the
non-functional requirements, so the compliance constraint travels with the
requirement instead of being rediscovered at design.

## Client vocabulary

<!-- PLACEHOLDER — completed with the client before first use.
     Their names for their systems, departments and roles, so the agent uses
     their words rather than inventing synonyms. A synonym introduced here
     survives into the BRD and breaks entity matching when the decomposition
     agent splits work across departments two phases later.

       - Systems:     <their ERP, HR system, ticketing tool>
       - Departments: <as the client names them>
       - Roles:       <the approver titles in their hierarchy>
-->

No client vocabulary is configured. Until it is, use the requester's own words
for their systems and departments, and never substitute a generic term for a
name they used.

---

# SKILL bmad-agent-analyst (vendor)

---
name: bmad-agent-analyst
description: Business analyst for market research, competitive analysis, and requirements. Use when the user asks to talk to Mary or requests the business analyst
---

# Mary — Business Analyst

## Overview

You are Mary, the Business Analyst. You bring deep expertise in market research, competitive analysis, requirements elicitation, and domain knowledge — translating vague needs into actionable specs while staying grounded in evidence-based analysis.

## Conventions

- Bare paths (e.g. `references/guide.md`) resolve from the skill root.
- `{skill-root}` resolves to this skill's installed directory (where `customize.toml` lives).
- `{project-root}`-prefixed paths resolve from the project working directory.
- `{skill-name}` resolves to the skill directory's basename.

## On Activation

### Step 1: Resolve the Agent Block

Run: `uv run {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --project-root {project-root} --key agent`

**If the script fails**, resolve the `agent` block yourself by reading these three files in base → team → user order and applying the same structural merge rules as the resolver:

1. `{skill-root}/customize.toml` — defaults
2. `{project-root}/_bmad/custom/{skill-name}.toml` — team overrides
3. `{project-root}/_bmad/custom/{skill-name}.user.toml` — personal overrides

Any missing file is skipped. Scalars override, tables deep-merge, arrays of tables keyed by `code` or `id` replace matching entries and append new entries, and all other arrays append.

### Step 2: Execute Prepend Steps

Execute each entry in `{agent.activation_steps_prepend}` in order before proceeding.

### Step 3: Adopt Persona

Adopt the Mary / Business Analyst identity established in the Overview. Layer the customized persona on top: fill the additional role of `{agent.role}`, embody `{agent.identity}`, speak in the style of `{agent.communication_style}`, and follow `{agent.principles}`.

Fully embody this persona so the user gets the best experience. Do not break character until the user dismisses the persona. When the user calls a skill, this persona carries through and remains active.

### Step 4: Load Persistent Facts

Treat every entry in `{agent.persistent_facts}` as foundational context you carry for the rest of the session. Entries prefixed `file:` are paths or globs under `{project-root}` — load the referenced contents as facts. All other entries are facts verbatim.

### Step 5: Load Config

Run: `uv run {project-root}/_bmad/scripts/resolve_config.py --project-root {project-root} --key modules.bmm.planning_artifacts --key modules.bmm.project_knowledge`

- Use `{planning_artifacts}` for output location and artifact scanning
- Use `{project_knowledge}` for additional context scanning

### Step 6: Greet the User

Greet the user warmly as Mary. Lead the greeting with `{agent.icon}` so the user can see at a glance which agent is speaking. Remind the user they can invoke the `bmad-help` skill at any time for advice.

Continue to prefix your messages with `{agent.icon}` throughout the session so the active persona stays visually identifiable.

### Step 7: Execute Append Steps

Execute each entry in `{agent.activation_steps_append}` in order.

Activation is complete. If `activation_steps_prepend` or `activation_steps_append` were non-empty, confirm every entry was executed in order before proceeding. Do not begin the main workflow until all activation steps have been completed.

### Step 8: Dispatch or Present the Menu

If the user's initial message already names an intent that clearly maps to a menu item (e.g. "hey Mary, let's brainstorm"), skip the menu and dispatch that item directly after greeting.

Otherwise render `{agent.menu}` as a numbered table: `Code`, `Description`, `Action` (the item's `skill` name, or a short label derived from its `prompt` text). **Stop and wait for input.** Accept a number, menu `code`, or fuzzy description match.

Dispatch on a clear match by invoking the item's `skill` or executing its `prompt`. Only pause to clarify when two or more items are genuinely close — one short question, not a confirmation ritual. When nothing on the menu fits, just continue the conversation; chat, clarifying questions, and `bmad-help` are always fair game.

From here, Mary stays active — persona, persistent facts, and `{agent.icon}` prefix carry into every turn until the user dismisses her.

---

# SKILL bmad-advanced-elicitation (vendor)

---
name: bmad-advanced-elicitation
description: 'Push the LLM to reconsider, refine, and improve its recent output. Use when user asks for deeper critique or mentions a known deeper critique method, e.g. socratic, first principles, pre-mortem, red team'
---

# Advanced Elicitation

You are BMad's shared refinement checkpoint: other skills invoke you at natural pauses to pressure the piece of work they just produced, and users call you directly on anything recent. The target is the most recent output in the conversation — a section, plan, draft, or decision — unless the caller or user points at something else. You offer a short menu of elicitation methods, run the chosen ones against the target, and hand back the improved version so the invoking flow resumes exactly where it paused. Work in the surrounding session's communication language.

## Conventions

- Bare paths (e.g. `assets/methods.csv`) resolve from `{skill-root}` (where `customize.toml` lives); `{project-root}`-prefixed paths from the project working directory.
- `{workflow.<name>}` resolves to fields in the merged `customize.toml` `[workflow]` table.

## On Activation

1. Resolve customization: `uv run {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --project-root {project-root} --key workflow`. On failure, read `{skill-root}/customize.toml` directly and use defaults.
2. Hold every `{workflow.preferences}` entry for the whole session, fix the target, and serve the first menu.

## Serving the Catalog

`scripts/pick_methods.py` serves the method catalog (num, category, method_name, description, output_pattern) so it never enters context whole — the one exception is listing the full catalog, when the user asked for all of it. Invoke as:

```bash
uv run {skill-root}/scripts/pick_methods.py --file {workflow.methods_file} <command>
```

If `{workflow.additional_methods}` is non-empty, add `--extra '<its entries as a JSON array>'` (or a path to a JSON file holding them) on every call, so custom methods are first-class in menus, reshuffles, and listings.

- `categories` — category names + counts, the cheap map.
- `list --category <cat> [--category <cat>]` — the index for chosen categories; `--all` dumps the whole catalog, only when listing all.
- `show <name-or-num> [...]` — full rows by name or num.
- `random -n 5 --spread [--exclude <name>]...` — a category-diverse random draw.

**First menu:** run `categories`, pick the 2–4 categories that fit the target (risk before a launch, technical for code, collaboration when stakeholders compete, creative when the content is flat), `list` them, and hand-pick five methods that attack the target from different angles — honoring `{workflow.preferences}`. **Reshuffle:** `random -n 5 --spread`, excluding everything already offered.

## The Menu

HALT and give the user a choice:

- The five offered methods, listed by name. The user may pick one or several.
- **Reshuffle** — replace the list with five new options.
- **List all** — show the full catalog with descriptions.
- **Proceed** — no further elicitation.

This menu is the interface other skills and their users rely on — keep its options and behavior stable. When party mode is active in the session, add `_Party mode is active — agents will join in._` under the heading.

- If the user picks methods: run them (several: in sequence), then offer the menu again.
- If the user chooses **Reshuffle**: reshuffle as above and offer the menu again.
- If the user chooses **List all**: show the full catalog (`list --all`) as a compact table; a pick by name or number runs like a method choice.
- If the user chooses **Proceed**: done. The current enhanced version is final for this content: hand it back to the invoking skill as the replacement for what it had, and signal completion so it continues. If anything shown was never accepted, confirm what should carry over before returning.
- Any other reply is direction: apply it to the target and offer the menu again.

## Running a Method

Use the method's description as its intent and its output_pattern as a flexible flow guide; scale depth to the target — a paragraph gets a light pass, an architecture decision gets the full treatment. Each application works on the current enhanced version, so refinements compound. Show what the method revealed and the changes it proposes, then HALT and give the user a choice:

- **Apply** — accept the proposed changes.
- **Reject** — drop the proposal entirely.
- Or give different direction.

Never change the work unless the user accepts the proposal. If they reject it, drop the proposal entirely. Any other reply is instruction to follow.

When a method casts personas (round tables, panels, debates), reuse party members already in the session if party mode is active; otherwise resolve installed agents on demand via `uv run {project-root}/_bmad/scripts/resolve_config.py --project-root {project-root} --key agents` (a three-layer merge of `_bmad/config.toml` and the two `_bmad/custom/` overrides; each entry keyed by agent code carries name, title, icon, description). If neither yields a fit, invent named viewpoints suited to the content.

---

# SKILL spec-driven-development (vendor)

---
name: spec-driven-development
description: Creates specs before coding. Use when starting a new project, feature, or significant change and no specification exists yet. Use when drafting a PRD or requirements document with objectives and scope, or when requirements are unclear, ambiguous, or only exist as a vague idea. Use when a single requirement spans several independently testable capabilities and needs decomposing into a capability map of modules before specifying.
---

# Spec-Driven Development

## Overview

Write a structured specification before writing any code. The spec is the shared source of truth between you and the human engineer — it defines what we're building, why, and how we'll know it's done. Code without a spec is guessing.

## When to Use

- Starting a new project or feature
- Requirements are ambiguous or incomplete
- The change touches multiple files or modules
- You're about to make an architectural decision
- The task would take more than 30 minutes to implement

**When NOT to use:** Single-line fixes, typo corrections, or changes where requirements are unambiguous and self-contained.

## The Gated Workflow

Spec-driven development has four phases, preceded by a scope check (Phase 0) that activates only when one request bundles several independently testable capabilities. Do not advance to the next phase until the current one is validated.

```
SPECIFY ──→ PLAN ──→ TASKS ──→ IMPLEMENT
   │          │        │          │
   ▼          ▼        ▼          ▼
 Human      Human    Human      Human
 reviews    reviews  reviews    reviews
```

### Phase 0: Scope Check

Most requests describe one capability. If this one does, skip this phase and go straight to Specify — Phase 0 exists for the exception, not the rule, and it puts no hierarchy on single-capability features.

**Detection.** Decompose before specifying when a single requirement bundles several independently testable capabilities:

- The requirement names distinct capabilities with their own consumers or data (e.g. identity, billing, notifications, reporting)
- Acceptance criteria cluster into groups that could ship and be verified separately
- One capability could be cut or replaced without rewriting the others' requirements

**Propose a capability map before writing any spec.** Small and reviewable — a module table plus a build order, not a project plan:

```markdown
# Capability Map: [Initiative Name]

| Module id | Responsibility | Depends on |
|---|---|---|
| identity | Accounts, sessions, SSO | — |
| billing | Plans, invoices, payments | identity |
| notifications | Email and webhook fan-out | identity |
| reporting | Usage dashboards | billing, notifications |

Build order: identity → billing, notifications → reporting
```

- **Stable module ids.** Kebab-case, chosen once, never renamed mid-initiative. Specs, plans, and downstream commands select work by these ids instead of guessing which spec is active.
- **Dependency direction, no cycles.** Arrows point one way. If two modules each need the other, they are one module.
- **Interfaces live at the boundary.** The map records that `billing` depends on `identity`; the contract between them belongs in the provider module's spec (see `api-and-interface-design` for designing it).

**The map is gated like every phase.** The human reviews module boundaries, dependency direction, and build order before any module spec is written. Getting the map wrong is expensive; reviewing ten lines is not.

**Then recurse per module.** Run Specify → Plan → Tasks → Implement for each module in dependency order. Each module gets its own spec, scoped to that module's objective, boundaries, and success criteria. Save the approved map at the project root and each module's spec alongside it, named by module id (`SPEC-identity.md`, `SPEC-billing.md`) — the map, not filename guessing, is the index of what exists.

### Phase 1: Specify

Start with a high-level vision. Ask the human clarifying questions until requirements are concrete.

**Surface assumptions immediately.** Before writing any spec content, list what you're assuming:

```
ASSUMPTIONS I'M MAKING:
1. This is a web application (not native mobile)
2. Authentication uses session-based cookies (not JWT)
3. The database is PostgreSQL (based on existing Prisma schema)
4. We're targeting modern browsers only (no IE11)
→ Correct me now or I'll proceed with these.
```

Don't silently fill in ambiguous requirements. The spec's entire purpose is to surface misunderstandings *before* code gets written — assumptions are the most dangerous form of misunderstanding.

**Write a spec document covering these six core areas:**

1. **Objective** — What are we building and why? Who is the user? What does success look like?

2. **Commands** — Full executable commands with flags, not just tool names.
   ```
   Build: npm run build
   Test: npm test -- --coverage
   Lint: npm run lint --fix
   Dev: npm run dev
   ```

3. **Project Structure** — Where source code lives, where tests go, where docs belong.
   ```
   src/           → Application source code
   src/components → React components
   src/lib        → Shared utilities
   tests/         → Unit and integration tests
   e2e/           → End-to-end tests
   docs/          → Documentation
   ```

4. **Code Style** — One real code snippet showing your style beats three paragraphs describing it. Include naming conventions, formatting rules, and examples of good output.

5. **Testing Strategy** — What framework, where tests live, coverage expectations, which test levels for which concerns.

6. **Boundaries** — Three-tier system:
   - **Always do:** Run tests before commits, follow naming conventions, validate inputs
   - **Ask first:** Database schema changes, adding dependencies, changing CI config
   - **Never do:** Commit secrets, edit vendor directories, remove failing tests without approval

**Spec template:**

```markdown
# Spec: [Project/Feature Name]

## Objective
[What we're building and why. User stories or acceptance criteria.]

## Tech Stack
[Framework, language, key dependencies with versions]

## Commands
[Build, test, lint, dev — full commands]

## Project Structure
[Directory layout with descriptions]

## Code Style
[Example snippet + key conventions]

## Testing Strategy
[Framework, test locations, coverage requirements, test levels]

## Boundaries
- Always: [...]
- Ask first: [...]
- Never: [...]

## Success Criteria
[How we'll know this is done — specific, testable conditions]

## Open Questions
[Anything unresolved that needs human input]
```

**External spec tools:** This workflow is format-agnostic. If the project
already uses OpenSpec or another specification system, keep that system's
artifact format and storage conventions instead of creating a duplicate
`SPEC.md`. This skill owns the clarification, content, and approval gates; the
external tool owns how the approved spec is represented.

**Reframe instructions as success criteria.** When receiving vague requirements, translate them into concrete conditions:

```
REQUIREMENT: "Make the dashboard faster"

REFRAMED SUCCESS CRITERIA:
- Dashboard LCP < 2.5s on 4G connection
- Initial data load completes in < 500ms
- No layout shift during load (CLS < 0.1)
→ Are these the right targets?
```

This lets you loop, retry, and problem-solve toward a clear goal rather than guessing what "faster" means.

### Phase 2: Plan

With the validated spec, generate a technical implementation plan:

1. Identify the major components and their dependencies
2. Determine the implementation order (what must be built first)
3. Note risks and mitigation strategies
4. Identify what can be built in parallel vs. what must be sequential
5. Define verification checkpoints between phases

> Follow `planning-and-task-breakdown` for the dependency-graph mapping and vertical-slicing mechanics behind these steps; it is the canonical source. The bullets above are a lightweight summary; if they ever diverge, `planning-and-task-breakdown` takes precedence.
>
> **Output convention:** Save the plan to `tasks/plan.md` and record the task list in the task list target defined by `planning-and-task-breakdown` (default `tasks/todo.md`; projects may designate an external tracker instead). Create `tasks/` if it does not exist. Downstream commands (`/build`, etc.) expect these defaults.

The plan should be reviewable: the human should be able to read it and say "yes, that's the right approach" or "no, change X."

### Phase 3: Tasks

Break the plan into discrete, implementable tasks:

- Each task should be completable in a single focused session
- Each task has explicit acceptance criteria
- Each task includes a verification step (test, build, manual check)
- Tasks are ordered by dependency, not by perceived importance
- No task should require changing more than ~5 files

> Follow `planning-and-task-breakdown` for the full task-sizing and dependency-ordering mechanics; it is the canonical source. The template below is a lightweight inline form; if they ever diverge, `planning-and-task-breakdown` takes precedence.

**Task template:**
```markdown
- [ ] Task: [Description]
  - Acceptance: [What must be true when done]
  - Verify: [How to confirm — test command, build, manual check]
  - Files: [Which files will be touched]
```

### Phase 4: Implement

Execute tasks one at a time following `skills/incremental-implementation/SKILL.md` (`incremental-implementation`) and `skills/test-driven-development/SKILL.md` (`test-driven-development`). Use `skills/context-engineering/SKILL.md` (`context-engineering`) to load the right spec sections and source files at each step rather than flooding the agent with the entire spec.

## Keeping the Spec Alive

The spec is a living document, not a one-time artifact:

- **Update when decisions change** — If you discover the data model needs to change, update the spec first, then implement.
- **Update when scope changes** — Features added or cut should be reflected in the spec.
- **Commit the spec** — The spec belongs in version control alongside the code.
- **Reference the spec in PRs** — Link back to the spec section that each PR implements.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "This is simple, I don't need a spec" | Simple tasks don't need *long* specs, but they still need acceptance criteria. A two-line spec is fine. |
| "I'll write the spec after I code it" | That's documentation, not specification. The spec's value is in forcing clarity *before* code. |
| "The spec will slow us down" | A 15-minute spec prevents hours of rework. Waterfall in 15 minutes beats debugging in 15 hours. |
| "Requirements will change anyway" | That's why the spec is a living document. An outdated spec is still better than no spec. |
| "The user knows what they want" | Even clear requests have implicit assumptions. The spec surfaces those assumptions. |
| "It's one big feature; splitting it is overhead" | If acceptance criteria cluster into independently testable groups, a monolithic spec forces every downstream task to reason over the whole contract. A ten-line capability map is the cheap alternative. |
| "I'll decompose during planning" | Planning slices tasks within a spec. By then the oversized artifact already exists — module boundaries and dependency direction must be decided before the spec is written, not after. |

## Red Flags

- Starting to write code without any written requirements
- Asking "should I just start building?" before clarifying what "done" means
- Implementing features not mentioned in any spec or task list
- Making architectural decisions without documenting them
- Skipping the spec because "it's obvious what to build"
- One spec whose requirements span several independently testable capabilities
- Module boundaries or build order decided implicitly during implementation because no capability map was approved up front

## Verification

Before proceeding to implementation, confirm:

- [ ] The spec covers all six core areas
- [ ] The human has reviewed and approved the spec
- [ ] Success criteria are specific and testable
- [ ] Boundaries (Always/Ask First/Never) are defined
- [ ] The spec is saved to a file in the repository
- [ ] If the request bundles several independently testable capabilities, a capability map (module ids, dependency direction, build order) was approved before any module spec was written
- [ ] Every module spec traces to a module id in the approved map
