# Scope report — REQ-0003

## In scope
- A responsive web application accessible via browsers on desktop and mobile devices.
- Booking meeting rooms with a clear data model to prevent double-booking at specific date and time slots.
- User role: Facilities coordinators in Workplace Services managing room bookings.
- Functionality to view room availability and create, modify, or cancel bookings with enforced availability checks to prevent conflicts.
- Support for multiple coordinators booking simultaneously with real-time updates to avoid double-booking.
- Integration with authentication systems if needed to manage user access.

## Out of scope
- Native mobile applications (iOS, Android, app-store releases).
- Desktop applications or installers.
- Embedded software or device firmware.
- Games or real-time rendering loops.
- High-frequency trading or telemetry ingestion systems.
- Data engineering or ML training platforms beyond AI features inside the app.
- Safety-critical or certified software domains.

## Success
Facilities coordinators stop double-booking meeting rooms by using a responsive browser-based booking system that enforces availability and prevents conflicts.

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
