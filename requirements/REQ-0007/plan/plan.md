# Plan — REQ-0007

Locked profile: **node** (Vitest tests, Prisma Migrate migrations).

Sprint 0: **green**.

## Tickets

- `TKT-0001` [development] Implement same-day calendar view showing all rooms and bookings in a single grid (paths: src/ui/calendar/**, src/api/bookings/**; depends: none)
- `TKT-0002` [development] Enable staff to create, view, and cancel bookings with 30-minute time steps and display booker name and department (paths: src/ui/bookings/**, src/api/bookings/**; depends: TKT-0001)
- `TKT-0003` [development] Support recurring bookings with series creation, editing, and cancellation of individual instances or entire series (paths: src/api/recurring_bookings/**, src/ui/recurring/**; depends: TKT-0002)
- `TKT-0004` [development] Coordinator view: show bookings with booker name, creation time, and allow cancel or move bookings with in-app notifications (paths: src/ui/coordinator/**, src/api/notifications/**; depends: TKT-0001, TKT-0002)
- `TKT-0005` [development] Facilities coordinators manage administrative blocks with color-coded labels and recurring block support (paths: src/api/blocks/**, src/ui/blocks/**; depends: TKT-0001)
- `TKT-0006` [development] Implement session-based authentication with email/password login, demo account creation, and cookie-based sessions with idle timeout (paths: src/api/auth/**, src/ui/auth/**; depends: none)
- `TKT-0007` [development] Ensure responsive design for mobile browsers (paths: src/ui/**; depends: TKT-0001)

## Entity ownership

- `ESLint` owned by development
- `PostgreSQL` owned by development
- `SameDayCalendar` owned by development
- `StaffCreateView` owned by development
- `RecurringBookingsStaff` owned by development
- `CoordinatorsViewBookings` owned by development
- `FacilitiesCoordinatorsCreate` owned by development
- `CleaningBlocksAppear` owned by development
- `SessionBasedAuthentication` owned by development
- `InAppNotifications` owned by development
- `ResponsiveDesignWorks` owned by development
- `HTTPS` owned by development
- `LOCATION` owned by development
- `LDAP` owned by development
- `SignIn` owned by development
- `AuditEntry` owned by development

## Naming repairs

- none

## Tests (8, before code)

# Test design — before code

- `REQ-0007-T01` [Vitest] Same-day calendar grid displays all rooms and bookings correctly **(critical)**
- `REQ-0007-T02` [Vitest] Staff can create, view, and cancel bookings with 30-minute time selection
- `REQ-0007-T03` [Vitest] Recurring booking series creation and management
- `REQ-0007-T04` [Vitest] Coordinator booking management and notifications
- `REQ-0007-T05` [Vitest] Administrative block creation and management
- `REQ-0007-T06` [Vitest] Block visualization and staff restrictions
- `REQ-0007-T07` [Vitest] Session-based authentication and timeout
- `REQ-0007-T08` [Vitest] In-app notification system for booking changes

