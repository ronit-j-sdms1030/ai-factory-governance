function Page({ children }) {
  return (
    <main style={{ background: "var(--color-bg)", padding: "var(--space-md)", fontFamily: "var(--font-sans)", color: "var(--color-text)", maxWidth: "100%", boxSizing: "border-box" }}>
      {children}
    </main>
  );
}

function Button({ label, onClick }) {
  return (
    <button onClick={onClick} style={{ background: "var(--color-accent)", color: "var(--color-text)", font: "inherit", padding: "var(--space-md)", minHeight: "44px", minWidth: "44px", border: "none", cursor: "pointer", width: "100%", boxSizing: "border-box" }}>
      {label}
    </button>
  );
}

function Field({ id, label }) {
  return (
    <div style={{ marginBottom: "var(--space-md)" }}>
      <label htmlFor={id} style={{ display: "block", marginBottom: "4px" }}>{label}</label>
      <input id={id} name={id} style={{ width: "100%", minHeight: "44px", boxSizing: "border-box", font: "inherit", padding: "var(--space-md)" }} />
    </div>
  );
}

function Table({ rows }) {
  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr>{["Screen","Min Width","Touch Target","Hover-free"].map(h => <th key={h} style={{ textAlign: "left", padding: "var(--space-md)", borderBottom: "1px solid var(--color-text)" }}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} style={{ padding: "var(--space-md)", borderBottom: "1px solid var(--color-text)" }}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function ResponsiveDesignStaff() {
  return (
    <Page>
      <h1>Responsive Design Constraints</h1>
      <Field id="screen-name" label="Screen name" />
      <Field id="breakpoint" label="Minimum tested width (px)" />
      <Button label="Save constraint" onClick={() => {}} />
      <Table rows={[["Dashboard","320 px","44 px","Yes"],["Staff list","320 px","44 px","Yes"],["Edit record","320 px","44 px","Yes"]]} />
    </Page>
  );
}