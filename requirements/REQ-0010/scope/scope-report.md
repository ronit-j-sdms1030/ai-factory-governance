# Scope report — REQ-0010

## Users
Staff members booking meeting rooms, facilities coordinator managing the day's schedule, office manager creating and removing staff logins

## What happens today
Staff and coordinator write room bookings in a shared spreadsheet. Two people often book the same room at the same time, and the clash is not discovered until they arrive.

## In scope
- Staff can book a single meeting room slot by selecting room, date, and time
- Staff can create a recurring booking (same room every <DATE_TIME> for a date range) and cancel the entire series or individual occurrences
- Staff can extend an existing booking or series
- Clash detection: the system refuses a booking if the room is already booked or blocked for any part of the requested time
- Facilities coordinator sees a same-day list of all bookings and maintenance blocks, including staff name and room status (Booked vs. Blocked)
- Facilities coordinator can create a maintenance block for a room on a specific date, which prevents any staff booking during that time
- Calendar updates in place within 1–2 seconds after a booking, cancellation, or maintenance block (no full page reload)
- Office manager can create staff logins (email + password) and remove them
- Login via email and password created by office manager; no SSO, no badge printer integration
- Responsive design: staff on phone and coordinator on laptop see the same today list and can perform all actions

## Out of scope
- Native mobile applications (iOS, Android, app store)
- <PERSON> plugin integration
- Badge printer or physical access control
- SSO or external identity provider
- Multi-day or multi-week views (scope is same-day list only)

## Success
Staff book rooms without double-booking. Clashes are caught before save. The coordinator sees an accurate, live same-day list that matches what staff see. Maintenance blocks prevent bookings. Recurring series can be managed without manual re-entry. Login is simple and office-manager-controlled.

## Non-functional
- Personal data (staff names, email addresses) stored in PostgreSQL. Login credentials created and managed by office manager. Responsive web app (React frontend, Node.js or Python backend, PostgreSQL database)

## Assumptions
- A single office with one set of meeting rooms (not multi-site)
- Same-day list is the primary view; no need for week or month calendars
- Maintenance blocks are created by the facilities coordinator, not self-service
- A cancelled series cancels all future occurrences; past occurrences remain in history
- No approval workflow: a booking is confirmed immediately upon submission if no clash exists

## Open questions
- How many meeting rooms does the office have, and do they have different capacities or features (e.g., video conferencing)?
- What time range should the same-day list cover (e.g., 8 AM to 6 PM)?
- Can a staff member book a room for someone else, or only for themselves?
- Should the system show historical bookings (past dates), or only today and future?
- When a maintenance block is created, should it notify staff with bookings during that time?
