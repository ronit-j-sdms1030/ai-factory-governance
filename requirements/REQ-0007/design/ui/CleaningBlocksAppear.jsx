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
function CleaningBlocksAppear() {
  return (
    <Page>
      <h1>CleaningBlocksAppear</h1>
      <p>'Cleaning 12:00–13:00' ; blocks appear as first-class holds, colour/label distinguishes Booked from Blocked, reason is visible to all…</p>
      <p>Sibling screens: SameDayCalendar, StaffCreateView, RecurringBookingsStaff, CoordinatorsViewBookings, FacilitiesCoordinatorsCreate</p>
      <Field name="query" label="CleaningBlocksAppear input" />
      <Button type="submit">Continue</Button>
      <Table heading="CleaningBlocksAppear"><tr><td>Ready for Gate 3 preview.</td></tr></Table>
    </Page>
  );
}
