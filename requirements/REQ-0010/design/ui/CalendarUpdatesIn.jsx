function Page({ children }) {
  return (
    <main style={{ background: "var(--color-bg)", padding: "var(--space-md)", fontFamily: "var(--font-sans)", color: "var(--color-text)" }}>
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

function Field({ label, id, value, onChange }) {
  return (
    <div style={{ marginBottom: "var(--space-md)" }}>
      <label htmlFor={id} style={{ display: "block", marginBottom: "4px" }}>{label}</label>
      <input id={id} value={value} onChange={onChange} style={{ fontFamily: "var(--font-sans)", padding: "var(--space-md)", width: "100%" }} />
    </div>
  );
}

function Table({ rows }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)" }}>
      <thead><tr>{["Time", "Title", "Status"].map(h => <th key={h} style={{ textAlign: "left", padding: "var(--space-md)", borderBottom: "1px solid var(--color-accent)" }}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{[r.time, r.title, r.status].map((c, j) => <td key={j} style={{ padding: "var(--space-md)" }}>{c}</td>)}</tr>)}</tbody>
    </table>
  );
}

function CalendarUpdatesIn() {
  const [title, setTitle] = React.useState("");
  const [time, setTime] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [events, setEvents] = React.useState([{ time: "09:00", title: "Standup", status: "confirmed" }]);
  const handleWrite = () => {
    setLoading(true);
    setTimeout(() => { setEvents(ev => [...ev, { time, title, status: "pending" }].map(e => e.title === title ? { ...e, status: "confirmed" } : e)); setLoading(false); }, 1800);
  };
  return (
    <Page>
      <h1>Today's Calendar</h1>
      <Field label="Event title" id="evt-title" value={title} onChange={e => setTitle(e.target.value)} />
      <Field label="Start time" id="evt-time" value={time} onChange={e => setTime(e.target.value)} />
      <Button onClick={handleWrite}>{loading ? "Saving…" : "Add event"}</Button>
      <Table rows={events} />
    </Page>
  );
}