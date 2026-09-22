function Page({ heading, children }) {
  return (
    <main
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text)",
        fontFamily: "var(--font-sans)",
        padding: "var(--space-md)",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "var(--space-md)" }}>{heading}</h1>
      {children}
    </main>
  );
}

function Button({ onClick, children, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        background: "var(--color-accent)",
        color: "var(--color-bg)",
        fontFamily: "var(--font-sans)",
        border: "none",
        padding: "var(--space-md)",
        cursor: "pointer",
        fontSize: "1rem",
      }}
    >
      {children}
    </button>
  );
}

function Field({ id, label, value, onChange, type = "text" }) {
  return (
    <div style={{ marginBottom: "var(--space-md)" }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          marginBottom: "calc(var(--space-md) / 2)",
          color: "var(--color-text)",
          fontFamily: "var(--font-sans)",
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--color-text)",
          background: "var(--color-bg)",
          border: "1px solid var(--color-text)",
          padding: "calc(var(--space-md) / 2)",
          fontSize: "1rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function Table({ columns, rows }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "var(--font-sans)",
        color: "var(--color-text)",
      }}
    >
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              style={{
                textAlign: "left",
                borderBottom: "2px solid var(--color-accent)",
                padding: "calc(var(--space-md) / 2)",
              }}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td
                key={j}
                style={{
                  borderBottom: "1px solid var(--color-text)",
                  padding: "calc(var(--space-md) / 2)",
                }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CalendarUpdatesIn() {
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [time, setTime] = React.useState("");
  const [events, setEvents] = React.useState([
    ["09:00", "Team standup", "Confirmed"],
    ["11:30", "Design review", "Confirmed"],
    ["14:00", "Client call", "Confirmed"],
  ]);

  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function handleAdd(e) {
    e.preventDefault();
    if (!title.trim() || !time.trim()) return;

    setLoading(true);

    const deadline = setTimeout(() => {
      setLoading(false);
    }, 2000);

    setTimeout(() => {
      setEvents((prev) => {
        const next = [...prev, [time, title, "Pending"]];
        next.sort((a, b) => a[0].localeCompare(b[0]));
        return next;
      });
      setTitle("");
      setTime("");
      clearTimeout(deadline);
      setLoading(false);
    }, 800);
  }

  return (
    <Page heading="Today's Calendar">
      <p
        style={{
          marginBottom: "var(--space-md)",
          color: "var(--color-text)",
          fontFamily: "var(--font-sans)",
        }}
      >
        {todayLabel}
      </p>

      <form
        onSubmit={handleAdd}
        aria-label="Add event"
        style={{ marginBottom: "var(--space-md)" }}
      >
        <Field
          id="event-title"
          label="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Field
          id="event-time"
          label="Start time (HH:MM)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          type="time"
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-md)",
          }}
        >
          <Button type="submit">Add event</Button>
          {loading && (
            <span
              role="status"
              aria-live="polite"
              style={{
                color: "var(--color-accent)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Updating…
            </span>
          )}
        </div>
      </form>

      <section aria-label="Same-day events">
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--color-text)",
            marginBottom: "var(--space-md)",
            fontSize: "1.1rem",
          }}
        >
          Events today
        </h2>
        {events.length === 0 ? (
          <p style={{ fontFamily: "var(--font-sans)", color: "var(--color-text)" }}>
            No events scheduled for today.
          </p>
        ) : (
          <Table
            columns={["Time", "Title", "Status"]}
            rows={events}
          />
        )}
      </section>
    </Page>
  );
}