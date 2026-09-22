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
function SameDayCalendar() {
  return (
    <Page>
      <h1>SameDayCalendar</h1>
      <p>Same-day calendar view 08:00–18:00 weekdays showing all rooms and bookings in a single grid</p>
      <p>Sibling screens: none yet</p>
      <Field name="query" label="SameDayCalendar input" />
      <Button type="submit">Continue</Button>
      <Table heading="SameDayCalendar"><tr><td>Ready for Gate 3 preview.</td></tr></Table>
    </Page>
  );
}
