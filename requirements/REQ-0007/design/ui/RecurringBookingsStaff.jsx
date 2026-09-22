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
function RecurringBookingsStaff() {
  return (
    <Page>
      <h1>RecurringBookingsStaff</h1>
      <p>Recurring bookings: staff can create series, edit or cancel individual instances, or cancel entire series; edit series start/end from a…</p>
      <p>Sibling screens: SameDayCalendar, StaffCreateView</p>
      <Field name="query" label="RecurringBookingsStaff input" />
      <Button type="submit">Continue</Button>
      <Table heading="RecurringBookingsStaff"><tr><td>Ready for Gate 3 preview.</td></tr></Table>
    </Page>
  );
}
