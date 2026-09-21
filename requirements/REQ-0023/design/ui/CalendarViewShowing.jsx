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
function CalendarViewShowing() {
  return (
    <Page>
      <h1>CalendarViewShowing</h1>
      <p>Calendar view showing room availability in 15-minute increments, 08:00–18:00 weekdays only</p>
      <p>Sibling screens: none yet</p>
      <Field name="query" label="CalendarViewShowing input" />
      <Button type="submit">Continue</Button>
      <Table heading="CalendarViewShowing"><tr><td>Ready for Gate 3 preview.</td></tr></Table>
    </Page>
  );
}
