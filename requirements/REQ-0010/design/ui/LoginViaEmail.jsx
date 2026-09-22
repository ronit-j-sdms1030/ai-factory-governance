function Page({ children }) {
  return (
    <main style={{ background: "var(--color-bg)", padding: "var(--space-md)", fontFamily: "var(--font-sans)", color: "var(--color-text)" }}>
      <h1>Sign In</h1>
      {children}
    </main>
  );
}

function Button({ children, onClick, type = "submit" }) {
  return (
    <button type={type} onClick={onClick} style={{ background: "var(--color-accent)", color: "var(--color-text)", padding: "var(--space-md)", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
      {children}
    </button>
  );
}

function Field({ label, id, type = "text", value, onChange }) {
  return (
    <div style={{ marginBottom: "var(--space-md)" }}>
      <label htmlFor={id} style={{ display: "block", marginBottom: "var(--space-md)" }}>{label}</label>
      <input id={id} type={type} value={value} onChange={onChange} style={{ fontFamily: "var(--font-sans)", padding: "var(--space-md)", width: "100%" }} />
    </div>
  );
}

function Table({ rows }) {
  return (
    <table role="table" style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
      <thead><tr><th scope="col">Attempt</th><th scope="col">Status</th></tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}><td>{r.attempt}</td><td>{r.status}</td></tr>)}</tbody>
    </table>
  );
}

function LoginViaEmail() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const [log, setLog] = React.useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fakeAuth(email, password);
    const entry = { attempt: email, status: res.ok ? "success" : "failed" };
    setLog((prev) => [...prev, entry]);
    if (res.ok) { window.location.href = res.role === "admin" ? "/admin" : "/dashboard"; }
    else { setError("Invalid credentials. Please try again."); }
  };
  return (
    <Page>
      <form onSubmit={handleSubmit} noValidate>
        <Field label="Email address" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Field label="Password" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p role="alert" style={{ color: "var(--color-accent)" }}>{error}</p>}
        <Button type="submit">Sign In</Button>
      </form>
      {log.length > 0 && <Table rows={log} />}
    </Page>
  );
}