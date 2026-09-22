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
function StaffCanExtend2() {
  return (
    <Page>
      <h1>Staff Can Extend</h1>
      <p>Accessed from an existing booking or series detail. Shows current end time or series end date with an editable field. On submit, clash detection covers the extended interval only; conflict or success feedback appears in place.</p>
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
