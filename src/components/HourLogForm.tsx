// # Form for logging hours
import React, { useState } from 'react';

const HourLogForm: React.FC = () => {
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');

  const handleSubmit = () => {
    // Placeholder for submit logic
    console.log('Logging hours for', date, 'with', hours, 'hours');
  };

  return (
    <div>
      <h2>Log Hours</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        placeholder="Hours worked"
      />
      <button onClick={handleSubmit}>Log Hours</button>
    </div>
  );
};

export default HourLogForm;