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
function SessionBasedAuthentication() {
  return (
    <Page>
      <h1>SessionBasedAuthentication</h1>
      <p>Session-based authentication: email + password login, demo account creation by office manager, cookie-based sessions with idle timeout</p>
      <p>Sibling screens: SameDayCalendar, StaffCreateView, RecurringBookingsStaff, CoordinatorsViewBookings, FacilitiesCoordinatorsCreate, CleaningBlocksAppear</p>
      <Field name="query" label="SessionBasedAuthentication input" />
      <Button type="submit">Continue</Button>
      <Table heading="SessionBasedAuthentication"><tr><td>Ready for Gate 3 preview.</td></tr></Table>
    </Page>
  );
}
