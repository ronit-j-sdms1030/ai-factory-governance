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
function OfficeManagerCan2() {
  return (
    <Page>
      <h1>Office Manager Can</h1>
      <p>User-management screen listing current staff accounts name, email, role . 'Add login' form: name, email, temporary password. 'Remove' action with a confirmation step. Removed accounts are deactivated immediately.</p>
      <Field name="room" label="Room" />
      <Field name="starts" label="Starts" />
      <Field name="ends" label="Ends" />
      <Button type="submit">Book this slot</Button>
      <Table heading="Today">
        <tr><td>10:00 Booked</td></tr>
        <tr><td>12:00 Blocked</td></tr>
        <tr><td>14:00 Open</td></tr>
      </Table>
    </Page>
  );
}
