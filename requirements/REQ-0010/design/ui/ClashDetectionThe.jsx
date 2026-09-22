function Page({ children, heading }) {
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
        padding: "calc(var(--space-md) * 0.5) var(--space-md)",
        cursor: "pointer",
        fontSize: "1rem",
      }}
    >
      {children}
    </button>
  );
}

function Field({ id, label, type = "text", value, onChange }) {
  return (
    <div style={{ marginBottom: "var(--space-md)" }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          marginBottom: "calc(var(--space-md) * 0.25)",
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
          padding: "calc(var(--space-md) * 0.5)",
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
                padding: "calc(var(--space-md) * 0.5)",
                fontFamily: "var(--font-sans)",
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
                  padding: "calc(var(--space-md) * 0.5)",
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

function ClashDetectionThe() {
  return (
    <Page heading="Clash Detection">
      <p
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--color-text)",
          marginBottom: "var(--space-md)",
          lineHeight: 1.5,
        }}
      >
        Clash feedback is not a standalone screen. When a booking, creation, or
        extension request conflicts with an existing interval, an inline banner
        appears on the originating form — StaffCanBook, StaffCanCreate, or
        StaffCanExtend — identifying the room, the conflicting interval, and
        whether the conflict is a booking or a maintenance block.
      </p>

      <section style={{ marginBottom: "var(--space-md)" }}>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--color-text)",
            marginBottom: "var(--space-md)",
          }}
        >
          Example banner preview
        </h2>

        <div
          role="alert"
          aria-live="assertive"
          style={{
            background: "var(--color-accent)",
            color: "var(--color-bg)",
            fontFamily: "var(--font-sans)",
            padding: "var(--space-md)",
            marginBottom: "var(--space-md)",
          }}
        >
          <strong>Clash detected</strong> — Room: Seminar Room B &nbsp;|&nbsp;
          Conflicting interval: 14:00–15:30 on 12 Aug 2025 &nbsp;|&nbsp; Type:
          Maintenance block
        </div>

        <div
          role="alert"
          aria-live="assertive"
          style={{
            background: "var(--color-accent)",
            color: "var(--color-bg)",
            fontFamily: "var(--font-sans)",
            padding: "var(--space-md)",
            marginBottom: "var(--space-md)",
          }}
        >
          <strong>Clash detected</strong> — Room: Lecture Hall A &nbsp;|&nbsp;
          Conflicting interval: 09:00–10:00 on 15 Aug 2025 &nbsp;|&nbsp; Type:
          Existing booking
        </div>
      </section>

      <section style={{ marginBottom: "var(--space-md)" }}>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--color-text)",
            marginBottom: "var(--space-md)",
          }}
        >
          Banner anatomy
        </h2>

        <Table
          columns={["Field", "Description"]}
          rows={[
            ["Room", "The display name of the room involved in the clash"],
            [
              "Conflicting interval",
              "Start and end time, and date, of the blocking interval",
            ],
            [
              "Conflict type",
              'Either "Existing booking" or "Maintenance block"',
            ],
            [
              "Placement",
              "Inline on StaffCanBook, StaffCanCreate, or StaffCanExtend",
            ],
            ["Role", "role=alert with aria-live=assertive for screen readers"],
          ]}
        />
      </section>
    </Page>
  );
}