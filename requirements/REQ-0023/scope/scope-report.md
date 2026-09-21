# Scope report — REQ-0023

## Users
Office staff (bookers), office manager, reception, facilities coordinators

## What happens today
Staff coordinate room bookings via shared spreadsheet. No visibility into real-time availability. Office manager manually tracks occupancy and no-shows.

## In scope
- Calendar view showing room availability in 15-minute increments, 08:00–18:00 weekdays only
- Staff can book any start/end time within building hours, max 4 hours per booking (coordinators can extend)
- Conflict detection: reject overlapping bookings, show who holds the room and until when, offer next three free windows
- Booking cancellation: immediate slot release, no-shows under 15 minutes logged for facilities review
- Recurring weekly bookings (staff can create, edit, cancel series)
- Office manager dashboard: all rooms, occupancy status (confirmed/cancelled/no-show), today's view with 15–30 second polling
- Office manager can edit/cancel any booking, move bookings between rooms, add walk-in holds
- 90-day booking history filterable by room and person, exportable as CSV
- Weekly summary: booking count, cancellations under 15 minutes, empty-room holds
- Role-based access: staff see only their own bookings; reception and coordinators see full board; only coordinators can bump existing bookings with logged reason

## Out of scope
- Native mobile app or app-store release (browser only)
- All-day blocks (unless facilities coordinator creates them manually)
- Live websocket push for calendar updates (polling acceptable)
- Advanced analytics or forecasting
- Integration with external calendar systems (e.g., Outlook, Google Calendar)
- Email or SMS notifications

## Success
Meeting Room Booking System. Staff book rooms without spreadsheet coordination. Office manager sees real-time occupancy and no-show patterns without manual tracking. Facilities coordinators can override holds with audit trail. No double-bookings occur.

## Non-functional
- Data: booking records, user roles, room inventory, cancellation timestamps — no personal health or financial data
- Availability: weekday business hours only (08:00–18:00)
- Concurrency: first-writer-wins on overlapping bookings; server-side conflict resolution
- Performance: calendar poll/refresh 15–30 seconds; booking save response < 2 seconds

## Assumptions
- Rooms are pre-configured in the system (not user-created)
- Staff have existing user accounts or will authenticate via a simple login
- Facilities coordinators are a defined role with override permissions
- No integration with external systems (Outlook, Google Calendar, etc.)
- CSV export is a download, not scheduled delivery

## Open questions
- How many rooms and staff members are we starting with? (Affects initial data load and performance tuning.)
- Should staff receive any notification when their booking is cancelled or bumped by a coordinator?
- For recurring weekly bookings, what happens if a single instance is cancelled — does it break the series or skip just that week?
- Who creates user accounts and assigns roles (office manager, coordinator, staff)? Is there a self-signup flow or admin-only provisioning?
