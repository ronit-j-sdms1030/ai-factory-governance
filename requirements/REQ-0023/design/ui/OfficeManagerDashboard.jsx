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
function OfficeManagerDashboard() {
  return (
    <Page>
      <h1>OfficeManagerDashboard</h1>
      <p>Office manager dashboard: all rooms, occupancy status (confirmed/cancelled/no-show), today's view with 15–30 second polling</p>
      <p>Sibling screens: CalendarViewShowing, StaffCanBook, ConflictDetectionReject, BookingCancellationImmediate, RecurringWeeklyBookings</p>
      <Field name="query" label="OfficeManagerDashboard input" />
      <Button type="submit">Continue</Button>
      <Table heading="OfficeManagerDashboard"><tr><td>Ready for Gate 3 preview.</td></tr></Table>
    </Page>
  );
}
