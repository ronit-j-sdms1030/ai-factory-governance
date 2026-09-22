# Product overview — REQ-0007

```markdown
# Product Overview

## Room Booker — Same-Day Calendar View

### Purpose
The Room Booker application is designed for the <LOCATION> HQ to streamline the booking of meeting rooms by facilities coordinators and staff. It provides a same-day calendar view that prevents double-booking, allowing users to see room availability in real-time and manage their bookings efficiently.

### Summary
This document outlines the functional specifications for the Same-Day Calendar View feature, which will be implemented in Gate 2 of the project. The calendar will display all available rooms and bookings from 08:00 to 18:00 on weekdays, ensuring that users can easily manage their meeting room reservations.

### Users and Roles
- **Facilities Coordinators**: Manage room bookings and administrative blocks.
- **Staff**: Book meeting rooms and view their reservations.
- **Reception**: Access the coordinator view for managing bookings.

### Current Process
Currently, room bookings are managed through a shared spreadsheet, leading to frequent double-bookings and a lack of enforcement regarding room availability.

### Success Criteria
The successful implementation of the Room Booker application will result in:
- A same-day calendar view that displays all rooms and bookings without double-booking.
- Notifications for staff regarding any changes to their bookings.
- An efficient management system for facilities coordinators.

### In Scope
- A calendar view showing all rooms and bookings.
- Booking creation, viewing, and cancellation by staff.
- Support for recurring bookings.
- Administrative block management by facilities coordinators.
- Session-based authentication for user access.
- In-app notifications for booking changes.

### Out of Scope
- Development of native mobile applications.
- Integration with external notification systems (e.g., email, Slack).
- Editing or viewing past bookings.

### Functional Requirements
The following functional requirements outline the specific capabilities of the Same-Day Calendar View:

1. **REQ-0007-R01**: Display a same-day calendar view showing all rooms and bookings.
2. **REQ-0007-R02**: Allow staff to create, view, and cancel bookings with specific time slots.
3. **REQ-0007-R03**: Enable staff to manage recurring bookings.
4. **REQ-0007-R04**: Provide coordinators with the ability to view and manage all bookings.
5. **REQ-0007-R05**: Allow facilities coordinators to create and manage administrative blocks.
6. **REQ-0007-R06**: Ensure blocks are clearly distinguished from booked slots.
7. **REQ-0007-R07**: Implement session-based authentication for user access.

This overview serves as a foundational document for the development and implementation of the Room Booker application, ensuring all stakeholders are aligned on the project's goals and requirements.
```