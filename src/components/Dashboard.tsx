// # Main dashboard component

// CTRL + enter to format the code


import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      <div>
        <h3>Logged Hours</h3>
        {/* Display logged hours here */}
      </div>
      <div>
        <h3>Income Estimation</h3>
        {/* Display income estimation here */}
      </div>
    </div>
  );
};

export default Dashboard;