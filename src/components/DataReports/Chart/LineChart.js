import React from 'react';
import { Line } from 'react-chartjs-2';


//Get request from date picker minus months
//push all the days in to the data for the line chart

var date = new Date();

// add a day
date.setDate(date.getDate() + 1);

const LineChart =  (  { allOutletsMonthlyRev, loggedInUserOutlets }  ) => {

 //VARIABLES TO STORE MONTHLY REVENEU FOR ALL RESTAURANTS USER HAS ACCESS TO
 let janTotal = 0
 let febTotal = 0
 let marTotal = 0
 let aprTotal = 0
 let mayTotal = 0
 let junTotal = 0
 let julTotal = 0
 let augTotal = 0
 let sepTotal = 0
 let octTotal = 0
 let novTotal = 0
 let decTotal = 0

  return (
    <div>
      {allOutletsMonthlyRev && 
          Object.entries(allOutletsMonthlyRev).map((item, key) => {

            if(!loggedInUserOutlets.includes(item[1].outletId)){
              // console.log("No Access To", item[1].outletId)
            }
            else if(loggedInUserOutlets.includes(item[1].outletId)) {
              janTotal += item[1].revenues[0][0][1]
              febTotal += item[1].revenues[1][0][1]
              marTotal += item[1].revenues[2][0][1]
              aprTotal += item[1].revenues[3][0][1]
              mayTotal += item[1].revenues[4][0][1]
              junTotal += item[1].revenues[5][0][1]
              julTotal += item[1].revenues[6][0][1]
              augTotal += item[1].revenues[7][0][1]
              sepTotal += item[1].revenues[8][0][1]
              octTotal += item[1].revenues[9][0][1]
              novTotal += item[1].revenues[10][0][1]
              decTotal += item[1].revenues[11][0][1]
            }
            return null
          })
      }
      <Line
        data={{
          labels: ["Jan", "Feb", "Mars", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Revenue",
              data: [janTotal, febTotal, marTotal, aprTotal, mayTotal, junTotal, julTotal, augTotal, sepTotal, octTotal, novTotal, decTotal],          
              backgroundColor: ["green"],
              borderColor: ["green"],
              borderWidth: 2,
            },
          ],
        }}
        width={400}
        height={400}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: {
              beginAtZero: true,
            },
          },
        }}
      />

    </div>
  );
};

export default LineChart;
