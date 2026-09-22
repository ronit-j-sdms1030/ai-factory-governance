function Page({ children }) {
  return (
    <main style={{ background: "var(--color-bg)", padding: "var(--space-md)", fontFamily: "var(--font-sans)", color: "var(--color-text)" }}>
      <h1>Same-Day Room Blocking</h1>
      {children}
    </main>
  );
}

function Button({ onClick, children }) {
  return <button onClick={onClick} style={{ background: "var(--color-accent)", color: "var(--color-text)", padding: "var(--space-md)", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)" }}>{children}</button>;
}

function Field({ label, type = "text", value, onChange, required }) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div style={{ marginBottom: "var(--space-md)" }}>
      <label htmlFor={id} style={{ display: "block", marginBottom: "4px" }}>{label}{required && " *"}</label>
      <input id={id} type={type} value={value} onChange={onChange} style={{ fontFamily: "var(--font-sans)", padding: "var(--space-md)", width: "100%" }} />
    </div>
  );
}

function Table({ blocks }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "var(--space-md)" }}>
      <thead><tr>{["Room","Date","Start","End","Note","Clash"].map(h => <th key={h} style={{ textAlign: "left", padding: "var(--space-md)", borderBottom: "1px solid var(--color-accent)" }}>{h}</th>)}</tr></thead>
      <tbody>{blocks.map((b, i) => <tr key={i}>{[b.room, b.date, b.start, b.end, b.note || "—", b.clash ? "⚠ Clash" : "Clear"].map((v, j) => <td key={j} style={{ padding: "var(--space-md)", color: j === 5 && b.clash ? "var(--color-accent)" : "var(--color-text)" }}>{v}</td>)}</tr>)}</tbody>
    </table>
  );
}

function FacilitiesCoordinatorCan() {
  const today = new Date().toISOString().slice(0, 10);
  const [room, setRoom] = React.useState("");
  const [date, setDate] = React.useState(today);
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [note, setNote] = React.useState("");
  const [blocks, setBlocks] = React.useState([]);
  const hasClash = (b) => blocks.some(x => x.room === b.room && x.date === b.date && b.start < x.end && b.end > x.start);
  const save = () => {
    if (!room || !date || !start || !end || start >= end) return;
    const entry = { room, date, start, end, note };
    setBlocks(prev => [...prev.map(x => x.room === room && x.date === date && start < x.end && end > x.start ? { ...x, clash: true } : x), { ...entry, clash: hasClash(entry) }]);
    setRoom(""); setStart(""); setEnd(""); setNote("");
  };
  return (
    <Page>
      <Field label="Room" value={room} onChange={e => setRoom(e.target.value)} required />
      <Field label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <Field label="Start Time" type="time" value={start} onChange={e => setStart(e.target.value)} required />
      <Field label="End Time" type="time" value={end} onChange={e => setEnd(e.target.value)} required />
      <Field label="Note" value={note} onChange={e => setNote(e.target.value)} />
      <Button onClick={save}>Save Block</Button>
      <Table blocks={blocks} />
    </Page>
  );
}