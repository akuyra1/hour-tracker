// # Component for displaying income estimates
import React from 'react';

const IncomeEstimation: React.FC = () => {
  // Hardcoded values for demonstration
  const hoursLogged = 40;
  const hourlyRate = 20;
  const estimatedIncome = hoursLogged * hourlyRate;

  return (
    <div>
      <h2>Income Estimation</h2>
      <p>Estimated Income: ${estimatedIncome}</p>
    </div>
  );
};

export default IncomeEstimation;