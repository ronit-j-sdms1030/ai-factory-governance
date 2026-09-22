# Business Requirements Document — REQ-0010

## Objective

Replace the shared spreadsheet used for meeting-room bookings with a responsive web application that prevents double-booking through real-time clash detection, gives the facilities coordinator a live same-day schedule, lets the office manager control staff access, and supports recurring bookings and maintenance blocks — all without SSO, native apps, or physical-access integration.

## Requirements

### REQ-0010-R01 — Single-slot booking

Staff can book a single meeting room slot by selecting room, date, and time.

- **Given** a staff member is signed in
- **When** they select a room, date, start time, and end time and submit
- **Then** the booking is saved, appears immediately in the same-day list, and no other staff member can book the same room for any overlapping period
- **And** an automated test can fail this requirement without failing any other

### REQ-0010-R02 — Recurring booking

Staff can create a recurring booking (same room, same time, for a date range) and cancel the entire series or individual occurrences.

- **Given** a staff member is signed in
- **When** they define a recurrence pattern (room, time, frequency, date range) and submit
- **Then** all occurrences are saved; the staff member can subsequently cancel the whole series or a single occurrence; past occurrences are preserved in history when a future-only cancellation is applied
- **And** an automated test can fail this requirement without failing any other

### REQ-0010-R03 — Extend booking or series

Staff can extend an existing single booking or every future occurrence in a recurring series.

- **Given** a staff member owns an existing booking or series
- **When** they submit an extension (later end time, or extended date range for a series)
- **Then** clash detection runs against the extended period; if no clash, the booking or all future occurrences are updated; if a clash exists, the extension is refused with a clear message
- **And** an automated test can fail this requirement without failing any other

### REQ-0010-R04 — Clash detection

The system refuses a booking if the room is already booked or blocked for any part of the requested time.

- **Given** room R is booked or blocked for interval [T1, T2]
- **When** any user attempts to book room R for any interval that overlaps [T1, T2]
- **Then** the system rejects the request before saving and returns a human-readable conflict message identifying the clashing interval
- **And** an automated test can fail this requirement without failing any other

### REQ-0010-R05 — Coordinator same-day list

The facilities coordinator sees a same-day list of all bookings and maintenance blocks, including staff name and room status (Booked vs. Blocked).

- **Given** the facilities coordinator is signed in
- **When** they view the same-day list
- **Then** every booking and maintenance block for today is shown with room name, staff name (for bookings), status label (Booked / Blocked), and time interval; the list reflects the current state without a page reload
- **And** an automated test can fail this requirement without failing any other

### REQ-0010-R06 — Maintenance block

The facilities coordinator can create a maintenance block for a room on a specific date, which prevents any staff booking during that time.

- **Given** the facilities coordinator is signed in
- **When** they create a maintenance block specifying room, date, start time, and end time
- **Then** the block is saved; any subsequent staff booking attempt that overlaps the block is refused by clash detection; the block appears in the same-day list with status Blocked
- **And** an automated test can fail this requirement without failing any other

### REQ-0010-R07 — In-place calendar update (≤ 2 s)

The calendar updates in place within 1–2 seconds after a booking, cancellation, or maintenance block — no full page reload.

- **Given** any user performs a booking, cancellation, or maintenance-block action
- **When** the server confirms the action
- **Then** the same-day list reflects the change within 2 seconds without a full page reload; a performance test can assert the 2-second threshold
- **And** an automated test can fail this requirement without failing any other

### REQ-0010-R08 — Office manager: create and remove staff logins

The office manager can create staff logins (email + password) and remove them.

- **Given** the office manager is signed in
- **When** they create a login with a valid email address, or remove an existing login
- **Then** the created account can immediately authenticate; the removed account is denied authentication on the next attempt; no orphaned bookings are created under a removed account
- **And** an automated test can fail this requirement without failing any other

### REQ-0010-R09 — Email-and-password login only

Login is via email and password created by the office manager; no SSO, no badge-printer integration.

- **Given** a user has a login created by the office manager
- **When** they submit their email and password on the login screen
- **Then** they are authenticated and reach their role-appropriate view; no external identity provider or SSO flow is involved
- **And** an automated test can fail this requirement without failing any other

### REQ-0010-R10 — Responsive design

Staff on a phone and the coordinator on a laptop see the same today list and can perform all actions.

- **Given** a user accesses the application on a mobile browser (≥ 320 px viewport) or a desktop browser
- **When** they navigate to any screen
- **Then** all interactive controls are reachable and usable without horizontal scrolling; the same-day list and booking actions are available on both form factors
- **And** an automated test (or visual regression) can fail this requirement without failing any other

## Page behaviour

- **StaffCanBook**: Room-selector, date-picker, start-time and end-time inputs, and a Submit button. On submit, clash detection runs server-side; success inserts the new booking into the same-day list in place; failure surfaces a conflict banner naming the clashing interval. No page reload on either path.
- **StaffCanCreate**: Extends the booking form with a recurrence panel (frequency selector, end-date for the series). Preview shows the first and last occurrence before confirm. On save, all occurrences are written atomically. A "Manage series" view lists occurrences with per-occurrence and whole-series cancel controls.
- **StaffCanExtend**: Accessed from an existing booking or series detail. Shows current end time (or series end date) with an editable field. On submit, clash detection covers the extended interval only; conflict or success feedback appears in place.
- **ClashDetectionThe**: Not a standalone screen — clash feedback is an inline banner on StaffCanBook, StaffCanCreate, and StaffCanExtend. Banner text identifies the room, the conflicting interval, and whether the conflict is a booking or a maintenance block.
- **FacilitiesCoordinatorSees**: Full-width same-day list, sorted by start time. Each row: room name, time interval, staff name (bookings) or "Maintenance" (blocks), status chip (Booked / Blocked). Auto-refreshes in place; no manual reload needed. Coordinator can initiate a maintenance block from this view.
- **FacilitiesCoordinatorCan**: Modal or inline form on the same-day list: room selector, date (defaults to today), start time, end time, optional note. On save, the block appears immediately in the list and clash detection is active for the interval.
- **CalendarUpdatesIn**: Not a standalone screen — a cross-cutting behaviour. After any write action the same-day list patch is applied client-side within 2 seconds. A loading indicator is shown during the round-trip; no spinner persists beyond 2 seconds on a normal connection.
- **OfficeManagerCan**: User-management screen listing current staff accounts (name, email, role). "Add login" form: name, email, temporary password. "Remove" action with a confirmation step. Removed accounts are deactivated immediately.
- **LoginViaEmail**: Single-screen login: email field, password field, Sign In button. No SSO button, no social login. Failed authentication shows a generic error (no account enumeration). Successful login redirects to the role-appropriate landing view.
- **ResponsiveDesignStaff**: Not a standalone screen — a cross-cutting constraint. All screens above must render usably at 320 px and above. Touch targets ≥ 44 px. No action hidden behind a hover state.

### Requirement headings

#### REQ-0010-R01 — Single-slot booking
#### REQ-0010-R02 — Recurring booking
#### REQ-0010-R03 — Extend booking or series
#### REQ-0010-R04 — Clash detection
#### REQ-0010-R05 — Coordinator same-day list
#### REQ-0010-R06 — Maintenance block
#### REQ-0010-R07 — In-place calendar update (≤ 2 s)
#### REQ-0010-R08 — Office manager: create and remove staff logins
#### REQ-0010-R09 — Email-and-password login only
#### REQ-0010-R10 — Responsive design

## Data model outline

PostgreSQL. Minimum fields required by the screens above.

| Entity | Fields |
|---|---|
| **User** | `id`, `name`, `email`, `password_hash`, `role` (staff / coordinator / manager), `active` |
| **Room** | `id`, `name`, `capacity` (nullable until open question resolved) |
| **Booking** | `id`, `room_id`, `user_id`, `starts_at`, `ends_at`, `series_id` (nullable), `status` (active / cancelled) |
| **RecurringSeries** | `id`, `room_id`, `user_id`, `pattern` (JSON: frequency, days), `series_starts_at`, `series_ends_at`, `status` |
| **MaintenanceBlock** | `id`, `room_id`, `created_by` (coordinator user_id), `starts_at`, `ends_at`, `note` (nullable), `status` (active / cancelled) |
| **AuditEntry** | `id`, `actor_id`, `action`, `target_type`, `target_id`, `at` |

Clash detection queries `Booking` (status = active) and `MaintenanceBlock` (status = active) for the same `room_id` where intervals overlap: `starts_at < requested_end AND ends_at > requested_start`.

## Security design

- Authentication: email + password only; bcrypt or Argon2 hashing; no plaintext storage; no SSO.
- Authorisation: role-checked on every API route — staff may only write their own bookings; coordinator may write maintenance blocks and read all bookings; manager may write user accounts.
- Sessions: server-side session or short-lived JWT; HTTPS only; `Secure` + `HttpOnly` cookies.
- No secrets in container images or client bundles.
- Personal data (name, email) stays within the tenant database; masked or excluded before any log egress or model call.
- Account enumeration prevented on login failure (generic error message).
- Removed accounts (`active = false`) are rejected at authentication; their historical bookings remain for audit.

## Assumptions

- Single office, single set of rooms; no multi-site or multi-tenant requirement.
- Same-day list is the primary operational view; no week or month calendar is in scope.
- Maintenance blocks are coordinator-only; staff cannot create them.
- Cancelling a series cancels all future occurrences; past occurrences remain in history.
- No approval workflow: a booking is confirmed immediately on submission if no clash exists.
- Room capacity and features (e.g. video conferencing) are out of scope until the open question on room count is answered.
- Notification of staff when a maintenance block is created over an existing booking is out of scope unless confirmed in open questions.

## Open questions

| # | Question | Owner | Impact if unresolved |
|---|---|---|---|
| OQ-01 | How many meeting rooms exist, and do they have different capacities or AV features? | Office manager | Affects Room data model and filter UI |
| OQ-02 | What time range should the same-day list cover (e.g. 08:00–18:00)? | Facilities coordinator | Affects list rendering and booking time constraints |
| OQ-03 | Can a staff member book a room on behalf of another staff member? | Product owner | Affects booking ownership model and audit trail |
| OQ-04 | Should the system surface historical bookings (past dates), or only today and future? | Product owner | Affects query scope and storage retention policy |
| OQ-05 | When a maintenance block is created over an existing booking, should affected staff be notified? | Facilities coordinator | Adds notification channel requirement if yes |

---

*Traceability: every id in the Requirements section (REQ-0010-R01 through REQ-0010-R10) is the canonical source for tickets, test cases, commits, and Gate 3 attestations. Do not introduce requirements not listed here.*
- *(critique)* Confirm the owning department for shared records before decomposition.
- *(critique)* Acceptance criteria are missing — a later QA pass cannot be written.
