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
function LoginViaEmail2() {
  return (
    <Page>
      <h1>Login Via Email</h1>
      <p>Single-screen login: email field, password field, Sign In button. No SSO button, no social login. Failed authentication shows a generic error no account enumeration . Successful login redirects to the role-appropriate landing view.</p>
      <nav>
        <Button>StaffCanBook</Button>
        <Button>StaffCanCreate</Button>
        <Button>StaffCanExtend</Button>
        <Button>ClashDetectionThe</Button>
      </nav>
      <Field name="email" label="Email" />
      <Field name="password" label="Password" />
      <Button type="submit">Sign in</Button>
      <Table heading="Login Via Email">
        <tr><td>Office manager</td></tr>
        <tr><td>Staff</td></tr>
        <tr><td>Facilities coordinator</td></tr>
      </Table>
    </Page>
  );
}
