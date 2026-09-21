# Business Requirements Document — REQ-0002

Objective, page behaviour, data model outline, security design, assumptions,
open questions and testable acceptance criteria. Each requirement carries a
traceability id that tickets, tests, commits and attestations reuse.

## Objective

People stop double-booking rooms.

## Requirements

### REQ-0002-R01

**Source:** approved scope, in-scope item 1.

A web application for Facilities coordinators in Workplace Services., replacing: They book rooms in a shared spreadsheet and double-book <DATE_TIME>.

**Acceptance criteria:**
- A named user can complete this capability in a browser.
- A test can fail this item independently of the others.

### REQ-0002-R02

**Source:** approved scope, in-scope item 2.

Built from the request: Book meeting rooms in a browser. No native apps.

**Acceptance criteria:**
- A named user can complete this capability in a browser.
- A test can fail this item independently of the others.


## Page behaviour

Screens cover each in-scope capability; extra screens are reported at Gate 3.

## Data model outline

PostgreSQL. Entities follow client vocabulary; shared entities have one owning department.

## Security design

Entra SSO. No secrets in images. Personal data masked before model egress.

## Assumptions

- Access is through a browser. Entra identity is the client's.

## Open questions

- Which existing system holds the source records today?
- *(critique)* Confirm the owning department for shared records before decomposition.
