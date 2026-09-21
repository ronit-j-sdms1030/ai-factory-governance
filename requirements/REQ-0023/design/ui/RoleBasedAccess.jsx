function Page(props) {
  return <main className="page" style={{background:"var(--color-bg)", color:"var(--color-text)", fontFamily:"var(--font-sans)", padding:"var(--space-md)"}}>{props.children}</main>;
}
function Button(props) {
  return <button type={props.type || "button"} style={{background:"var(--color-accent)", color:"var(--color-bg)", padding:"var(--space-md)"}}>{props.children}</button>;
}
function Field(props) {
  return <label>{props.label}<input name={props.name} /></label>;
}
function Table(props) {
  return <table><thead><tr><th>{props.heading}</th></tr></thead><tbody>{props.children}</tbody></table>;
}
function RoleBasedAccess() {
  return (
    <Page>
      <h1>RoleBasedAccess</h1>
      <p>Role-based access: staff see only their own bookings; reception and coordinators see full board; only coordinators can bump existing…</p>
      <p>Sibling screens: CalendarViewShowing, StaffCanBook, ConflictDetectionReject, BookingCancellationImmediate, RecurringWeeklyBookings, OfficeManagerDashboard, OfficeManagerCan, DayBookingHistory, WeeklySummaryBooking</p>
      <Field name="query" label="RoleBasedAccess input" />
      <Button type="submit">Continue</Button>
      <Table heading="RoleBasedAccess"><tr><td>Ready for Gate 3 preview.</td></tr></Table>
    </Page>
  );
}
