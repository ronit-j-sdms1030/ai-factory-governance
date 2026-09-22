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
function ClashDetectionThe2() {
  return (
    <Page>
      <h1>Clash Detection The</h1>
      <p>Not a standalone screen — clash feedback is an inline banner on StaffCanBook, StaffCanCreate, and StaffCanExtend. Banner text identifies the room, the conflicting interval, and whether the conflict is a booking or a maintenance block.</p>
      <nav>
        <Button>StaffCanBook</Button>
        <Button>StaffCanCreate</Button>
        <Button>StaffCanExtend</Button>
        <Button>ClashDetectionThe</Button>
      </nav>
      <Field name="room" label="Room" />
      <Field name="ends" label="Ends" />
      <Button type="submit">Save this block</Button>
      <Table heading="Clash Detection The">
        <tr><td>10:00 Booked</td></tr>
        <tr><td>12:00 Blocked for maintenance</td></tr>
        <tr><td>14:00 Open</td></tr>
      </Table>
    </Page>
  );
}
