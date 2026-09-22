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
function CoordinatorsViewBookings() {
  return (
    <Page>
      <h1>CoordinatorsViewBookings</h1>
      <p>Coordinators view bookings with booker name, creation time, and can cancel or move any booking; moved/cancelled bookings trigger in-app…</p>
      <p>Sibling screens: SameDayCalendar, StaffCreateView, RecurringBookingsStaff</p>
      <Field name="query" label="CoordinatorsViewBookings input" />
      <Button type="submit">Continue</Button>
      <Table heading="CoordinatorsViewBookings"><tr><td>Ready for Gate 3 preview.</td></tr></Table>
    </Page>
  );
}
