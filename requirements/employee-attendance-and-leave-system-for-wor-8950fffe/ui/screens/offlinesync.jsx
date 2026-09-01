function OfflineSync() {
  // Mock data
  const queuedOperations = [
    { id: 1, employee_id: 1001, operation_type: 'clock_in', local_timestamp: '2023-06-15T08:45:22Z', device_info: 'iPhone 12 Pro', sync_status: 'pending' },
    { id: 2, employee_id: 1002, operation_type: 'clock_out', local_timestamp: '2023-06-15T17:32:10Z', device_info: 'Samsung Galaxy S21', sync_status: 'conflict' },
    { id: 3, employee_id: 1003, operation_type: 'clock_in', local_timestamp: '2023-06-15T09:12:45Z', device_info: 'iPad Air', sync_status: 'synced' }
  ];

  const syncHistory = [
    { id: 1, timestamp: '2023-06-15T07:30:00Z', status: 'success', message: '3 operations synced' },
    { id: 2, timestamp: '2023-06-15T01:15:00Z', status: 'failure', message: 'Network timeout' },
    { id: 3, timestamp: '2023-06-14T19:45:00Z', status: 'success', message: '5 operations synced' }
  ];

  const conflicts = [
    { id: 1, employee_id: 1002, local_time: '2023-06-15T17:32:10Z', server_time: '2023-06-15T17:35:22Z', discrepancy: '3m 12s' }
  ];

  const deviceInfo = {
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X)',
    platform: 'iOS',
    online: false,
    lastSync: '2023-06-15T07:30:00Z'
  };

  // Handlers
  const handleSyncTrigger = () => {
    alert('Manual sync initiated');
  };

  const handleClearQueue = () => {
    alert('Queue cleared for resolved conflicts');
  };

  const handleResolveConflict = (id) => {
    alert(`Conflict ${id} marked for manager review`);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      synced: 'bg-green-100 text-green-800',
      conflict: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Offline Sync Management</h1>
          <p className="text-gray-600 mt-2">Manage offline operations and resolve synchronization conflicts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Device Info Panel */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Device Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className={`font-medium ${deviceInfo.online ? 'text-green-600' : 'text-red-600'}`}>
                  {deviceInfo.online ? 'Online' : 'Offline'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Platform</p>
                <p className="font-medium">{deviceInfo.platform}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Sync</p>
                <p className="font-medium">{new Date(deviceInfo.lastSync).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Sync Controls */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sync Controls</h2>
            <div className="space-y-4">
              <button 
                onClick={handleSyncTrigger}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Trigger Manual Sync
              </button>
              <button 
                onClick={handleClearQueue}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Clear Resolved Queue
              </button>
            </div>
          </div>

          {/* Sync Status Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sync Status</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-yellow-600">{queuedOperations.filter(op => op.sync_status === 'pending').length}</p>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{queuedOperations.filter(op => op.sync_status === 'synced').length}</p>
                <p className="text-sm text-gray-500">Synced</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{queuedOperations.filter(op => op.sync_status === 'conflict').length}</p>
                <p className="text-sm text-gray-500">Conflicts</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Queued Operations */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Queued Operations</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {queuedOperations.map((op) => (
                    <tr key={op.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{op.employee_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{op.operation_type.replace('_', ' ')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(op.local_timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <StatusBadge status={op.sync_status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Conflicts */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Conflicts</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Server Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discrepancy</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {conflicts.map((conflict) => (
                    <tr key={conflict.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{conflict.employee_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(conflict.local_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(conflict.server_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">+{conflict.discrepancy}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button 
                          onClick={() => handleResolveConflict(conflict.id)}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sync History */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Sync History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {syncHistory.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}