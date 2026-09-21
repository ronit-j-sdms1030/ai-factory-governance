# Plan — REQ-0003

Locked profile: **node** (Vitest tests, Prisma Migrate migrations).

Sprint 0: **green**.

## Tickets

- `REQ-0003-W1` [development] schema + migration, including the exclusion constraint (paths: prisma/schema.prisma, prisma/migrations/**; depends: none)
- `REQ-0003-W2` [development] availability API (paths: src/api/**; depends: REQ-0003-W1)
- `REQ-0003-W3` [development] create booking API (paths: src/api/**; depends: REQ-0003-W1, REQ-0003-W2)
- `REQ-0003-W4` [development] cancel API + admin rule (paths: src/api/**; depends: REQ-0003-W3)
- `REQ-0003-W5` [development] REQ0003R01REQ0003R01 screen (paths: src/ui/**; depends: REQ-0003-W2)
- `REQ-0003-W6` [development] REQ0003R02REQ0003R02 screen (paths: src/ui/**; depends: REQ-0003-W5)
- `REQ-0003-W7` [development] REQ0003R03REQ0003R03 screen (paths: src/ui/**; depends: REQ-0003-W6)

## Entity ownership

- `ESLint` owned by development
- `PostgreSQL` owned by development
- `HTTPS` owned by development

## Naming repairs

- none

## Tests (8, before code)

# Test design — before code

- `REQ-0003-R01-T01` [Vitest] availability for a chosen date
- `REQ-0003-R01-T02` [Vitest] book a room for a time slot
- `REQ-0003-R01-T03` [Vitest] concurrency: two overlapping bookings, exactly one succeeds **(critical)**
- `REQ-0003-R01-T04` [Vitest] user cancels their own booking
- `REQ-0003-R01-T05` [Vitest] admin cancels any booking
- `REQ-0003-R01-T06` [Vitest] audit records who booked and when
- `REQ-0003-R01-T07` [Vitest] screen coverage: every approved screen is reachable
- `REQ-0003-R01-T08` [Vitest] out-of-scope native clients are refused

