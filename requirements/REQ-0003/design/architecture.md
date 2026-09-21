# Architecture — REQ-0003

Locked stack profile: **node**.

## Stack

- Frontend: React
- API: Express
- Data access: Prisma ORM
- Migrations: Prisma Migrate
- Tests: Vitest
- Lint: ESLint + Prettier
- Database: PostgreSQL

## Modules

- `REQ-0003-R01` — REQ-0003-R01
- `REQ-0003-R02` — REQ-0003-R02
- `REQ-0003-R03` — REQ-0003-R03
- `REQ-0003-R04` — REQ-0003-R04
- `REQ-0003-R05` — REQ-0003-R05
- `REQ-0003-R06` — REQ-0003-R06

## Data model

Entities follow the BRD outline. Shared records have one owning department.

## API contracts

Each module exposes create/read/cancel over HTTPS. Identity is Entra SSO.

## Diagram

```mermaid
flowchart LR
  UI[React screens] --> API[Express]
  API --> DB[PostgreSQL]
```

## Non-functional

- Browser only. No third runtime.
- Personal data is masked before model egress.

## Source BRD excerpt

# Business Requirements Document — REQ-0003

Objective, page behaviour, data model outline, security design, assumptions,
open questions and testable acceptance criteria. Each requirement carries a
traceability id that tickets, tests, commits and attestations reuse.

## Objective

Facilities coordinators stop double-booking meeting rooms by using a responsive browser-based booking system that enforces availability and prevents conflicts.

## Requirements

### REQ-0003-R01

**Source:** approved scope, in-scope item 1.

A responsive web application accessible via browsers on desktop and mobile devices.

**Acceptance criteria:**
- A named user can complete this capability in a browser.
- A test can fail this item independently of the others.

### REQ-0003-R02

**Source:** approved scope, in-scope item 2.

Booking meeting rooms with a clear data model to prevent double-booking at specific date and time slots.

**Acceptance criteria:**
- A named user can complete this capability in a browser.
- A test can fail this item independently of the others.

### REQ-0003-R03

**Source:** approved scope, in-scope item 3.

User role: Facilities coordinators in Workplace Services managing room bookings.

**Acceptance criteria:**
- A named user can complete this capability in a browser.
- A test can fail this item independently of the others.

### REQ-0003-R04

**Source:** approved scope, in-scope item 4.

Functionality to view room availability and create, modify, or cancel bookings with enforced availability checks to prevent conflicts.

**Acceptance criteria:**
- A named user can complete this capability in a browser.
- A test can fail this item independently of the others.

### REQ-0003-R05

**Source:** approved scope, in-scope item 5.

Support for multiple coordinators booking simultaneously with real-time updates to avoid double-booking.

**Acceptance criteria:**
- A named user can complete this capability in a browser.
- A test can fail this item independently of the others.


