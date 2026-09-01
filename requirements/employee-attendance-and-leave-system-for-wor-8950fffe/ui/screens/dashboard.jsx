function Dashboard() {
  // Mock current user
  const currentUser = React.useMemo(() => ({
    id: 42,
    first_name: "Alex",
    last_name: "Miller",
    role: "manager", // could be 'employee', 'manager', 'hr'
    department: "Engineering",
    location: "New York"
  }), []);

  // State hooks
  const [clockedIn, setClockedIn] = React.useState(false);
  const [attendance, setAttendance] = React.useState([
    // last 5 days mock records (most recent first)
    { date: "2024-08-28", clock_in: "09:02", clock_out: "17:55", status: "present" },
    { date: "2024-08-27", clock_in: "09:15", clock_out: "18:10", status: "late" },
    { date: "2024-08-26", clock_in: "09:00", clock_out: "17:45", status: "present" },
    { date: "2024-08-25", clock_in: "08:58", clock_out: "17:30", status: "present" },
    { date: "2024-08-24", clock_in: null, clock_out: null, status: "absent" }
  ]);
  const [pendingLeaves, setPendingLeaves] = React.useState([
    { id: 101, type: "Annual Leave", days: 2, start: "2024-09-10", end: "2024-09-11", status: "pending" },
    { id: 102, type: "Sick Leave", days: 1, start: "2024-08-30", end: "2024-08-30", status: "pending" }
  ]);
  const [notifications, setNotifications] = React.useState([
    { id: 1, title: "Clock‑in reminder", message: "Don’t forget to clock in before 9:00 AM", time: "08:45" },
    { id: 2, title: "Leave approved", message: "Your sick leave for 30 Aug has been approved", time: "09:20" }
  ]);
  const [offlineQueue, setOfflineQueue] = React.useState(0);

  // Simulate a WebSocket that pushes a new notification every 12 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      const newNotif = {
        id: Date.now(),
        title: "Policy update",
        message: "New overtime policy effective from 1 Sep",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setNotifications(prev => [newNotif, ...prev].slice(0, 20)); // keep recent 20
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleClockIn = () => {
    if (clockedIn) return;
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    // Add to attendance (optimistic)
    setAttendance(prev => [{ date: today, clock_in: timeStr, clock_out: null, status: "present" }, ...prev].slice(0, 5));
    setClockedIn(true);
    // Simulate offline queue increment
    setOfflineQueue(q => q + 1);
    // Push notification
    setNotifications(prev => [{ id: Date.now(), title: "Clocked in", message: `You clocked in at ${timeStr}`, time: timeStr }, ...prev]);
  };

  const handleClockOut = () => {
    if (!clockedIn) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setAttendance(prev => {
      const updated = prev.map(rec => {
        if (rec.clock_out === null && rec.clock_in !== null) {
          return { ...rec, clock_out: timeStr, status: rec.clock_in > "09:00" ? "late" : "present" };
        }
        return rec;
      });
      return updated;
    });
    setClockedIn(false);
    setOfflineQueue(q => q + 1);
    setNotifications(prev => [{ id: Date.now(), title: "Clocked out", message: `You clocked out at ${timeStr}`, time: timeStr }, ...prev]);
  };

  const handleRequestLeave = () => {
    const type = prompt("Leave type (Annual, Sick, Unpaid):", "Annual");
    if (!type) return;
    const days = parseInt(prompt("Number of days:"), 10);
    if (isNaN(days) || days <= 0) return;
    const start = prompt("Start date (YYYY-MM-DD):", "2024-09-15");
    const end = prompt("End date (YYYY-MM-DD):", start);
    const newLeave = {
      id: Date.now(),
      type: `${type} Leave`,
      days,
      start,
      end,
      status: "pending"
    };
    setPendingLeaves(prev => [newLeave, ...prev]);
    setNotifications(prev => [{ id: Date.now(), title: "Leave requested", message: `${type} leave for ${days} day(s) submitted`, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }, ...prev]);
  };

  // Styling constants
  const colors = {
    primary: "#0d6efd",
    secondary: "#6c757d",
    success: "#198754",
    danger: "#dc3545",
    bg: "#f8f9fa",
    cardBg: "#ffffff",
    border: "#dee2e6"
  };

  const containerStyle = { display: "flex", minHeight: "100vh", fontFamily: "Arial,Helvetica,sans-serif", background: colors.bg };
  const sidebarStyle = { width: 240, background: colors.primary, color: "#fff", padding: 20 };
  const contentStyle = { flex: 1, padding: 20, overflowY: "auto" };
  const cardStyle = { background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: 8, padding: 16, marginBottom: 20, boxShadow: "0 1px 3px rgba(0,0,0,.1)" };
  const buttonStyle = (bg) => ({ background: bg, color: "#fff", border: "none", borderRadius: 4, padding: "8px 12px", cursor: "pointer", marginRight: 8, fontWeight: "bold" });

  // Role‑specific metric mock
  const teamStats = {
    totalMembers: 42,
    presentToday: 38,
    onLeave: 3,
    absent: 1
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar navigation */}
      <nav style={sidebarStyle}>
        <h2 style={{ marginTop: 0, marginBottom: 30 }}>WorkPulse</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: 12 }}><a href="/" style={{ color: "#fff", textDecoration: "none" }}>Dashboard</a></li>
          <li style={{ marginBottom: 12 }}><a href="/clock" style={{ color: "#fff", textDecoration: "none" }}>Clock</a></li>
          <li style={{ marginBottom: 12 }}><a href="/attendance" style={{ color: "#fff", textDecoration: "none" }}>Attendance History</a></li>
          <li style={{ marginBottom: 12 }}><a href="/leave/request" style={{ color: "#fff", textDecoration: "none" }}>Request Leave</a></li>
          {currentUser.role !== "employee" && (
            <li style={{ marginBottom: 12 }}><a href="/team" style={{ color: "#fff", textDecoration: "none" }}>Team Management</a></li>
          )}
        </ul>
      </nav>

      {/* Main content */}
      <main style={contentStyle}>
        <h1 style={{ marginBottom: 24 }}>Good morning, {currentUser.first_name}!</h1>

        {/* Quick actions */}
        <section style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>Quick actions</h3>
          <button
            style={buttonStyle(clockedIn ? colors.danger : colors.success)}
            onClick={clockedIn ? handleClockOut : handleClockIn}
          >
            {clockedIn ? "Clock out" : "Clock in"}
          </button>
          <button style={buttonStyle(colors.secondary)} onClick={handleRequestLeave}>Request leave</button>
          <span style={{ marginLeft: 16, color: colors.secondary }}>
            Offline queue: {offlineQueue} pending
          </span>
        </section>

        {/* Shift card */}
        <section style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>Today's shift</h3>
          <p><strong>Shift:</strong> Day (09:00 – 17:45) – New York (EDT)</p>
          <p><strong>Status:</strong> {clockedIn ? <span style={{ color: colors.success }}>Clocked in</span> : <span style={{ color: colors.danger }}>Not clocked in</span>}</p>
        </section>

        {/* Role‑specific metrics */}
        {currentUser.role !== "employee" && (
          <section style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Team overview</h3>
            <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 400 }}>
              <div><strong>Total members:</strong> {teamStats.totalMembers}</div>
              <div><strong>Present today:</strong> {teamStats.presentToday}</div>
              <div><strong>On leave:</strong> {teamStats.onLeave}</div>
              <div><strong>Absent:</strong> {teamStats.absent}</div>
            </div>
          </section>
        )}

        {/* Pending leave requests */}
        <section style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>Pending leave requests</h3>
          {pendingLeaves.length === 0 ? (
            <p>No pending requests.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: colors.bg }}>
                  <th style={{ textAlign: "left", padding: 8, borderBottom: `1px solid ${colors.border}` }}>Type</th>
                  <th style={{ textAlign: "left", padding: 8, borderBottom: `1px solid ${colors.border}` }}>Days</th>
                  <th style={{ textAlign: "left", padding: 8, borderBottom: `1px solid ${colors.border}` }}>Period</th>
                  <th style={{ textAlign: "left", padding: 8, borderBottom: `1px solid ${colors.border}` }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingLeaves.map(l => (
                  <tr key={l.id}>
                    <td style={{ padding: 8, borderBottom: `1px solid ${colors.border}` }}>{l.type}</td>
                    <td style={{ padding: 8, borderBottom: `1px solid ${colors.border}` }}>{l.days}</td>
                    <td style={{ padding: 8, borderBottom: `1px solid ${colors.border}` }}>{l.start} → {l.end}</td>
                    <td style={{ padding: 8, borderBottom: `1px solid ${colors.border}`, color: colors.danger }}>{l.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Recent attendance summary */}
        <section style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>Attendance (last 5 days)</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: colors.bg }}>
                <th style={{ textAlign: "left", padding: 8, borderBottom: `1px solid ${colors.border}` }}>Date</th>
                <th style={{ textAlign: "left", padding: 8, borderBottom: `1px solid ${colors.border}` }}>Clock‑in</th>
                <th style={{ textAlign: "left", padding: 8, borderBottom: `1px solid ${colors.border}` }}>Clock‑out</th>
                <th style={{ textAlign: "left", padding: 8, borderBottom: `1px solid ${colors.border}` }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a, idx) => (
                <tr key={idx}>
                  <td style={{ padding: 8, borderBottom: `1px solid ${colors.border}` }}>{a.date}</td>
                  <td style={{ padding: 8, borderBottom: `1px solid ${colors.border}` }}>{a.clock_in || "—"}</td>
                  <td style={{ padding: 8, borderBottom: `1px solid ${colors.border}` }}>{a.clock_out || "—"}</td>
                  <td style={{ padding: 8, borderBottom: `1px solid ${colors.border}`, color: a.status === "present" ? colors.success : a.status === "late" ? colors.danger : colors.secondary }}>{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Real‑time notifications feed */}
        <section style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>Notifications</h3>
          <ul style={{ listStyle: "none", padding: 0, maxHeight: 200, overflowY: "auto" }}>
            {notifications.map(n => (
              <li key={n.id} style={{ padding: 8, borderBottom: `1px solid ${colors.border}` }}>
                <strong>{n.title}</strong> – {n.message}
                <span style={{ float: "right", color: colors.secondary, fontSize: "0.9em" }}>{n.time}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}