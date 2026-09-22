function Page({ children }) {
  return (
    <main style={{ background: "var(--color-bg)", padding: "var(--space-md)", fontFamily: "var(--font-sans)", color: "var(--color-text)" }}>
      <h1>Extend Booking</h1>
      {children}
    </main>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} style={{ background: "var(--color-accent)", color: "var(--color-text)", padding: "var(--space-md)", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
      {children}
    </button>
  );
}

function Field({ label, id, type = "text", defaultValue }) {
  return (
    <div style={{ marginBottom: "var(--space-md)" }}>
      <label htmlFor={id} style={{ display: "block", marginBottom: "var(--space-md)" }}>{label}</label>
      <input id={id} type={type} defaultValue={defaultValue} style={{ fontFamily: "var(--font-sans)", padding: "var(--space-md)", width: "100%" }} />
    </div>
  );
}

function Table({ columns, rows }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
      <thead><tr>{columns.map(c => <th key={c} style={{ textAlign: "left", padding: "var(--space-md)", borderBottom: "1px solid var(--color-accent)" }}>{c}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((cell, j) => <td key={j} style={{ padding: "var(--space-md)" }}>{cell}</td>)}</tr>)}</tbody>
    </table>
  );
}

function StaffCanExtend() {
  return (
    <Page>
      <Field label="Current end time / series end date" id="current-end" type="datetime-local" defaultValue="2025-06-10T17:00" />
      <Field label="New end time / series end date" id="new-end" type="datetime-local" defaultValue="2025-06-10T19:00" />
      <Field label="Reason for extension" id="reason" />
      <Button>Check clashes and extend</Button>
      <Table
        columns={["Interval checked", "Resource", "Clash", "Status"]}
        rows={[["17:00 – 19:00", "Room 4B", "None", "Ready to confirm"]]}
      />
    </Page>
  );
}