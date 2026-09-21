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
function ConflictDetectionReject() {
  return (
    <Page>
      <h1>ConflictDetectionReject</h1>
      <p>Conflict detection: reject overlapping bookings, show who holds the room and until when, offer next three free windows</p>
      <p>Sibling screens: CalendarViewShowing, StaffCanBook</p>
      <Field name="query" label="ConflictDetectionReject input" />
      <Button type="submit">Continue</Button>
      <Table heading="ConflictDetectionReject"><tr><td>Ready for Gate 3 preview.</td></tr></Table>
    </Page>
  );
}
