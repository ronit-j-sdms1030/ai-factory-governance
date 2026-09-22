function Page({ children }) {
  return (
    <main style={{ background: "var(--color-bg)", padding: "var(--space-md)", fontFamily: "var(--font-sans)", color: "var(--color-text)" }}>
      <h1>Clash Detection</h1>
      {children}
    </main>
  );
}

function Button({ label, onClick }) {
  return (
    <button onClick={onClick} style={{ background: "var(--color-accent)", color: "var(--color-text)", padding: "var(--space-md)", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
      {label}
    </button>
  );
}

function Field({ label, id, value, onChange }) {
  return (
    <div style={{ marginBottom: "var(--space-md)" }}>
      <label htmlFor={id} style={{ display: "block", marginBottom: "var(--space-md)" }}>{label}</label>
      <input id={id} value={value} onChange={onChange} style={{ fontFamily: "var(--font-sans)", padding: "var(--space-md)" }} />
    </div>
  );
}

function Table({ rows }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
      <thead>
        <tr>{["Room", "Conflicting Interval", "Conflict Type", "Appears On"].map(h => <th key={h} style={{ textAlign: "left", padding: "var(--space-md)", borderBottom: "1px solid var(--color-text)" }}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>{[r.room, r.interval, r.type, r.screen].map((c, j) => <td key={j} style={{ padding: "var(--space-md)" }}>{c}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}

function ClashDetectionThe() {
  const rows = [
    { room: "Room A", interval: "Mon 09:00–10:00", type: "Booking", screen: "StaffCanBook" },
    { room: "Room B", interval: "Tue 14:00–15:30", type: "Maintenance Block", screen: "StaffCanExtend" },
    { room: "Room C", interval: "Wed 11:00–12:00", type: "Booking", screen: "StaffCanCreate" },
  ];
  return (
    <Page>
      <Field label="Filter by Room" id="room-filter" value="" onChange={() => {}} />
      <Field label="Filter by Conflict Type" id="type-filter" value="" onChange={() => {}} />
      <Button label="Run Clash Check" onClick={() => {}} />
      <Table rows={rows} />
    </Page>
  );
}