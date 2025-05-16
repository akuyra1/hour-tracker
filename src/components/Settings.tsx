// # Component for updating user settings
import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [hourlyRate, setHourlyRate] = useState(20);

  const handleSave = () => {
    // Placeholder for save logic
    console.log('Saving settings:', { notifications, hourlyRate });
  };

  return (
    <div>
      <h2>Settings</h2>
      <label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
        />
        Enable Notifications
      </label>
      <input
        type="number"
        value={hourlyRate}
        onChange={(e) => setHourlyRate(Number(e.target.value))}
        placeholder="Hourly Rate"
      />
      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

export default Settings;