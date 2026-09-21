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
function AdminCancel() {
  return (
    <Page>
      <h1>AdminCancel</h1>
      <p>Admin cancels any booking</p>
      <p>Sibling screens: REQ0003R01REQ0003R01, REQ0003R02REQ0003R02, REQ0003R03REQ0003R03, REQ0003R04REQ0003R04, REQ0003R05REQ0003R05, REQ0003R06REQ0003R06</p>
      <Field name="query" label="AdminCancel input" />
      <Button type="submit">Continue</Button>
      <Table heading="AdminCancel"><tr><td>Ready for Gate 3 preview.</td></tr></Table>
    </Page>
  );
}
