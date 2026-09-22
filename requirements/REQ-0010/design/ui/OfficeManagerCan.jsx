function Page({ children }) {
  return (
    <main style={{ background: "var(--color-bg)", padding: "var(--space-md)", fontFamily: "var(--font-sans)", color: "var(--color-text)" }}>
      <h1>Staff Account Management</h1>
      {children}
    </main>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} style={{ background: "var(--color-accent)", color: "var(--color-text)", padding: "var(--space-md)", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
      {children}
    </button>
  );
}

function Field({ label, type = "text", value, onChange }) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div style={{ marginBottom: "var(--space-md)" }}>
      <label htmlFor={id} style={{ display: "block", marginBottom: "4px" }}>{label}</label>
      <input id={id} type={type} value={value} onChange={onChange} style={{ fontFamily: "var(--font-sans)", padding: "var(--space-md)", width: "100%" }} />
    </div>
  );
}

function Table({ rows, onRemove }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "var(--space-md)" }}>
      <thead><tr>{["Name","Email","Role","Action"].map(h => <th key={h} style={{ textAlign:"left", padding:"var(--space-md)", borderBottom:"1px solid var(--color-text)" }}>{h}</th>)}</tr></thead>
      <tbody>{rows.map(r => (
        <tr key={r.email} style={{ opacity: r.deactivated ? 0.4 : 1 }}>
          <td style={{ padding: "var(--space-md)" }}>{r.name}</td>
          <td style={{ padding: "var(--space-md)" }}>{r.email}</td>
          <td style={{ padding: "var(--space-md)" }}>{r.role}</td>
          <td style={{ padding: "var(--space-md)" }}>{!r.deactivated && <Button onClick={() => { if (window.confirm(`Deactivate ${r.name}?`)) onRemove(r.email); }}>Remove</Button>}</td>
        </tr>
      ))}</tbody>
    </table>
  );
}

function OfficeManagerCan() {
  const [staff, setStaff] = React.useState([{ name:"Ada Lovelace", email:"ada@co.com", role:"Engineer", deactivated:false },{ name:"Grace Hopper", email:"grace@co.com", role:"Manager", deactivated:false }]);
  const [name, setName] = React.useState(""); const [email, setEmail] = React.useState(""); const [pass, setPass] = React.useState("");
  const add = () => { if (name && email && pass) { setStaff([...staff, { name, email, role:"Staff", deactivated:false }]); setName(""); setEmail(""); setPass(""); } };
  const remove = (e) => setStaff(staff.map(s => s.email === e ? { ...s, deactivated:true } : s));
  return (
    <Page>
      <Field label="Full Name" value={name} onChange={e => setName(e.target.value)} />
      <Field label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <Field label="Temporary Password" type="password" value={pass} onChange={e => setPass(e.target.value)} />
      <Button onClick={add}>Add Login</Button>
      <Table rows={staff} onRemove={remove} />
    </Page>
  );
}