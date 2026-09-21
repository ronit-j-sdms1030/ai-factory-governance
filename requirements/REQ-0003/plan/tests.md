# Test design — before code

- `REQ-0003-R01-T01` [Vitest] availability for a chosen date
- `REQ-0003-R01-T02` [Vitest] book a room for a time slot
- `REQ-0003-R01-T03` [Vitest] concurrency: two overlapping bookings, exactly one succeeds **(critical)**
- `REQ-0003-R01-T04` [Vitest] user cancels their own booking
- `REQ-0003-R01-T05` [Vitest] admin cancels any booking
- `REQ-0003-R01-T06` [Vitest] audit records who booked and when
- `REQ-0003-R01-T07` [Vitest] screen coverage: every approved screen is reachable
- `REQ-0003-R01-T08` [Vitest] out-of-scope native clients are refused
