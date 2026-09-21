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

### REQ-0003-R06

**Source:** approved scope, in-scope item 6.

Integration with authentication systems if needed to manage user access.

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

- The application will be a web app using React on the frontend and Node.js or Python on the backend with PostgreSQL for data storage.
- The system will be deployed as containers.
- Real-time means ordinary web latency (within a second or two) for updates to availability.
- Authentication integration is required to restrict access to facilities coordinators only.

## Open questions

- Do you require integration with existing calendar or authentication systems? If so, which ones?
- What specific features beyond booking and availability checks are needed? For example, notifications, reporting, or audit logs.
- Are there any requirements for booking approval workflows or multi-step processes?
- What is the expected scale of usage (number of coordinators, rooms, bookings per day)?
- *(critique)* Confirm the owning department for shared records before decomposition.
