# Scope report — REQ-0007

## Users
Facilities coordinators, named staff, reception (uses coordinator view)

## What happens today
Facilities coordinators and staff book meeting rooms using a shared spreadsheet. Double-bookings occur. No enforcement of time slots or room availability.

## In scope
- Same-day calendar view (08:00–18:00 weekdays) showing all rooms and bookings in a single grid
- Staff create, view, and cancel bookings; choose start/end time in 30-minute steps; see booker name and department on each slot
- Recurring bookings: staff can create series, edit or cancel individual instances, or cancel entire series; edit series start/end from a chosen date forward
- Coordinators view bookings with booker name, creation time, and can cancel or move any booking; moved/cancelled bookings trigger in-app notifications to the original booker (who, old slot, new slot or 'cancelled',…
- Facilities coordinators create, edit, and lift administrative blocks (e.g
- 'Cleaning 12:00–13:00'); blocks appear as first-class holds, colour/label distinguishes Booked from Blocked, reason is visible to all users, staff cannot overwrite blocks, recurring blocks show on matching weekdays
- Session-based authentication: email + password login, demo account creation by office manager, cookie-based sessions with idle timeout
- In-app notifications: staff see cancellation/move notifications on their bookings list; no email or Slack notifications in this version
- Responsive design works in mobile browser

## Out of scope
- Native mobile applications (iOS, Android)
- Desktop applications or installers
- Email or Slack notifications
- SSO, LDAP, Entra, or company directory integration (built-in login only for this version)
- Editing or viewing past bookings
- Cancelling or moving a series without affecting individual instances (series and instance are separate; only individual or whole-series operations allowed)

## Success
Room Booker — <LOCATION> HQ. Facilities coordinators and staff book meeting rooms from a same-day calendar without double-booking. Each slot is held by one person or blocked by facilities. Staff know who holds a room and can contact them. Coordinators can manage bookings and blocks, and staff are notified when their bookings are moved or cancelled.

## Non-functional
- Data: names, departments, email addresses, booking history, session tokens — handle as internal business data; no PII export or third-party sharing
- Session timeout: idle expiry after <DATE_TIME> (exact duration to be confirmed)
- Availability: weekdays 08:00–18:00; coordinators can extend hours on demand

## Assumptions
- All users (staff and coordinators) are employees of the company and will be created in the system by the office manager or a coordinator
- Rooms are pre-configured in the system (not created by users)
- A booking occupies a room for a contiguous time block; no split or multi-room bookings
- Facilities blocks are created by coordinators only; staff cannot see or interact with block creation
- The app runs on modern browsers (Chrome, Firefox, Safari, Edge); no legacy browser support required
- Idle timeout duration and exact session expiry policy to be confirmed

## Open questions
- What is the exact idle timeout duration for sessions?
- How many rooms are in scope for <LOCATION> HQ, and are they pre-configured or created by users?
- Should the calendar show a time grid (e.g. 30-minute slots) or a list view, or both?
- When a coordinator moves a booking to a new time, can they move it to a different room, or only within the same room?
- Do recurring bookings have an end date, or can they repeat indefinitely?
- Should staff see the full booking history (past and future), or only current and future bookings?
