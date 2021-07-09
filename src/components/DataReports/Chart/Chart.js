import React from 'react';
import LineChart from './LineChart';

const Chart = ( { allOutletsMonthlyRev, loggedInUserOutlets } ) => {

  return (
    <div>
      <LineChart allOutletsMonthlyRev={allOutletsMonthlyRev} loggedInUserOutlets={loggedInUserOutlets} />
    </div>
  );
};
export default Chart;
