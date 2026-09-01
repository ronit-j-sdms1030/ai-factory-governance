/* AttendanceHistory Screen */

const AttendanceHistory = () => {
  const [month, setMonth] = React.useState(new Date().getMonth()); // 0-11
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [timezoneView, setTimezoneView] = React.useState('local'); // 'local' or 'utc'
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [searchDate, setSearchDate] = React.useState('');
  const [records, setRecords] = React.useState([]);
  const [selectedRecord, setSelectedRecord] = React.useState(null);
  const [exportStart, setExportStart] = React.useState('');
  const [exportEnd, setExportEnd] = React.useState('');

  // Generate mock data for the selected month/year
  React.useEffect(() => {
    const generateMock = (m, y) => {
      const daysInMonth = new Date(y, m + 1, 0).getDate();
      const statuses = ['present', 'late', 'absent', 'on_leave', 'half_day'];
      const records = [];
      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(y, m, d);
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const clockIn = status === 'absent' || status === 'on_leave' ? null : `${('0' + (8 + Math.floor(Math.random() * 2))).slice(-2)}:${('0' + (Math.floor(Math.random() * 60))).slice(-2)}`;
        const clockOut = status === 'absent' || status === 'on_leave' ? null : `${('0' + (17 + Math.floor(Math.random() * 2))).slice(-2)}:${('0' + (Math.floor(Math.random() * 60))).slice(-2)}`;
        const syncStatus = Math.random() < 0.1 ? 'pending' : 'synced'; // 10% pending
        const offlineOpId = syncStatus === 'pending' ? `off-${y}${m}${d}` : null;
        records.push({
          id: `rec-${y}${m}${d}`,
          date: date.toISOString().split('T')[0], // YYYY-MM-DD
          status,
          clock_in_time: clockIn,
          clock_out_time: clockOut,
          device_info: {
            browser: 'Chrome',
            os: 'Windows 10',
            model: 'Dell Latitude 5520'
          },
          facial_verified: Math.random() < 0.6,
          sync_status: syncStatus,
          offline_operation_id: offlineOpId,
          late_minutes: status === 'late' ? Math.floor(Math.random() * 30) + 1 : 0,
          overtime_minutes: status === 'present' ? Math.floor(Math.random() * 120) : 0
        });
      }
      return records;
    };
    setRecords(generateMock(month, year));
  }, [month, year]);

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const years = [2023,2024,2025];

  // Filtered view based on status, search date
  const filteredRecords = records.filter(rec => {
    const matchesStatus = statusFilter === 'all' || rec.status === statusFilter;
    const matchesDate = !searchDate || rec.date === searchDate;
    return matchesStatus && matchesDate;
  });

  // Helper to get record for a particular day
  const getRecordForDay = day => {
    const dateKey = new Date(year, month, day).toISOString().split('T')[0];
    return records.find(r => r.date === dateKey);
  };

  const statusColors = {
    present: '#4caf50', // green
    late: '#ff9800',    // orange
    absent: '#f44336', // red
    on_leave: '#2196f3', // blue
    half_day: '#9c27b0' // purple
  };

  const openDetail = rec => setSelectedRecord(rec);
  const closeDetail = () => setSelectedRecord(null);

  const exportToCSV = () => {
    // Determine range
    const start = exportStart ? new Date(exportStart) : new Date(year, month, 1);
    const end = exportEnd ? new Date(exportEnd) : new Date(year, month + 1, 0);
    const rows = records.filter(r => {
      const d = new Date(r.date);
      return d >= start && d <= end;
    });
    const headers = ['Date','Status','Clock In','Clock Out','Late Minutes','Overtime Minutes','Device','Facial Verified','Sync Status'];
    const csvContent = [headers.join(',')]
      .concat(rows.map(r => {
        const device = `${r.device_info.browser}/${r.device_info.os}/${r.device_info.model}`;
        return [r.date, r.status, r.clock_in_time||'', r.clock_out_time||'', r.late_minutes, r.overtime_minutes, device, r.facial_verified, r.sync_status].join(',');
      }))
      .join('\n');
    const blob = new Blob([csvContent], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${year}_${month+1}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Layout styles
  const styles = {
    container: {fontFamily: "Arial, Helvetica, sans-serif", color: '#333', padding: '20px', backgroundColor: '#f5f7fa', minHeight: '100vh'},
    topBar: {display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px'},
    title: {fontSize: '24px', fontWeight: '600'},
    controls: {display: 'flex', gap: '12px', alignItems: 'center'},
    select: {padding: '6px 10px', borderRadius: '4px', border: '1px solid #ccc'},
    button: {padding: '8px 14px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer'},
    calendar: {display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', marginTop: '10px'},
    dayCell: {border: '1px solid #ddd', borderRadius: '4px', padding: '8px', minHeight: '60px', cursor: 'pointer', position: 'relative'},
    syncBadge: {position: 'absolute', top: '4px', right: '4px', fontSize: '10px', padding: '2px 4px', borderRadius: '3px', backgroundColor: '#ffeb3b'}
  };

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <div style={styles.title}>Attendance History</div>
        <div style={styles.controls}>
          {/* Month / Year selector */}
          <select style={styles.select} value={month} onChange={e => setMonth(parseInt(e.target.value))}>
            {monthNames.map((name,i) => <option key={i} value={i}>{name}</option>)}
          </select>
          <select style={styles.select} value={year} onChange={e => setYear(parseInt(e.target.value))}>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          {/* Timezone toggle */}
          <button style={styles.button} onClick={() => setTimezoneView(prev => prev === 'local' ? 'utc' : 'local')}>
            {timezoneView === 'local' ? 'Show UTC' : 'Show Local'}
          </button>
          {/* Status filter */}
          <select style={styles.select} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="present">Present</option>
            <option value="late">Late</option>
            <option value="absent">Absent</option>
            <option value="on_leave">On Leave</option>
            <option value="half_day">Half Day</option>
          </select>
          {/* Search by date */}
          <input type="date" style={styles.select} value={searchDate} onChange={e => setSearchDate(e.target.value)} />
          {/* Export controls */}
          <input type="date" style={styles.select} value={exportStart} onChange={e => setExportStart(e.target.value)} placeholder="Export start" />
          <input type="date" style={styles.select} value={exportEnd} onChange={e => setExportEnd(e.target.value)} placeholder="Export end" />
          <button style={styles.button} onClick={exportToCSV}>Export CSV</button>
        </div>
      </div>

      {/* Calendar Header */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', fontWeight: '600', color: '#555'}}>
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d}>{d}</div>)}
      </div>
      {/* Calendar Grid */}
      <div style={styles.calendar}>
        {/* Fill leading blanks */}
        {Array.from({length: new Date(year, month, 1).getDay()}).map((_,i) => <div key={'blank-'+i}></div>)}
        {/* Days */}
        {Array.from({length: new Date(year, month+1, 0).getDate()}).map((_,i) => {
          const dayNum = i+1;
          const rec = getRecordForDay(dayNum);
          const bg = rec ? statusColors[rec.status] : '#e0e0e0';
          return (
            <div
              key={dayNum}
              style={{...styles.dayCell, backgroundColor: bg, color: '#fff'}}
              onClick={() => rec && openDetail(rec)}
            >
              <div>{dayNum}</div>
              {rec && rec.sync_status === 'pending' && (
                <div style={styles.syncBadge}>Sync</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <div style={{position: 'fixed', top:0, left:0, right:0, bottom:0, backgroundColor: 'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div style={{backgroundColor:'#fff', borderRadius:'8px', width:'400px', maxHeight:'80vh', overflowY:'auto', padding:'20px', boxShadow:'0 4px 12px rgba(0,0,0,.2)'}}>
            <h3 style={{marginTop:0}}>{selectedRecord.date} – {selectedRecord.status.replace('_',' ')}</h3>
            <p><strong>Clock‑In:</strong> {selectedRecord.clock_in_time || '—'}</p>
            <p><strong>Clock‑Out:</strong> {selectedRecord.clock_out_time || '—'}</p>
            <p><strong>Late Minutes:</strong> {selectedRecord.late_minutes}</p>
            <p><strong>Overtime Minutes:</strong> {selectedRecord.overtime_minutes}</p>
            <p><strong>Device:</strong> {selectedRecord.device_info.browser} / {selectedRecord.device_info.os} / {selectedRecord.device_info.model}</p>
            <p><strong>Facial Verified:</strong> {selectedRecord.facial_verified ? 'Yes' : 'No'}</p>
            <p><strong>Sync Status:</strong> {selectedRecord.sync_status}</p>
            {selectedRecord.offline_operation_id && (
              <p><strong>Offline Op ID:</strong> {selectedRecord.offline_operation_id}</p>
            )}
            <button style={styles.button} onClick={closeDetail}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

/* Render the screen */
ReactDOM.render(<AttendanceHistory />, document.getElementById('root'));