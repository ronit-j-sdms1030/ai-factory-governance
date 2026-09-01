function OfflineSync() {
  // Mock data
  const queuedOperations = [
    { id: 1, employee: 'John Smith', type: 'Clock In', timestamp: '2023-06-15 08:45:22', device: 'iPhone 12 Pro' },
    { id: 2, employee: 'Sarah Johnson', type: 'Clock Out', timestamp: '2023-06-15 17:30:11', device: 'Samsung Galaxy S21' },
    { id: 3, employee: 'Michael Chen', type: 'Clock In', timestamp: '2023-06-15 09:02:47', device: 'iPad Air' },
  ];

  const syncStatus = {
    lastSync: '2023-06-15 14:30:00',
    pendingOperations: 3,
    conflicts: 2,
    deviceStatus: 'Connected',
    nextSync: '2023-06-15 15:00:00'
  };

  const conflicts = [
    { id: 101, employee: 'Robert Davis', localTime: '2023-06-14 18:05:00', serverTime: '2023-06-14 18:02:00', discrepancy: '+3 minutes' },
    { id: 102, employee: 'Emma Wilson', localTime: '2023-06-14 08:58:00', serverTime: '2023-06-14 09:01:00', discrepancy: '-3 minutes' }
  ];

  const deviceInfo = {
    deviceId: 'WP-DV-789456',
    lastConnected: '2023-06-15 14:25:00',
    storageUsed: '2.4 GB',
    storageTotal: '32 GB',
    appVersion: 'v2.4.1',
    osVersion: 'Android 12'
  };

  // Handlers
  const handleSyncNow = () => {
    alert('Manual sync initiated');
  };

  const handleResolveConflict = (id) => {
    alert(`Conflict ${id} marked for resolution review`);
  };

  const QueuedOperationsTable = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Queued Operations</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {queuedOperations.map(op => (
              <tr key={op.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{op.employee}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{op.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{op.timestamp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{op.device}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const SyncStatusDashboard = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Sync Status</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Last Sync</p>
          <p className="text-lg font-semibold">{syncStatus.lastSync}</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Pending Operations</p>
          <p className="text-lg font-semibold text-blue-600">{syncStatus.pendingOperations}</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Conflicts</p>
          <p className="text-lg font-semibold text-red-600">{syncStatus.conflicts}</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Device Status</p>
          <p className="text-lg font-semibold text-green-600">{syncStatus.deviceStatus}</p>
        </div>
      </div>
    </div>
  );

  const ManualSyncTriggerButton = () => (
    <div className="bg-white rounded-lg shadow p-6 text-center">
      <button 
        onClick={handleSyncNow}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
      >
        Sync Now
      </button>
      <p className="mt-2 text-sm text-gray-500">Next automatic sync: {syncStatus.nextSync}</p>
    </div>
  );

  const ConflictList = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Timestamp Conflicts</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Server Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discrepancy</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {conflicts.map(conflict => (
              <tr key={conflict.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{conflict.employee}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{conflict.localTime}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{conflict.serverTime}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">{conflict.discrepancy}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button 
                    onClick={() => handleResolveConflict(conflict.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Resolve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ConflictResolutionInterface = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Conflict Resolution</h3>
      <div className="border border-gray-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-500 mb-2">Pending manager review required for 2 conflicts</p>
        <button className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium py-1 px-3 rounded transition duration-200">
          Review Conflicts
        </button>
      </div>
    </div>
  );

  const DeviceInfoPanel = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Device Information</h3>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Device ID</p>
          <p className="font-medium">{deviceInfo.deviceId}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Last Connected</p>
          <p className="font-medium">{deviceInfo.lastConnected}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Storage</p>
          <p className="font-medium">{deviceInfo.storageUsed} of {deviceInfo.storageTotal}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">App Version</p>
          <p className="font-medium">{deviceInfo.appVersion}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">OS Version</p>
          <p className="font-medium">{deviceInfo.osVersion}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Offline Sync Management</h1>
        <p className="mt-1 text-sm text-gray-500">Manage offline operations and resolve synchronization conflicts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 space-y-6">
          <QueuedOperationsTable />
          <ConflictList />
        </div>
        <div className="space-y-6">
          <SyncStatusDashboard />
          <ManualSyncTriggerButton />
          <DeviceInfoPanel />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ConflictResolutionInterface />
        </div>
      </div>
    </div>
  );
}