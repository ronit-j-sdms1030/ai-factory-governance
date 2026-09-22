# Architecture — REQ-0007

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

- `SameDayCalendar` — Same-day calendar view (08:00–18:00 weekdays) showing all rooms and bookings in a single grid
- `StaffCreateView` — Staff create, view, and cancel bookings; choose start/end time in 30-minute steps; see booker name and department on each slot
- `RecurringBookingsStaff` — Recurring bookings: staff can create series, edit or cancel individual instances, or cancel entire series; edit series start/end from a…
- `CoordinatorsViewBookings` — Coordinators view bookings with booker name, creation time, and can cancel or move any booking; moved/cancelled bookings trigger in-app…
- `FacilitiesCoordinatorsCreate` — Facilities coordinators create, edit, and lift administrative blocks (e.g
- `CleaningBlocksAppear` — 'Cleaning 12:00–13:00'); blocks appear as first-class holds, colour/label distinguishes Booked from Blocked, reason is visible to all…
- `SessionBasedAuthentication` — Session-based authentication: email + password login, demo account creation by office manager, cookie-based sessions with idle timeout
- `InAppNotifications` — In-app notifications: staff see cancellation/move notifications on their bookings list; no email or Slack notifications in this version
- `ResponsiveDesignWorks` — Responsive design works in mobile browser

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

# Functional specification — REQ-0007 — Same-day calendar view (08:00–18:00 weekdays) showing all rooms and

Business requirements and functional specification for Gate 2. Every requirement
has a traceability id reused by tickets, tests, commits and attestations.

## 1. Purpose

Room Booker — <LOCATION> HQ. Facilities coordinators and staff book meeting rooms from a same-day calendar without double-booking. Each slot is held by one person or blocked by facilities. Staff know who holds a room and can contact them. Coordinators can manage bookings and blocks, and staff are notified when their bookings are moved or cancelled.

## 2. Summary

This specification turns the approved Gate 1 scope into a testable product description for **Same-day calendar view (08:00–18:00 weekdays) showing all rooms and**. It is the document Gate 2 signs. Screens at Gate 3 must cover §11.

## 3. Users and roles

Facilities coordinators, named staff, reception (uses coordinator view)

## 4. What happens today

Facilities coordinators and staff book meeting rooms using a shared spreadsheet. Double-bookings occur. No enforcement of time slots or room availability.

## 5. Success

Room Booker — <LOCATION> HQ. Facilities coordinators and staff book meeting rooms from a same-day calendar without double-booking. Each slot is held by one person or blocked by facilities. Staff know who holds a room and can contact them. Coordinators can manage bookings and blocks, and staff are notified when their bookings are moved or cancelled.

## 6. In scope

- Same-day calendar view (08:00–18:00 weekdays) showing all rooms and bookings in a single grid
- Staff create, view, and cancel bookings; choose start/end time in 30-minute steps; see booker name and department on each slot
- Recurring bookings: staff can create series, edit or cancel individual instances, or cancel entire series; edit series start/end from a chosen date forward
- Coordinators view bookings with booker name, creation time, and can cancel 
