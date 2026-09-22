function Page({ children }) {
  return (
    <main style={{ background: "var(--color-bg)", padding: "var(--space-md)", fontFamily: "var(--font-sans)", color: "var(--color-text)" }}>
      <h1>Book a Room</h1>
      {children}
    </main>
  );
}

function Button({ onClick, children }) {
  return <button onClick={onClick} style={{ background: "var(--color-accent)", color: "var(--color-text)", padding: "var(--space-md)", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)" }}>{children}</button>;
}

function Field({ label, type, value, onChange }) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div style={{ marginBottom: "var(--space-md)" }}>
      <label htmlFor={id} style={{ display: "block", marginBottom: "4px" }}>{label}</label>
      <input id={id} type={type} value={value} onChange={onChange} style={{ fontFamily: "var(--font-sans)", padding: "var(--space-md)", width: "100%" }} />
    </div>
  );
}

function Table({ bookings }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "var(--space-md)" }}>
      <thead><tr>{["Room","Date","Start","End"].map(h => <th key={h} style={{ textAlign: "left", padding: "var(--space-md)", borderBottom: "1px solid var(--color-accent)" }}>{h}</th>)}</tr></thead>
      <tbody>{bookings.map((b, i) => <tr key={i}>{[b.room, b.date, b.start, b.end].map((v, j) => <td key={j} style={{ padding: "var(--space-md)" }}>{v}</td>)}</tr>)}</tbody>
    </table>
  );
}

function StaffCanBook() {
  const [room, setRoom] = React.useState("");
  const [date, setDate] = React.useState("");
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [bookings, setBookings] = React.useState([]);
  const [conflict, setConflict] = React.useState(null);

  const handleSubmit = async () => {
    setConflict(null);
    const res = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ room, date, start, end }) });
    const data = await res.json();
    if (!res.ok) { setConflict(`Conflict with existing booking: ${data.clashStart}–${data.clashEnd}`); return; }
    setBookings(prev => [...prev.filter(b => b.date !== date), data, ...prev.filter(b => b.date === date && b !== data)].sort((a, b) => a.start.localeCompare(b.start)));
  };

  return (
    <Page>
      {conflict && <div role="alert" style={{ padding: "var(--space-md)", border: "2px solid var(--color-accent)", marginBottom: "var(--space-md)" }}>{conflict}</div>}
      <Field label="Room" type="text" value={room} onChange={e => setRoom(e.target.value)} />
      <Field label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} />
      <Field label="Start Time" type="time" value={start} onChange={e => setStart(e.target.value)} />
      <Field label="End Time" type="time" value={end} onChange={e => setEnd(e.target.value)} />
      <Button onClick={handleSubmit}>Submit</Button>
      <Table bookings={bookings} />
    </Page>
  );
}