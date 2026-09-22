function Page({ children }) {
  return (
    <main style={{ background: "var(--color-bg)", padding: "var(--space-md)", fontFamily: "var(--font-sans)", color: "var(--color-text)" }}>
      <h1>Today's Room Schedule</h1>
      {children}
    </main>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} style={{ background: "var(--color-accent)", color: "var(--color-bg)", border: "none", padding: "var(--space-md)", fontFamily: "var(--font-sans)", cursor: "pointer", borderRadius: 4 }}>
      {children}
    </button>
  );
}

function Field({ label, id, value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label htmlFor={id} style={{ fontFamily: "var(--font-sans)" }}>{label}</label>
      <input id={id} value={value} onChange={onChange} style={{ padding: "var(--space-md)", fontFamily: "var(--font-sans)", border: "1px solid var(--color-text)", borderRadius: 4 }} />
    </div>
  );
}

function Table({ rows }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "var(--space-md)" }}>
      <thead><tr>{["Room", "Time", "Name", "Status"].map(h => <th key={h} style={{ textAlign: "left", padding: "var(--space-md)", borderBottom: "2px solid var(--color-accent)" }}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => (
        <tr key={i} style={{ borderBottom: "1px solid var(--color-text)" }}>
          <td style={{ padding: "var(--space-md)" }}>{r.room}</td>
          <td style={{ padding: "var(--space-md)" }}>{r.time}</td>
          <td style={{ padding: "var(--space-md)" }}>{r.name}</td>
          <td style={{ padding: "var(--space-md)" }}><span style={{ background: r.status === "Booked" ? "var(--color-accent)" : "var(--color-text)", color: "var(--color-bg)", borderRadius: 12, padding: "2px 10px", fontSize: "0.85em" }}>{r.status}</span></td>
        </tr>
      ))}</tbody>
    </table>
  );
}

function FacilitiesCoordinatorSees() {
  const [rows, setRows] = React.useState([
    { room: "Elm Suite", time: "08:00–09:00", name: "Dr. Patel", status: "Booked" },
    { room: "Cedar Room", time: "09:30–10:30", name: "Maintenance", status: "Blocked" },
    { room: "Oak Hall", time: "11:00–12:00", name: "J. Okonkwo", status: "Booked" },
  ]);
  const [room, setRoom] = React.useState("");
  const [time, setTime] = React.useState("");
  React.useEffect(() => { const id = setInterval(() => setRows(r => [...r]), 30000); return () => clearInterval(id); }, []);
  const addBlock = () => { if (room && time) { setRows(r => [...r, { room, time, name: "Maintenance", status: "Blocked" }].sort((a, b) => a.time.localeCompare(b.time))); setRoom(""); setTime(""); } };
  return (
    <Page>
      <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap", alignItems: "flex-end", marginBottom: "var(--space-md)" }}>
        <Field label="Room" id="block-room" value={room} onChange={e => setRoom(e.target.value)} />
        <Field label="Time (e.g. 14:00–15:00)" id="block-time" value={time} onChange={e => setTime(e.target.value)} />
        <Button onClick={addBlock}>Add Maintenance Block</Button>
      </div>
      <Table rows={rows} />
    </Page>
  );
}