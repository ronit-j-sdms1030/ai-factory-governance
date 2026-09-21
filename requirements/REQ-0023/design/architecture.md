# Architecture — REQ-0023

Locked stack profile: **python**.

## Stack

- Frontend: React
- API: FastAPI
- Data access: SQLAlchemy
- Migrations: Alembic
- Tests: Pytest
- Lint: Ruff
- Database: PostgreSQL

## Modules

- `CalendarViewShowing` — Calendar view showing room availability in 15-minute increments, 08:00–18:00 weekdays only
- `StaffCanBook` — Staff can book any start/end time within building hours, max 4 hours per booking (coordinators can extend)
- `ConflictDetectionReject` — Conflict detection: reject overlapping bookings, show who holds the room and until when, offer next three free windows
- `BookingCancellationImmediate` — Booking cancellation: immediate slot release, no-shows under 15 minutes logged for facilities review
- `RecurringWeeklyBookings` — Recurring weekly bookings (staff can create, edit, cancel series)
- `OfficeManagerDashboard` — Office manager dashboard: all rooms, occupancy status (confirmed/cancelled/no-show), today's view with 15–30 second polling
- `OfficeManagerCan` — Office manager can edit/cancel any booking, move bookings between rooms, add walk-in holds
- `DayBookingHistory` — 90-day booking history filterable by room and person, exportable as CSV
- `WeeklySummaryBooking` — Weekly summary: booking count, cancellations under 15 minutes, empty-room holds
- `RoleBasedAccess` — Role-based access: staff see only their own bookings; reception and coordinators see full board; only coordinators can bump existing…

## Data model

Entities follow the BRD outline. Shared records have one owning department.

## API contracts

Each module exposes create/read/cancel over HTTPS. Identity is Entra SSO.

## Diagram

```mermaid
flowchart LR
  UI[React screens] --> API[FastAPI]
  API --> DB[PostgreSQL]
```

## Non-functional

- Browser only. No third runtime.
- Personal data is masked before model egress.

## Source BRD excerpt

# Functional specification — REQ-0023 — Calendar view showing room availability in 15-minute increments,

Business requirements and functional specification for Gate 2. Every requirement
has a traceability id reused by tickets, tests, commits and attestations.

## 1. Purpose

Meeting Room Booking System. Staff book rooms without spreadsheet coordination. Office manager sees real-time occupancy and no-show patterns without manual tracking. Facilities coordinators can override holds with audit trail. No double-bookings occur.

## 2. Summary

This specification turns the approved Gate 1 scope into a testable product description for **Calendar view showing room availability in 15-minute increments,**. It is the document Gate 2 signs. Screens at Gate 3 must cover §11.

## 3. Users and roles

Office staff (bookers), office manager, reception, facilities coordinators

## 4. What happens today

Staff coordinate room bookings via shared spreadsheet. No visibility into real-time availability. Office manager manually tracks occupancy and no-shows.

## 5. Success

Meeting Room Booking System. Staff book rooms without spreadsheet coordination. Office manager sees real-time occupancy and no-show patterns without manual tracking. Facilities coordinators can override holds with audit trail. No double-bookings occur.

## 6. In scope

- Calendar view showing room availability in 15-minute increments, 08:00–18:00 weekdays only
- Staff can book any start/end time within building hours, max 4 hours per booking (coordinators can extend)
- Conflict detection: reject overlapping bookings, show who holds the room and until when, offer next three free windows
- Booking cancellation: immediate slot release, no-shows under 15 minutes logged for facilities review
- Recurring weekly bookings (staff can create, edit, cancel series)
- Office manager dashboard: all rooms, occupancy status (confirmed/cancelled/no-show), today's view with 15–30 second polling
- Office manager can edit/cancel any book
