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
function DayBookingHistory2() {
  return (
    <Page>
      <h1>DayBookingHistory</h1>
      <p>90-day booking history filterable by room and person, exportable as CSV</p>
      <p>Sibling screens: CalendarViewShowing, StaffCanBook, ConflictDetectionReject, BookingCancellationImmediate, RecurringWeeklyBookings, OfficeManagerDashboard, OfficeManagerCan, DayBookingHistory, WeeklySummaryBooking, RoleBasedAccess, AdminCancel</p>
      <Field name="query" label="DayBookingHistory input" />
      <Button type="submit">Continue</Button>
      <Table heading="DayBookingHistory"><tr><td>Ready for Gate 3 preview.</td></tr></Table>
    </Page>
  );
}
