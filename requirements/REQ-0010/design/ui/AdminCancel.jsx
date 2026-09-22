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
      <h1>Admin Cancel</h1>
      <p>Admin cancels any booking</p>
      <nav>
        <Button>StaffCanBook</Button>
        <Button>StaffCanCreate</Button>
        <Button>StaffCanExtend</Button>
        <Button>ClashDetectionThe</Button>
      </nav>
      <Field name="detail" label="Admin Cancel" />
      <Button type="submit">Cancel this booking</Button>
      <Table heading="Admin Cancel">
        <tr><td>09:00 Cancelled</td></tr>
        <tr><td>11:00 Still booked</td></tr>
        <tr><td>15:00 Open</td></tr>
      </Table>
    </Page>
  );
}
