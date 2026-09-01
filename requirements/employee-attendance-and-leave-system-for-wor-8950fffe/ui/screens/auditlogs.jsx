function AuditLogs() {
  // ----- Mock data -----
  const mockLogs = [
    {
      id: 101,
      entity_type: "attendance",
      entity_id: 3421,
      action: "update",
      old_value: { clock_in_time: "2024-08-01T08:05:00Z", status: "late" },
      new_value: { clock_in_time: "2024-08-01T08:00:00Z", status: "present" },
      actor_id: 12,
      actor_role: "HR Manager",
      reason: "Corrected clock‑in time",
      ip_address: "203.0.113.42",
      created_at: "2024-08-02T10:12:34Z"
    },
    {
      id: 102,
      entity_type: "leave",
      entity_id: 578,
      action: "create",
      old_value: null,
      new_value: { leave_type: "Annual", start_date: "2024-09-15", end_date: "2024-09-20", status: "pending" },
      actor_id: 7,
      actor_role: "Employee",
      reason: "Vacation request",
      ip_address: "198.51.100.77",
      created_at: "2024-09-01T08:45:00Z"
    },
    {
      id: 103,
      entity_type: "shift_assignment",
      entity_id: 9001,
      action: "delete",
      old_value: { shift_id: 3, effective_from: "2024-01-01" },
      new_value: null,
      actor_id: 2,
      actor_role: "System",
      reason: "Shift retired",
      ip_address: "192.0.2.10",
      created_at: "2024-07-15T14:22:10Z"
    }
  ];

  // ----- State -----
  const [logs, setLogs] = React.useState(mockLogs);
  const [filtered, setFiltered] = React.useState(mockLogs);
  const [dateFrom, setDateFrom] = React.useState("");
  const [dateTo, setDateTo] = React.useState("");
  const [entityType, setEntityType] = React.useState("");
  const [actorQuery, setActorQuery] = React.useState("");
  const [selectedLog, setSelectedLog] = React.useState(null);

  // ----- Handlers -----
  const applyFilters = () => {
    let result = logs;
    if (dateFrom) {
      result = result.filter(l => new Date(l.created_at) >= new Date(dateFrom));
    }
    if (dateTo) {
      result = result.filter(l => new Date(l.created_at) <= new Date(dateTo));
    }
    if (entityType) {
      result = result.filter(l => l.entity_type === entityType);
    }
    if (actorQuery) {
      const q = actorQuery.toLowerCase();
      result = result.filter(l =>
        String(l.actor_id).includes(q) || l.actor_role.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  };

  const resetFilters = () => {
    setDateFrom("");
    setDateTo("");
    setEntityType("");
    setActorQuery("");
    setFiltered(logs);
  };

  const exportCsv = () => {
    const headers = [
      "Date",
      "Entity Type",
      "Entity ID",
      "Action",
      "Actor ID",
      "Actor Role",
      "IP Address",
      "Reason"
    ];
    const rows = filtered.map(l => [
      new Date(l.created_at).toLocaleString(),
      l.entity_type,
      l.entity_id,
      l.action,
      l.actor_id,
      l.actor_role,
      l.ip_address,
      l.reason
    ].join(","));
    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit_logs_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ----- Effect: run filter when any filter changes -----
  React.useEffect(applyFilters, [dateFrom, dateTo, entityType, actorQuery, logs]);

  // ----- UI Components -----
  const Sidebar = () => (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>WorkPulse</h2>
      <nav>
        <a href="/" style={styles.navLink}>Dashboard</a>
        <a href="/attendance" style={styles.navLink}>Attendance</a>
        <a href="/leave/request" style={styles.navLink}>Request Leave</a>
        <a href="/team" style={styles.navLink}>Team Management</a>
        <a href="/admin/audit" style={{...styles.navLink, ...styles.activeLink}}>Audit Logs</a>
        <a href="/payroll" style={styles.navLink}>Payroll Export</a>
      </nav>
    </div>
  );

  const DiffModal = ({log, onClose}) => (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h3>Change Details (Log #{log.id})</h3>
        <div style={styles.diffContainer}>
          <div style={styles.diffColumn}>
            <h4>Old Value</h4>
            <pre style={styles.pre}>{JSON.stringify(log.old_value, null, 2) || "—"}</pre>
          </div>
          <div style={styles.diffColumn}>
            <h4>New Value</h4>
            <pre style={styles.pre}>{JSON.stringify(log.new_value, null, 2) || "—"}</pre>
          </div>
        </div>
        <button style={styles.buttonPrimary} onClick={onClose}>Close</button>
      </div>
    </div>
  );

  return (
    <div style={styles.app}>
      <Sidebar />
      <main style={styles.main}>
        <h1 style={styles.title}>Audit Trail</h1>
        <section style={styles.filterBar}>
          <div style={styles.filterGroup}>
            <label style={styles.label}>From:</label>
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={styles.input} />
          </div>
          <div style={styles.filterGroup}>
            <label style={styles.label}>To:</label>
            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} style={styles.input} />
          </div>
          <div style={styles.filterGroup}>
            <label style={styles.label}>Entity:</label>
            <select value={entityType} onChange={e => setEntityType(e.target.value)} style={styles.select}>
              <option value="">All</option>
              <option value="attendance">Attendance</option>
              <option value="leave">Leave</option>
              <option value="shift_assignment">Shift Assignment</option>
            </select>
          </div>
          <div style={styles.filterGroup}>
            <label style={styles.label}>Actor (ID / Role):</label>
            <input type="text" placeholder="e.g. 12 or HR" value={actorQuery} onChange={e => setActorQuery(e.target.value)} style={styles.input} />
          </div>
          <div style={styles.filterActions}>
            <button style={styles.buttonPrimary} onClick={applyFilters}>Apply</button>
            <button style={styles.buttonSecondary} onClick={resetFilters}>Reset</button>
          </div>
        </section>
        <section style={styles.tableSection}>
          <div style={styles.tableHeader}>
            <span>{filtered.length} records found</span>
            <button style={styles.buttonPrimary} onClick={exportCsv}>Export CSV</button>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Entity</th>
                <th style={styles.th}>Action</th>
                <th style={styles.th}>Actor</th>
                <th style={styles.th}>IP Address</th>
                <th style={styles.th}>Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(log => (
                <tr key={log.id} style={styles.tr}>
                  <td style={styles.td}>{new Date(log.created_at).toLocaleString()}</td>
                  <td style={styles.td}>{log.entity_type} (#{log.entity_id})</td>
                  <td style={styles.td}>{log.action}</td>
                  <td style={styles.td}>#{log.actor_id} – {log.actor_role}</td>
                  <td style={styles.td}>{log.ip_address}</td>
                  <td style={styles.td}>
                    <button style={styles.buttonLink} onClick={() => setSelectedLog(log)}>View Diff</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {selectedLog && <DiffModal log={selectedLog} onClose={() => setSelectedLog(null)} />}
      </main>
    </div>
  );
}

// ----- Simple styling objects -----
const styles = {
  app: {
    display: "flex",
    fontFamily: ""Helvetica Neue", Arial, sans-serif",
    color: "#333",
    height: "100vh",
    backgroundColor: "#f5f7fa"
  },
  sidebar: {
    width: 220,
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    padding: "20px",
    boxSizing: "border-box"
  },
  logo: {
    margin: 0,
    fontSize: "1.5rem",
    textAlign: "center",
    marginBottom: "30px"
  },
  navLink: {
    display: "block",
    padding: "8px 12px",
    color: "#bdc3c7",
    textDecoration: "none",
    borderRadius: 4,
    marginBottom: 4,
    fontSize: "0.95rem"
  },
  activeLink: {
    backgroundColor: "#34495e",
    color: "#fff"
  },
  main: {
    flexGrow: 1,
    padding: "30px",
    overflowY: "auto"
  },
  title: {
    marginTop: 0,
    marginBottom: "20px",
    fontSize: "2rem",
    color: "#2c3e50"
  },
  filterBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: 8,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    marginBottom: "20px"
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    minWidth: 120
  },
  label: {
    marginBottom: 4,
    fontSize: "0.9rem",
    color: "#555"
  },
  input: {
    padding: "6px 8px",
    border: "1px solid #ccc",
    borderRadius: 4,
    fontSize: "0.9rem"
  },
  select: {
    padding: "6px 8px",
    border: "1px solid #ccc",
    borderRadius: 4,
    fontSize: "0.9rem",
    backgroundColor: "#fff"
  },
  filterActions: {
    display: "flex",
    alignItems: "flex-end",
    gap: "10px"
  },
  buttonPrimary: {
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: "0.9rem"
  },
  buttonSecondary: {
    backgroundColor: "#7f8c8d",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: "0.9rem"
  },
  buttonLink: {
    background: "none",
    border: "none",
    color: "#2980b9",
    cursor: "pointer",
    textDecoration: "underline",
    padding: 0,
    fontSize: "0.9rem"
  },
  tableSection: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: 8,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  th: {
    textAlign: "left",
    padding: "8px",
    borderBottom: "2px solid #ecf0f1",
    backgroundColor: "#f9fafb",
    fontSize: "0.9rem"
  },
  tr: {
    borderBottom: "1px solid #ecf0f1"
  },
  td: {
    padding: "8px",
    fontSize: "0.85rem"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: 8,
    width: "80%",
    maxWidth: 600,
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
  },
  diffContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "15px",
    marginBottom: "15px"
  },
  diffColumn: {
    flex: 1,
    overflowX: "auto"
  },
  pre: {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    borderRadius: 4,
    fontSize: "0.8rem",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all"
  }
};