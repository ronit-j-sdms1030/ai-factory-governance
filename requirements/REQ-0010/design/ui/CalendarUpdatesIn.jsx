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
function CalendarUpdatesIn() {
  return (
    <Page>
      <h1>Calendar Updates In</h1>
      <p>Not a standalone screen — a cross-cutting behaviour. After any write action the same-day list patch is applied client-side within 2 seconds. A loading indicator is shown during the round-trip; no spinner persists beyond 2 seconds on a normal connection.</p>
      <nav>
        <Button>StaffCanBook</Button>
        <Button>StaffCanCreate</Button>
        <Button>StaffCanExtend</Button>
        <Button>ClashDetectionThe</Button>
      </nav>
      <Field name="ends" label="Ends" />
      <Button type="submit">Save</Button>
      <Table heading="Calendar Updates In">
        <tr><td>10:00 Booked</td></tr>
        <tr><td>12:00 Blocked</td></tr>
        <tr><td>14:00 Open</td></tr>
      </Table>
    </Page>
  );
}
